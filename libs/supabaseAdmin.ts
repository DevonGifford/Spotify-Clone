import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

import { Database } from '@/types_db';
import { Price, Product } from '@/types';

import { stripe } from './stripe';
import { toDateTime } from './helpers';

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

/**
 * receives product object & transform into data structures expected by the supabase db 
 * data is then upserted into products tables
**/
const upsertProductRecord = async (product: Stripe.Product) => {
  const productData: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? undefined,
    image: product.images?.[0] ?? null,
    metadata: product.metadata
  };

  const { error } = await supabaseAdmin
    .from('products')
    .upsert([productData]);

  if (error) throw error;

  //success
  console.log(`Product inserted/updated: ${product.id}`);
};


/**
 * receives price objects & transform into data structures expected by the supabase db 
 * data is then upserted into prices table
**/
const upsertPriceRecord = async (price: Stripe.Price) => {
  const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === 'string' ? price.product : '',
    active: price.active,
    currency: price.currency,
    description: price.nickname ?? undefined,
    type: price.type,
    unit_amount: price.unit_amount ?? undefined,
    interval: price.recurring?.interval,
    interval_count: price.recurring?.interval_count,
    trial_period_days: price.recurring?.trial_period_days,
    metadata: price.metadata
  };

  const { error } = await supabaseAdmin
    .from('prices')
    .upsert([priceData]);

  if (error) throw error;

  //success
  console.log(`Price inserted/updated: ${price.id}`);
};


const createOrRetrieveCustomer = async ({ email, uuid}: {
  email: string;
  uuid: string;
}) => {
  //Check if customer exists
  const { data, error } = await supabaseAdmin
    .from('customers')
    .select('stripe_customer_id')
    .eq('id', uuid)
    .single();
    
    //No customer exists - create and return customer ID 
    if (error || !data?.stripe_customer_id) {
        
        //define customerdata
        const customerData: { metadata: { supabaseUUID: string }; email?: string } =
        {
            metadata: {
            supabaseUUID: uuid
            }
        };

        //check if email exisits and add to the object
        if (email) customerData.email = email;
        

        //create customer using stripe
        const customer = await stripe.customers.create(customerData);
        

        //insert customer data into the Supabase database
        const { error: supabaseError } = await supabaseAdmin
          .from('customers')
          .insert([{ id: uuid, stripe_customer_id: customer.id }]);
        
        if (supabaseError) throw supabaseError;

        
        // Return the newly created customer ID
        console.log(`Success ✅ - new customer created and inserted for ${uuid}.`);
        return customer.id;
    }

  //Customer already exists, return the existing customer ID
  return data.stripe_customer_id;
};

const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  //🎯Todo: check this assertion
  
  //extract the data
  const customer = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  
  //check if successful extraction or else break
  if (!name || !phone || !address) return;
  

  //@ts-ignore
  await stripe.customers.update(customer, { name, phone, address });

  //update the users table in the Supabase db
  const { error } = await supabaseAdmin
    .from('users')
    .update({
      billing_address: { ...address },
      payment_method: { ...payment_method[payment_method.type] }
    })
    .eq('id', uuid);
  if (error) throw error;
};


/**
 *Responsible for managing the status change of a subscription. 
 *Retrieves the customer's UUID from the Supabase database, 
 *fetches the subscription object from Stripe, 
 *and upserts the subscription data into the database. 
 If it's a new subscription, it also copies the billing details to the customer object. 
**/ 
const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  //get customer's UUID from mapping table.
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();
  if (noCustomerError) throw noCustomerError;

  
  const { id: uuid } = customerData!;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method']
  });



  /**
   *  Upsert the latest status of the subscription object.
  **/ 
  const subscriptionData: Database['public']['Tables']['subscriptions']['Insert'] =
    {
      id: subscription.id,
      user_id: uuid,
      metadata: subscription.metadata,
      // @ts-ignore
      status: subscription.status,
      price_id: subscription.items.data[0].price.id,
      //🎯TODO check quantity on subscription
      // @ts-ignore
      quantity: subscription.quantity,
      cancel_at_period_end: subscription.cancel_at_period_end,
      cancel_at: subscription.cancel_at ? toDateTime(subscription.cancel_at).toISOString() : null,
      canceled_at: subscription.canceled_at ? toDateTime(subscription.canceled_at).toISOString() : null,
      current_period_start: toDateTime(subscription.current_period_start).toISOString(),
      current_period_end: toDateTime(subscription.current_period_end).toISOString(),
      created: toDateTime(subscription.created).toISOString(),
      ended_at: subscription.ended_at ? toDateTime(subscription.ended_at).toISOString() : null,
      trial_start: subscription.trial_start ? toDateTime(subscription.trial_start).toISOString() : null,
      trial_end: subscription.trial_end ? toDateTime(subscription.trial_end).toISOString() : null
    };

  //Insert into the database
  const { error } = await supabaseAdmin
    .from('subscriptions')
    .upsert([subscriptionData]);
  if (error) throw error;
  console.log(
    `Success ✅ Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
  );

  // For a new subscription copy the billing details to the customer object. 
  //This step is performed at the end because it can be a costly operation.
  if (createAction && subscription.default_payment_method && uuid)
    //@ts-ignore
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod
    );
};


export {
  upsertProductRecord,
  upsertPriceRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange,
};
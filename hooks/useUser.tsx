import { useEffect, useState, createContext, useContext } from 'react';
import {
  useUser as useSupaUser,
  useSessionContext,
  User
} from '@supabase/auth-helpers-react';

import { UserDetails, Subscription } from '@/types';

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export interface Props {
    [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
    const {
      session,
      isLoading: isLoadingUser,
      supabaseClient: supabase
    } = useSessionContext();

    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsloadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    //Function to call userDetails
    const getUserDetails = () => supabase.from('users').select('*').single();

    //Function to call the subscription
    const getSubscription = () =>
        supabase
        .from('subscriptions')
        .select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .single();

    //creating useEffect to fetch the above functions and asssign it to the state
    useEffect(() => {
        //ensuring the users data is loaded
        if (user && !isLoadingData && !userDetails && !subscription) {
          
          setIsloadingData(true);
          
          Promise.allSettled([getUserDetails(), getSubscription()]).then(
            (results) => {
              //0 & 1 - refer to the results in the array  
              const userDetailsPromise = results[0];
              const subscriptionPromise = results[1];
    
              if (userDetailsPromise.status === 'fulfilled')
                setUserDetails(userDetailsPromise.value.data as UserDetails);
    
              if (subscriptionPromise.status === 'fulfilled')
                setSubscription(subscriptionPromise.value.data as Subscription);
    
              setIsloadingData(false);
            }
          );

          // If there is no user signed in...
        } else if (!user && !isLoadingUser && !isLoadingData) {
          setUserDetails(null);
          setSubscription(null);
        }
      }, [user, isLoadingUser]);


    const value = {
      accessToken,
      user,
      userDetails,
      isLoading: isLoadingUser || isLoadingData,
      subscription
    };
    
    return <UserContext.Provider value={value} {...props} />;
};


//CREATING THE HOOK - fetches userDetails and Subscription at the same time.
export const useUser = () => {
    const context = useContext(UserContext);
    //throw error if trying to use hook outside of the above context
    if (context === undefined) {
      throw new Error(`useUser must be used within a MyUserContextProvider 🙈`);
    }
    return context;
};
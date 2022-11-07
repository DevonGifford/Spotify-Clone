import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

const getSongsByUserId = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  // get session data
  const { 
    data: sessionData, 
    error: sessionError 
  } = await supabase.auth.getSession();
  //check if and handle session error 
  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  //querey to get the users songs , in order of upload
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false })

  // Handle any query errors
  if (error) {
    console.log(error.message);
  }

  // Return the fetched data or an empty array
  return (data as any) || [];
};

export default getSongsByUserId;
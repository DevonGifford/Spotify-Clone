import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

import { Song } from "@/types";



const useSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    //fetching the song data
    const fetchSong = async () => {

        //querey all songs equal to the id being passed
        const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', id)
        .single();

        //error message
        if (error) {
        setIsLoading(false);
        return toast.error(error.message);
        }
        
        setSong(data as Song);


        setIsLoading(false);
    }

    //call the function
    fetchSong();


  }, [id, supabaseClient]);


  //memoize output from this hook
  return useMemo(() => ({
    isLoading,
    song
  }), [isLoading, song]);
};

export default useSongById;
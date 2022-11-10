import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useLoadImage = (song: Song) => {
  //Get access to supabase
  const supabaseClient = useSupabaseClient();
  
  //Check that songs exists
  if (!song) {
    return null;
  }

  //fetch the public URL of the image associated with the `song` from the `images` storage bucket.
  const { data: imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
"use client";

import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface LikeButtonProps {
  songId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  songId
}) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  
  // check if the song has been previously liked 
  useEffect(() => {
    if (!user?.id) {
      return;
    }
    
    //find the song in the liked_songs table/database
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();
      
      // Set the song to liked 
      if (!error && data) {
        setIsLiked(true);
      }
    }

    //calling the function 
    fetchData();

  }, [songId, supabaseClient, user?.id]);


  //Dynamically render different liked icon, depending if we have like the song
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;


  //Handle what happends if the user likes the song
  const handleLike = async () => {
    //user not signed in - open sign in page
    if (!user) {
      return authModal.onOpen();
    }


    //if the song is already liked - we want to unlike the song
    if (isLiked) {
      //update the database
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId)

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    //if the song is not already liked - we want to like the song
    } else {
      //update the database
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert({
          song_id: songId,
          user_id: user.id
        });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success('You liked the song!');
      }
    }


    //update the page
    router.refresh();
  }

  return (
    <button 
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={handleLike}
    >
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  );
}

export default LikeButton;
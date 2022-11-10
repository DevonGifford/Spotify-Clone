"use client";


import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";
import useUploadModal from "@/hooks/useUploadModal";

import { Song } from "@/types";
import MediaItem from "./MediaItem";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

// import useSubscribeModal from "@/hooks/useSubscribeModal";


interface LibraryProps {
    songs: Song[];
  }

const Library: React.FC<LibraryProps> = ({songs}) => {

    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user, subscription } = useUser();
    const onPlay = useOnPlay(songs);
    
    const onClick = () => {
        //if user not signed in - open the sign-in page
        if (!user) {
            return authModal.onOpen();
          }

        //To do check for subscription 

        return uploadModal.onOpen();
    };

    return ( 
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                
                    <TbPlaylist className="text-neutral-400" size={26} />
                    
                    <p className="text-neutral-400 font-medium text-md">
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus 
                    onClick={onClick} 
                    size={20} 
                    className="
                        text-neutral-400 
                        cursor-pointer 
                        hover:text-white 
                        transition
                    "
                />
            </div>


            <div className="flex flex-col gap-y-2 mt-4 px-3">

                {/* List of Songs will go here */}

                {/* TEST IF WORKING
                {songs.map((item) => (
                    <div>{item.title}</div>
                ))} 
                */}

                {songs.map((item) => (
                <MediaItem 
                    onClick={(id: string) => onPlay(id)} 
                    key={item.id} 
                    data={item}
                />
                ))}

            </div>

        </div>
     );
}
 
export default Library;
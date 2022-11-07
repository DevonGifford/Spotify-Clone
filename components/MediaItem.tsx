"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
//import usePlayer from "@/hooks/usePlayer";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
  data,
  onClick,
}) => {
  //const player = usePlayer();
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
  
    //TODO: TURN ON PLAYER
    //return player.setId(data.id);
  };

  return ( 
    <div
      onClick={handleClick}
      className="
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
      "
    >
        {/* COVER ART - with backup incase error */}
        <div 
        className="
            relative 
            rounded-md 
            min-h-[48px] 
            min-w-[48px] 
            overflow-hidden
        "
        >
            <Image
                fill
                src={imageUrl || "/assets/images/liked.png"}
                alt="MediaItem"
                className="object-cover"
            />
        </div>

        {/* TITLE AND ARTIST */}
        <div className="flex flex-col gap-y-1 overflow-hidden">

            {/* SONG TITLE */}
            <p className="text-white truncate">
                {data.title}
            </p>
            {/* ARTIST NAME */}
            <p className="text-neutral-400 text-sm truncate">
                By {data.author}
            </p>

        </div>

    </div>
  );
}
 
export default MediaItem;


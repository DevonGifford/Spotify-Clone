"use client";

import useSound from "use-sound";
import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";


interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ 
  song, 
  songUrl
}) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill; 
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave; 

    //NEXT BUTTON ✅
    const onPlayNext = () => {
    //no songs in playlist - break function
    if (player.ids.length === 0) {
        return;
    }

    //find current and next song index 
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    //no next song in playlist loops to first song in the playlist
    if (!nextSong) {
        return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
    }

    //PREVIOUSE BUTTON ✅
    const onPlayPrevious = () => {
    //no songs in playlist - break function 
    if (player.ids.length === 0) {
        return;
    }

    //find current and previous song index
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    //no previouse song - loops back to last song in playlist
    if (!previousSong) {
        return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
    }

    //PLAY, PAUSE & SONG ENDING ✅
    const [play, { pause, sound }] = useSound(
    songUrl,
    { 
        volume: volume,
        //pressing play
        onplay: () => setIsPlaying(true),
        //song ends
        onend: () => {
        setIsPlaying(false);
        onPlayNext();
        },
        //pressing pause
        onpause: () => setIsPlaying(false),
        format: ['mp3']
    }
    );

    //Automatially play song when player component loads ✅
    useEffect(() => {
        //song might not exist
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound]);

    //handle the play buttons - mobile and desktop ✅
    const handlePlay = () => {
    if (!isPlaying) {
        play();
    } else {
        pause();
    }
    }

    //handle the mute functionality ✅
    const toggleMute = () => {
    if (volume === 0) {
        setVolume(1);
    } else {
        setVolume(0);
    }
    }

  return ( 
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">

        {/* CURRENT SONG INFO & LIKE BUTTON  */}
        <div className="flex w-full justify-start">
          <div className="flex items-center gap-x-4">
            <MediaItem data={song} />
            <LikeButton songId={song.id} />
          </div>
        </div>


        {/* SMALL DEVICES PLAY/PAUSE BUTTON */}
        <div 
          className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
          "
        >
          <div 
            onClick={handlePlay} 
            className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
          >
            <Icon size={30} className="text-black" />
          </div>
        </div>

        {/* BIG DEVICEC - ALL BUTTONS */}
        <div 
          className="
            hidden
            h-full
            md:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6
          "
        >
            {/* BACK BUTTON */}
            <AiFillStepBackward
                onClick={onPlayPrevious}
                size={30} 
                className="
                text-neutral-400 
                cursor-pointer 
                hover:text-white 
                transition
                "
            />
            
            {/* PLAY BUTTON */}
            <div 
                onClick={handlePlay} 
                className="
                flex 
                items-center 
                justify-center
                h-10
                w-10 
                rounded-full 
                bg-white 
                p-1 
                cursor-pointer
                "
            >
                <Icon size={30} className="text-black" />
            </div>

            {/* NEXT BUTTON */}
            <AiFillStepForward
                onClick={onPlayNext}
                size={30} 
                className="
                text-neutral-400 
                cursor-pointer 
                hover:text-white 
                transition
                " 
            />

        </div>

        {/* VOLUME CONTROLS */}
        <div className="hidden md:flex w-full justify-end pr-2">
          <div className="flex items-center gap-x-2 w-[120px]">

            {/* muted or not */}
            <VolumeIcon 
              onClick={toggleMute} 
              className="cursor-pointer" 
              size={34} 
            />

            <Slider 
              value={volume} 
              onChange={(value) => setVolume(value)}
            />

          </div>
        </div>

      </div>
   );
}
 
export default PlayerContent;
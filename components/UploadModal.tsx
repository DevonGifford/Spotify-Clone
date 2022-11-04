"use client";

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import uniqid from "uniqid";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);

    const uploadModal = useUploadModal();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();
    const router = useRouter();

    // Form definitions from react-hook-form
    const {
        register,
        handleSubmit,
        reset,
      } = useForm<FieldValues>({
        defaultValues: {
          author: '',
          title: '',
          song: null,
          image: null,
        }
      });

    // Reset the form if there is a change
    const onChange = (open: boolean) =>{
        if (!open) {
            //resets the form
            reset();

            uploadModal.onClose();
        }
    }

    //Function to upload to supabase
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try{
            setIsLoading(true);
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];
            
            //check everything exists
            if (!imageFile || !songFile || !user) {
              toast.error('Missing fields')
              return;
            }


            //To safley store files in our supabase bucket
            const uniqueID = uniqid();


            /* -------------------
                Upload the mp3
            ---------------------*/ 
            const { 
                data: songData,         //remap the data
                error: songError        //remap the data
            } = await supabaseClient
                //selecting database
                .storage                
                //choosing the bucket
                .from('songs')          
                //creating a unique name for the file
                .upload(`song-${values.title}-${uniqueID}`, songFile, {
                cacheControl: '3600',
                upsert: false
                });

            //Catching any errors
            if (songError) {
                setIsLoading(false);
                return toast.error('Failed song upload 🙉');
            }



            /* -------------------
                Upload the image
            ---------------------*/ 
            const { 
                data: imageData, 
                error: imageError
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                cacheControl: '3600',
                upsert: false
                });

            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed image upload 🙈');
            }


            /* ----------------------------------------------------
            Creating a record in the database - SQL INSERT QUEREY
            -------------------------------------------------------*/ 
            const { error: supabaseError } = await supabaseClient
            //choosing the table
            .from('songs')
            //what to insert
            .insert({
              user_id: user.id,
              title: values.title,
              author: values.author,
              image_path: imageData.path,
              song_path: songData.path
            });
    
            if (supabaseError) {
                return toast.error(supabaseError.message);
            }


            //Everything successful then:
            router.refresh();
            setIsLoading(false);
            toast.success('Song created!');
            reset();
            uploadModal.onClose();


        //Something wen wrong
        }catch (error) {
            toast.error('Something went wrong 😢');
          } finally {
            setIsLoading(false);
          }
    }

    return ( 
        <Modal
          title= "Add a song"
          description="Upload an mp3 file"
          isOpen={uploadModal.isOpen}
          onChange={onChange}
        >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >

                {/* TEXT BOX FOR SONG TITLE */}
                <Input 
                  id='title'
                  disabled={isLoading}
                  {...register('title', { required: true })}
                  placeholder="Song title"
                />

                {/* TEXT BOX FOR ARTIST NAME  */}
                <Input 
                  id="author"
                  disabled={isLoading}
                  {...register('author', { required: true })}
                  placeholder="Artist name"                
                />

                {/* BUTTON TO CHOOSE MP3 FILE */}
                <div>
                <div className="pb-1">
                    Select a song file
                </div>
                <Input
                    placeholder="test" 
                    disabled={isLoading}
                    type="file"
                    accept=".mp3"
                    id="song"
                    {...register('song', { required: true })}
                />
                </div>


                {/* BUTTON TO CHOOSE DESIRED IMAGE */}
                <div>
                <div className="pb-1">
                    Select an image
                </div>
                <Input
                    placeholder="test" 
                    disabled={isLoading}
                    type="file"
                    accept="image/*"
                    id="image"
                    {...register('image', { required: true })}
                />
                </div>

                {/* BUTTON TO SUBMIT  */}
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>

            </form>
        </Modal>
     );
}
 
export default UploadModal;
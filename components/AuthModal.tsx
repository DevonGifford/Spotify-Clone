"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";


const AuthModal = () => {
    const router = useRouter();
    const { session } = useSessionContext();
    const supabaseClient = useSupabaseClient();

    const {onClose, isOpen} =  useAuthModal();
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    //close the modal once we successfully login
    useEffect(() => {
        if (session) {
          router.refresh();
          onClose();
        }
      }, [session, router, onClose]);

    return ( 
        <Modal
            title="Welcome back" 
            description="Login to your account." 
            isOpen={isOpen}
            onChange={onChange} 
        >
            <Auth
                supabaseClient={supabaseClient}
                providers={['github']}
                magicLink={true}
                appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                    colors: {
                        brand: '#404040',
                        brandAccent: '#22c55e'
                    }
                    }
                }
                }}
                theme="dark"
            />
        </Modal>
     );
}
 
export default AuthModal;
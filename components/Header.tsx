"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";


import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import { toast } from "react-hot-toast";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";



interface HeaderProps {
    children: React.ReactNode;
    className?: string;
  }


const Header: React.FC<HeaderProps> = ({
  children,
  className,
}) => {

    const router = useRouter();

    const authModal = useAuthModal();

    const supabaseCllient = useSupabaseClient();
    const { user, subscription } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseCllient.auth.signOut();
        //TODO: Reset any playing songs
        router.refresh();

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Successfully Logged out!")
        }
    }

    



    return ( 
        <div
        className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`,className)}>

            <div className="w-full mb-4 flex items-center justify-between">

                {/* DESKTOP RENDER 💻 */}
                <div className="hidden md:flex gap-x-2 items-center">
                    
                    {/* BACK BUTTON */}
                    <button 
                      onClick={() => router.back()}
                      className="rounded-full bg-black flex items-center justify-center hover: opacity-75 transition"
                    >
                        <RxCaretLeft className="text-white" size={34} />

                    </button>

                    {/* FORWARD BUTTON */}
                    <button 
                      onClick={() => router.forward()}
                      className="rounded-full bg-black flex items-center justify-center hover: opacity-75 transition"
                    >
                        <RxCaretRight className="text-white" size={34} />

                    </button>

                </div>

                {/* MOBILE VIEW RENDER 📱 */}
                <div className="flex md:hidden gap-x-2 items-center">

                    {/* HOME BUTTON */}
                    <button 
                        onClick={() => router.push('/')} 
                        className="
                        rounded-full 
                        p-2 
                        bg-white 
                        flex 
                        items-center 
                        justify-center 
                        cursor-pointer 
                        hover:opacity-75 
                        transition
                        "
                    >
                        <HiHome className="text-black" size={20} />
                    </button>

                    {/* SEARCH BUTTON */}
                    <button 
                        onClick={() => router.push('/search')} 
                        className="
                        rounded-full 
                        p-2 
                        bg-white 
                        flex 
                        items-center 
                        justify-center 
                        cursor-pointer 
                        hover:opacity-75 
                        transition
                        "
                    >
                        <BiSearch className="text-black" size={20} />
                    </button>

                </div>

                {/* LOG-IN & SIGN-UP BUTTONS */}
                <div className="flex justify-between items-center gap-x-4">
                    
                    {/* DYNAMIC DEPENDING ON LOGGED IN OR NOT */}
                    {user ? (

                        // USER NOT LOGGED IN ⬇   
                        <div className="flex gap-x-4 items-center">
                            <Button 
                                onClick={handleLogout} 
                                className="bg-white px-6 py-2"
                            >
                                Logout
                            </Button>

                            <Button 
                                onClick={() => router.push('/account')} //REQUIRES FUTURE UPDATE 🎯
                                className="bg-white"
                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                    
                    ): (

                        // USER LOGGED IN ⬇⬇⬇
                        <>
                        
                            <div>
                                <Button 
                                onClick={authModal.onOpen} 
                                className="bg-transparent text-neutral-300 font-medium"
                                >
                                Sign up
                                </Button>
                            </div>

                            <div>
                                <Button 
                                onClick={authModal.onOpen} 
                                className="bg-white px-6 py-2"
                                >
                                Log in
                                </Button>
                            </div>
                        
                        </>
                    )}

                </div>
            </div>
            {children}
        </div>
     );
}
 
export default Header;
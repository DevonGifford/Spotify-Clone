"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
// import SubscribeModal from "@/components/SubscribeModal";
// import UploadModal from "@/components/UploadModal";

import { ProductWithPrice } from "@/types";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

// const ModalProvider: React.FC<ModalProviderProps> = ({
//   products
// }) => {

const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    // never want to render a modal if we are in server side rending 
    // can cause hydration errors
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

  return (
    <>
    
        <AuthModal />
      {/*
      <SubscribeModal products={products} />
      <UploadModal /> 
      */}
    </>
  );
}

export default ModalProvider;
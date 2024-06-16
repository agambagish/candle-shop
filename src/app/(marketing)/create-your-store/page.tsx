"use client";

import { useCreateStoreModal } from "@/hooks/use-create-store-modal";
import { useEffect } from "react";

const Page = () => {
  const onOpen = useCreateStoreModal((state) => state.onOpen);
  const isOpen = useCreateStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <title>Setup Store | Candle Shop</title>;
};

export default Page;

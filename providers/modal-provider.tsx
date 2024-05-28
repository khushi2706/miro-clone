"use client";
import { RenameModal } from "@/components/modals";
import { useIsClient } from "usehooks-ts";

export default function ModalProvider() {
  const isClient = useIsClient();
  if (!isClient) return null;
  return (
    <>
      <RenameModal />
    </>
  );
}

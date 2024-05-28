"use client";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/hooks/use-rename-modal";
import { useRouter } from "next/navigation";

type ActionsProps = {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: Id<"boards">;
  title: string;
};

export function Actions({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) {
  const router = useRouter();
  const [_, copy] = useCopyToClipboard();
  const { pending, mutate } = useApiMutation(api.board.remove);

  const open = useRenameModal((state) => state.open);

  const handleCopy = () => {
    toast.promise(copy(`${window.location.origin}/board/${id}`), {
      loading: "Copying board link to clipboard...",
      success: "Board link copied to clipboard 📋",
      error: "Failed to copy board link to clipboard 😔",
    });
  };

  const onDelete = () => {
    toast.promise(mutate({ id }), {
      loading: "Deleting board...",
      success: "Board deleted successfully 🗑",
      error: "Failed to delete board 😔",
    });
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        onClick={(event) => event.stopPropagation()}
        className={"w-60"}
      >
        <DropdownMenuItem className={"cursor-pointer p-3"} onClick={handleCopy}>
          <Link2 className={"mr-2 h-4 w-4"} />
          Copy Board Link
        </DropdownMenuItem>
        <DropdownMenuItem
          className={"cursor-pointer p-3"}
          onClick={() => open(id, title)}
        >
          <Pencil className={"mr-2 h-4 w-4"} />
          Rename Board
        </DropdownMenuItem>
        <ConfirmModal
          onConfirm={onDelete}
          title={"Delete Board"}
          description={`Are you sure you want to delete "${title}"?`}
          disabled={pending}
        >
          <Button
            className={
              "w-full justify-start rounded-sm p-3 text-sm font-normal hover:bg-rose-500 hover:text-white"
            }
            variant={"ghost"}
          >
            <Trash2 className={"mr-2 h-4 w-4"} />
            Delete Board
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

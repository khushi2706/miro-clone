"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Footer } from "./footer";
import { Overlay } from "./overlay";
import { Actions } from "@/components/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

type BoardCardProps = {
  id: Id<"boards">;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
};

export function BoardCard({
  id,
  title,
  authorName,
  authorId,
  createdAt,
  imageUrl,
  orgId,
  isFavorite,
}: BoardCardProps) {
  const { userId } = useAuth();

  const authorLabel = authorId === userId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  const { pending, mutate } = useApiMutation(api.board.toggleFavorites);

  const onToggleFavorites = () => {
    toast.promise(mutate({ id, orgId }), {
      loading: !isFavorite
        ? "adding board to favorites..."
        : "removing board from favorites...",
      success: !isFavorite
        ? "Board added to favorites successfully 🌟"
        : "Board removed from favorites successfully 🌟",
      error: !isFavorite
        ? "Failed to add board to favorites 😔"
        : "Failed to remove board from favorites 😔",
    });
  };

  return (
    <Link href={`/board/${id}`}>
      <div
        className={
          "group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border"
        }
      >
        <div className={"relative flex-1 bg-amber-50"}>
          <Image src={imageUrl} alt={title} fill className={"object-fit"} />
          <Overlay />
          <Actions id={id} title={title} side={"right"}>
            <button
              className={
                "absolute right-1 top-1 px-1 opacity-0 outline-none transition-opacity group-hover:opacity-100 "
              }
            >
              <MoreHorizontal
                className={
                  "text-white opacity-75 transition-opacity hover:opacity-100"
                }
              />
            </button>
          </Actions>
        </div>
        <Footer
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          isFavorite={isFavorite}
          onClick={onToggleFavorites}
          disabled={pending}
        />
      </div>
    </Link>
  );
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className={"aspect-[100/127] overflow-hidden rounded-lg"}>
      <Skeleton className={"h-full w-full bg-amber-100"} />
    </div>
  );
};

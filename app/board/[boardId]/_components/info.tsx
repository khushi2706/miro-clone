"use client";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/hooks/use-rename-modal";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type InfoProps = {
  boardId: Id<"boards">;
};

function TabSeparator() {
  return (
    <div
      className={
        "mx-2 h-6 w-[1px] rounded-md border-[1px] border-neutral-300 bg-neutral-200"
      }
    />
  );
}

export function Info({ boardId }: InfoProps) {
  const board = useQuery(api.board.get, {
    id: boardId,
  });

  const open = useRenameModal((state) => state.open);

  if (!board) return <InfoSkeleton />;

  return (
    <div
      className={
        "absolute left-2 top-2 z-50 flex h-12 items-center rounded-md bg-white px-1.5 shadow-md"
      }
    >
      <Hint label={"Go to boards"} side={"bottom"} sideOffset={10}>
        <Button asChild variant={"board"}>
          <Link href={"/"}>
            <Image
              src={"/miro.svg"}
              alt={"miro logo"}
              width={30}
              height={30}
              className={"rounded-md"}
            />
            <span
              className={cn(
                "ml-2 text-xl font-semibold text-black",
                font.className,
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label={"Edit board title"} side={"bottom"} sideOffset={10}>
        <Button
          onClick={() => open(board._id, board.title)}
          variant={"board"}
          className={"px-2 text-base font-normal"}
        >
          {board.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions
        id={board._id}
        title={board.title}
        side={"bottom"}
        sideOffset={10}
      >
        <div>
          <Hint label={"More actions"} side={"bottom"} sideOffset={10}>
            <Button size={"icon"} variant={"board"}>
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
}

export function InfoSkeleton() {
  return (
    <Skeleton
      className={
        "absolute left-2 top-2 flex h-12 w-[300px] items-center rounded-md bg-white px-1.5 shadow-md"
      }
    />
  );
}

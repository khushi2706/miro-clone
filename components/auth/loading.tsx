import Image from "next/image";
import { Loader } from "lucide-react";

import { InfoSkeleton } from "@/app/board/[boardId]/_components/info";
import { ToolbarSkeleton } from "@/app/board/[boardId]/_components/toolbar";
import { ParticipantsSkeleton } from "@/app/board/[boardId]/_components/participants";

export default function Loading({ canvas }: { canvas?: boolean }) {
  return (
    <div className={"flex h-screen w-screen items-center justify-center"}>
      {canvas ? (
        <>
          <div
            className={
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            }
          >
            <Loader className={"h-6 w-6 animate-spin"} />
          </div>
          <InfoSkeleton />
          <ParticipantsSkeleton />
          <ToolbarSkeleton />
        </>
      ) : (
        <Image
          src="/miro.svg"
          alt="miro logo"
          width={120}
          height={120}
          className={"animate-pulse rounded-md duration-700 ease-in-out"}
          sizes={"120px"}
        />
      )}
    </div>
  );
}

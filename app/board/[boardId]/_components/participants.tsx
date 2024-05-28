"use client";

import { useSelf, useOthers } from "@/liveblocks.config";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "./user-avatar";
import { connectionIdColor } from "@/lib/utils";

const MAX_SHOWN_OTHERS = 3;

export function Participants() {
  const others = useOthers();
  const self = useSelf();
  const hasMoreUsers = others.length > MAX_SHOWN_OTHERS;
  return (
    <div
      className={
        "absolute right-2 top-2 z-50 flex h-12 items-center rounded-md bg-white p-3 shadow-md"
      }
    >
      <div className={"flex gap-x-2"}>
        {others.slice(0, MAX_SHOWN_OTHERS).map(({ connectionId, info }) => (
          <UserAvatar
            key={connectionId}
            src={info?.picture}
            name={info?.name}
            fallback={info?.name?.[0] || "T"}
            borderColor={connectionIdColor(connectionId)}
          />
        ))}
        {self && (
          <UserAvatar
            src={self.info?.picture}
            name={`${self.info?.name} (You)`}
            fallback={self.info?.name?.[0] || "T"}
            borderColor={connectionIdColor(self.connectionId)}
          />
        )}
        {hasMoreUsers && (
          <UserAvatar
            name={`${others.length - MAX_SHOWN_OTHERS} more`}
            fallback={`+${others.length - MAX_SHOWN_OTHERS}`}
          />
        )}
      </div>
    </div>
  );
}

export function ParticipantsSkeleton() {
  return (
    <Skeleton
      className={
        "absolute right-2 top-2 flex h-12 w-[200px] items-center rounded-md bg-white p-3 shadow-md"
      }
    />
  );
}

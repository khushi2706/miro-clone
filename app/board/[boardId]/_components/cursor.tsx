"use client";

import { memo } from "react";
import { MousePointer2 } from "lucide-react";

import { connectionIdColor } from "@/lib/utils";
import { useOther } from "@/liveblocks.config";

type CursorProps = {
  connectionId: number;
};

export const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);
  const name = info?.name || "Teammate";

  if (!cursor) return null;
  const { x, y } = cursor;

  return (
    <foreignObject
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      className={`relative h-[50px] drop-shadow-md`}
      width={name.length * 10 + 24}
    >
      <MousePointer2
        className={"h-5 w-5"}
        style={{
          fill: connectionIdColor(connectionId),
          color: connectionIdColor(connectionId),
        }}
      />
      <div
        className={
          "absolute left-5 rounded-md px-1.5 py-0.5 text-xs font-semibold text-white"
        }
        style={{
          backgroundColor: connectionIdColor(connectionId),
        }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";

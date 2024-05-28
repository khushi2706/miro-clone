"use client";

import { memo } from "react";
import { shallow } from "@liveblocks/react";

import { Path } from "./path";
import { Cursor } from "./cursor";
import { colorToCSS } from "@/lib/utils";
import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => {
        return <Cursor key={connectionId} connectionId={connectionId} />;
      })}
    </>
  );
};

const Drafts = () => {
  const others = useOthersMapped(
    (user) => ({
      pencilDraft: user.presence.pencilDraft,
      pencilColor: user.presence.pencilColor,
    }),
    shallow,
  );

  return (
    <>
      {others.map(([key, other]) => {
        if (!other.pencilDraft) return null;
        return (
          <Path
            key={key}
            x={0}
            y={0}
            points={other.pencilDraft}
            fill={other.pencilColor ? colorToCSS(other.pencilColor) : "#000"}
          />
        );
      })}
    </>
  );
};

export const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";

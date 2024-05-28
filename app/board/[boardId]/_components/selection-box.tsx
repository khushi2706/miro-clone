"use client";
import { memo } from "react";
import { nanoid } from "nanoid";

import { LayerType, Side, XYWH } from "@/types/canvas";
import { useSelf, useStorage } from "@/liveblocks.config";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

type SelectionBoxProps = {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
};

const HANDLE_WIDTH = 8;

const cursors = ["nwse-resize", "ns-resize", "nesw-resize", "ew-resize"];

const boundsHandler = function (bounds: XYWH) {
  return [
    {
      cursor: cursors[0],
      transform: {
        x: bounds.x - HANDLE_WIDTH / 2,
        y: bounds.y - HANDLE_WIDTH / 2,
      },
      resizeSide: Side.Top + Side.Left,
    },
    {
      cursor: cursors[1],
      transform: {
        x: bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2,
        y: bounds.y - HANDLE_WIDTH / 2,
      },
      resizeSide: Side.Top,
    },
    {
      cursor: cursors[2],
      transform: {
        x: bounds.x + bounds.width - HANDLE_WIDTH / 2,
        y: bounds.y - HANDLE_WIDTH / 2,
      },
      resizeSide: Side.Top + Side.Right,
    },
    {
      cursor: cursors[3],
      transform: {
        x: bounds.x - HANDLE_WIDTH / 2,
        y: bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2,
      },
      resizeSide: Side.Left,
    },
    {
      cursor: cursors[3],
      transform: {
        x: bounds.x + bounds.width - HANDLE_WIDTH / 2,
        y: bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2,
      },
      resizeSide: Side.Right,
    },
    {
      cursor: cursors[2],
      transform: {
        x: bounds.x - HANDLE_WIDTH / 2,
        y: bounds.y + bounds.height - HANDLE_WIDTH / 2,
      },
      resizeSide: Side.Bottom + Side.Left,
    },
    {
      cursor: cursors[1],
      transform: {
        x: bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2,
        y: bounds.y + bounds.height - HANDLE_WIDTH / 2,
      },
      resizeSide: Side.Bottom,
    },
    {
      cursor: cursors[0],
      transform: {
        x: bounds.x + bounds.width - HANDLE_WIDTH / 2,
        y: bounds.y + bounds.height - HANDLE_WIDTH / 2,
      },
      resizeSide: Side.Bottom + Side.Right,
    },
  ];
};

export const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null,
    );

    const isShowingHandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path,
    );

    const bounds = useSelectionBounds();

    if (!bounds) return null;

    return (
      <>
        <rect
          className={
            "pointer-events-none fill-transparent stroke-blue-500 stroke-1"
          }
          style={{
            transform: `translate(${bounds.x}px, ${bounds.y}px)`,
          }}
          width={bounds.width}
          height={bounds.height}
          x={0}
          y={0}
        />
        {isShowingHandles && (
          <>
            {boundsHandler(bounds).map(
              ({ cursor, resizeSide, transform: { x, y } }) => (
                <rect
                  key={nanoid()}
                  className={"fill-white stroke-blue-500 stroke-1"}
                  x={0}
                  y={0}
                  style={{
                    cursor,
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  width={HANDLE_WIDTH}
                  height={HANDLE_WIDTH}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    onResizeHandlePointerDown(resizeSide, bounds);
                  }}
                />
              ),
            )}
          </>
        )}
      </>
    );
  },
);

SelectionBox.displayName = "SelectionBox";

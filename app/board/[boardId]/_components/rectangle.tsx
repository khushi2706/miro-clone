import { RectangleLayer } from "@/types/canvas";
import { colorToCSS } from "@/lib/utils";

type RectangleProps = {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

export function Rectangle({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) {
  const { x, y, width, height, fill } = layer;
  return (
    <rect
      x={0}
      y={0}
      width={width}
      height={height}
      className={"drop-shadow-md"}
      onPointerDown={(e) => onPointerDown(e, id)}
      strokeWidth={1}
      stroke={selectionColor || "transparent"}
      fill={colorToCSS(fill) || "#CCC"}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    />
  );
}

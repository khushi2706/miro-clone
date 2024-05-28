import { EllipseLayer } from "@/types/canvas";
import { colorToCSS } from "@/lib/utils";

type EllipseProps = {
  id: string;
  layer: EllipseLayer;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

export function Ellipse({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: EllipseProps) {
  const { x, y, width, height, fill } = layer;
  return (
    <ellipse
      x={0}
      y={0}
      cx={width / 2}
      rx={width / 2}
      cy={height / 2}
      ry={height / 2}
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

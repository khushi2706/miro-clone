"use client";

import { Color } from "@/types/canvas";
import { colorToCSS } from "@/lib/utils";
import { Hint } from "@/components/hint";

type ColorPickerProps = {
  onChange: (color: Color) => void;
};

const arrayOfRGB = [
  { r: 243, g: 82, b: 35 },
  { r: 255, g: 249, b: 177 },
  { r: 68, g: 202, b: 99 },
  { r: 39, g: 142, b: 237 },
  { r: 155, g: 105, b: 245 },
  { r: 252, g: 142, b: 42 },
  { r: 0, g: 0, b: 0 },
  { r: 255, g: 255, b: 255 },
];

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className="mr-2 flex max-w-[164px] flex-wrap items-center gap-2 border-r border-neutral-200 pr-2">
      {arrayOfRGB.map((color) => (
        <ColorButton key={colorToCSS(color)} color={color} onClick={onChange} />
      ))}
    </div>
  );
};

type ColorButtonProps = {
  onClick: (color: Color) => void;
  color: Color;
};

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <Hint label={colorToCSS(color).toUpperCase()}>
      <button
        className="flex h-8 w-8 items-center justify-center transition hover:opacity-75"
        onClick={() => onClick(color)}
      >
        <div
          className="h-8 w-8 rounded-md border border-neutral-300"
          style={{ background: colorToCSS(color) }}
        />
      </button>
    </Hint>
  );
};

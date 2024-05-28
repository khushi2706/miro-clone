import { Hint } from "@/components/hint";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type UserAvatarProps = {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
};

export function UserAvatar({
  src,
  name,
  borderColor,
  fallback,
}: UserAvatarProps) {
  return (
    <Hint label={name || "Teammate"} side={"bottom"} sideOffset={18}>
      <Avatar className={"h-8 w-8 border-2 "} style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className={"text-xs font-semibold"}>
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
}

"use client";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";

const title = "Create Board";

export default function EmptyBoard() {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = async () => {
    if (!organization) return;
    toast.promise(
      mutate({ orgId: organization.id, title }).then((id) => {
        router.push(`/board/${id}`);
      }),
      {
        loading: "Creating board...",
        success: `Your board "${title}" created successfully! 🎉`,
        error: `Failed to create board "${title}"! 😔`,
      },
    );
  };

  return (
    <div className={"flex h-full flex-col items-center justify-center"}>
      <Image
        src={"./empty-data.svg"}
        alt={"Empty Data"}
        width={200}
        height={200}
      />
      <h2 className={"mt-6 text-2xl font-semibold"}> No boards yet! 😔</h2>
      <p className={"mt-2 max-w-xs text-center text-sm text-muted-foreground"}>
        Create your first board to get started.
      </p>
      <div className={"mt-6"}>
        <Button disabled={pending} onClick={onClick} size={"lg"}>
          {pending ? "Creating..." : "Create Board"}
        </Button>
      </div>
    </div>
  );
}

import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

export default function EmptyOrg() {
  return (
    <div className={"flex h-full flex-col items-center justify-center"}>
      <Image
        src={"./elements.svg"}
        alt={"Empty Org"}
        width={200}
        height={200}
      />
      <h2 className={"mt-6 text-2xl font-semibold"}> Welcome to Miro! 🎉</h2>
      <p className={"mt-2 max-w-xs text-center text-sm text-muted-foreground"}>
        Get started by creating your first organization.
      </p>
      <div className={"mt-6"}>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Organization</Button>
          </DialogTrigger>
          <DialogContent hideClose hideModel className={"max-w-[480px]"}>
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

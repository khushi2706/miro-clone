import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";

export function InviteButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Plus className={"mr-2 h-4 w-4"} />
          Invite Members
        </Button>
      </DialogTrigger>
      <DialogContent hideClose hideModel className={"max-w-[880px]"}>
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
}

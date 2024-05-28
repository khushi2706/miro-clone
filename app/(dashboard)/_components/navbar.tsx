"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { InviteButton } from "@/app/(dashboard)/_components/invite-button";

export const Navbar = () => {
  const { organization } = useOrganization();
  return (
    <div className={"flex items-center gap-x-4 p-5"}>
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className={"flex flex-1 lg:hidden"}>
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "376px",
              },
              organizationSwitcherTrigger: {
                padding: "6px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                justifyContent: "space-between",
                backgroundColor: "white",
              },
            },
          }}
        />
      </div>
      {organization ? <InviteButton /> : null}
      <UserButton />
    </div>
  );
};

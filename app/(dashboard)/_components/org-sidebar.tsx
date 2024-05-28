"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Poppins } from "next/font/google";
import { LayoutDashboard, Star } from "lucide-react";
import { OrganizationSwitcher } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
export function OrgSidebar() {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  const search = searchParams.get("search");
  return (
    <div className={"hidden w-[206px] flex-col space-y-6 pl-5 pt-5 lg:flex"}>
      <Link href={"/"}>
        <div className={"flex items-center gap-x-2 "}>
          <Image
            src={"/miro.svg"}
            width={60}
            height={60}
            sizes={"60px"}
            alt={"miro logo"}
            className={"rounded-md"}
          />
          <span className={cn("text-2xl font-semibold", font.className)}>
            Miro
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
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
      <div className={"w-full space-y-1"}>
        <Button
          asChild
          variant={favorites ? "ghost" : "secondary"}
          size={"lg"}
          className={"w-full justify-start px-2 font-normal"}
        >
          <Link href={{ pathname: "/", query: { search } }}>
            <LayoutDashboard className={"mr-2 h-4 w-4"} />
            Team Boards
          </Link>
        </Button>
        <Button
          asChild
          variant={favorites ? "secondary" : "ghost"}
          size={"lg"}
          className={"w-full justify-start px-2 font-normal"}
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true, search },
            }}
          >
            <Star className={"mr-2 h-4 w-4"} />
            Favorites Boards
          </Link>
        </Button>
      </div>
    </div>
  );
}

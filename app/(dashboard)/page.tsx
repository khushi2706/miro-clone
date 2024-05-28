"use client";
import { EmptyOrg } from "./_components/empty-status";
import { useOrganization } from "@clerk/nextjs";
import { BoardList } from "@/app/(dashboard)/_components/board-list";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const favorites = searchParams.get("favorites") || undefined;
  const { organization } = useOrganization();
  return (
    <div className={"h-[calc(100%-80px)] flex-1 p-6"}>
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          query={{
            search,
            favorites,
          }}
        />
      )}
    </div>
  );
}

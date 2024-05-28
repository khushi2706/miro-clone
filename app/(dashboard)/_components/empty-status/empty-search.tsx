import Image from "next/image";

export default function EmptySearch() {
  return (
    <div className={"flex h-full flex-col items-center justify-center"}>
      <Image
        src={"./empty-search.svg"}
        alt={"Empty Search"}
        width={200}
        height={200}
      />
      <h2 className={"mt-6 text-2xl font-semibold"}> No results found! 😔</h2>
      <p className={"mt-2 max-w-xs text-center text-sm text-muted-foreground"}>
        Try searching with different keywords.
      </p>
    </div>
  );
}

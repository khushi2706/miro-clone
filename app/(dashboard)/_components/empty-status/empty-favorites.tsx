import Image from "next/image";

export default function EmptyFavorites() {
  return (
    <div className={"flex h-full flex-col items-center justify-center"}>
      <Image
        src={"./empty-favorites.svg"}
        alt={"Empty Favorites"}
        width={200}
        height={200}
      />
      <h2 className={"mt-6 text-2xl font-semibold"}> No favorites yet! 😔</h2>
      <p className={"mt-2 max-w-xs text-center text-sm text-muted-foreground"}>
        Add your favorite items to access them quickly.
      </p>
    </div>
  );
}

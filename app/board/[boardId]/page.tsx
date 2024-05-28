import { Room } from "@/components/room";
import { Canvas } from "./_components/canvas";
import { Id } from "@/convex/_generated/dataModel";
import Loading from "@/components/auth/loading";

type BoardIdPageProps = {
  params: {
    boardId: Id<"boards">;
  };
};

export default function BoardIdPage({ params: { boardId } }: BoardIdPageProps) {
  return (
    <>
    <Room roomId={boardId} fallback={<Loading canvas />}>
      <Canvas boardId={boardId} />
    </Room>
    </>
  );
}

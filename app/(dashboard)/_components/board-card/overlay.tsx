export function Overlay() {
  return (
    <div
      className={
        "absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
      }
    />
  );
}

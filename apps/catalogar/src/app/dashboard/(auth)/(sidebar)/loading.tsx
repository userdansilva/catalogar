import Loader from "@/components/loader";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-96px)] items-center justify-center">
      <Loader />
    </div>
  );
}

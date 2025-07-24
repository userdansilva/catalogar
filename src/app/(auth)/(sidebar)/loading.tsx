import Loader from "@/components/loader";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-(64px+32px))] items-center justify-center">
      <Loader />
    </div>
  );
}

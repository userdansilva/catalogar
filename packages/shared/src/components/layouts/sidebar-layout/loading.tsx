import { Loader } from "@/components/loader";

export function SidebarLayoutLoading() {
  return (
    <div className="flex h-[calc(100vh-(64px+32px))] items-center justify-center">
      <Loader />
    </div>
  );
}

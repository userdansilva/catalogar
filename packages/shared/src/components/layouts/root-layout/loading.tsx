import { Loader } from "@catalogar/shared/components/loader";

export function RootLayoutLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
}

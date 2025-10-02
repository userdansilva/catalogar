import Image from "next/image";
import logo from "@catalogar/shared/logo.svg";

export function Loader() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Image src={logo} height={40} alt="Logo" />

      <div className="relative h-1 w-32 overflow-hidden rounded-full bg-gray-200">
        <div className="animate-slide bg-primary absolute top-0 left-0 h-full w-16 rounded-full" />
      </div>
    </div>
  );
}

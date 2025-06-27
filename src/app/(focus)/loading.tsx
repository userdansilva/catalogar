import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <Image src={logo} height={40} alt="Logo" />
      <div className="flex items-center gap-2">
        <LoaderCircle className="animate-spin" />
        <span className="text-xl font-medium">Carregando...</span>
      </div>
    </div>
  );
}

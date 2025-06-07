import { Button } from "@/components/inputs/button";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default async function PreviewLayout({
  children,
}: PropsWithChildren) {
  const { data: user } = await getUser();

  const primaryColor = user.currentCatalog.theme?.primaryColor;
  const secondaryColor = user.currentCatalog.theme?.secondaryColor;
  const logo = user.currentCatalog.theme?.logo;

  return (
    <div className="space-y-10">
      <header
        className="w-full border-b border-slate-100 py-4"
        style={{
          background: primaryColor,
          color: secondaryColor,
        }}

      >
        <div className="container">
          <div className="relative flex h-7 w-full items-center justify-between">
            <Link href={routes.preview.url}>
              {logo && (
                <Image
                  src={logo.url}
                  alt="logo"
                  height={logo.height}
                  width={logo.width}
                  style={{ height: 28, width: "auto" }}
                />
              )}
            </Link>

            <Button
              className="shadow-none"
              style={{
                background: primaryColor,
                color: secondaryColor,
              }}
            >
              <Menu />
              Menu
            </Button>
          </div>
        </div>
      </header>

      <main className="container pb-10">
        {children}
      </main>
    </div>
  );
}

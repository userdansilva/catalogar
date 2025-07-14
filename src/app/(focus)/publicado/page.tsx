import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/inputs/button";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";

export default async function Page() {
  const { data: user } = await getUser();

  if (!user.currentCatalog.slug) {
    redirect(routes.dashboard.url);
  }

  const publicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/@${user.currentCatalog.slug}`;

  return (
    <div className="flex max-w-lg flex-col items-center gap-10">
      <CircleCheckBig className="size-10" />
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Tudo pronto, seu catálogo foi publicado!
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-center text-base">
            Seu link público
          </CardTitle>
          <CardDescription className="flex flex-col items-center gap-4">
            <Link
              href={publicLink}
              target="_blank"
              className="w-full max-w-[calc(100vw-80px)] truncate underline underline-offset-2"
            >
              {publicLink}
            </Link>

            <CopyButton textToCopy={publicLink} size="sm" />
          </CardDescription>
        </CardHeader>
      </Card>

      <Button asChild variant="outline">
        <Link href={routes.dashboard.url}>Voltar para Página Inicial</Link>
      </Button>
    </div>
  );
}

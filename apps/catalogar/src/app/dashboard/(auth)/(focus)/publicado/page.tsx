import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@catalogar/ui/components/card";
import { CircleCheckBig, ExternalLink, Forward } from "lucide-react";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";
import { Button } from "@/components/inputs/button";
import { CopyButton } from "@/components/inputs/copy-button";
import { ShareButton } from "@/components/inputs/share-button";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";

export default async function Page() {
  const session = await getSession();

  const currentCatalog = await prisma.catalog.findUniqueOrThrow({
    where: {
      id: session.user.currentCatalogId,
    },
  });

  if (!currentCatalog.slug) {
    redirect(routes.dashboard.url, RedirectType.replace);
  }

  const publicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/@${currentCatalog.slug}`;

  return (
    <div className="flex max-w-lg flex-col items-center gap-10">
      <CircleCheckBig className="size-10" />
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Tudo pronto, seu catálogo foi publicado!
      </h1>

      <Card className="w-full gap-1">
        <CardHeader>
          <CardTitle className="text-center text-base">
            Seu link público
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-center">
          <Button
            variant="link"
            className="underline underline-offset-2"
            asChild
          >
            <Link
              href={publicLink}
              target="_blank"
              className="text-muted-foreground block w-full max-w-[calc(100vw-80px)] truncate text-sm underline underline-offset-2"
            >
              {publicLink}
              <ExternalLink />
            </Link>
          </Button>

          <div className="flex items-center gap-2 justify-center">
            <ShareButton shareData={{ url: publicLink }}>
              <Forward />
              Compartilhar
            </ShareButton>
            <CopyButton textToCopy={publicLink} variant="outline" />
          </div>
        </CardContent>
      </Card>

      <Button asChild variant="outline">
        <Link href={routes.dashboard.url}>Voltar para Página Inicial</Link>
      </Button>
    </div>
  );
}

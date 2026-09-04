import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheckBig, ExternalLink, Share2Icon } from "lucide-react";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";
import { CopyButton } from "@/components/inputs/copy-button";
import { ShareButton } from "@/components/inputs/share-button";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";
import { buttonVariants } from "@/components/ui/button";

export const instant = false;

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
          <Link
            href={publicLink}
            target="_blank"
            className={buttonVariants({
              variant: "link",
              className:
                "text-muted-foreground w-full max-w-[calc(100vw-80px)] truncate text-sm underline underline-offset-2",
            })}
          >
            {publicLink}
            <ExternalLink />
          </Link>

          <div className="flex items-center justify-center gap-2">
            <ShareButton shareData={{ url: publicLink }}>
              <Share2Icon />
              Compartilhar
            </ShareButton>
            <CopyButton textToCopy={publicLink} variant="outline" />
          </div>
        </CardContent>
      </Card>

      <Link
        href={routes.dashboard.url}
        className={buttonVariants({
          variant: "outline",
        })}
      >
        Voltar para Página Inicial
      </Link>
    </div>
  );
}

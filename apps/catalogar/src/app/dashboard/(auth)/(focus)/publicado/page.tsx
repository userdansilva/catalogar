import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@catalogar/ui/card";
import { CopyButton } from "@/components/inputs/copy-button";
import { Button } from "@/components/inputs/button";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { ExpectedError } from "@/components/error-handling/expected-error";

export default async function Page() {
  const [error, data] = await getUser();

  if (error) {
    return <ExpectedError error={error} />;
  }

  const user = data.data;

  if (!user.currentCatalog) {
    redirect(routes.catalog.sub.createFirst.url, RedirectType.replace);
  }

  if (!user.currentCatalog.slug) {
    redirect(routes.dashboard.url, RedirectType.replace);
  }

  const publicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/@${user.currentCatalog.slug}`;

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
            className="text-muted-foreground block w-full max-w-[calc(100vw-80px)] truncate text-sm underline underline-offset-2"
          >
            {publicLink}
          </Link>

          <CopyButton textToCopy={publicLink} size="sm" />
        </CardContent>
      </Card>

      <Button asChild variant="outline">
        <Link href={routes.dashboard.url}>Voltar para Página Inicial</Link>
      </Button>
    </div>
  );
}

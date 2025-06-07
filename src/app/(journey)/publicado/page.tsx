import { Button } from "@/components/inputs/button";
import {
  Card, CardDescription, CardHeader, CardTitle,
} from "@/shadcn/components/ui/card";
import { CircleCheckBig, Copy, ExternalLink } from "lucide-react";

export default function Page() {
  return (
    <div className="flex max-w-lg flex-col items-center gap-10">
      <CircleCheckBig className="size-10" />
      <h1 className="scroll-m-20 text-balance text-center text-4xl font-extrabold tracking-tight">
        Tudo pronto, seu catálogo foi publicado!
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Seu link público
          </CardTitle>
          <CardDescription className="space-x-2">
            <Button variant="link" className="pl-0">
              https://app.catalogar.com.br/catalogar
              <ExternalLink />
            </Button>

            <Button size="sm">
              <Copy />
              Copiar
            </Button>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

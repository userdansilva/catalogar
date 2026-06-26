import type { Metadata } from "next";
import { RedirectType, redirect } from "next/navigation";
import { UpdateThemeForm } from "@/components/forms/update-theme-form";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";

export const metadata: Metadata = {
  title: routes.theme.title,
};

export default async function Theme({
  searchParams,
}: {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}) {
  const session = await getSession();

  const { company, theme } = await prisma.catalog.findUniqueOrThrow({
    where: {
      id: session.user.currentCatalogId,
    },
    include: {
      theme: {
        include: {
          logo: true,
        },
      },
      company: true,
    },
  });

  if (!theme) {
    return redirect(routes.theme.sub.new.url, RedirectType.replace);
  }

  const { callbackUrl } = await searchParams;

  return (
    <UpdateThemeForm
      theme={theme}
      company={company}
      callbackUrl={callbackUrl}
    />
  );
}

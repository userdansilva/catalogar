import type { Metadata } from "next";
import { RedirectType, redirect } from "next/navigation";
import { UpdateCompanyForm } from "@/components/forms/update-company-form";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";

export const metadata: Metadata = {
  title: routes.company.title,
};

export default async function Company({
  searchParams,
}: {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}) {
  const session = await getSession();

  const company = await prisma.company.findUnique({
    where: {
      catalogId: session.user.currentCatalogId,
    },
  });

  if (!company) {
    redirect(routes.company.sub.new.url, RedirectType.replace);
  }

  const { callbackUrl } = await searchParams;

  return <UpdateCompanyForm company={company} callbackUrl={callbackUrl} />;
}

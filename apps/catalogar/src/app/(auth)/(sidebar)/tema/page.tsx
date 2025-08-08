import { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";
import { UpdateThemeForm } from "@/components/forms/update-theme-form";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";

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
  const { callbackUrl } = await searchParams;
  const { data: user } = await getUser();

  if (!user.currentCatalog.theme) {
    return redirect(routes.theme.sub.new.url, RedirectType.replace);
  }

  return (
    <UpdateThemeForm
      theme={user.currentCatalog.theme}
      company={user.currentCatalog.company}
      callbackUrl={callbackUrl}
    />
  );
}

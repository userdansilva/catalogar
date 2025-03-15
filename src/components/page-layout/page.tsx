import { PropsWithChildren } from "react";
import { Separator } from "@/shadcn/components/ui/separator"

export function Page({
  children
}: PropsWithChildren) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  )
}

type PageHeaderProps = {
  title: string
  description: string
}

export function PageHeader({
  title, description
}: PageHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          {title}
        </h2>

        <p className="text-muted-foreground">
          {description}
        </p>
      </div>

      <Separator />
    </div>
  )
}
"use client";

import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";

export function QueryFilter() {
  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue("");
    // if (onSearch) onSearch("")
  };

  return (
    <form>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="O que você está procurando?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-14 w-full rounded-full bg-background px-12 text-lg shadow-sm ring-1 ring-inset ring-input focus-visible:ring-2 focus-visible:ring-ring"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-14 top-1/2 size-5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
        <Button type="submit" size="sm" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full">
          Buscar
        </Button>
      </div>

    </form>
  );
}

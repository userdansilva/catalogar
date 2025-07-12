"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn/components/ui/carousel";
import { cn } from "@/shadcn/lib/utils";
import { CatalogItemImage } from "@/types/api-types";
import Image from "next/image";
import { useEffect, useState } from "react";

export function CarouselImages({
  images,
  unoptimized,
}: {
  images: CatalogItemImage[];
  unoptimized?: boolean;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const isMultiple = images.length > 1;

  return (
    <Carousel
      className="group max-h-[600px] w-full max-w-[600px] overflow-hidden rounded-md bg-background"
      setApi={setApi}
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <Image
              src={image.url}
              alt="Mockup"
              width={600}
              height={600}
              unoptimized={unoptimized}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {isMultiple && (
        <>
          {current > 1 && <CarouselPrevious className="left-2" />}

          {current < images.length && <CarouselNext className="right-2" />}

          <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
            <div className="flex space-x-2">
              {Array.from({ length: count }).map((_, i) => (
                <span
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  className={cn(
                    "block size-2 rounded-full bg-background",
                    current === i + 1 && "bg-primary",
                  )}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </Carousel>
  );
}

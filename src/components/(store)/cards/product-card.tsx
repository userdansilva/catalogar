import Image from "next/image";

type ProductCardProps = {
  imageUrl: string;
  name: string;
};

export function ProductCard({ imageUrl, name }: ProductCardProps) {
  return (
    <div className="border-input flex w-full flex-row items-center gap-3 rounded-lg border p-2">
      <div className="size-16">
        <Image
          src={imageUrl}
          width={300}
          height={300}
          alt=""
          className="aspect-square rounded-md object-contain"
        />
      </div>
      <h1 className="text-xl font-semibold">{name}</h1>
    </div>
  );
}

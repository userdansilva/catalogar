export function PriceDisplay({ price }: { price: string }) {
  return (
    <div className="text-2xl font-bold">
      {new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(price))}
    </div>
  );
}

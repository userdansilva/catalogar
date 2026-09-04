import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ImageUp, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { type ChangeEvent, useRef } from "react";
import { createLogoAction } from "@/actions/create-logo-action";
import { toast } from "../ui/toast";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

type Logo = {
  name: string;
  url: string;
  size: bigint;
  width: number;
  height: number;
  altText: string;
};

export function InputLogo({
  value,
  onChange,
  disabled,
}: {
  value?: Logo | null;
  onChange: (v: Logo | null) => void;
  disabled?: boolean;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { executeAsync, isExecuting } = useAction(createLogoAction);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files?.[0];

    if (!file) return;

    if (file.size > 1.1 * 1024 * 1024) {
      toast.add({
        type: "warning",
        title: "Imagem muito pesada",
        description: "Tamanho máximo é de 1MB",
      });

      // Reset input
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }

      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const res = await executeAsync(formData);

    if (res?.data) {
      onChange({
        name: res.data.name,
        url: res.data.url,
        size: BigInt(res.data.size),
        width: res.data.width,
        height: res.data.height,
        altText: "",
      });

      // Reset input
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
    }
  };

  const handleRemove = () => onChange(null);

  return (
    <>
      {value?.name ? (
        <div className="flex w-full flex-row items-center justify-between rounded-md border p-4">
          <div className="mr-3 text-sm">{value.name}</div>

          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button variant="destructive" size="sm" disabled={disabled}>
                  Remover
                  <Trash />
                </Button>
              }
            />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que quer remover a imagem?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleRemove}>
                  Sim! Quero remover
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <Button
          variant="outline"
          type="button"
          disabled={isExecuting || disabled}
          onClick={() => {
            inputFileRef.current?.click();
          }}
        >
          {isExecuting ? (
            <>
              <Spinner data-icon="inline-start" />
              Carregando...
            </>
          ) : (
            <>
              <ImageUp />
              Carregar imagem
            </>
          )}
        </Button>
      )}

      <input
        type="file"
        accept="image/*"
        hidden
        ref={inputFileRef}
        onChange={handleChange}
        multiple={false}
      />
    </>
  );
}

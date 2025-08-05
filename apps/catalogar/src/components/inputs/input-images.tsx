import { Plus, X } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { useAction } from "next-safe-action/hooks";
import NextImage from "next/image";
import { toast } from "sonner";
import { Button } from "./button";
import { createImageAction } from "@/actions/create-image-action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/components/ui/alert-dialog";
import { ScrollArea, ScrollBar } from "@/shadcn/components/ui/scroll-area";

type Image = {
  fileName: string;
  position: number;
  accessUrl: string;
};

type InputFilesProps = {
  value: Image[];
  onChange: (x: Image[]) => void;
  disabled?: boolean;
};

export function InputImages({ onChange, value, disabled }: InputFilesProps) {
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { executeAsync, isExecuting } = useAction(createImageAction);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files?.[0];

    if (!file) return;

    if (file.size > 1.1 * 1024 * 1024) {
      toast.warning("Ops! Imagem muito pesada", {
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
      onChange([
        ...value,
        {
          fileName: res.data.fileName,
          position: value.length + 1,
          accessUrl: res.data.accessUrl,
        },
      ]);

      // Reset input
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }

      // scroll right
      if (buttonContainerRef.current) {
        setTimeout(() => {
          buttonContainerRef.current?.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        }, 1_500);
      }
    }
  };

  const handleRemove = (url: string) => {
    onChange(
      value
        .filter((image) => image.accessUrl !== url)
        .map((image, i) => ({ ...image, position: i + 1 }))
    );
  };

  return (
    <>
      <ScrollArea className="border-input w-full max-w-[calc(100vw-40px)] rounded-md border bg-transparent text-base shadow-xs md:text-sm">
        <div className="flex w-max gap-x-4 p-3">
          {value.map((image) => (
            <div className="relative size-52 rounded-md" key={image.accessUrl}>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    className="absolute -top-1 -right-1 size-6 p-0"
                    variant="destructive"
                  >
                    <X />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Tem certeza que quer remover a imagem?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleRemove(image.accessUrl)}
                    >
                      Sim! Quero remover
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <NextImage
                src={image.accessUrl}
                alt=""
                width={208}
                height={208}
                className="rounded-sm"
                unoptimized
              />
            </div>
          ))}

          <div ref={buttonContainerRef}>
            <Button
              loading={isExecuting}
              disabled={isExecuting || disabled}
              type="button"
              variant="outline"
              className="mr-3 flex size-52 flex-col"
              onClick={() => {
                inputFileRef.current?.click();
              }}
            >
              <Plus className="mx-auto size-4" />
              Adicionar
            </Button>
          </div>
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

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

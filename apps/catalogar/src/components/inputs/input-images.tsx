import { Plus, X } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { useAction } from "next-safe-action/hooks";
import NextImage from "next/image";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@catalogar/ui/components/alert-dialog";
import { ScrollArea, ScrollBar } from "@catalogar/ui/components/scroll-area";
import * as Sentry from "@sentry/nextjs";
import { Button } from "./button";
import { createImageAction } from "@/actions/create-image-action";

type Image = {
  fileName: string;
  url: string;
  sizeInBytes: number;
  width: number;
  height: number;
  altText?: string;
  position: number;
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
    try {
      const file = e.target.files?.[0];

      if (!file) throw new Error();

      if ((file.size || 0) > 1.1 * 1024 * 1024) {
        toast.warning("Imagem muito pesada", {
          description: "Tamanho máximo é de 1MB",
        });

        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      const { data, serverError } = await executeAsync(formData);

      if (serverError) {
        toast.error(serverError.message, {
          description: () => (
            <ul>
              {serverError.errors.map((error) => (
                <li key={error.field + error.message}>{error.message}</li>
              ))}
            </ul>
          ),
        });

        return;
      }

      if (!data) throw new Error();

      onChange([
        ...value,
        {
          fileName: data.fileName,
          url: data.url,
          sizeInBytes: data.sizeInBytes,
          width: data.width,
          height: data.height,
          altText: "",
          position: value.length + 1,
        },
      ]);

      // scroll right
      if (buttonContainerRef.current) {
        setTimeout(() => {
          buttonContainerRef.current?.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        }, 1_500);
      }
    } catch (error) {
      Sentry.captureException(error);
      toast.error(
        "Falha inesperada ao carregar imagem, por favor tente novamente",
      );
    } finally {
      // reset input
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
    }
  };

  const handleRemove = (url: string) => {
    onChange(
      value
        .filter((image) => image.url !== url)
        .map((image, i) => ({ ...image, position: i + 1 })),
    );
  };

  return (
    <>
      <ScrollArea className="border-input w-full max-w-[calc(100vw-40px)] rounded-md border bg-transparent text-base shadow-xs md:text-sm">
        <div className="flex w-max gap-x-4 p-3">
          {value.map((image) => (
            <div className="relative size-52 rounded-md" key={image.url}>
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
                    <AlertDialogAction onClick={() => handleRemove(image.url)}>
                      Sim! Quero remover
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <NextImage
                src={image.url}
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

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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Plus, X } from "lucide-react";
import NextImage from "next/image";
import { useAction } from "next-safe-action/hooks";
import { type ChangeEvent, useRef, useState } from "react";
import { toast } from "../ui/toast";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { createSasTokenAction } from "@/actions/create-sas-token-action";
import { BlockBlobClient } from "@azure/storage-blob";

type Image = {
  fileName: string;
  url: string;
  size: number;
  width: number;
  height: number;
  altText: string;
  position: number;
};

export function getFileType(fileExt: string) {
  if (fileExt === "png") return "PNG";
  if (fileExt === "jpg" || fileExt === "jpeg") return "JPG";

  return "WEBP";
}

export function InputImages({
  onChange,
  value,
  disabled,
}: {
  value?: Image[];
  onChange: (x: Image[]) => void;
  disabled?: boolean;
}) {
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { executeAsync } = useAction(createSasTokenAction);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(true);

    try {
      const file = e.target.files?.[0];
      if (!file) throw new Error();

      // Validate file size
      if ((file.size || 0) > 5.1 * 1024 * 1024) {
        toast.add({
          type: "warning",
          title: "Imagem muito pesada",
          description: "Tamanho máximo é de 5MB",
        });

        return;
      }

      // Validate file type
      const fileExtesion = file.name.split(".").pop() || "";

      if (!["png", "jpg", "jpeg", "webp"].includes(fileExtesion)) {
        toast.add({
          type: "warning",
          title: "Tipo de arquivo inválido",
          description: "Somente arquivos PNG, JPG e WEBP são aceitos",
        });

        return;
      }

      const { data, serverError } = await executeAsync({
        fileType: getFileType(fileExtesion),
      });

      if (serverError) {
        toast.add({
          type: "error",
          description: serverError.message,
        });

        return;
      }

      if (!data) throw new Error();

      const blockBlobClient = new BlockBlobClient(data.uploadUrl);
      await blockBlobClient.uploadData(file, {
        blobHTTPHeaders: {
          blobContentType: file.type,
        },
      });

      onChange([
        ...(value ?? []),
        {
          fileName: data.fileName,
          url: data.accessUrl,
          size: file.size,
          width: 600,
          height: 600,
          altText: "",
          position: (value ?? []).length + 1,
        },
      ]);
    } catch (error) {
      console.error(error);

      toast.add({
        type: "error",
        description:
          "Falha inesperada ao carregar imagem, por favor tente novamente",
      });
    } finally {
      // reset input
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }

      setIsSubmitting(false);
    }
  };

  const handleRemove = (url: string) => {
    onChange(
      (value ?? [])
        .filter((image) => image.url !== url)
        .map((image, i) => ({ ...image, position: i + 1 })),
    );
  };

  return (
    <>
      <ScrollArea className="border-input w-full max-w-[calc(100vw-40px)] rounded-md border bg-transparent text-base shadow-xs md:text-sm">
        <div className="flex w-max gap-x-4 p-3">
          {(value ?? []).map((image) => (
            <div className="relative size-52 rounded-md" key={image.url}>
              <AlertDialog>
                <AlertDialogTrigger
                  render={
                    <Button
                      size="icon-sm"
                      className="absolute top-1.5 right-1.5"
                      variant="destructive"
                    />
                  }
                >
                  <X />
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
                className="aspect-square rounded-md object-contain"
                unoptimized
              />
            </div>
          ))}

          <div ref={buttonContainerRef}>
            <Button
              disabled={isSubmitting || disabled}
              type="button"
              variant="outline"
              className="mr-3 flex size-52 flex-col"
              onClick={() => {
                inputFileRef.current?.click();
              }}
            >
              {isSubmitting ? (
                <>
                  <Spinner data-icon="inline-start" />
                  Adicionando...
                </>
              ) : (
                <>
                  <Plus />
                  Adicionar
                </>
              )}
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

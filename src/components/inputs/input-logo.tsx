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
import { type ChangeEvent, useRef, useState } from "react";
import { toast } from "../ui/toast";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { createSasTokenAction } from "@/actions/create-sas-token-action";
import { BlockBlobClient } from "@azure/storage-blob";

type Logo = {
  name: string;
  url: string;
  size: number;
  width: number;
  height: number;
  altText: string;
};

export function getFileType(fileExt: string) {
  if (fileExt === "png") return "PNG";
  if (fileExt === "jpg" || fileExt === "jpeg") return "JPG";
  if (fileExt === "svg") return "SVG";

  return "WEBP";
}

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
  const { executeAsync } = useAction(createSasTokenAction);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(true);

    try {
      const file = e.target.files?.[0];
      if (!file) throw new Error();

      // Validate file size
      if (file.size > 1.1 * 1024 * 1024) {
        toast.add({
          type: "warning",
          title: "Imagem muito pesada",
          description: "Tamanho máximo é de 1MB",
        });

        return;
      }

      // Validate file type
      const fileExtesion = file.name.split(".").pop() || "";

      if (!["png", "jpg", "jpeg", "webp", "svg"].includes(fileExtesion)) {
        toast.add({
          type: "warning",
          title: "Tipo de arquivo inválido",
          description: "Somente arquivos PNG, JPG, WEBP e SVG são aceitos",
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

      onChange({
        name: data.fileName,
        url: data.accessUrl,
        size: file.size,
        width: 300,
        height: 300,
        altText: "",
      });
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
          disabled={isSubmitting || disabled}
          onClick={() => {
            inputFileRef.current?.click();
          }}
        >
          {isSubmitting ? (
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

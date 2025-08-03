import { ImageUp, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { ChangeEvent, useRef } from "react";
import { toast } from "sonner";
import { Button } from "./button";
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
import { createLogoAction } from "@/actions/create-logo-action";

type Logo = {
  fileName: string;
  originalFileName: string;
  width: number;
  height: number;
  accessUrl: string;
};

export function InputLogo({
  value,
  onChange,
  disabled,
}: {
  value?: Logo;
  onChange: (v: Logo) => void;
  disabled?: boolean;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { executeAsync, isExecuting } = useAction(createLogoAction);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      const file = files[0];

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
        onChange({
          fileName: res.data.fileName,
          originalFileName: res.data.originalFileName,
          width: res.data.width,
          height: res.data.height,
          accessUrl: res.data.accessUrl,
        });

        // Reset input
        if (inputFileRef.current) {
          inputFileRef.current.value = "";
        }
      }
    }
  };

  const handleRemove = () =>
    onChange({
      fileName: "",
      originalFileName: "",
      width: 0,
      height: 0,
      accessUrl: "",
    });

  return (
    <>
      <div>
        {value &&
        value.fileName &&
        value.originalFileName &&
        value.width > 0 &&
        value.height > 0 &&
        value.accessUrl ? (
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="mr-3 flex-1 truncate text-sm">
              {value.originalFileName}
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={disabled}>
                  Remover
                  <Trash className="ml-1 size-3" />
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
            loading={isExecuting}
            disabled={isExecuting || disabled}
            onClick={() => {
              inputFileRef.current?.click();
            }}
          >
            <ImageUp className="mr-2 size-4" />
            Carregar imagem
          </Button>
        )}
      </div>

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

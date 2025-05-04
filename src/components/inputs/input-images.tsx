import { Plus, X } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { useAction } from "next-safe-action/hooks";
import { createImageAction } from "@/actions/create-image-action";
import Image from "next/image";
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
import { Button } from "./button";

type Image = {
  name: string;
  position: number;
  url: string;
}

type InputFilesProps = {
  value: Image[];
  onChange: (v: Image[]) => void;
  disabled?: boolean;
}

export function InputImages({
  onChange, value, disabled,
}: InputFilesProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { executeAsync, isExecuting } = useAction(createImageAction);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      const formData = new FormData();
      formData.append("image", files[0]);

      const res = await executeAsync(formData);

      if (res?.data) {
        onChange([...value, {
          name: res.data.name,
          position: value.length + 1,
          url: res.data.url,
        }]);
      }
    }
  };

  const handleRemove = (url: string) => {
    onChange(value
      .filter((image) => image.url !== url)
      .map((image, i) => ({ ...image, position: i + 1 })));
  };

  return (
    <>
      <div className="flex w-full gap-4 rounded-md border border-input bg-transparent p-3 text-base shadow-sm md:text-sm">
        {value.map((image) => (
          <div className="relative size-32 rounded-md" key={image.url}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  className="absolute -right-1 -top-1 size-6 p-0"
                  variant="destructive"
                >
                  <X className="size-4" />
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
                    onClick={() => handleRemove(image.url)}
                  >
                    Sim! Quero remover
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Image
              src={image.url}
              alt=""
              width={128}
              height={128}
              className="rounded-sm"
              unoptimized
            />
          </div>
        ))}

        <Button
          loading={isExecuting}
          disabled={isExecuting || disabled}
          type="button"
          variant="outline"
          className="flex size-32 flex-col"
          onClick={() => {
            inputFileRef.current?.click();
          }}
        >
          <Plus className="mx-auto size-4" />
          Adicionar
        </Button>
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

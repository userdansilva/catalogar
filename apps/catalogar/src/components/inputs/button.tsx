import { Loader2 } from "lucide-react";
import { ComponentProps, forwardRef } from "react";
import { Button as ButtonUI } from "@catalogar/ui/button";

type ButtonProps = ComponentProps<typeof ButtonUI> & {
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, children, ...rest }, ref) => (
    <ButtonUI {...rest} ref={ref}>
      {loading ? (
        <>
          <Loader2 className="animate-spin" />
          Carregando...
        </>
      ) : (
        children
      )}
    </ButtonUI>
  ),
);

import { toast } from "sonner";

export function toastServerError(serverError: {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
}) {
  toast.error(serverError.message, {
    description: () => {
      if (serverError.errors.length === 0) return;

      return (
        <ul>
          {serverError.errors.map((error) => (
            <li key={error.field + error.message}>{error.message}</li>
          ))}
        </ul>
      );
    },
  });
}

import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function FormField({ label, className, id, required, ...props }: FormFieldProps) {
  const fieldId = id ?? props.name;
  return (
    <div>
      {label && (
        <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
          {required ? <span className="text-red-600"> *</span> : null}
        </label>
      )}
      <input
        id={fieldId}
        required={required}
        className={cn(
          "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink-muted focus:border-un-blue focus:ring-2 focus:ring-un-blue/20",
          className
        )}
        {...props}
      />
    </div>
  );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function FormTextarea({ label, className, id, required, ...props }: FormTextareaProps) {
  const fieldId = id ?? props.name;
  return (
    <div>
      {label && (
        <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
          {required ? <span className="text-red-600"> *</span> : null}
        </label>
      )}
      <textarea
        id={fieldId}
        required={required}
        className={cn(
          "w-full resize-y rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink-muted focus:border-un-blue focus:ring-2 focus:ring-un-blue/20",
          className
        )}
        {...props}
      />
    </div>
  );
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function FormSelect({ label, className, id, required, children, ...props }: FormSelectProps) {
  const fieldId = id ?? props.name;
  return (
    <div>
      {label && (
        <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
          {required ? <span className="text-red-600"> *</span> : null}
        </label>
      )}
      <select
        id={fieldId}
        required={required}
        className={cn(
          "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-un-blue focus:ring-2 focus:ring-un-blue/20",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

interface FormSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "blue" | "gold";
}

export function FormSubmit({ variant = "blue", className, children, ...props }: FormSubmitProps) {
  return (
    <button
      type="submit"
      className={cn(
        "w-full rounded-full py-3.5 text-sm font-bold uppercase tracking-wide transition disabled:opacity-50",
        variant === "gold" ? "bg-gold text-black hover:bg-gold/90" : "bg-un-blue text-white hover:bg-un-blue/90",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, className = "", ...props }, ref) {
    return (
      <label className="field">
        {label && <span className="field-label">{label}</span>}
        <input ref={ref} className={`text-input ${className}`} {...props} />
      </label>
    );
  },
);

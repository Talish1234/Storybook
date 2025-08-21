import React, { useState } from "react";
import { X, Eye, EyeOff, Loader2 } from "lucide-react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  type?: "text" | "password" | "email" | "number";
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  clearable?: boolean;
  passwordToggle?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 dark:bg-gray-800 border-transparent focus:ring-2",
  outlined: "border border-gray-300 dark:border-gray-600 focus:ring-2",
  ghost:
    "bg-transparent border-b border-gray-300 dark:border-gray-600 focus:ring-0",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  type = "text",
  variant = "outlined",
  size = "md",
  clearable = false,
  passwordToggle = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = passwordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <label className="text-sm font-medium dark:text-gray-200 text-gray-700 ">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`
            w-full rounded-lg focus:outline-none focus:ring-blue-500
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${invalid ? "border-red-500 focus:ring-red-500" : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            pr-10
            bg-gray-100
          `}
        />

        {/* Right section for icons */}
        <div className="absolute right-2 flex items-center space-x-1">
          {loading ? (
            <Loader2 className="animate-spin text-gray-500" size={18} />
          ) : clearable && value && !disabled ? (
            <button
              type="button"
              onClick={() =>
                onChange?.({
                  target: { value: "" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          ) :(<></> )}
          {passwordToggle ? (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          ) : null}
        </div>
      </div>

      {/* Helper & Error messages */}
      {helperText && !invalid && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
      {invalid && errorMessage && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

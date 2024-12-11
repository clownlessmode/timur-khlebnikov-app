// components/InputField.tsx
import React from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { Input } from "./input";

interface InputFieldProps<T extends FieldValues> {
  id: Path<T>; // id должен быть ключом из FormValues
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: Record<string, any>;
  requiredMessage: string;
  required?: boolean; // Пропс, который передает булевое значение для required
  type?: string;
}

const InputField = <T extends FieldValues>({
  id,
  label,
  placeholder,
  register,
  errors,
  requiredMessage,
  required = true, // Значение по умолчанию true
  type = "text",
}: InputFieldProps<T>) => {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, { required: required ? requiredMessage : false })}
      />
      {errors[id] && (
        <p className="text-red-500 text-sm">{errors[id]?.message}</p>
      )}
    </div>
  );
};

export default InputField;

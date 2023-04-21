import React from "react";
// import { Input, InputProps } from "../atoms/input";
import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  register?: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  className?: string;
} & Omit<InputProps, "name">;

export const FormInput = <TFormValues extends Record<string, unknown>>({
  className,
  name,
  register,
  rules,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <div className={className} aria-live="polite">
      <Input name={name} {...props} {...(register && register(name))} />
    </div>
  );
};

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = ({ ...props }: InputProps) => {
  return (
    <input
      className="placeholder:zinc-700 w-full rounded border border-zinc-800 bg-zinc-800 p-2"
      {...props}
    />
  );
};

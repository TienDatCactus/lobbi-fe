"use client";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import type { AnyFieldApi, DeepKeys } from "@tanstack/form-core";
import type { ReactFormExtendedApi } from "@tanstack/react-form";
import type { ReactNode } from "react";

type FormFieldControlProps = {
  name: string;
  value: unknown;
  onBlur: () => void;
  onChange: (value: unknown) => void;
  "aria-invalid": boolean;
};

type FormFieldRenderProps = {
  field: AnyFieldApi;
  controlProps: FormFieldControlProps;
  isInvalid: boolean;
  errorMessage?: string;
};

type FormFieldProps<TFormData> = {
  form: ReactFormExtendedApi<TFormData, any, any, any, any, any, any, any, any, any, any, any>;
  name: DeepKeys<TFormData>;
  label?: string | ReactNode;
  description?: string | ReactNode;
  showError?: boolean;
  children: (props: FormFieldRenderProps) => ReactNode;
};

function getErrorMessage(errors?: Array<{ message?: string } | undefined>) {
  const firstMessage = errors?.find((error) => error?.message)?.message;

  return firstMessage;
}

export function FormField<TFormData>({
  form,
  name,
  label,
  description,
  showError = true,
  children,
}: FormFieldProps<TFormData>) {
  return (
    <form.Field name={name}>
      {(field: AnyFieldApi) => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
        const errorMessage = getErrorMessage(field.state.meta.errors);

        return (
          <Field data-invalid={isInvalid}>
            {label ? <FieldLabel>{label}</FieldLabel> : null}

            {children({
              field,
              isInvalid,
              errorMessage,
              controlProps: {
                name: field.name,
                value: field.state.value,
                onBlur: field.handleBlur,
                onChange: (value: unknown) => field.handleChange(value),
                "aria-invalid": isInvalid,
              },
            })}

            {description ? <FieldDescription>{description}</FieldDescription> : null}

            {isInvalid && showError ? (
              <FieldError errors={field.state.meta.errors}>
                {errorMessage}
              </FieldError>
            ) : null}
          </Field>
        );
      }}
    </form.Field>
  );
}

"use client";

import React from "react";
import { Input } from "@/components/contactui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/contactui/form";

interface ContactTextFieldProps {
  label: React.ReactNode;
  placeholder: string;
  /** Field bindings from a react-hook-form Controller render prop. */
  field: React.ComponentProps<"input">;
  disabled?: boolean;
}

/**
 * Contact-form labelled text input wrapped in the contactui
 * FormItem/FormLabel/FormControl/FormMessage structure.
 */
export const ContactTextField: React.FC<ContactTextFieldProps> = ({
  label,
  placeholder,
  field,
  disabled,
}) => {
  return (
    <FormItem>
      <FormLabel className="text-xs font-medium text-neutral-700 sm:text-sm">
        {label}
      </FormLabel>
      <FormControl>
        <Input
          placeholder={placeholder}
          {...field}
          disabled={disabled}
          className="h-10 bg-white text-sm text-neutral-900 placeholder-neutral-400 border-neutral-200 focus:border-neutral-400 focus:ring-neutral-200 sm:h-11"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

"use client";

import React from "react";
import {
  FormControl,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";

interface FloatingLabelFieldProps {
  /** Field bindings from a react-hook-form Controller render prop. */
  field: React.ComponentProps<"input">;
  id: string;
  /** Label content, including any required-asterisk markup. */
  label: React.ReactNode;
  type?: string;
  disabled?: boolean;
}

/**
 * Consultation-form text input with a floating label, wrapped in the
 * contactui FormItem/FormControl/FormMessage structure.
 */
export const FloatingLabelField: React.FC<FloatingLabelFieldProps> = ({
  field,
  id,
  label,
  type,
  disabled,
}) => {
  return (
    <FormItem>
      <FormControl>
        <div className="relative">
          <input
            {...field}
            id={id}
            type={type}
            placeholder=" "
            disabled={disabled}
            className="peer h-11 sm:h-12 w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-1 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all"
          />
          <label
            htmlFor={id}
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
          >
            {label}
          </label>
        </div>
      </FormControl>
      <FormMessage className="text-xs mt-1" />
    </FormItem>
  );
};

"use client";

import * as React from "react";
import { Input as ShadcnInput, type InputProps as ShadcnInputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends ShadcnInputProps {
  "data-testid"?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, "data-testid": dataTestId, ...props }, ref) => {
    const testId =
      dataTestId ||
      `shared-input-${type || "text"}-${props.name || props.id || "default"}`;

    return (
      <ShadcnInput
        ref={ref}
        type={type}
        className={cn(className)}
        data-testid={testId}
        {...props}
      />
    );
  }
);
Input.displayName = "SharedInput";

export { Input };

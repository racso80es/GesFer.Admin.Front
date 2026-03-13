"use client";

import * as React from "react";
import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends ShadcnButtonProps {
  "data-testid"?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, "data-testid": dataTestId, ...props }, ref) => {
    const testId = dataTestId || `shared-button-${props.variant || "default"}`;

    return (
      <ShadcnButton
        ref={ref}
        className={cn(className)}
        data-testid={testId}
        {...props}
      />
    );
  }
);
Button.displayName = "SharedButton";

export { Button };

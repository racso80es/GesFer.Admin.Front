"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils/cn";
import { Button } from "./Button";

export interface ModalBaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmDisabled?: boolean;
  confirmVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  showClose?: boolean;
  className?: string;
  "data-testid"?: string;
}

export const ModalBase: React.FC<ModalBaseProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  confirmDisabled = false,
  confirmVariant = "default",
  showClose = true,
  className,
  "data-testid": dataTestId,
}) => {
  const testId = dataTestId || "shared-modal-base";

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange(false);
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const renderFooter = () => {
    if (footer) {
      return footer;
    }

    if (confirmText || cancelText) {
      return (
        <DialogFooter>
          {cancelText && (
            <Button
              variant="outline"
              onClick={handleCancel}
              data-testid={`${testId}-cancel`}
            >
              {cancelText}
            </Button>
          )}
          {confirmText && (
            <Button
              variant={confirmVariant}
              onClick={handleConfirm}
              disabled={confirmDisabled}
              data-testid={`${testId}-confirm`}
            >
              {confirmText}
            </Button>
          )}
        </DialogFooter>
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(className)} data-testid={testId}>
        {showClose && <DialogClose onClose={handleCancel} />}
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="space-y-4 py-4">{children}</div>
        {renderFooter()}
      </DialogContent>
    </Dialog>
  );
};

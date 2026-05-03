"use client";
import { sanitizeLogMessage } from "@/lib/utils/logger";

import { useEffect } from "react";

export function OverlayFix() {
  useEffect(() => {
    const checkAndFixOverlays = () => {
      const bodyOverflow = document.body.style.overflow;
      if (bodyOverflow === "hidden") {
        const openDialogs = document.querySelectorAll('[role="dialog"][aria-modal="true"]');
        const visibleDialogs = Array.from(openDialogs).filter((dialog) => {
          const style = window.getComputedStyle(dialog);
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            style.opacity !== "0"
          );
        });

        if (visibleDialogs.length === 0) {
          console.warn("OverlayFix: body.overflow='hidden' sin Dialog visible, restaurando...");
          document.body.style.overflow = "unset";
        }
      }

      const allOverlays = document.querySelectorAll(
        '[class*="bg-black"], [class*="backdrop"], .fixed.inset-0'
      );
      allOverlays.forEach((overlay) => {
        const style = window.getComputedStyle(overlay);
        const htmlOverlay = overlay as HTMLElement;

        const isFixed = style.position === "fixed";
        const hasHighZIndex = parseInt(style.zIndex || "0") >= 50;
        const rect = htmlOverlay.getBoundingClientRect();
        const isFullScreen =
          rect.width >= window.innerWidth * 0.9 &&
          rect.height >= window.innerHeight * 0.9;
        const isVisible =
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          style.opacity !== "0";

        if (isFixed && hasHighZIndex && isFullScreen && isVisible) {
          const parent = overlay.parentElement;
          const hasDialogParent =
            parent?.closest('[role="dialog"]') ||
            overlay.closest('[role="dialog"]');
          const isSidebarOverlay =
            parent?.classList.contains("lg:hidden") ||
            overlay.closest(".lg\\:hidden");
          const hasBgBlack =
            style.backgroundColor &&
            (style.backgroundColor.includes("rgba(0, 0, 0") ||
              style.backgroundColor.includes("rgb(0, 0, 0)") ||
              overlay.className.includes("bg-black"));

          if (hasBgBlack && !hasDialogParent && !isSidebarOverlay) {
            console.error(
              "OverlayFix: OVERLAY BLOQUEANTE DETECTADO - Eliminando overlay huérfano",
              overlay
            );
            htmlOverlay.style.display = "none";
            htmlOverlay.style.visibility = "hidden";
            htmlOverlay.style.opacity = "0";
            htmlOverlay.style.pointerEvents = "none";
          }
        }
      });
    };

    checkAndFixOverlays();
    const intervalId = setInterval(checkAndFixOverlays, 2000);

    return () => {
      clearInterval(intervalId);
      document.body.style.overflow = "unset";
    };
  }, []);

  return null;
}

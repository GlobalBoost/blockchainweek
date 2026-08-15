"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { captureEvent } from "@/lib/analytics";

interface TrackedExternalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  event?: string;
  eventProperties?: Record<string, unknown>;
  children: ReactNode;
}

export function TrackedExternalLink({
  href,
  event,
  eventProperties,
  onClick,
  children,
  ...props
}: TrackedExternalLinkProps) {
  function handleClick(clickEvent: MouseEvent<HTMLAnchorElement>) {
    if (event) {
      captureEvent(event, {
        href,
        ...eventProperties,
      });
    }

    onClick?.(clickEvent);
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

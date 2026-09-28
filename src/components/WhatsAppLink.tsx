import type { ReactNode } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WhatsAppLinkProps {
  children: ReactNode;
  message: string;
  variant?: "solid" | "light" | "outline";
  className?: string;
  arrow?: boolean;
}

export function WhatsAppLink({ children, message, variant = "solid", className, arrow = false }: WhatsAppLinkProps) {
  const href = `https://api.whatsapp.com/send?phone=5511910600264&text=${encodeURIComponent(message)}`;
  return (
    <Button asChild className={cn("whatsapp-button", `whatsapp-button--${variant}`, className)}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
        <span>{children}</span>
        {arrow && <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />}
      </a>
    </Button>
  );
}
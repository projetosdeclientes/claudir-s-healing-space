import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WhatsAppIconProps = React.SVGProps<SVGSVGElement> & { size?: number };

function WhatsAppIcon({ size = 18, ...props }: WhatsAppIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.914 11.914 0 0 0 12 0C5.373 0 0 5.373 0 12c0 1.553.317 3.037.879 4.42L0 24l5.568-1.474A11.96 11.96 0 0 0 12 24c6.627 0 12-5.373 12-12a11.914 11.914 0 0 0-3.48-8.52zm-5.967 7.716c-.288-.144-.648-.216-1.008-.179-.36.036-.575.132-.72.455-.143.312-.348.72-.468 1.007-.108.252-.216.395-.408.479-.216.096-.552.096-.792 0-.24 0-.383-.12-.527-.287a1.79 1.79 0 0 1-.503-.659c-.168-.383-.072-.575.156-.84.216-.287.42-.6.575-.84.155-.215.3-.444.36-.623.072-.179.048-.312-.024-.455-.072-.143-.215-.287-.455-.383-.24-.096-.6-.096-.959.024-.36.119-.707.455-1.02 1.055-.3.575-.587 1.079-.827 1.463-.253.407-.467.695-.619.899-.168.227-.276.287-.407.312-.132.036-.312.036-.515.012-.167-.024-.347-.132-.479-.312-.133-.191-.228-.359-.228-.551 0-.252.12-.527.24-.72.108-.203.012-.336-.072-.467-.144-.227-.324-.6-.444-.983-.132-.408-.036-.575.12-.72.156-.155.348-.192.744-.192.503 0 .959.096 1.151.132.192.048.372.132.527.287.155.155.264.347.287.503.024.18.012.335-.036.479-.048.156-.06.264-.18.419-.12.156-.407.515-.671 1.019-.276.503-.6 1.007-.851 1.463-.264.479-.384.743-.551.899-.18.167-.287.24-.444.24-.191 0-.372-.084-.515-.228z" />
    </svg>
  );
}

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
        <WhatsAppIcon size={18} />
        <span>{children}</span>
        {arrow && <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />}
      </a>
    </Button>
  );
}

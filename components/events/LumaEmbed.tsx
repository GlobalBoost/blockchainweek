import { cn } from "@/lib/utils";
import { LUMA_EMBED_URL } from "@/lib/luma";

interface LumaEmbedProps {
  compact?: boolean;
  className?: string;
}

export function LumaEmbed({ compact = false, className }: LumaEmbedProps) {
  return (
    <iframe
      src={LUMA_EMBED_URL}
      title="UN Blockchain Week event calendar"
      loading="lazy"
      className={cn(
        "w-full border-0 bg-white",
        compact ? "h-[440px] sm:h-[480px] lg:h-[560px]" : "h-[700px]",
        className
      )}
      allowFullScreen
      aria-label="UN Blockchain Week event calendar"
    />
  );
}

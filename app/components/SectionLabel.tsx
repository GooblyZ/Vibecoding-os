interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

export function SectionLabel({ index, label, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-8 h-px bg-gradient-to-r from-[#00d4ff] to-transparent flex-shrink-0" />
      <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#00d4ff]/50 whitespace-nowrap">
        {index} — {label}
      </span>
    </div>
  );
}

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  index,
  label,
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <SectionLabel index={index} label={label} className="mb-5" />
      <h2 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[#5a6070] max-w-xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

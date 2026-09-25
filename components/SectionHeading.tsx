export default function SectionHeading({
  children,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  as?: "h2" | "h3";
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Tag className="text-xl font-semibold tracking-tight text-[var(--navy)]">
        {children}
      </Tag>
      <span className="h-0.5 w-10 rounded-full bg-[var(--carolina)]" />
    </div>
  );
}

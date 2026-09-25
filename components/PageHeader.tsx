export default function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--carolina-ink)]">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--navy)] sm:text-4xl">
        {title}
      </h1>
      {children && (
        <div className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--foreground)]/70">
          {children}
        </div>
      )}
    </section>
  );
}

import DeliverablesSubNav from "@/components/DeliverablesSubNav";

export default function DeliverablesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          Weekly Deliverables
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          What we&apos;ve shipped
        </h1>
      </section>
      <DeliverablesSubNav />
      {children}
    </div>
  );
}

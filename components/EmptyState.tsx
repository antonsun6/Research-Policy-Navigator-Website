export default function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border-[1.5px] border-dashed border-[var(--card-border)] bg-white px-6 py-10 text-sm text-[var(--foreground)]/50">
      {children}
    </div>
  );
}

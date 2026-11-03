import DeliverablesSubNav from "@/components/DeliverablesSubNav";
import PageHeader from "@/components/PageHeader";

export default function DeliverablesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-10 print:hidden">
        <PageHeader eyebrow="Deliverables" title="What we've shipped" />
        <DeliverablesSubNav />
      </div>
      {children}
    </div>
  );
}

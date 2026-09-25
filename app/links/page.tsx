import EmptyState from "@/components/EmptyState";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";

type RelatedLink = {
  title: string;
  url: string;
  description?: string;
};

type LinkCategory = {
  title: string;
  links: RelatedLink[];
};

// Group links by category, e.g. "UNC Research Policies", "Technologies".
const CATEGORIES: LinkCategory[] = [];

export default function LinksPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader eyebrow="Related Links" title="Resources">
        External resources we reference for this project: UNC research policy
        material, similar projects, and the technologies we build with.
      </PageHeader>

      {CATEGORIES.length === 0 ? (
        <EmptyState>Related links will be posted here.</EmptyState>
      ) : (
        CATEGORIES.map((category) => (
          <section key={category.title} className="flex flex-col gap-6">
            <SectionHeading>{category.title}</SectionHeading>
            <ul className="mx-auto flex w-full max-w-3xl flex-col gap-3 text-left">
              {category.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl border border-[var(--border)] bg-white p-5 transition-colors hover:border-[var(--carolina)]"
                  >
                    <p className="font-semibold text-[var(--navy)]">
                      {link.title}
                      <span className="ml-1 text-[var(--carolina)]">↗</span>
                    </p>
                    {link.description && (
                      <p className="mt-1 text-sm text-[var(--foreground)]/70">
                        {link.description}
                      </p>
                    )}
                    <p className="mt-1 truncate text-xs text-[var(--foreground)]/40">
                      {link.url}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}

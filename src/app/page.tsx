import Header from "@/components/Header";
import JobsTable from "@/components/JobsTable";

export default function JobsDashboardPage() {
  return (
    <div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute block focus:z-50 focus:px-4 focus:py-3 focus:top-0 focus:left-0 focus:w-full focus:bg-violet-700 focus:text-white"
      >
        Skip to main content
      </a>
        <Header />
      <main id="main-content" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
        <JobsTable />
      </main>
    </div>
  );
}

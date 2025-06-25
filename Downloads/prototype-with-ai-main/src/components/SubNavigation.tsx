function SubNavItem({ children, active = false }: { children: React.ReactNode, active?: boolean }) {
  const activeClasses = active ? 'bg-violet-100 dark:bg-violet-800/20 text-violet-700 dark:text-violet-300' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300';
  return (
    <a href="#" className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${activeClasses}`}>
      {children}
    </a>
  );
}

export default function SubNavigation() {
  return (
    <nav style={{ backgroundColor: 'var(--color-surface-main)', borderBottom: '1px solid var(--color-border-moderate)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center">
          <div className="flex items-center">
            <div className="flex items-baseline space-x-8">
              <SubNavItem active>Jobs Dashboard</SubNavItem>
              <SubNavItem>Automation Rules</SubNavItem>
              <SubNavItem>Custom Fields</SubNavItem>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 
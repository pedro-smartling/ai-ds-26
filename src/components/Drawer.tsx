'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Minus, X } from '@untitled-ui/icons-react';
import Button from '@/components/Button';

interface AccordionItemProps {
    title: string;
    options: string[];
    defaultOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, options, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleSelect = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <div className="py-4 border-b border-gray-200 dark:border-gray-700">
            <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
                {isOpen ? <Minus /> : <Plus />}
            </Button>
            {isOpen && (
                <div className="mt-4">
                    {options.map(option => (
                        <div key={option} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={option}
                                checked={selectedOptions.includes(option)}
                                onChange={() => handleSelect(option)}
                                className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                            />
                            <label htmlFor={option} className="ml-2 text-gray-700 dark:text-gray-300">{option}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    jobStatusDraft: string[];
    setJobStatusDraft: (statuses: string[]) => void;
    onApplyFilters: () => void;
    onClearFilters: () => void;
}

export default function Drawer({ isOpen, onClose, jobStatusDraft, setJobStatusDraft, onApplyFilters, onClearFilters }: DrawerProps) {
    const [isVisible, setIsVisible] = useState(isOpen);
    const [animateIn, setAnimateIn] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const lastActiveElement = useRef<HTMLElement | null>(null);

    // Focus trap logic
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setAnimateIn(true), 10); // next tick
            lastActiveElement.current = document.activeElement as HTMLElement;
            setTimeout(() => {
                // Focus the first focusable element in the drawer
                const drawer = drawerRef.current;
                if (drawer) {
                    const focusable = drawer.querySelectorAll<HTMLElement>(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    if (focusable.length) focusable[0].focus();
                }
            }, 50);
        } else if (isVisible) {
            setAnimateIn(false);
            const timeout = setTimeout(() => {
                setIsVisible(false);
                // Restore focus to the last active element
                if (lastActiveElement.current) lastActiveElement.current.focus();
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    // Trap focus inside the drawer
    useEffect(() => {
        if (!isOpen) return;
        function handleTab(e: KeyboardEvent) {
            const drawer = drawerRef.current;
            if (!drawer) return;
            const focusable = drawer.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        }
        document.addEventListener('keydown', handleTab);
        return () => document.removeEventListener('keydown', handleTab);
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    const jobStatusOptions = ["Accepted", "Awaiting authorization", "In Progress", "Canceled"];
    const createdByOptions = ["Andrew Keser", "Frannie Laks", "Pedro Martins", "William Johnson"];

    return (
        <div>
            {/* Overlay */}
            <div
                style={{
                    backgroundColor: 'var(--color-base-black)',
                    transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isOpen ? 1 : 0,
                }}
                className="absolute inset-0"
                onClick={onClose}
            ></div>

            {/* Drawer - slides in/out from the left */}
            <div
                ref={drawerRef}
                style={{
                    backgroundColor: 'var(--color-base-white)',
                    boxShadow: 'var(--shadow-xl)',
                    borderRadius: 'var(--radius-l)',
                    left: 0,
                    right: 'auto',
                    transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: animateIn ? 'translateX(0)' : 'translateX(-100%)',
                }}
                className="fixed top-0 left-0 h-full w-full max-w-md z-50"
                tabIndex={-1}
                aria-modal="true"
                role="dialog"
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div style={{ borderBottom: '1px solid var(--color-neutral-200)' }} className="flex items-center justify-between p-6">
                        <h2 style={{ color: 'var(--color-base-black)', fontWeight: 'var(--font-weight-heading)' }} className="text-2xl">Request a new translation</h2>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={onClose}
                        >
                            <X />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        <AccordionItem title="Projects" options={[]} />
                        <AccordionItem title="Job name" options={[]} />
                        <div className="py-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center mb-2">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Job status</h3>
                            </div>
                            <div className="mt-2">
                                {jobStatusOptions.map(option => (
                                    <div key={option} className="flex items-center mb-2">
                                        <input
                                            type="checkbox"
                                            id={`job-status-${option}`}
                                            checked={jobStatusDraft.includes(option)}
                                            onChange={() => {
                                                if (jobStatusDraft.includes(option)) {
                                                    setJobStatusDraft(jobStatusDraft.filter(s => s !== option));
                                                } else {
                                                    setJobStatusDraft([...jobStatusDraft, option]);
                                                }
                                            }}
                                            className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                                        />
                                        <label htmlFor={`job-status-${option}`} className="ml-2 text-gray-700 dark:text-gray-300">{option}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <AccordionItem title="Language status" options={[]} />
                        <AccordionItem title="Created by (1)" options={createdByOptions} defaultOpen={true} />
                        <AccordionItem title="Issues type" options={[]} />
                        <AccordionItem title="Creation date" options={[]} />
                        <AccordionItem title="Dates" options={[]} />
                        <AccordionItem title="Custom fields" options={[]} />
                    </div>

                    {/* Footer */}
                    <div style={{ borderTop: '1px solid var(--color-neutral-200)' }} className="p-6">
                        <div className="flex justify-between">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => {
                                    setJobStatusDraft([]);
                                    onClearFilters();
                                }}
                            >
                                Clear all filters
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={onApplyFilters}
                            >
                                Apply filters
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
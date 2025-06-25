'use client';

import { useState } from 'react';
import { Plus, SearchLg, Settings01, SwitchVertical01, DotsHorizontal, ChevronDown, FilterFunnel01 } from '@untitled-ui/icons-react';
import Drawer from './Drawer';
import SubNavigation from './SubNavigation';
import Button from '@/components/Button';

const jobs = [
    {
        id: 1,
        name: "lenovo (Cancelled 2023/12/18 09:04:49)",
        project: "ER-16 | Alice project",
        progress: "Approved",
        languages: "AI Review 12 words\nPublished 36 words",
        totalWords: 188,
        jobDueDate: "Dec 21, 2023\n4:56 PM",
        slsDueDate: "Dec 21, 2023\n2:26 PM",
        createdOn: "Dec 14, 2023\n2:26 PM",
    },
    {
        id: 2,
        name: "strings-10-3",
        project: "ER-69 | assignment-project",
        progress: "Completed",
        languages: "Translation 28 words\nPublished 4 words",
        totalWords: 188,
        jobDueDate: "Mar 28, 2024\n9:30 PM",
        slsDueDate: "Mar 28, 2024\n9:30 PM",
        createdOn: "Mar 27, 2024\n1:30 PM",
    },
    {
        id: 3,
        name: "strings-10",
        project: "ER-68 | assignment-project",
        progress: "Canceled",
        languages: "No Content",
        totalWords: 188,
        jobDueDate: "Dec 21, 2023\n4:56 PM",
        slsDueDate: "Dec 21, 2023\n2:26 PM",
        createdOn: "Dec 14, 2023\n2:26 PM",
    },
    {
        id: 4,
        name: "ROI of Customer Engagement (1)",
        project: "ER-226 | Marketing assets",
        progress: "In Progress",
        languages: "AI Review 12 words\nPublished 36 words",
        totalWords: 188,
        jobDueDate: "Dec 21, 2023\n4:56 PM",
        slsDueDate: "Dec 21, 2023\n2:26 PM",
        createdOn: "Dec 14, 2023\n2:26 PM",
    },
    {
        id: 5,
        name: "lenovo (Cancelled 2023/12/18 09:04:49)",
        project: "ER-16 | Alice project",
        progress: "Awaiting Autho",
        languages: "AI Review 12 words\nPublished 36 words",
        totalWords: 188,
        jobDueDate: "Dec 21, 2023\n4:56 PM",
        slsDueDate: "Dec 21, 2023\n2:26 PM",
        createdOn: "Dec 14, 2023\n2:26 PM",
    },
    {
        id: 6,
        name: "lenovo (Cancelled 2023/12/18 09:04:49)",
        project: "ER-16 | Alice project",
        progress: "Approved",
        languages: "AI Review 12 words\nPublished 36 words",
        totalWords: 188,
        jobDueDate: "Dec 21, 2023\n4:56 PM",
        slsDueDate: "Dec 21, 2023\n2:26 PM",
        createdOn: "Dec 14, 2023\n2:26 PM",
    },
    {
        id: 7,
        name: "lenovo (Cancelled 2023/12/18 09:04:49)",
        project: "ER-16 | Alice project",
        progress: "Canceled",
        languages: "No content",
        totalWords: 188,
        jobDueDate: "Dec 21, 2023\n4:56 PM",
        slsDueDate: "Dec 21, 2023\n2:26 PM",
        createdOn: "Dec 14, 2023\n2:26 PM",
    },
    {
        id: 8,
        name: "lenovo (Cancelled 2023/12/18 09:04:49)",
        project: "ER-16 | Alice project",
        progress: "In Progress",
        languages: "AI Review 12 words\nPublished 36 words",
        totalWords: 188,
        jobDueDate: "Dec 21, 2023\n4:56 PM",
        slsDueDate: "Dec 21, 2023\n2:26 PM",
        createdOn: "Dec 14, 2023\n2:26 PM",
    },
    {
        id: 9,
        name: "lenovo (Cancelled 2023/12/18 09:04:49)",
        project: "ER-16 | Alice project",
        progress: "Completed",
        languages: "AI Review 12 words\nPublished 36 words",
        totalWords: 188,
        jobDueDate: "Dec 21, 2023\n4:56 PM",
        slsDueDate: "Dec 21, 2023\n2:26 PM",
        createdOn: "Dec 14, 2023\n2:26 PM",
    },
    {
        id: 10,
        name: "lenovo (Cancelled 2023/12/18 09:04:49)",
        project: "ER-16 | Alice project",
        progress: "Completed",
        languages: "AI Review 12 words\nPublished 36 words",
        totalWords: 188,
        jobDueDate: "Dec 21, 2023\n4:56 PM",
        slsDueDate: "Dec 21, 2023\n2:26 PM",
        createdOn: "Dec 14, 2023\n2:26 PM",
    },
];

function FilterDropdown({ label }: { label: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <div>
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    variant="secondary"
                    size="sm"
                    className="flex items-center justify-between w-full px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span>{label}</span>
                    <ChevronDown className="w-5 h-5 ml-2 -mr-1" />
                </Button>
            </div>
            {isOpen && (
                <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">Option 1</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">Option 2</a>
                    </div>
                </div>
            )}
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    let colorClasses = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    let dotClasses = "bg-gray-400 dark:bg-gray-500";

    if (status === "Completed" || status === "Approved") {
        colorClasses = "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
        dotClasses = "bg-green-500";
    } else if (status === "Canceled") {
        colorClasses = "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
        dotClasses = "bg-red-500";
    } else if (status === "In Progress") {
        colorClasses = "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
        dotClasses = "bg-blue-500";
    } else if (status === "Awaiting Autho") {
        colorClasses = "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
        dotClasses = "bg-yellow-500";
    }
    return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClasses}`}>
            <span className={`w-2 h-2 mr-2 rounded-full ${dotClasses}`}></span>
            {status}
        </span>
    )
}

function ActionsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative inline-block text-left">
            <Button onClick={() => setIsOpen(!isOpen)} variant="secondary" size="sm" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <DotsHorizontal />
            </Button>
            {isOpen && (
                <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">View</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">Edit</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">Delete</a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function JobsTable() {
    const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [jobStatusDraft, setJobStatusDraft] = useState<string[]>([]);
    const [jobStatusFilter, setJobStatusFilter] = useState<string[]>([]);

    const handleApplyFilters = () => {
        setJobStatusFilter(jobStatusDraft);
        setIsDrawerOpen(false);
    };
    const handleClearFilters = () => {
        setJobStatusDraft([]);
        setJobStatusFilter([]);
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedJobs(jobs.map(job => job.id));
        } else {
            setSelectedJobs([]);
        }
    };

    const handleSelectOne = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (event.target.checked) {
            setSelectedJobs(prev => [...prev, id]);
        } else {
            setSelectedJobs(prev => prev.filter(jobId => jobId !== id));
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch =
            job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.progress.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            jobStatusFilter.length === 0 || jobStatusFilter.includes(job.progress);
        return matchesSearch && matchesStatus;
    });

    const isAllSelected = selectedJobs.length === filteredJobs.length && filteredJobs.length > 0;

    return (
        <div className="flex-1 pb-20 sm:pb-0">
            <div className="py-6">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                    {/* Page title and action button */}
                    <div className="flex items-center justify-between pb-4">
                        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Jobs Dashboard</h1>
                        <Button
                            onClick={() => setIsDrawerOpen(true)}
                            variant="primary"
                            size="sm"
                        >
                            <Plus className="w-5 h-5 mr-2 -ml-1" />
                            Request translation
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center justify-between py-4">
                        <Button variant="secondary" size="sm" onClick={() => setIsDrawerOpen(true)}>
                            <FilterFunnel01 className="w-5 h-5 mr-2" />
                            Filters
                        </Button>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Jobs search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-violet-500 focus:border-violet-500"
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <SearchLg className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                            <Button variant="secondary" size="sm">
                                <Settings01 className="w-5 h-5" />
                            </Button>
                            <Button variant="secondary" size="sm">
                                <SwitchVertical01 className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Search and info */}
                    <div className="flex items-center justify-between pb-4">
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{selectedJobs.length > 0 ? `${selectedJobs.length} selected` : `${filteredJobs.length} Jobs displayed`}</p>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden border-b border-gray-200 shadow dark:border-gray-700 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                                                <input type="checkbox" className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500" onChange={handleSelectAll} checked={isAllSelected} />
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Job name</th>
                                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Progress</th>
                                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">All languages</th>
                                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Total words</th>
                                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Job Due Date</th>
                                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">SLS Due Date</th>
                                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Created on</th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900">
                                        {filteredJobs.map((job) => (
                                            <tr
                                                key={job.id}
                                                className={`${
                                                    selectedJobs.includes(job.id)
                                                        ? "bg-violet-100 dark:bg-violet-800/20"
                                                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                                } dark:border-gray-700`}
                                            >
                                                <td className="w-12 px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                                                        onChange={(e) => handleSelectOne(e, job.id)}
                                                        checked={selectedJobs.includes(job.id)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 dark:text-white">
                                                        <a href="#" className="underline font-semibold">{job.name}</a>
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{job.project}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StatusBadge status={job.progress} />
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-pre-wrap">{job.languages}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{job.totalWords}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-pre-wrap">{job.jobDueDate}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-pre-wrap">{job.slsDueDate}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-pre-wrap">{job.createdOn}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                    <ActionsDropdown />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile full-width button */}
            <Button
                onClick={() => setIsDrawerOpen(true)}
                variant="primary"
                size="sm"
                className="mobile-only fixed bottom-0 left-0 right-0 z-10 flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-violet-600 shadow-lg sm:hidden hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
                <Plus className="w-5 h-5 mr-2" />
                Request translation
            </Button>
            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                jobStatusDraft={jobStatusDraft}
                setJobStatusDraft={setJobStatusDraft}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
            />
        </div>
    );
} 
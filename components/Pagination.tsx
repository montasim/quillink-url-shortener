'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage?: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalItems,
    itemsPerPage = 9,
    onPageChange,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Don't show pagination if only 1 page or less
    if (totalPages <= 1) {
        return null;
    }

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5; // Maximum page numbers to show

        if (totalPages <= maxVisible) {
            // Show all pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show first page
            pages.push(1);

            // Show ellipsis if needed
            if (currentPage > 3) {
                pages.push('...');
            }

            // Show pages around current page
            for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(totalPages - 1, currentPage + 1);
                i++
            ) {
                pages.push(i);
            }

            // Show ellipsis if needed
            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Show last page
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            {/* Previous Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-9 w-9 p-0"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) =>
                    page === '...' ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-2 text-muted-foreground"
                        >
                            ...
                        </span>
                    ) : (
                        <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => onPageChange(page as number)}
                            className={cn(
                                'h-9 w-9 p-0',
                                currentPage === page &&
                                    'bg-primary text-primary-foreground hover:bg-primary/90'
                            )}
                        >
                            {page}
                        </Button>
                    )
                )}
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-9 w-9 p-0"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

import { Skeleton } from "@/components/ui/skeleton";
import { LinksSkeleton } from "./LinksSkeleton";
import { Link2 } from "lucide-react";

export const UrlDashboardSkeleton = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 xl:px-0 py-8">
            {/* Header Skeleton - Title with Icon and Usage Progress */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <div>
                        <Skeleton className="h-10 w-64 mb-2" />
                        <Skeleton className="h-5 w-96" />
                    </div>
                </div>

                {/* Usage Progress Skeleton - Circular */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="flex-1">
                        <Skeleton className="h-5 w-24 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
            </div>

            {/* Tab Navigation Skeleton */}
            <div className="inline-flex p-1.5 bg-muted/50 rounded-[20px] mb-10 border border-border/40">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-20 rounded-[14px]" />
                    <Skeleton className="h-9 w-24 rounded-[14px]" />
                    <Skeleton className="h-9 w-24 rounded-[14px]" />
                </div>
            </div>

            {/* Content Skeleton (Links Tab) */}
            <LinksSkeleton />
        </div>
    );
};

export default UrlDashboardSkeleton;

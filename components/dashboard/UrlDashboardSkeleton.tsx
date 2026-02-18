import { Skeleton } from "@/components/ui/skeleton";
import { LinksSkeleton } from "./LinksSkeleton";

export const UrlDashboardSkeleton = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 xl:px-0 py-8">
            {/* Header Skeleton */}
            <div className="mb-8">
                <Skeleton className="h-10 w-64 mb-2" />
                <Skeleton className="h-5 w-96" />
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

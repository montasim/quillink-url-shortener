import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const DashboardSkeleton = () => {
    return (
        <div className="space-y-6 max-w-screen-xl mx-auto px-4 xl:px-0">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex gap-4">
                    <Skeleton className="h-6 w-24 rounded-md" />
                    <Skeleton className="h-6 w-24 rounded-md" />
                </div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-6 border-none shadow-lg shadow-primary/5 bg-card/50">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-24" />
                        </div>
                    </Card>
                ))}
            </div>

            {/* Chart Skeleton */}
            <Card className="border-none shadow-lg shadow-primary/5">
                <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                </CardContent>
            </Card>

            {/* Bottom Grid Skeleton */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <Card className="xl:col-span-2 border-none shadow-lg shadow-primary/5 p-6">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <Skeleton className="h-60 w-full rounded-[24px]" />
                </Card>
                <Card className="border-none shadow-lg shadow-primary/5 p-6 space-y-6">
                    <Skeleton className="h-10 w-full rounded-xl" />
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex justify-between">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-5 w-12" />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

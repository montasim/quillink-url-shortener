import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const TextAnalysisSkeleton = () => {
    return (
        <div className="space-y-8">
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800/50 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                        <Skeleton className="h-12 w-12 rounded-xl" />
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800/50 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                        <Skeleton className="h-12 w-12 rounded-xl" />
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800/50 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                        <Skeleton className="h-12 w-12 rounded-xl" />
                    </div>
                </Card>
            </div>

            {/* Chart Skeleton */}
            <Card className="border-none shadow-2xl shadow-primary/5 bg-card/50 backdrop-blur-sm overflow-hidden rounded-[32px]">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Shares Skeleton */}
                <Card className="border-border/50 rounded-[32px] overflow-hidden">
                    <CardHeader>
                        <Skeleton className="h-6 w-40" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <div className="text-right space-y-1">
                                    <Skeleton className="h-5 w-16 ml-auto" />
                                    <Skeleton className="h-3 w-10 ml-auto" />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Locations Skeleton */}
                <Card className="border-border/50 rounded-[32px] overflow-hidden">
                    <CardHeader>
                        <Skeleton className="h-6 w-40" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between">
                                    <Skeleton className="h-5 w-24" />
                                    <Skeleton className="h-5 w-20" />
                                </div>
                                <Skeleton className="h-1.5 w-full rounded-full" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TextAnalysisSkeleton;

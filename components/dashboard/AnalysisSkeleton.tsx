import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const AnalysisSkeleton = () => {
    return (
        <div className="space-y-8">
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
                {/* Top Links Skeleton */}
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

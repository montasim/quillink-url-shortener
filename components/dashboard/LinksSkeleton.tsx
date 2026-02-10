import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const LinksSkeleton = () => {
    return (
        <div className="space-y-6">
            {/*/!* Stats Cards Skeleton *!/*/}
            {/*<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">*/}
            {/*    {[1, 2, 3].map((i) => (*/}
            {/*        <Card key={i} className="p-6 border-border/40">*/}
            {/*            <div className="flex items-center justify-between">*/}
            {/*                <div className="space-y-2">*/}
            {/*                    <Skeleton className="h-4 w-24" />*/}
            {/*                    <Skeleton className="h-8 w-16" />*/}
            {/*                </div>*/}
            {/*                <Skeleton className="h-12 w-12 rounded-xl" />*/}
            {/*            </div>*/}
            {/*        </Card>*/}
            {/*    ))}*/}
            {/*</div>*/}

            {/* Search Bar Skeleton */}
            <div className="flex flex-col sm:flex-row gap-3">
                <Skeleton className="h-11 flex-1 rounded-md" />
                <div className="flex gap-2">
                    <Skeleton className="h-11 w-24 rounded-md" />
                    <Skeleton className="h-11 w-32 rounded-md" />
                </div>
            </div>

            {/* URLs Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="border-border/40 overflow-hidden">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-3 w-48" />
                                </div>
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                            <div className="flex justify-between items-center pt-4">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const TextShareLinksSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Search Bar Skeleton */}
            <div className="flex flex-col sm:flex-row gap-3">
                <Skeleton className="h-11 flex-1 rounded-md" />
                <div className="flex gap-2">
                    <Skeleton className="h-11 w-24 rounded-md" />
                    <Skeleton className="h-11 w-32 rounded-md" />
                </div>
            </div>

            {/* Text Shares Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="border-border/40 overflow-hidden">
                        <CardContent className="p-5 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2 flex-1">
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

export default TextShareLinksSkeleton;

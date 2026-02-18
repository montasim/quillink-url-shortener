import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

export const TextShareViewSkeleton = () => {
    return (
        <div className="min-h-screen relative">
            {/* Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
                {/* Badge */}
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 font-semibold text-sm backdrop-blur-sm transition-all mb-8">
                    <FileText className="w-3.5 h-3.5 mr-2" />
                    View Only
                </Badge>

                {/* Title Line */}
                <Skeleton className="h-6 w-64 mb-8" />

                {/* Content Area */}
                <div className="flex flex-col gap-4 p-4 bg-card/50 backdrop-blur-xl rounded-3xl border border-border/60 shadow-2xl shadow-primary/5 ring-1 ring-border/50">
                    {/* Title Input Skeleton */}
                    <Skeleton className="h-11 w-full rounded-xl" />

                    {/* Content Textarea Skeleton */}
                    <Skeleton className="w-full min-h-[300px] rounded-xl" />

                    {/* Format Selector Skeleton */}
                    <div className="flex items-center justify-between gap-4 pt-2 border-t">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-32 rounded-xl" />
                    </div>

                    {/* Language Selector Skeleton (for code format) */}
                    <div className="flex items-center justify-between gap-4 pt-2 border-t">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-48 rounded-xl" />
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextShareViewSkeleton;

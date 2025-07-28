const Loading = () => {
    return (
        <nav className="h-16 border-b animate-pulse">
            <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Logo Skeleton */}
                <div className="flex items-center gap-8">
                    <div className="h-8 w-28 rounded-md bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Button Skeletons */}
                <div className="flex items-center gap-3">
                    {/* Dashboard Button */}
                    <div className="hidden sm:inline-flex h-10 w-24 rounded-md bg-gray-300 dark:bg-gray-700" />

                    {/* Sign Up Button */}
                    <div className="h-10 w-20 rounded-md bg-gray-300 dark:bg-gray-700" />

                    {/* Mobile Menu */}
                    <div className="md:hidden h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700" />
                </div>
            </div>
        </nav>
    );
};

export default Loading;

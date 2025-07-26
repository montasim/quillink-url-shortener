const Loading = () => {
    return (
        <div className="bg-muted">
            <nav className="h-16 bg-background border-b animate-pulse">
                <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8">
                        <div className="h-6 w-24 bg-gray-200 rounded"></div>{' '}
                        {/* Skeleton for Logo */}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-20 bg-gray-200 rounded"></div>{' '}
                        {/* Skeleton for Buttons */}
                        <div className="h-10 w-10 bg-gray-200 rounded-full md:hidden"></div>{' '}
                        {/* Skeleton for Mobile Menu */}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Loading;

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <nav className="h-16 animate-pulse">
                <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8">
                        <div className="h-6 w-24 bg-gray-200/30 rounded"></div>{' '}
                        {/* Skeleton for Logo */}
                        <div className="hidden md:flex gap-4">
                            <div className="h-6 w-20 bg-gray-200/30 rounded"></div>{' '}
                            {/* Skeleton for NavMenu items */}
                            <div className="h-6 w-20 bg-gray-200/30 rounded"></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-20 bg-gray-200/30 rounded"></div>{' '}
                        {/* Skeleton for Buttons */}
                        <div className="h-10 w-10 bg-gray-200/30 rounded-full md:hidden"></div>{' '}
                        {/* Skeleton for Mobile Menu */}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Loading;

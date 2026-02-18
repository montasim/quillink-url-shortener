'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SimpleNavbar from '@/components/navbar/simple-navbar';
import SimpleFooter from '@/components/footer/simple-footer';

const GlobalError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col min-h-screen">
            <SimpleNavbar />
            <main className="flex-grow">
                <section className="relative min-h-screen py-24 md:py-32 px-6 overflow-hidden bg-background">
                    {/* Background enhancement */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                        <div className="absolute top-1/4 -left-12 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                        <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center justify-center min-h-[70vh]">
                        <div className="text-8xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            😵‍
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Something went wrong!
                        </h1>

                        <p className="text-lg text-muted-foreground mb-8">
                            An unexpected error occurred. Please try again later.
                        </p>

                        <div className="flex gap-4">
                            <Button
                                onClick={() => reset()}
                                className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-lg shadow-primary/20 hover:bg-primary/90"
                            >
                                Try Again
                            </Button>

                            <Link href="/" passHref>
                                <Button variant="outline" className="h-11 px-6 rounded-xl font-bold text-base">
                                    Go to Homepage
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <SimpleFooter />
        </div>
    );
};

export default GlobalError;

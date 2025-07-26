import { Logo01, Logo02, Logo03, Logo04 } from '@/components/clients/logos';

const Clients = () => {
    return (
        <div className="flex items-center justify-center px-6 2xl:mt-40 xl:mt-36 lg:mt-36 md:mt-28 sm:mt-20 mt-16 overflow-hidden">
            <div className="w-full max-w-screen-xl">
                <p className="text-center text-xl text-secondary">
                    More than 6 companies already trust us
                </p>

                <div className="relative mt-10 overflow-hidden">
                    <div className="marquee flex items-center gap-x-14 whitespace-nowrap will-change-transform">
                        {/* Logos duplicated for seamless scrolling */}
                        {[...Array(2)].map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-x-14"
                            >
                                <Logo01 />
                                <Logo02 />
                                <Logo03 />
                                <Logo04 />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clients;

import { Logo01, Logo02, Logo03, Logo04 } from '@/components/clients/logos';

const Clients = () => {
    return (
        <div className="flex items-center justify-center px-6 2xl:mt-40 xl:mt-36 lg:mt-36 md:mt-28 sm:mt-20 mt-16">
            <div>
                <p className="text-center text-xl text-secondary">
                    More than 6 companies already trust us
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-10 max-w-screen-lg">
                    <Logo01 />
                    <Logo02 />
                    <Logo03 />
                    <Logo04 />
                </div>
            </div>
        </div>
    );
};

export default Clients;

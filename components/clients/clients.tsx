import { Logo01, Logo02, Logo03, Logo04 } from '@/components/clients/logos';

const Clients = () => {
    return (
        <div className="flex items-center justify-center px-6 mb-20">
            <div>
                <p className="text-center text-xl">
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

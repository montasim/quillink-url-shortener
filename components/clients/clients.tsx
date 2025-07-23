import { InfiniteMovingCards } from './infinite-moving-cards';

const Clients = () => {
    const clients = [
        {
            name: "Google",
            logo: "https://logo.clearbit.com/google.com",
        },
        {
            name: "Facebook",
            logo: "https://logo.clearbit.com/facebook.com",
        },
        {
            name: "Amazon",
            logo: "https://logo.clearbit.com/amazon.com",
        },
        {
            name: "Apple",
            logo: "https://logo.clearbit.com/apple.com",
        },
        {
            name: "Microsoft",
            logo: "https://logo.clearbit.com/microsoft.com",
        },
        {
            name: "Netflix",
            logo: "https://logo.clearbit.com/netflix.com",
        },
        {
            name: "Tesla",
            logo: "https://logo.clearbit.com/tesla.com",
        },
        {
            name: "Adobe",
            logo: "https://logo.clearbit.com/adobe.com",
        },
        {
            name: "Spotify",
            logo: "https://logo.clearbit.com/spotify.com",
        },
        {
            name: "Uber",
            logo: "https://logo.clearbit.com/uber.com",
        },
        {
            name: "Airbnb",
            logo: "https://logo.clearbit.com/airbnb.com",
        },
        {
            name: "Slack",
            logo: "https://logo.clearbit.com/slack.com",
        },
        {
            name: "Dropbox",
            logo: "https://logo.clearbit.com/dropbox.com",
        },
        {
            name: "Stripe",
            logo: "https://logo.clearbit.com/stripe.com",
        },
        {
            name: "Zoom",
            logo: "https://logo.clearbit.com/zoom.us",
        }
    ];
    return (
        <div className="flex items-center justify-center px-6 mb-20 max-w-screen mx-auto overflow-hidden">
            <div>
                <h1 className='text-xl sm:text-2xl md:text-3xl text-center font-bold my-5'>We work with them to provide your benefit 🚀</h1>
                <h3 className="flex items-center gap-1.5 text-center text-lg font-semibold">
                    <span className="flex-grow border-t border-border"></span>
                    Trusted by over<span className="font-semibold bg-amber-300 px-2.5 rounded-lg"> {clients.length} </span>companies
                    <span className="flex-grow border-t border-border"></span>
                </h3>

                <InfiniteMovingCards
                    items={clients}
                    direction="right"
                    speed="slow"
                />

                <InfiniteMovingCards
                    items={clients.slice().reverse()}
                    direction="left"
                    speed="slow"
                />
            </div>
        </div>
    );
};

export default Clients;

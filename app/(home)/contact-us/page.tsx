import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';

const ContactPage = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
            <b className="text-muted-foreground">Contact Us</b>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tight">
                Get In Touch
            </h2>
            <p className="mt-4 text-base sm:text-lg">
                Our friendly team is always here to chat.
            </p>
            <div className="max-w-screen-xl mx-auto py-24 grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-10 px-6 md:px-0">
                <div className="text-center flex flex-col items-center">
                    <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                        <MailIcon />
                    </div>
                    <h3 className="mt-6 font-semibold text-xl">Email</h3>
                    <Link
                        className="mt-4 font-medium text-primary"
                        href="mailto:montasimmamun@gmail.com"
                    >
                        montasimmamun@gmail.com
                    </Link>
                </div>
                <div className="text-center flex flex-col items-center">
                    <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                        <LinkedinIcon />
                    </div>
                    <h3 className="mt-6 font-semibold text-xl">Office</h3>
                    <a
                        className="mt-4 font-medium text-primary"
                        href="https://linkedin.com/in/montasimmamun"
                        target="_blank"
                    >
                        linkedin.com/in/montasimmamun
                    </a>
                </div>
                <div className="text-center flex flex-col items-center">
                    <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                        <GithubIcon />
                    </div>
                    <h3 className="mt-6 font-semibold text-xl">GitHub</h3>
                    <a
                        className="mt-4 font-medium text-primary"
                        href="https://github.com/montasim"
                        target="_blank"
                    >
                        github.com/montasim
                    </a>
                </div>
            </div>
        </div>
    </div>
);

export default ContactPage;

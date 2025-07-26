import { Separator } from '@/components/ui/separator';
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';
import configuration from '@/configuration/configuration';
import { Logo } from '@/components/logo';

const footerLinks = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'Contact Us',
        href: '/contact-us',
    },
];

const Footer = () => {
    return (
        <div className="flex flex-col">
            <div className="grow bg-muted" />
            <footer>
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-x-8 gap-y-10 px-6 xl:px-0">
                        <div>
                            {/* Logo */}
                            <Logo />

                            <ul className="mt-6 flex items-center gap-4 flex-wrap">
                                {footerLinks.map(({ title, href }) => (
                                    <li key={title}>
                                        <Link
                                            href={href}
                                            className="text-primary hover:text-foreground"
                                        >
                                            {title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <Separator />

                    <div className="my-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0 text-primary">
                        {/* Copyright */}
                        <span className="">
                            &copy; {new Date().getFullYear()}{' '}
                            <Link href="/" target="_blank">
                                {configuration.app.name}
                            </Link>
                            . All rights reserved.
                        </span>

                        <div className="flex items-center gap-5">
                            <a
                                href="mailto:montasimmamun@gmail.com"
                                target="_blank"
                            >
                                <MailIcon className="h-5 w-5" />
                            </a>
                            <a
                                href="https://linkedin.com/in/montasimmamun"
                                target="_blank"
                            >
                                <LinkedinIcon className="h-5 w-5" />
                            </a>
                            <a
                                href="https://github.com/montasim"
                                target="_blank"
                            >
                                <GithubIcon className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;

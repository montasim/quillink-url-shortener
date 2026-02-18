import { Separator } from '@/components/ui/separator';
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';

const SimpleFooter = () => {
    const footerLinks = [
        {
            title: 'Home',
            href: '/',
        },
        {
            title: 'Link Shrinker',
            href: '/urls',
        },
        {
            title: 'Text Sharer',
            href: '/texts',
        },
        {
            title: 'QR Creator',
            href: '/qr',
        },
        {
            title: 'Terms',
            href: '/terms',
        },
        {
            title: 'Privacy',
            href: '/privacy',
        },
        {
            title: 'Contact Us',
            href: '/contact-us',
        },
    ];

    const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || 'Shrnkly';
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'montasimmamun@gmail.com';
    const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/montasimmamun';
    const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/montasim';

    return (
        <footer className="border-t border-border bg-background">
            <div className="max-w-7xl mx-auto py-12 px-4 xl:px-0">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-x-8 gap-y-10">
                    <div>
                        {/* Logo */}
                        <Logo />

                        <ul className="mt-6 flex items-center gap-6 flex-wrap">
                            {footerLinks.map(({ title, href }) => (
                                <li key={title}>
                                    <Link
                                        href={href}
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 text-sm text-muted-foreground">
                    {/* Copyright */}
                    <span>
                        &copy; {new Date().getFullYear()}{' '}
                        <Link href="/" className="hover:text-foreground transition-colors">
                            {projectName}
                        </Link>
                        . All rights reserved
                    </span>

                    <div className="flex items-center gap-5">
                        <a
                            href={`mailto:${contactEmail}`}
                            target="_blank"
                            className="hover:text-foreground transition-colors"
                        >
                            <MailIcon className="h-5 w-5" />
                        </a>
                        <a
                            href={linkedinUrl}
                            target="_blank"
                            className="hover:text-foreground transition-colors"
                        >
                            <LinkedinIcon className="h-5 w-5" />
                        </a>
                        <a
                            href={githubUrl}
                            target="_blank"
                            className="hover:text-foreground transition-colors"
                        >
                            <GithubIcon className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default SimpleFooter;

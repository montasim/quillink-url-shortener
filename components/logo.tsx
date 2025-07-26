'use client';

import Image from 'next/image';
import Link from 'next/link';
import QuilLinkLogo from '@/public/logo.png';

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-3 group">
            {/* Rounded Logo Image */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-muted-foreground/20 shadow-md group-hover:scale-105 transition-transform">
                <Image
                    src={QuilLinkLogo}
                    alt="QuilLink logo"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Brand Text */}
            <span className="text-xl font-bold tracking-tight text-primary transition-colors group-hover:text-primary">
                QuilLink
            </span>
        </Link>
    );
};

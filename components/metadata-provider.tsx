'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getMetadataByPathname, getCanonicalUrl } from '@/lib/metadata-config';
import configuration from '@/configuration/configuration';

const appName = configuration.app.name;
const baseUrl = configuration.app.baseUrl || process.env.NEXT_PUBLIC_BASE_URL || 'https://shrnkly.com';

export function MetadataProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const t = useTranslations();

    useEffect(() => {
        const metadata = getMetadataByPathname(pathname);

        if (metadata) {
            // Get translated title and description if available
            const translationKey = metadata.translationKey;
            const translatedTitle = translationKey && t.has(translationKey)
                ? t(`${translationKey}.title`)
                : metadata.title;
            const translatedDescription = translationKey && t.has(translationKey)
                ? t(`${translationKey}.description`)
                : metadata.description;

            // Update document title
            document.title = translatedTitle;

            // Update/create meta description
            updateOrCreateMeta('description', translatedDescription);

            // Update/create canonical URL
            const canonicalUrl = getCanonicalUrl(pathname);
            updateOrCreateCanonical(canonicalUrl);

            // Update Open Graph tags
            updateOrCreateMeta('property="og:title"', translatedTitle);
            updateOrCreateMeta('property="og:description"', translatedDescription);
            updateOrCreateMeta('property="og:url"', canonicalUrl);
            updateOrCreateMeta('property="og:site_name"', appName);

            // Update Twitter Card tags
            updateOrCreateMeta('name="twitter:title"', translatedTitle);
            updateOrCreateMeta('name="twitter:description"', translatedDescription);
            updateOrCreateMeta('name="twitter:card"', 'summary_large_image');

            // Update JSON-LD structured data
            updateStructuredData({
                title: translatedTitle,
                description: translatedDescription,
                url: canonicalUrl,
            });
        }
    }, [pathname, t]);

    return <>{children}</>;
}

// Helper function to update or create a meta tag
function updateOrCreateMeta(selector: string, content: string) {
    let element = document.querySelector(`meta[${selector}]`) as HTMLMetaElement;
    
    if (element) {
        if (element.getAttribute('content') !== content) {
            element.setAttribute('content', content);
        }
    } else {
        const newMeta = document.createElement('meta');
        if (selector.includes('property=')) {
            newMeta.setAttribute('property', selector.replace(/property="|"/g, ''));
        } else if (selector.includes('name=')) {
            newMeta.setAttribute('name', selector.replace(/name="|"/g, ''));
        } else {
            newMeta.setAttribute('name', selector);
        }
        newMeta.setAttribute('content', content);
        document.head.appendChild(newMeta);
    }
}

// Helper function to update or create canonical link
function updateOrCreateCanonical(href: string) {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (link) {
        if (link.getAttribute('href') !== href) {
            link.setAttribute('href', href);
        }
    } else {
        const newLink = document.createElement('link');
        newLink.setAttribute('rel', 'canonical');
        newLink.setAttribute('href', href);
        document.head.appendChild(newLink);
    }
}

// Helper function to update JSON-LD structured data
function updateStructuredData(data: { title: string; description: string; url: string }) {
    const scriptId = 'structured-data-website';
    let script = document.getElementById(scriptId);
    
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: appName,
        url: baseUrl,
        description: data.description,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/urls?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };

    if (script) {
        script.textContent = JSON.stringify(structuredData);
    } else {
        const newScript = document.createElement('script');
        newScript.type = 'application/ld+json';
        newScript.id = scriptId;
        newScript.textContent = JSON.stringify(structuredData);
        document.head.appendChild(newScript);
    }
}

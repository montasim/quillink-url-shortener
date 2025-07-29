import React from 'react';
import { useTranslations } from 'next-intl';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    MoreHorizontal,
    Copy,
    Share2,
    Info,
    Trash2,
    Link,
    Facebook,
    Instagram,
    Github,
} from 'lucide-react';
import { IRenderUrlRowProps } from '@/types/types';
import {
    handleCopy,
    handleDelete,
    handleShare,
    safeFormat,
} from '@/lib/actions/home';
import RenderDetails from '@/app/[locale]/(home)/components/Details';

const RenderUrlRow: React.FC<IRenderUrlRowProps> = ({
    url,
    expandedId,
    setExpandedId,
    setUrls,
}) => {
    const t = useTranslations('dashboard');
    const shortUrlFull =
        typeof window !== 'undefined'
            ? `${window.location.origin}/${url.shortKey}`
            : `/${url.shortKey}`;

    return (
        <React.Fragment key={url.id}>
            <TableRow>
                <TableCell>{safeFormat(url.createdAt)}</TableCell>
                <TableCell
                    className="max-w-xs truncate"
                    title={url.originalUrl || ''}
                >
                    {url.originalUrl ? (
                        <a
                            href={url.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            {url.originalUrl}
                        </a>
                    ) : (
                        <span className="text-muted italic">
                            {t('missingUrl')}
                        </span>
                    )}
                </TableCell>
                <TableCell className="font-mono">
                    <a
                        href={shortUrlFull}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        {shortUrlFull}
                    </a>
                </TableCell>
                <TableCell>{url.clicks ?? 0}</TableCell>
                <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                        {/* Copy Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={async () => handleCopy(shortUrlFull)}
                            aria-label={t('copy')}
                        >
                            <Copy className="h-4 w-4 mr-1" />
                        </Button>

                        {/* Dropdown Menu Button */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    aria-label={t('actions')}
                                >
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-52">
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <Share2 className="mr-2 h-4 w-4" />
                                        {t('share')}
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleShare(shortUrlFull)
                                            }
                                        >
                                            <span className="flex items-center gap-2">
                                                <Link /> {t('shareAsLink')}
                                            </span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleShare(
                                                    shortUrlFull,
                                                    'facebook'
                                                )
                                            }
                                        >
                                            <span className="flex items-center gap-2">
                                                <Facebook />{' '}
                                                {t('shareWithFacebook')}
                                            </span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleShare(
                                                    shortUrlFull,
                                                    'instagram'
                                                )
                                            }
                                        >
                                            <span className="flex items-center gap-2">
                                                <Instagram />{' '}
                                                {t('shareWithInstagram')}
                                            </span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleShare(
                                                    shortUrlFull,
                                                    'github'
                                                )
                                            }
                                        >
                                            <span className="flex items-center gap-2">
                                                <Github />{' '}
                                                {t('shareWithGithub')}
                                            </span>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>

                                <DropdownMenuItem
                                    onClick={() =>
                                        setExpandedId(
                                            expandedId === url.id
                                                ? null
                                                : url.id
                                        )
                                    }
                                >
                                    <Info className="mr-2 h-4 w-4" />{' '}
                                    {t('details')}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        handleDelete(setUrls, url.shortKey)
                                    }
                                >
                                    <Trash2 className="mr-2 h-4 w-4 text-red-600" />{' '}
                                    {t('delete')}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </TableCell>
            </TableRow>

            {expandedId === url.id && RenderDetails(url)}
        </React.Fragment>
    );
};

export default RenderUrlRow;

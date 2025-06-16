import React, { useState } from 'react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Copy, Share2, Info, Trash2 } from 'lucide-react';
import { IShortUrl } from '@/app/data/types';
import {
    handleCopy,
    handleDelete,
    handleShare,
    safeFormat,
} from '@/app/(home)/actions';
import RenderDetails from '@/app/(home)/components/Details';

interface IRenderUrlRowProps {
    url: IShortUrl;
    expandedId: string | null;
    setExpandedId: React.Dispatch<React.SetStateAction<string | null>>;
    setUrls: React.Dispatch<React.SetStateAction<IShortUrl[]>>;
}

const RenderUrlRow: React.FC<IRenderUrlRowProps> = ({
    url,
    expandedId,
    setExpandedId,
    setUrls,
}) => {
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
                        <span className="text-muted-foreground italic">
                            Missing URL
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
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    aria-label="Actions"
                                >
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>
                            </MenubarTrigger>
                            <MenubarContent align="end" className="w-44">
                                <MenubarItem
                                    onClick={() => handleCopy(shortUrlFull)}
                                >
                                    <Copy className="mr-2 h-4 w-4" /> Copy
                                </MenubarItem>
                                <MenubarItem
                                    onClick={() => handleShare(shortUrlFull)}
                                >
                                    <Share2 className="mr-2 h-4 w-4" /> Share
                                </MenubarItem>
                                <MenubarItem
                                    onClick={() =>
                                        setExpandedId(
                                            expandedId === url.id
                                                ? null
                                                : url.id
                                        )
                                    }
                                >
                                    <Info className="mr-2 h-4 w-4" /> Details
                                </MenubarItem>
                                <MenubarItem
                                    onClick={() =>
                                        handleDelete(setUrls, url.shortKey)
                                    }
                                >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </TableCell>
            </TableRow>

            {expandedId === url.id && RenderDetails(url)}
        </React.Fragment>
    );
};

export default RenderUrlRow;

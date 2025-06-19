import React from 'react';
import { ShortUrl, ClickLog, User, Token } from '@/lib/generated/prisma';

export interface IClickLog {
    id: string;
    shortKey: string;
    ipAddress?: string;
    userAgent?: string;
    createdAt?: string;
}

export interface IShortUrl {
    id: string;
    shortKey: string;
    originalUrl?: string;
    createdAt?: string;
    expiresAt?: string;
    clicks: number;
    clickLogs: IClickLog[];
}

export interface IUser {
    id?: string;
    name: string;
    email: string;
}

export interface IUserProfile {
    id?: string;
    name: string;
    email: string;
    picture?: string;
}

export type IGoogleProfile = {
    id: string;
    email: string;
    name: string;
    picture: string;
    provider: string;
};

export interface IAuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface ITokenUserDetails {
    id?: string;
    name: string;
    email: string;
    picture?: string | null;
}

export interface ISignedJwtPayload {
    type: 'access' | 'refresh';
    expiry: Date | string;
    currentUser: ITokenUserDetails;
    iat: number;
    exp: number;
}
export interface ISendMail {
    to: string;
    subject: string;
    html: string;
}

export interface IShortUrlRepo {
    findUnique: (args: any) => Promise<ShortUrl | null>;
    findFirst: (args: any) => Promise<ShortUrl | null>;
    findMany: (args: any) => Promise<ShortUrl[]>;
    update: (args: any) => Promise<ShortUrl>;
    deleteData: (args: any) => Promise<ShortUrl>;
    create: (args: any) => Promise<ShortUrl>;
}

export interface IClickLogRepository {
    create: (args: any) => Promise<ClickLog>;
}

export interface IUserRepo {
    findUnique: (args: any) => Promise<User | null>;
    findFirst: (args: any) => Promise<User | null>;
    findMany: (args: any) => Promise<User[]>;
    update: (args: any) => Promise<User>;
    deleteData: (args: any) => Promise<User>;
    create: (args: any) => Promise<User>;
}

export interface ITokenRepo {
    findUnique: (args: any) => Promise<Token | null>;
    findFirst: (args: any) => Promise<Token | null>;
    findMany: (args: any) => Promise<Token[]>;
    update: (args: any) => Promise<Token>;
    deleteData: (args: any) => Promise<Token>;
    create: (args: any) => Promise<Token>;
}

export interface IRenderUrlRowProps {
    url: IShortUrl;
    expandedId: string | null;
    setExpandedId: React.Dispatch<React.SetStateAction<string | null>>;
    setUrls: React.Dispatch<React.SetStateAction<IShortUrl[]>>;
}

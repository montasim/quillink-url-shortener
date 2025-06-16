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

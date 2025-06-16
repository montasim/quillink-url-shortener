export const selection = {
    shortKey: true,
    originalUrl: true,
    clicks: true,
    createdAt: true,
    expiresAt: true,
    clickLogs: {
        select: {
            ipAddress: true,
            userAgent: true,
            createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
    },
};

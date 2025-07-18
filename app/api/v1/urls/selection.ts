export const urlSelection = {
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

export const clickLogSelection = {
    id: true,
    shortKey: true,
    ipAddress: true,
    userAgent: true,
    createdAt: true,
};

export const urlSelection = {
    shortKey: true,
    originalUrl: true,
    clicks: true,
    createdAt: true,
    expiresAt: true,
    passwordHash: true,
    customSlug: true,
    clickLogs: {
        select: {
            ipAddress: true,
            userAgent: true,
            country: true,
            countryCode: true,
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
    country: true,
    countryCode: true,
    createdAt: true,
};

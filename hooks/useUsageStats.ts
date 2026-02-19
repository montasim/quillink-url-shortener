'use client';

import { useState, useCallback } from 'react';
import API_ENDPOINT from '@/constants/apiEndPoint';
import { getData } from '@/lib/axios';

interface UsageData {
    used: number;
    limit: number;
    remaining: number;
}

interface UsageApiResponse {
    urls: UsageData;
    textShares: UsageData;
}

/**
 * Hook to fetch usage statistics for dashboard
 * @param type - 'urls' or 'textShares' to specify which usage data to return
 * @returns Object containing usage data, loading state, and refresh function
 */
export const useUsageStats = (type: 'urls' | 'textShares' = 'urls') => {
    const [usage, setUsage] = useState<UsageData | null>(null);
    const [usageLoading, setUsageLoading] = useState(true);

    const fetchUsageStats = useCallback(async () => {
        try {
            const response = await getData(API_ENDPOINT.USAGE);
            if (response.success && response.data) {
                const usageData = response.data[type];
                setUsage(usageData);
                return usageData;
            }
        } catch (error) {
            console.error('Failed to fetch usage stats:', error);
        } finally {
            setUsageLoading(false);
        }
    }, [type]);

    return {
        usage,
        usageLoading,
        fetchUsageStats,
        setUsage,
        setUsageLoading,
    };
};

export default useUsageStats;

import { handleFetchAction } from '@/services/url.service';
import { getData } from '@/lib/axios';
import API_ENDPOINT from '@/constants/apiEndPoint';

export const fetchUrls = async (
    setData: any,
    setLoading: (val: boolean) => void
) => {
    await handleFetchAction({
        apiEndpoint: API_ENDPOINT.URLS,
        setLoading,
        setData,
        successMessage: '',
    });
};

export const fetchUrlDetails = async (shortKey: string): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
        const response = await getData(API_ENDPOINT.URLS_GET(shortKey));
        if (response.success) {
            // Initialize with basic URL data
            const urlData = {
                ...response.data,
                clickLogs: [] as any[],
            };

            // Try to fetch click logs for analytics (may not exist yet)
            try {
                const statsResponse = await getData(API_ENDPOINT.URLS_STATS(shortKey));
                if (statsResponse.success && statsResponse.data?.recentClicks) {
                    urlData.clickLogs = statsResponse.data.recentClicks.map((click: any) => ({
                        id: click.id || response.data.id,
                        shortUrlId: response.data.id,
                        ipAddress: click.ipAddress,
                        country: click.country,
                        countryCode: click.countryCode,
                        userAgent: click.userAgent,
                        browser: click.browser,
                        os: click.os,
                        device: click.device,
                        referer: click.referer,
                        createdAt: click.createdAt,
                    }));
                }
            } catch (statsErr) {
                // Stats endpoint may not exist or have no data - that's OK
                console.log('No analytics data available for this URL');
            }

            return { success: true, data: urlData };
        }
        return { success: false, error: response.message || 'Failed to fetch URL details' };
    } catch (err: any) {
        return { success: false, error: err.response?.data?.message || 'Failed to fetch URL details' };
    }
};

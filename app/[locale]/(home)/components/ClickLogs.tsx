import { useTranslations } from 'next-intl';
import { safeFormat } from '@/lib/actions/home';
import { IClickLog } from '@/types/types';
import { UAParser } from 'ua-parser-js';

const parseUserAgent = (ua: string, unknownText: string) => {
    try {
        const parser = new UAParser(ua);
        const { browser, os } = parser.getResult();
        return {
            browser: `${browser.name ?? unknownText} ${browser.version ?? ''}`,
            os: `${os.name ?? unknownText} ${os.version ?? ''}`,
        };
    } catch {
        return { browser: unknownText, os: unknownText };
    }
};

const RenderClickLogs = (logs?: IClickLog[]) => {
    const t = useTranslations('dashboard.urls');

    return Array.isArray(logs) && logs.length > 0 ? (
        logs.map((log) => {
            const { browser, os } = parseUserAgent(
                log.userAgent || '',
                t('unknown')
            );

            return (
                <tr key={log.id} className="border-t">
                    <td>{log.ipAddress || t('unknown')}</td>
                    <td>{browser || t('unknown')}</td>
                    <td>{os || t('unknown')}</td>
                    <td>{safeFormat(log.createdAt)}</td>
                </tr>
            );
        })
    ) : (
        <tr>
            <td colSpan={3} className="text-center text-muted py-2">
                {t('noClickLogs')}
            </td>
        </tr>
    );
};

export default RenderClickLogs;

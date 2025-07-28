import { safeFormat } from '@/app/(home)/actions';
import { IClickLog } from '@/types/types';
import { UAParser } from 'ua-parser-js';

const parseUserAgent = (ua: string) => {
    try {
        const parser = new UAParser(ua);
        const { browser, os } = parser.getResult();
        return {
            browser: `${browser.name ?? 'Unknown'} ${browser.version ?? ''}`,
            os: `${os.name ?? 'Unknown'} ${os.version ?? ''}`,
        };
    } catch {
        return { browser: 'Unknown', os: 'Unknown' };
    }
};

const RenderClickLogs = (logs?: IClickLog[]) =>
    Array.isArray(logs) && logs.length > 0 ? (
        logs.map((log) => {
            const { browser, os } = parseUserAgent(log.userAgent || '');

            return (
                <tr key={log.id} className="border-t">
                    <td>{log.ipAddress || 'Unknown'}</td>
                    <td>{browser || 'Unknown'}</td>
                    <td>{os || 'Unknown'}</td>
                    <td>{safeFormat(log.createdAt)}</td>
                </tr>
            );
        })
    ) : (
        <tr>
            <td colSpan={3} className="text-center text-muted py-2">
                No click logs
            </td>
        </tr>
    );

export default RenderClickLogs;

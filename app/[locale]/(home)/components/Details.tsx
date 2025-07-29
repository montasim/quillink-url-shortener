import { useTranslations } from 'next-intl';
import { TableCell, TableRow } from '@/components/ui/table';
import { IShortUrl } from '@/types/types';
import { generateQrUrl } from '@/lib/actions/home';
import RenderClickChart from '@/app/[locale]/(home)/components/ClickChart';
import RenderClickLogs from '@/app/[locale]/(home)/components/ClickLogs';

const RenderDetails = (url: IShortUrl) => {
    const t = useTranslations('dashboard');

    return (
        <TableRow className="rounded-xl">
            <TableCell colSpan={5} className="bg-muted p-4">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <p>
                            <strong>
                                {t('clicks')}: {url.clicks}
                            </strong>
                        </p>

                        {url.shortKey ? (
                            <img
                                src={generateQrUrl(url.shortKey)}
                                alt={t('qrCode')}
                                width={150}
                                height={150}
                                className="border rounded-md bg-white"
                            />
                        ) : (
                            <p className="text-muted">
                                {t('qrCodeUnavailable')}
                            </p>
                        )}

                        <div className="mt-4">
                            {RenderClickChart(url.clickLogs)}
                        </div>
                    </div>

                    <div className="overflow-x-auto max-h-48 mt-2">
                        <table className="w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="text-left">
                                        {t('ipAddress')}
                                    </th>
                                    <th className="text-left">
                                        {t('browser')}
                                    </th>
                                    <th className="text-left">{t('os')}</th>
                                    <th className="text-left">
                                        {t('clickedAt')}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>{RenderClickLogs(url?.clickLogs)}</tbody>
                        </table>
                    </div>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default RenderDetails;

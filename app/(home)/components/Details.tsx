import { TableCell, TableRow } from '@/components/ui/table';
import { IShortUrl } from '@/app/data/types';
import { generateQrUrl } from '@/app/(home)/actions';
import RenderClickChart from '@/app/(home)/components/ClickChart';
import RenderClickLogs from '@/app/(home)/components/ClickLogs';

const RenderDetails = (url: IShortUrl) => (
    <TableRow className="rounded-xl">
        <TableCell colSpan={5} className="bg-muted p-4">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <p>
                        <strong>Clicks: {url.clicks}</strong>
                    </p>

                    {url.shortKey ? (
                        <img
                            src={generateQrUrl(url.shortKey)}
                            alt="QR Code"
                            width={150}
                            height={150}
                            className="border rounded-md bg-white"
                        />
                    ) : (
                        <p className="text-muted-foreground">
                            QR code unavailable
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
                                <th className="text-left">IP</th>
                                <th className="text-left">Browser</th>
                                <th className="text-left">OS</th>
                                <th className="text-left">Clicked At</th>
                            </tr>
                        </thead>

                        <tbody>{RenderClickLogs(url?.clickLogs)}</tbody>
                    </table>
                </div>
            </div>
        </TableCell>
    </TableRow>
);

export default RenderDetails;

import { format } from 'date-fns';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { IClickLog } from '@/types/types';

const RenderClickChart = (logs?: IClickLog[]) => {
    if (!Array.isArray(logs) || logs.length === 0) {
        return (
            <p className="text-muted text-sm">
                No click data available.
            </p>
        );
    }

    const grouped = logs.reduce((acc: Record<string, number>, log) => {
        const date = format(new Date(log.createdAt || ''), 'yyyy-MM-dd');
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const data = Object.entries(grouped).map(([date, count]) => ({
        date,
        clicks: count,
    }));

    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="clicks" stroke="#2563eb" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RenderClickChart;

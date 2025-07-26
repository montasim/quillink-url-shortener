'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { date: '2025-07-19', visits: 100, visitors: 70 },
    { date: '2025-07-20', visits: 300, visitors: 250 },
    { date: '2025-07-21', visits: 200, visitors: 180 },
    { date: '2025-07-22', visits: 250, visitors: 230 },
    { date: '2025-07-23', visits: 220, visitors: 190 },
    { date: '2025-07-24', visits: 180, visitors: 150 },
    { date: '2025-07-25', visits: 100, visitors: 90 },
];

export default function ViewsChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient
                        id="colorVisits"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="visits"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorVisits)"
                />
                <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="#7dd3fc"
                    fillOpacity={0.6}
                    fill="#bae6fd"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

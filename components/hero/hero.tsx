
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link as LinkIcon, QrCode as QrCodeIcon } from 'lucide-react';
import ShortLink from './tab/short-link';
import QrCode from './tab/qr-code';

const Hero = () => {

    const tabs = [
        {
            name: 'Short Link',
            icon: <LinkIcon />,
            value: 'short_link',
            content: <ShortLink />,
        },
        {
            name: 'QR Code',
            icon: <QrCodeIcon />,
            value: 'qr_code',
            content: <QrCode />,
        },
    ];

    return (
        <div className="relative min-h-screen flex justify-center px-6 overflow-hidden">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                className={cn(
                    '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
                    'inset-x-0 h-full skew-y-12'
                )}
            />

            <div className="relative z-10 text-center max-w-2xl mt-20">
                <Badge className={
                    cn(
                        "rounded-full px-2",
                        "bg-gradient-to-r from-purple-500 to-indigo-500 text-white",
                        "text-xs font-semibold tracking-wide uppercase"
                    )}>
                    Just released v1.0.0
                </Badge>
                <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold !leading-[1.2]">
                    Make every connection count
                </h1>
                <p className="mt-4 text-[17px] md:text-lg">
                    Create short links, QR codes, share them anywhere. Track
                    what&lsquo;s working, and what&lsquo;s not. All inside the
                    QuilLink Connection Platform.
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                    <Tabs defaultValue={tabs[0].value} className="w-full">
                        <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none">
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="rounded-none bg-background h-full data-[state=active]:shadow-none border border-transparent border-b-border data-[state=active]:border-border data-[state=active]:border-b-background -mb-[2px] rounded-t"
                                >
                                    <code className="flex items-center gap-2 text-[13px]">
                                        {tab.icon} {tab.name}
                                    </code>
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {tabs.map((tab) => (
                            <TabsContent key={tab.value} value={tab.value}>
                                <div className="w-full mt-4">{tab.content}</div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Hero;

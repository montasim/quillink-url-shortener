'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface TabItem {
    name: string;
    value: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
}

interface TabSectionProps {
    defaultValue: string;
    tabs: TabItem[];
    className?: string;
    listClassName?: string;
    triggerClassName?: string;
    contentWrapperClassName?: string;
}

const TabSection = ({
    defaultValue,
    tabs,
    className = '',
    listClassName = '',
    triggerClassName = '',
    contentWrapperClassName = '',
}: TabSectionProps) => {
    return (
        <Tabs defaultValue={defaultValue} className={className}>
            <TabsList className={cn('flex', listClassName)}>
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className={cn(triggerClassName)}
                    >
                        <span className="flex items-center gap-2 text-[13px]">
                            {tab.icon} {tab.name}
                        </span>
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                    <div className={contentWrapperClassName}>{tab.content}</div>
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default TabSection;

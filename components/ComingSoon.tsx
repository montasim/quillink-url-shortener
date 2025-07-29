import { Flame } from 'lucide-react';
import React from 'react';

const ComingSoon = ({ text = 'Coming soon...' }: { text: string }) => {
    return (
        <div className="w-full py-10 text-center text-muted-foreground">
            <Flame className="mx-auto w-16 h-16 text-muted" />
            <p className="mt-2">{text}</p>
        </div>
    );
};

export default ComingSoon;

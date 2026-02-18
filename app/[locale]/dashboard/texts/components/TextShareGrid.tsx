import TextShareCard from './TextShareCard';

interface TextShare {
    id: string;
    shortKey: string;
    title?: string;
    content: string;
    format: string;
    viewCount: number;
    createdAt: string;
    expiresAt?: string;
}

interface TextShareGridProps {
    shares: TextShare[];
    onRefresh: () => void;
}

const TextShareGrid = ({ shares, onRefresh }: TextShareGridProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
            {shares?.map((share) => (
                <TextShareCard key={share.id} share={share} onRefresh={onRefresh} />
            ))}
        </div>
    );
};

export default TextShareGrid;

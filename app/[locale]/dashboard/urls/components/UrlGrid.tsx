import UrlCard from '@/app/[locale]/dashboard/urls/components/UrlCard';
import { IShortUrl } from '@/types/types';

const UrlGrid = ({ urlData, onRefresh }: { urlData: IShortUrl[], onRefresh: () => void }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
            {urlData?.map((link) => (
                <UrlCard key={link?.shortKey} url={link} onRefresh={onRefresh} />
            ))}
        </div>
    );
};

export default UrlGrid;

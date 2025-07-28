import UrlCard from '@/app/dashboard/urls/UrlCard';
import { IShortUrl } from '@/types/types';

const UrlGrid = ({ urlData }: { urlData: IShortUrl[] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {urlData?.map((link) => (
                <UrlCard key={link?.shortKey} url={link} />
            ))}
        </div>
    );
};

export default UrlGrid;

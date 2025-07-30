import configuration from '@/configuration/configuration';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslations } from 'next-intl';

const LanguageOfferSwitcher = () => {
    const t = useTranslations('common');

    return (
        <div className="mt-2 text-sm w-full flex items-center justify-center mb-6">
            <span>
                {configuration.app.name} {t('offeredIn')}:
            </span>
            <LanguageSwitcher showIcon={false} />
        </div>
    );
};

export default LanguageOfferSwitcher;

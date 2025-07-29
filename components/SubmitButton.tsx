import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SubmitButtonProps = {
    disabled: boolean;
    loading: boolean;
    loadingLabel: string;
    label: string;
    className?: string;
};

const SubmitButton = ({
    disabled,
    loading,
    loadingLabel,
    label,
    className,
}: SubmitButtonProps) => {
    return (
        <Button
            type="submit"
            className={
                className
                    ? className
                    : 'mt-4 w-full disabled:bg-secondary hover:bg-primary cursor-pointer disabled:cursor-not-allowed'
            }
            disabled={disabled}
        >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {loadingLabel}
                </>
            ) : (
                label
            )}
        </Button>
    );
};

export default SubmitButton;

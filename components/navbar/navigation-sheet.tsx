import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/logo';
import { NavMenu } from '@/components/navbar/nav-menu';

export const NavigationSheet = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className='text-foreground hover:text-foreground'>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <Logo />
                <NavMenu orientation="vertical" className="mt-12" />
            </SheetContent>
        </Sheet>
    );
};

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { QRContentType, WiFiConfig, VCardConfig, SMSConfig, EmailConfig } from '@/lib/qrCodeTypes';

interface ContentInputProps {
    contentType: QRContentType;
    value: any;
    onChange: (value: any) => void;
    disabled?: boolean;
}

const ContentInput = ({
    contentType,
    value,
    onChange,
    disabled
}: ContentInputProps) => {
    const t = useTranslations('qrGenerator');

    // Simple text/URL/note input
    if (['text', 'url', 'note'].includes(contentType)) {
        const placeholder = contentType === 'url'
            ? t('urlPlaceholder')
            : contentType === 'note'
            ? t('notePlaceholder')
            : t('textPlaceholder');

        return (
            <div className="space-y-2">
                <Label htmlFor="content" className="font-bold">
                    {contentType === 'url' ? t('urlLabel') : contentType === 'note' ? t('noteLabel') : t('textLabel')}
                </Label>
                {contentType === 'note' ? (
                    <Textarea
                        id="content"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        disabled={disabled}
                        className="min-h-[200px] resize-none"
                    />
                ) : (
                    <Input
                        id="content"
                        type={contentType === 'url' ? 'url' : 'text'}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        disabled={disabled}
                        className="h-12"
                    />
                )}
            </div>
        );
    }

    // WiFi input
    if (contentType === 'wifi') {
        const wifiConfig = (value || {}) as Partial<WiFiConfig>;

        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="ssid" className="font-bold">{t('networkName')}</Label>
                    <Input
                        id="ssid"
                        value={wifiConfig.ssid || ''}
                        onChange={(e) => onChange({ ...wifiConfig, ssid: e.target.value })}
                        placeholder={t('networkNamePlaceholder')}
                        disabled={disabled}
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="font-bold">{t('password')}</Label>
                    <Input
                        id="password"
                        type="text"
                        value={wifiConfig.password || ''}
                        onChange={(e) => onChange({ ...wifiConfig, password: e.target.value })}
                        placeholder={t('passwordPlaceholder')}
                        disabled={disabled}
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="encryption" className="font-bold">{t('encryption')}</Label>
                    <Select
                        value={wifiConfig.encryption || 'WPA'}
                        onValueChange={(val: 'WPA' | 'WEP' | 'nopass') => 
                            onChange({ ...wifiConfig, encryption: val })
                        }
                        disabled={disabled}
                    >
                        <SelectTrigger className="h-12">
                            <SelectValue placeholder={t('selectEncryption')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="WPA">WPA/WPA2</SelectItem>
                            <SelectItem value="WEP">WEP</SelectItem>
                            <SelectItem value="nopass">No Encryption</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="hidden"
                        checked={wifiConfig.hidden || false}
                        onChange={(e) => onChange({ ...wifiConfig, hidden: e.target.checked })}
                        disabled={disabled}
                        className="w-4 h-4 rounded border-border"
                    />
                    <Label htmlFor="hidden" className="text-sm font-medium">
                        {t('hiddenNetwork')}
                    </Label>
                </div>
            </div>
        );
    }

    // vCard input
    if (contentType === 'vcard') {
        const vcard = (value || {}) as Partial<VCardConfig>;

        return (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName" className="font-bold">{t('firstName')}</Label>
                        <Input
                            id="firstName"
                            value={vcard.firstName || ''}
                            onChange={(e) => onChange({ ...vcard, firstName: e.target.value })}
                            placeholder={t('firstNamePlaceholder')}
                            disabled={disabled}
                            className="h-12"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName" className="font-bold">{t('lastName')}</Label>
                        <Input
                            id="lastName"
                            value={vcard.lastName || ''}
                            onChange={(e) => onChange({ ...vcard, lastName: e.target.value })}
                            placeholder={t('lastNamePlaceholder')}
                            disabled={disabled}
                            className="h-12"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="organization" className="font-bold">{t('organization')}</Label>
                    <Input
                        id="organization"
                        value={vcard.organization || ''}
                        onChange={(e) => onChange({ ...vcard, organization: e.target.value })}
                        placeholder={t('organizationPlaceholder')}
                        disabled={disabled}
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="title" className="font-bold">{t('title')}</Label>
                    <Input
                        id="title"
                        value={vcard.title || ''}
                        onChange={(e) => onChange({ ...vcard, title: e.target.value })}
                        placeholder={t('titlePlaceholder')}
                        disabled={disabled}
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone" className="font-bold">{t('phone')}</Label>
                    <Input
                        id="phone"
                        value={vcard.phone || ''}
                        onChange={(e) => onChange({ ...vcard, phone: e.target.value })}
                        placeholder={t('phonePlaceholder')}
                        disabled={disabled}
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="font-bold">{t('email')}</Label>
                    <Input
                        id="email"
                        type="email"
                        value={vcard.email || ''}
                        onChange={(e) => onChange({ ...vcard, email: e.target.value })}
                        placeholder={t('emailPlaceholder')}
                        disabled={disabled}
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="url" className="font-bold">{t('website')}</Label>
                    <Input
                        id="url"
                        type="url"
                        value={vcard.url || ''}
                        onChange={(e) => onChange({ ...vcard, url: e.target.value })}
                        placeholder={t('websitePlaceholder')}
                        disabled={disabled}
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address" className="font-bold">{t('address')}</Label>
                    <Textarea
                        id="address"
                        value={vcard.address || ''}
                        onChange={(e) => onChange({ ...vcard, address: e.target.value })}
                        placeholder={t('addressPlaceholder')}
                        disabled={disabled}
                        className="min-h-[80px] resize-none"
                    />
                </div>
            </div>
        );
    }

    // SMS input
    if (contentType === 'sms') {
        const sms = (value || {}) as Partial<SMSConfig>;

        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="font-bold">{t('phoneNumber')}</Label>
                    <Input
                        id="phoneNumber"
                        value={sms.phoneNumber || ''}
                        onChange={(e) => onChange({ ...sms, phoneNumber: e.target.value })}
                        placeholder={t('phoneNumberPlaceholder')}
                        disabled={disabled}
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message" className="font-bold">{t('message')}</Label>
                    <Textarea
                        id="message"
                        value={sms.message || ''}
                        onChange={(e) => onChange({ ...sms, message: e.target.value })}
                        placeholder={t('messagePlaceholder')}
                        disabled={disabled}
                        className="min-h-[120px] resize-none"
                    />
                </div>
            </div>
        );
    }

    // Email input
    if (contentType === 'email') {
        const email = (value || {}) as Partial<EmailConfig>;

        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="emailAddress" className="font-bold">{t('emailAddress')}</Label>
                    <Input
                        id="emailAddress"
                        type="email"
                        value={email.email || ''}
                        onChange={(e) => onChange({ ...email, email: e.target.value })}
                        placeholder={t('emailAddressPlaceholder')}
                        disabled={disabled}
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="subject" className="font-bold">{t('subject')}</Label>
                    <Input
                        id="subject"
                        value={email.subject || ''}
                        onChange={(e) => onChange({ ...email, subject: e.target.value })}
                        placeholder={t('subjectPlaceholder')}
                        disabled={disabled}
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="body" className="font-bold">{t('body')}</Label>
                    <Textarea
                        id="body"
                        value={email.body || ''}
                        onChange={(e) => onChange({ ...email, body: e.target.value })}
                        placeholder={t('bodyPlaceholder')}
                        disabled={disabled}
                        className="min-h-[120px] resize-none"
                    />
                </div>
            </div>
        );
    }

    return null;
};

export default ContentInput;

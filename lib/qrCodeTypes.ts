import { FileText, Link, Notebook, Wifi, User, MessageSquare, Mail, type LucideIcon } from 'lucide-react';

// QR Code content types
export type QRContentType = 'text' | 'url' | 'note' | 'wifi' | 'vcard' | 'sms' | 'email';

// Text format types (for text/url/note content)
export type TextFormatType = 'plain' | 'markdown' | 'url';

// Code syntax languages
export const codeLanguages = [
    { value: '', label: 'Select language...' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'scala', label: 'Scala' },
    { value: 'sql', label: 'SQL' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'scss', label: 'SCSS' },
    { value: 'bash', label: 'Bash/Shell' },
    { value: 'json', label: 'JSON' },
    { value: 'yaml', label: 'YAML' },
    { value: 'xml', label: 'XML' },
    { value: 'markdown', label: 'Markdown' },
];

export interface QRCodeOptions {
    size: number;
    foregroundColor: string;
    backgroundColor: string;
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
    includeMargin?: boolean;
}

export interface WiFiConfig {
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
    hidden?: boolean;
}

export interface VCardConfig {
    firstName: string;
    lastName: string;
    organization?: string;
    title?: string;
    phone?: string;
    email?: string;
    url?: string;
    address?: string;
}

export interface SMSConfig {
    phoneNumber: string;
    message: string;
}

export interface EmailConfig {
    email: string;
    subject?: string;
    body?: string;
}

// Generate QR content string based on type
export function generateQRContent(type: QRContentType, data: any): string {
    switch (type) {
        case 'wifi': {
            const config = data as WiFiConfig;
            const hidden = config.hidden ? ';H:true' : '';
            return `WIFI:T:${config.encryption};S:${config.ssid};P:${config.password}${hidden};`;
        }
        case 'vcard': {
            const config = data as VCardConfig;
            return [
                'BEGIN:VCARD',
                'VERSION:3.0',
                `N:${config.lastName};${config.firstName}`,
                `FN:${config.firstName} ${config.lastName}`,
                config.organization ? `ORG:${config.organization}` : '',
                config.title ? `TITLE:${config.title}` : '',
                config.phone ? `TEL:${config.phone}` : '',
                config.email ? `EMAIL:${config.email}` : '',
                config.url ? `URL:${config.url}` : '',
                config.address ? `ADR;;${config.address}` : '',
                'END:VCARD',
            ].filter(Boolean).join('\n');
        }
        case 'sms': {
            const config = data as SMSConfig;
            return `SMSTO:${config.phoneNumber}:${config.message}`;
        }
        case 'email': {
            const config = data as EmailConfig;
            const subject = config.subject ? `?subject=${encodeURIComponent(config.subject)}` : '';
            const body = config.body ? `&body=${encodeURIComponent(config.body)}` : '';
            return `mailto:${config.email}${subject}${body}`;
        }
        default:
            return String(data);
    }
}

// Default QR code options
export const defaultQRCodeOptions: QRCodeOptions = {
    size: 300,
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    errorCorrectionLevel: 'M',
    includeMargin: true,
};

// Size presets
export const sizePresets = [
    { label: 'Small (150×150)', value: 150 },
    { label: 'Medium (300×300)', value: 300 },
    { label: 'Large (500×500)', value: 500 },
    { label: 'Extra Large (800×800)', value: 800 },
];

// Error correction level descriptions
export const errorCorrectionLevels = [
    { value: 'L', label: 'Low (7%)', description: 'Smallest size, least damage tolerance' },
    { value: 'M', label: 'Medium (15%)', description: 'Balanced size and tolerance' },
    { value: 'Q', label: 'Quartile (25%)', description: 'Good damage tolerance' },
    { value: 'H', label: 'High (30%)', description: 'Best tolerance, largest size' },
];

// Content type labels
export const contentTypeLabels: Record<QRContentType, { label: string; description: string; icon: LucideIcon }> = {
    text: { label: 'Plain Text', description: 'Simple text content', icon: FileText },
    url: { label: 'URL', description: 'Website link', icon: Link },
    note: { label: 'Note', description: 'Longer text or message', icon: Notebook },
    wifi: { label: 'WiFi', description: 'Network credentials', icon: Wifi },
    vcard: { label: 'vCard', description: 'Contact information', icon: User },
    sms: { label: 'SMS', description: 'Text message', icon: MessageSquare },
    email: { label: 'Email', description: 'Email address', icon: Mail },
};

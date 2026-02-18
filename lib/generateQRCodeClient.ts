import QRCode from 'qrcode';
import type { QRCodeOptions } from './qrCodeTypes';

/**
 * Generate QR code as base64 data URL
 */
export const generateQRCodeDataUrl = async (
    content: string,
    options: QRCodeOptions
): Promise<string> => {
    const { size, foregroundColor, backgroundColor, errorCorrectionLevel, includeMargin } = options;

    try {
        const dataUrl = await QRCode.toDataURL(content, {
            width: size,
            margin: includeMargin ? 4 : 1,
            color: {
                dark: foregroundColor,
                light: backgroundColor,
            },
            errorCorrectionLevel,
        });

        return dataUrl;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw new Error('Failed to generate QR code');
    }
};

/**
 * Generate QR code as SVG string
 */
export const generateQRCodeSvg = async (
    content: string,
    options: QRCodeOptions
): Promise<string> => {
    const { foregroundColor, backgroundColor, errorCorrectionLevel, includeMargin } = options;

    try {
        const svg = await QRCode.toString(content, {
            type: 'svg',
            margin: includeMargin ? 4 : 1,
            color: {
                dark: foregroundColor,
                light: backgroundColor,
            },
            errorCorrectionLevel,
        });

        return svg;
    } catch (error) {
        console.error('Error generating QR code SVG:', error);
        throw new Error('Failed to generate QR code SVG');
    }
};

/**
 * Download QR code as image file
 */
export const downloadQRCode = async (
    content: string,
    options: QRCodeOptions,
    filename: string = 'qr-code',
    format: 'png' | 'svg' = 'png'
): Promise<void> => {
    try {
        if (format === 'svg') {
            const svg = await generateQRCodeSvg(content, options);
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${filename}.svg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } else {
            const dataUrl = await generateQRCodeDataUrl(content, options);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `${filename}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } catch (error) {
        console.error('Error downloading QR code:', error);
        throw new Error('Failed to download QR code');
    }
};

/**
 * Copy QR code image to clipboard
 */
export const copyQRCodeToClipboard = async (
    content: string,
    options: QRCodeOptions
): Promise<boolean> => {
    try {
        const dataUrl = await generateQRCodeDataUrl(content, options);
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        
        if (navigator.clipboard && 'write' in navigator.clipboard) {
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob,
                }),
            ]);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Error copying QR code to clipboard:', error);
        return false;
    }
};

/**
 * Share QR code using Web Share API
 */
export const shareQRCode = async (
    content: string,
    options: QRCodeOptions,
    title: string = 'QR Code',
    text: string = 'Check out this QR code!'
): Promise<boolean> => {
    try {
        const dataUrl = await generateQRCodeDataUrl(content, options);
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], 'qr-code.png', { type: 'image/png' });

        if (navigator.share && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title,
                text,
                files: [file],
            });
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error sharing QR code:', error);
        return false;
    }
};

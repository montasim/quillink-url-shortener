import QRCode from 'qrcode';

const generateQRCode = (url: string): Promise<string> => {
    return QRCode.toDataURL(url); // returns base64-encoded image
};

export default generateQRCode;

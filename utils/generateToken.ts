import crypto from 'crypto';

const generateToken = async () => {
    return crypto.randomBytes(32).toString('hex');
};

export default generateToken;

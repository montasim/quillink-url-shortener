import jwt from 'jsonwebtoken';
import configuration from '@/configuration/configuration';
import COOKIES from '@/constants/cookies';
import { ISignedJwtPayload, ITokenUserDetails } from '@/types/types';

export const createToken = async (userDetails: ITokenUserDetails) => {
    // Convert expiration minutes to milliseconds for Date object calculation
    const accessTokenExpirationMs =
        configuration.jwt.accessToken.expiration * 60 * 1000;
    const refreshTokenExpirationMs =
        configuration.jwt.refreshToken.expiration * 60 * 1000;

    const accessTokenDetails: Omit<ISignedJwtPayload, 'iat' | 'exp'> = {
        type: COOKIES.TYPE.ACCESS,
        expiry: new Date(Date.now() + accessTokenExpirationMs).toISOString(), // Store as ISO string
        currentUser: { ...userDetails },
    };

    const refreshTokenDetails: Omit<ISignedJwtPayload, 'iat' | 'exp'> = {
        type: COOKIES.TYPE.REFRESH,
        expiry: new Date(Date.now() + refreshTokenExpirationMs).toISOString(), // Store as ISO string
        currentUser: { ...userDetails },
    };

    const accessToken = jwt.sign(
        accessTokenDetails,
        configuration.jwt.accessToken.secret,
        {
            expiresIn: `${configuration.jwt.accessToken.expiration}m`,
        }
    );

    const refreshToken = jwt.sign(
        refreshTokenDetails,
        configuration.jwt.refreshToken.secret,
        {
            expiresIn: `${configuration.jwt.refreshToken.expiration}m`,
        }
    );

    // Only return accessToken and refreshToken, tokenDetails object is not typically returned
    return { accessToken, refreshToken };
};

export const verifyToken = (
    token: string,
    type: 'access' | 'refresh' = COOKIES.TYPE.ACCESS
): ISignedJwtPayload => {
    // Corrected return type
    const secret =
        type === COOKIES.TYPE.ACCESS
            ? configuration.jwt.accessToken.secret
            : configuration.jwt.refreshToken.secret;

    try {
        // Explicitly cast to SignedJwtPayload as jwt.verify returns `object | string`
        return jwt.verify(token, secret) as ISignedJwtPayload;
    } catch (err) {
        // It's better to throw an error with more specific information if possible,
        // or just re-throw the original error after logging.
        // For now, keeping your existing error message.
        console.error('Token verification error:', err);
        throw new Error('Invalid or expired token');
    }
};

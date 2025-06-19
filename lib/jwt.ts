import jwt from 'jsonwebtoken';
import configuration from '@/configuration/configuration';
import COOKIES from '@/constants/cookies';
import { ISignedJwtPayload, ITokenUserDetails } from '@/types/types';

export const signToken = (
    payload: Omit<ISignedJwtPayload, 'iat' | 'exp'>,
    secret: string,
    expiresInMinutes: number
): string => {
    return jwt.sign(payload, secret, {
        expiresIn: `${expiresInMinutes}m`,
    });
};

export const createToken = async (userDetails: ITokenUserDetails) => {
    const accessTokenExpirationMinutes =
        configuration.jwt.accessToken.expiration;
    const refreshTokenExpirationMinutes =
        configuration.jwt.refreshToken.expiration;

    const accessTokenDetails: Omit<ISignedJwtPayload, 'iat' | 'exp'> = {
        type: COOKIES.TYPE.ACCESS,
        expiry: new Date(
            Date.now() + accessTokenExpirationMinutes
        ).toISOString(),
        currentUser: { ...userDetails },
    };

    const refreshTokenDetails: Omit<ISignedJwtPayload, 'iat' | 'exp'> = {
        type: COOKIES.TYPE.REFRESH,
        expiry: new Date(
            Date.now() + refreshTokenExpirationMinutes
        ).toISOString(),
        currentUser: { ...userDetails },
    };

    const accessToken = signToken(
        accessTokenDetails,
        configuration.jwt.accessToken.secret,
        accessTokenExpirationMinutes
    );

    const refreshToken = signToken(
        refreshTokenDetails,
        configuration.jwt.refreshToken.secret,
        refreshTokenExpirationMinutes
    );

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

import jwt from 'jsonwebtoken';
import configuration from '@/configuration/configuration';

export const createToken = async (userDetails: {}) => {
    const tokenDetails = {
        expiry: new Date(Date.now() + configuration.jwt.accessToken.expiration),
        currentUser: { ...userDetails },
    };

    const accessTokenDetails = {
        type: 'access',
        ...tokenDetails,
    };

    const refreshTokenDetails = {
        type: 'refresh',
        ...tokenDetails,
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

    return { accessToken, refreshToken, tokenDetails };
};

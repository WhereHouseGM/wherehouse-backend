import * as jwt from 'jsonwebtoken';
import authConfig from '@configs/auth';

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
}

export function buildTokenResponse(userId: number): TokenResponse {
    const accessToken = jwt.sign({
        userId: userId,
        expiresIn: authConfig.jwt.accessTokenExpiresIn
    }, authConfig.jwt.secret);

    const refreshToken = jwt.sign({
        userId: userId,
        expiresIn: authConfig.jwt.refreshTokenExpiresIn
    }, authConfig.jwt.secret);

    const tokenType = authConfig.jwt.tokenType;

    return {
        accessToken,
        refreshToken,
        tokenType
    };
}
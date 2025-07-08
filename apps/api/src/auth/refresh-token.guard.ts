import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('refresh-jwt') {
  handleRequest(err, user, info, context) {
    const res: Response = context.switchToHttp().getResponse();

    if (err || !user) {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      throw (
        err || new UnauthorizedException('Refresh token is invalid or expired')
      );
    }

    return user;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('refresh-jwt') {
  handleRequest(err, user) {
    if (err || !user) {
      throw (
        err || new UnauthorizedException('Refresh token is invalid or expired')
      );
    }
    return user;
  }
}

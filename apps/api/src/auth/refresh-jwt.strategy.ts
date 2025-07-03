import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.['refreshToken'],
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'refresh_secret',
      passReqToCallback: true,
    });
  }

  async validate(payload: { sub: string }) {
    const user = await this.userService.findOne(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    return { userId: user.id };
  }
}

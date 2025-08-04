import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { DatabaseService } from 'src/database/database.service';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user || !(await compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(
      user.id,
      user.role,
      user.userName,
    );
    const refreshToken = this.generateRefreshToken(user.id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  async register(registerDto: CreateUserDto) {
    const emailExists = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (emailExists) {
      throw new ConflictException('Email is already registered');
    }

    const userNameExists = await this.prisma.user.findUnique({
      where: { userName: registerDto.userName },
    });

    if (userNameExists) {
      throw new ConflictException('Username is already taken');
    }

    const hashedPassword = await hash(registerDto.password, 10);

    return this.prisma.user.create({
      data: {
        ...registerDto,
        password: hashedPassword,
      },
    });
  }

  async refresh(req: Request, res: Response) {
    const user = req.user as any;

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const accessToken = this.generateAccessToken(
      user.userId,
      user.role,
      user.userName,
    );
    const refreshToken = this.generateRefreshToken(user.userId);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  async logout(res: Response) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return { message: 'Successfully logged out!' };
  }

  private generateAccessToken(userId: string, role: string, userName: string) {
    const payload = { sub: userId, role, userName };
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  private generateRefreshToken(userId: string) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}

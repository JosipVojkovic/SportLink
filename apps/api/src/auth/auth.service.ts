import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { DatabaseService } from 'src/database/database.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { Request, Response } from 'express';

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

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    return;
  }

  async create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async findAll() {
    return `This action returns all auth`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  async remove(id: number) {
    return `This action removes a #${id} auth`;
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

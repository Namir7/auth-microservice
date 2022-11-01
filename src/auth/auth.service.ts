import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './types/jwt-payload.type';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { SignUpDto } from './dto/sign-in.dto';
import { SignInResponse } from './dto/sign-in-response.dto';
import { SignInDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto): Promise<any> {
    const { email, password } = dto;

    const candidate = await this.usersService.findOne(email);

    if (candidate) {
      throw new BadRequestException('user already exist');
    }

    const passwordHashed = await this._hashPassword(password);

    const user = await this.usersService.createUser({
      email,
      password: passwordHashed,
    });

    return user;
  }

  async signIn(dto: SignInDto): Promise<SignInResponse> {
    const { email, password } = dto;

    const user = await this._validateUser(email, password);

    const payload: JwtPayload = {
      sub: user.id,
    };

    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
    };
  }

  private async _validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(email);

    const passwordHashed = await this._hashPassword(password);

    if (!user || user.password !== passwordHashed) {
      throw new BadRequestException('invalid user');
    }

    return user;
  }

  private async _hashPassword(password: string) {
    const salt = this.configService.get<number>('app.salt');

    return hash(password, salt);
  }
}

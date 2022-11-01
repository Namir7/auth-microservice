import { registerAs } from '@nestjs/config';

interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export const jwtConfig = registerAs(
  'jwt',
  (): JwtConfig => ({
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '60m',
  }),
);

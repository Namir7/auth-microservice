import { registerAs } from '@nestjs/config';

interface AppConfig {
  port: number;
  salt: number;
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    port: parseInt(process.env.APP_PORT),
    salt: parseInt(process.env.SALT),
  }),
);

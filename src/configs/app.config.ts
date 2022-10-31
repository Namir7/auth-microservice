import { registerAs } from '@nestjs/config';

interface AppConfig {
  env: string;
  port: number;
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    env: process.env.NODE_ENV,
    port: parseInt(process.env.APP_PORT),
  }),
);

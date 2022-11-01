import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './configs/app.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { jwtConfig } from './configs/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig],
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}

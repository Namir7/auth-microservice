import { IntrospectAndCompose } from '@apollo/gateway';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { gqlConfig } from './configs/gql.config';
import { appConfig } from './configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, gqlConfig],
    }),
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory: (configService: ConfigService) => ({
        gateway: {
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'users',
                url: configService.get<string>('gql.usersSubgraphUrl'),
              },
              {
                name: 'games',
                url: configService.get<string>('gql.gamesSubgraphUrl'),
              },
              {
                name: 'utils',
                url: configService.get<string>('gql.utilsSubgraphUrl'),
              },
            ],
          }),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}

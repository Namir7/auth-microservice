import { registerAs } from '@nestjs/config';

interface GqlConfig {
  usersSubgraphUrl: string;
  gamesSubgraphUrl: string;
  utilsSubgraphUrl: string;
}

export const gqlConfig = registerAs(
  'gql',
  (): GqlConfig => ({
    usersSubgraphUrl: process.env.GQL_USERS_SUBGRAPH_URL,
    gamesSubgraphUrl: process.env.GQL_GAMES_SUBGRAPH_URL,
    utilsSubgraphUrl: process.env.GQL_UTILS_SUBGRAPH_URL,
  }),
);

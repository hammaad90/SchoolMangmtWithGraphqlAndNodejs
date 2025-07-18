import { ApolloServer } from 'apollo-server-express';
import http from 'http';

import { typeDefs, resolvers } from './graphql';
import { MONGODB_URI, PORT } from './config';
import mongoose from 'mongoose';
import redisClient from './services/redisClient';
import app from './app';
import applyRoutes from './routes';
import { initKafka } from './services/kafka';

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    await redisClient.connect();

    await initKafka();
    console.log('Kafka initialized');

    applyRoutes(app);

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();

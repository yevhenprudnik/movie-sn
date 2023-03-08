import fp from 'fastify-plugin';
import * as mongo from '@fastify/mongodb';
import { DB_CONNECTION } from '../../environment';

export default fp<mongo.FastifyMongodbOptions>(async fastify => {
  fastify.register(mongo, {
    forceClose: true,
    url: DB_CONNECTION,
  });
});

import fp from 'fastify-plugin';
import * as mongo from '@fastify/mongodb';
import { DB_CONNECTION } from '../../environment';

/**
 * This plugins adds some utilities to handle http errors
 */
export default fp<mongo.FastifyMongodbOptions>(async fastify => {
  fastify.register(mongo, {
    forceClose: true,
    url: DB_CONNECTION,
  });
});

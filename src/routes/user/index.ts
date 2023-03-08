import { FastifyPluginAsync } from 'fastify';

const userRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    const db = fastify.mongo.client.db();

    const usersCollection = db.collection('users');

    return usersCollection.find().toArray();
  });
};

export default userRoutes;

import { FastifyPluginAsync } from 'fastify';

const movieRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    const db = fastify.mongo.client.db();

    const moviesCollection = db.collection('movies');

    return moviesCollection.find().toArray();;
  });
};

export default movieRoutes;

import { MovieService } from './../../services/movie.service';
import { FastifyPluginAsync } from 'fastify';

const movieRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  const service = new MovieService(fastify.mongo.client.db());

  fastify.get('/', async (request, reply) => {
    return service.findAll();
  });

  fastify.get('/:id', async (request, reply) => {
    const params: any = request.params;

    return service.findById(params.id);
  });

  fastify.get('/search', async (request, reply) => {
    return service.find(request.query as any);
  });
};

export default movieRoutes;

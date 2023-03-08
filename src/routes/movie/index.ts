import * as Schemas from './schemas';
import { MovieService } from './../../services/movie.service';
import { FastifyPluginAsync, FastifyRequest } from 'fastify';

type GetByIdRequest = FastifyRequest<{
  Params: { id: string };
}>;

const movieRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  const service = new MovieService(fastify.mongo.client.db());

  fastify.get('/', async (request, reply) => {
    return service.findAll();
  });

  fastify.get(
    '/:id',
    Schemas.getMovie,
    async (request: GetByIdRequest, reply) => {
      return service.findById(request.params.id);
    }
  );

  fastify.get('/search', async (request, reply) => {
    return service.find(request.query as any);
  });
};

export default movieRoutes;

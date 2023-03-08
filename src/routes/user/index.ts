import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { AuthService } from '../../services/auth.service';

type RegisterRequest = FastifyRequest<{
  Body: { username: string; email: string; password: string };
}>;

const userRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const authService = new AuthService(fastify.mongo.client.db(), fastify.jwt);

  fastify.get('/', async (request, reply) => {
    const db = fastify.mongo.client.db();

    const usersCollection = db.collection('users');

    return usersCollection.find().toArray();
  });

  fastify.post('/register', async (request: RegisterRequest, reply) => {
    const { username, email, password } = request.body;

    return authService.register(username, email, password);
  });

  fastify.post('/logIn', async (request: RegisterRequest, reply) => {
    const { email, password } = request.body;

    return authService.logIn(email, password);
  });
};

export default userRoutes;

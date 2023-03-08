import { join } from 'path';
import AutoLoad from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';

const app: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
  });
};

export default app;
export { app };

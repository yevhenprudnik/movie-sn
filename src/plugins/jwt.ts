import fp from 'fastify-plugin';
import * as jwt from '@fastify/jwt';
import { JWT_SECRET } from '../../environment';

export default fp<jwt.FastifyJWTOptions>(async fastify => {
  fastify.register(jwt, {
    secret: JWT_SECRET as string,
  });
});

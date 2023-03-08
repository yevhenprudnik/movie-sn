import { Db, Collection } from 'mongodb';
import * as bcrypt from 'bcrypt';
import { JWT } from '@fastify/jwt';
export class AuthService {
  private collection: Collection;

  constructor(private readonly db: Db, private readonly jwt: JWT) {
    this.collection = this.db.collection('users');
  }

  public async register(username: string, email: string, password: string) {
    const candidateByUsername = await this.collection.findOne({
      username,
    });

    if (candidateByUsername) {
      throw new Error('Username is already taken');
    }

    const candidateByEmail = await this.collection.findOne({
      email,
    });

    if (candidateByEmail) {
      throw new Error('Username with specified email is already registered');
    }

    const hasPassword = await bcrypt.hash(password, 3);

    const user = await this.collection.insertOne({
      username,
      email,
      password: hasPassword,
    });

    return this.generateToken(user, 60 * 60 * 1000);
  }

  public async logIn(email: string, password: string) {
    const user = await this.collection.findOne({
      email,
    });

    if (!user) {
      throw new Error('User is not found');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error('Wrong credentials');
    }

    return this.generateToken(user, 60 * 60 * 1000);
  }

  private async generateToken(payload: any, expiresIn: number) {
    return this.jwt.sign(payload, {
      expiresIn,
    });
  }

  // private async verifyToken(token: string) {
  //   return this.jwt.verify(token);
  // }

  // private async decodeToken(token: string) {
  //   return this.jwt.decode(token);
  // }
}

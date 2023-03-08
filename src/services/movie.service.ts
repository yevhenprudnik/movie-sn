import { ObjectId } from '@fastify/mongodb';
import { Collection, Db } from 'mongodb';

type MovieFindOptions = {
  genre: string;
  category: string;
};

export class MovieService {
  private collection: Collection;

  constructor(private readonly db: Db) {
    this.collection = this.db.collection('movies');
  }

  public findAll() {
    return this.collection.find().toArray();
  }

  public findById(id: string) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  public find(filter: MovieFindOptions) {
    return this.collection
      .find({
        genre: { $all: [filter.genre] },
      })
      .sort({
        Rating: -1,
      })
      .toArray();
  }
}

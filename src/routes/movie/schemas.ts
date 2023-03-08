const typeString = {
  type: 'string',
};

const typeInteger = {
  type: 'integer',
};

const movie = {
  _id: typeString,
  title: typeString,
  subtitle: typeString,
  genre: {
    type: 'array',
    items: typeString,
  },
  year: typeInteger,
  director: typeString,
  runtime: typeInteger,
  image: typeString,
  trailer: typeString,
  synopsis: typeString,
  company: {
    type: 'array',
    items: typeString,
  },
  mood: {
    type: 'array',
    items: typeString,
  },
  category: {
    type: 'array',
    items: typeString,
  },
  rating: {
    type: 'number',
  },
  imdbRating: {
    type: 'number',
  },
  quantityOfRatings: typeInteger,
};

movie;

export const getMovie = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: typeString,
      },
    },
    response: {
      '2xx': {
        type: 'object',
        properties: movie,
      },
    },
  },
};

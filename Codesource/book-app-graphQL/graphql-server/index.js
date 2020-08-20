const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
type Book {
  title: String
  author: String
  description: String
}
type Query {
  books: [Book]
}
type Mutation {
  createBook(title: String, author: String, description: String): Book
}
schema {
  query: Query
  mutation: Mutation
}
`
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    description: 'testing shit'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    description: 'Shit is getting real'
  },
  {
    title: 'test book',
    author: 'Moses west',
    description: 'This is a demo graphQL project'
  }
]

function save ({ title, author, description }) {
  let item = { title, author, description }
  books.unshift(item)
  return item
}
const resolvers = {
  Query: {
    books: () => books
  },
  Mutation: {
    async createBook (_, { title, author, description }) {
      return await save({ title, author, description })
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen()
  .then(({ url }) => console.log(`? Server ready at ${url}`))
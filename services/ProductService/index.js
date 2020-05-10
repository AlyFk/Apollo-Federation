const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const { products } = require("../../data");

const port = 4002;

const typeDefs = gql`
  type Product {
    id: ID!
    title: String
    customer: [User] @provides(fields: "name")
    seller: User @provides(fields: "name")
  }
  extend type User @key(fields: "id") {
    id: ID! @external
    name: String @external
    buy: [Product]
    sell: [Product]
  }
  extend type Query {
    product(id: ID!): Product!
    products: [Product]
  }
`;

const resolvers = {
  Product: {
    customer(products) {
      return products.customer.map(customer => ({
        __typename: "User",
        id: customer
      }));
    },
    seller(products) {
      return { __typename: "User", id: products.seller };
    }
  },
  User: {
    buy(user) {
      console.log(user)
      return products.filter(product =>
        product.customers.find(customer => customer === user.id)
      );
    },
    sell(user) {
      return products.filter(product => product.seller === user.id);
    }
  },
  Query: {
    product(_, { id }) {
      return products.find(product => product.id === id);
    },
    products() {
      return products;
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen({ port }).then(({ url }) => {
  console.log(`Films service ready at ${url}`);
});

const { prisma } = require("./generated/prisma-client");
const { GraphQLServer } = require("graphql-yoga");

// const resolvers = {
//   Query: {
//     info: () => `This is the API of a Hackernews Clone`,
//     feed: (root, args, context, info) => {
//       return context.prisma.links();
//     },
//     link: (parent, args) => {
//       const link = links.find(linkObj => linkObj.id === args.id);
//       return link;
//     }
//   },
//   Mutation: {
//     post: (root, args, context) => {
//       return context.prisma.createLink({
//         url: args.url,
//         description: args.description
//       });
//     },
//     updateLink: (parent, args) => {
//       const updatedLinkIndex = links.findIndex(
//         linkObj => linkObj.id === args.id
//       );
//       links[updatedLinkIndex].url = args.url;
//       links[updatedLinkIndex].description = args.description;
//       return links[updatedLinkIndex];
//     },
//     deleteLink: (parent, args) => {
//       const deleteLinkIndex = links.findIndex(
//         linkObj => linkObj.id === args.id
//       );
//       const deletedLink = links.splice(deleteLinkIndex, 1);
//       return deletedLink[0];
//     }
//   }
// };

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Vote = require("./resolvers/Vote");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));

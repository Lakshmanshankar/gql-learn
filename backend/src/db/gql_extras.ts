import { db } from "~/db/db";
import { buildSchema } from "drizzle-graphql";
import { eq } from "drizzle-orm";
import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import * as drizzle_schema from "~/db/schema";
const { entities } = buildSchema(db);

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(entities.types.TasksItem),
      resolve: (user) =>
        db.query.users
          .findMany({
            where: (users, { eq }) => eq(users.id, user.id),
            with: { tasks: true },
          })
          .then((users) => users[0]?.tasks),
    },
  }),
});

const UserUpdateSingleInput = new GraphQLInputObjectType({
  name: "UserUpdateSingleInput",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: entities.queries,
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      ...entities.mutations,
      updateUserSingle: {
        type: UserType,
        args: {
          input: { type: new GraphQLNonNull(UserUpdateSingleInput) },
        },
        resolve: async (_, { input }) => {
          const { id, ...updateData } = input;
          const [user] = await db
            .update(drizzle_schema.users)
            .set(updateData)
            .where(eq(drizzle_schema.users.id, id))
            .returning();
          return user;
        },
      },
    },
  }),
  types: [...Object.values(entities.types), ...Object.values(entities.inputs)],
});



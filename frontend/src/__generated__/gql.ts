/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation createUser($values: UsersInsertInput!) {\n    insertIntoUsersSingle(values: $values) {\n      id\n      email\n      username\n    }\n  }\n": types.CreateUserDocument,
    "\n  query getUsers {\n    users {\n      id\n      email\n      username\n    }\n  }\n": types.GetUsersDocument,
    "\n  query getSingleUser($where: UsersFilters){\n    usersSingle(where: $where) {\n      username\n      email\n      id\n      tasks {\n        id\n        task_name\n        status\n      }\n    }\n  }\n": types.GetSingleUserDocument,
    "\n  mutation updateSingleU($input: UserUpdateSingleInput!){\n    updateUserSingle(input: $input) {\n      id\n      email\n      username\n    }\n  }\n": types.UpdateSingleUDocument,
    " \n  mutation create($values: TasksInsertInput!){\n    insertIntoTasksSingle(values: $values) {\n      id,\n      userId,\n      task_name,\n      status\n    }\n  }\n": types.CreateDocument,
    "\n  query getTasks{\n    tasks {\n      id,\n      status,\n      task_name,\n      userId\n      user {\n        username\n      }\n    }\n  }\n": types.GetTasksDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createUser($values: UsersInsertInput!) {\n    insertIntoUsersSingle(values: $values) {\n      id\n      email\n      username\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($values: UsersInsertInput!) {\n    insertIntoUsersSingle(values: $values) {\n      id\n      email\n      username\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUsers {\n    users {\n      id\n      email\n      username\n    }\n  }\n"): (typeof documents)["\n  query getUsers {\n    users {\n      id\n      email\n      username\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getSingleUser($where: UsersFilters){\n    usersSingle(where: $where) {\n      username\n      email\n      id\n      tasks {\n        id\n        task_name\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  query getSingleUser($where: UsersFilters){\n    usersSingle(where: $where) {\n      username\n      email\n      id\n      tasks {\n        id\n        task_name\n        status\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateSingleU($input: UserUpdateSingleInput!){\n    updateUserSingle(input: $input) {\n      id\n      email\n      username\n    }\n  }\n"): (typeof documents)["\n  mutation updateSingleU($input: UserUpdateSingleInput!){\n    updateUserSingle(input: $input) {\n      id\n      email\n      username\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " \n  mutation create($values: TasksInsertInput!){\n    insertIntoTasksSingle(values: $values) {\n      id,\n      userId,\n      task_name,\n      status\n    }\n  }\n"): (typeof documents)[" \n  mutation create($values: TasksInsertInput!){\n    insertIntoTasksSingle(values: $values) {\n      id,\n      userId,\n      task_name,\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getTasks{\n    tasks {\n      id,\n      status,\n      task_name,\n      userId\n      user {\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query getTasks{\n    tasks {\n      id,\n      status,\n      task_name,\n      userId\n      user {\n        username\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
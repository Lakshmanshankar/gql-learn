import { gql } from "@/__generated__/gql";

export const CREATE_USER = gql(/* GraphQL */ `
  mutation createUser($values: UsersInsertInput!) {
    insertIntoUsersSingle(values: $values) {
      id
      email
      username
    }
  }
`);

export const GET_USERS = gql(/* GraphQL */ `
  query getUsers {
    users {
      id
      email
      username
    }
  }
`);

export const GET_USER_SINGLE = gql(/*GRAPHQL*/ `
  query getSingleUser($where: UsersFilters){
    usersSingle(where: $where) {
      username
      email
      id
    }
  }
`);


export const UPDATE_USER_SINGLE = gql(`
  mutation updateSingleU($input: UserUpdateSingleInput!){
    updateUserSingle(input: $input) {
      id
      email
      username
    }
  }
`)

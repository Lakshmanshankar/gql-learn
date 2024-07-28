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
      tasks {
        id
        task_name
        status
      }
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

export const INSERT_TASK = gql(` 
  mutation create($values: TasksInsertInput!){
    insertIntoTasksSingle(values: $values) {
      id,
      userId,
      task_name,
      status
    }
  }
`)

export const GET_ALL_TASKS = gql(`
  query getTasks{
    tasks {
      id,
      status,
      task_name,
      userId
      user {
        username
      }
    }
  }
`)

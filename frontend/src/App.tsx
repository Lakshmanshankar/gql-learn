import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Todo } from "./todos/Todo";
import { gql } from "@/__generated__/gql";

const GET_LOCATIONS = gql(/* GraphQL */ `
  query getUsers {
    users {
      id
      email
      username
    }
  }
`);

const CREATE_USER = gql(/* GraphQL */ `
  mutation createUser($values: UsersInsertInput!){
    insertIntoUsersSingle(values: $values) {
      id,
    }
  }
`);

function App() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  const [createUser] = useMutation(CREATE_USER,{
    variables:{
      values:{
        id:123,
        email:"test@test.xx",
        username:"test"
      }
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data);
  return <>
      <Button onClick={async ()=>{
        createUser()
      }}>Click me</Button>
      <Todo/>
    </>;
}

export default App;

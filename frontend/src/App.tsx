import { useQuery, gql } from "@apollo/client";
import { Button } from "./components/ui/button";

const GET_LOCATIONS = gql`
  query getUser {
    users {
      id
      email
      username
    }
  }
`;
function App() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data);
  return <> Hello


      <Button>Click me</Button>

    </>;
}

export default App;

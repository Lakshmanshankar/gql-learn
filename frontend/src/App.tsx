import { Todo } from "@/Pages/todos/Todo";
import { CreateUser } from "./Pages/users/Create";
import { ListUsers } from "./Pages/users/List";

function App() {
  return (
    <>
      <Todo />
      <CreateUser />
      <ListUsers />
    </>
  );
}

export default App;

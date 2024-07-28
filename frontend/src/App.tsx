import { CreateTask } from "./Pages/tasks/Create";
import { ListTasks } from "./Pages/tasks/List";
import { ListUserTask } from "./Pages/tasks/ListUser";
import { CreateUser } from "./Pages/users/Create";
import { ListUsers } from "./Pages/users/List";

function App() {
  return (
    <div className="flex gap-5 m-5">
      <div>
        <CreateUser />
        <ListUsers />
      </div>
      <div>
        <CreateTask />
        <ListTasks />
      </div>
      <div>
        <ListUserTask />
      </div>
    </div>
  );
}

export default App;

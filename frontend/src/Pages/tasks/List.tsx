import { useQuery } from "@apollo/client";
import { GetTasksQuery } from "@/__generated__/graphql";
import { GET_ALL_TASKS } from "@/Pages/graphqlQueries";

export function ListTasks() {
  const { loading, error, data } = useQuery(GET_ALL_TASKS);
  console.log(data);
  if (error) return <p>Error : {error.message}</p>;
  if (loading) return <p>Loading...</p>;
  console.log(data?.tasks);
  return (
    <>
      <h1> List Tasks</h1>
      <TaskTable tasks={data?.tasks ?? []} />
    </>
  );
}

interface UserTableProps {
  tasks: GetTasksQuery["tasks"];
}

const TaskTable: React.FC<UserTableProps> = ({ tasks }) => {
  return (
    <table className="max-w-[800px] border border-slate-200 rounded-md">
      <thead>
        <tr className="bg-slate-100">
          <th className="p-2 border-b border-slate-200">ID</th>
          <th className="p-2 border-b border-slate-200">Task name</th>
          <th className="p-2 border-b border-slate-200">Status</th>
          <th className="p-2 border-b border-slate-200">Assigned</th>
          <th className="p-2 border-b border-slate-200">Edit</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} className="hover:bg-slate-50">
            <td className="p-2 border-b border-slate-200">{task.id}</td>
            <td className="p-2 border-b border-slate-200">{task.task_name}</td>
            <td className="p-2 border-b border-slate-200">{task.status}</td>
            <td className="p-2 border-b border-slate-200">{task.user?.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

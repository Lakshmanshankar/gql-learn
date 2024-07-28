import { useQuery, useLazyQuery } from "@apollo/client";
import { GetTasksQuery, TasksSelectItem } from "@/__generated__/graphql";
import { GET_USER_SINGLE, GET_USERS } from "@/Pages/graphqlQueries";
import { useState, useEffect } from "react";
import { log } from "console";

export function ListUserTask() {
  const [userId, setUserId] = useState<number | null>(null);
  const { data: userData } = useQuery(GET_USERS)
  const userInputOptions = userData?.users;
  const [getUserTasks, { data: userdata }] = useLazyQuery(GET_USER_SINGLE);
  useEffect(() => {
    if (userId !== null) {
      console.log("hello");
      // getUserTasks({
      //   variables: {
      //     where: {
      //       id: {
      //         eq: userId
      //       }
      //     }
      //   }
      // });
    }
    console.log("MOUNTED ")
  }, [userId, getUserTasks]);
  const data = (userdata?.usersSingle?.tasks);
  return (
    <>
      <h1> List Tasks</h1>
      <div className="flex flex-col">
        <label>assigned username</label>
        <select defaultValue={userInputOptions?.[0]?.id} className="p-3 rounded-md" onChange={(e) => { setUserId(parseInt(e.target.value ?? '0')) }}>
          {userInputOptions?.map((user) => {
            return <option key={user.id} value={user.id}>{user.username}</option>
          })}
        </select>
      </div >

      <TaskTable tasks={data as unknown as TasksSelectItem[] ?? []} />
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

import { useQuery } from "@apollo/client";
import { GetUsersQuery } from "@/__generated__/graphql";
import { GET_USERS } from "@/Pages/graphqlQueries";
import { UpdateUser } from "./Update";

export function ListUsers() {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data?.users);
  return (
    <>
      <h1> List User</h1>
      <UserTable users={data?.users ?? []} />
    </>
  );
}

interface UserTableProps {
  users: GetUsersQuery["users"];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <table className="max-w-[800px] border border-slate-200 rounded-md">
      <thead>
        <tr className="bg-slate-100">
          <th className="p-2 border-b border-slate-200">ID</th>
          <th className="p-2 border-b border-slate-200">Email</th>
          <th className="p-2 border-b border-slate-200">Username</th>
          <th className="p-2 border-b border-slate-200">Edit</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-slate-50">
            <td className="p-2 border-b border-slate-200">{user.id}</td>
            <td className="p-2 border-b border-slate-200">{user.email}</td>
            <td className="p-2 border-b border-slate-200">{user.username}</td>
            <td className="p-2 border-b border-slate-200">
              <UpdateUser userID={user?.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

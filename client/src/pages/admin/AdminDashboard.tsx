import { useEffect, useState } from "react";
import { getAllUser } from "../../api/admin";
import UserList from "./UsersList";
import type { UserType } from "../../typescript/user";

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadAllUsers = async () => {
      try {
        const data = await getAllUser();
        setUsers(data);
        setIsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    loadAllUsers();
  }, []);

  if (isLoaded === false) {
    return <div>loading ...</div>;
  }

  return (
    <>
      <div className="container space-y-10 m-auto my-4 border border-neutral-500/20 shadowzy rounded-xl  p-10">
        <div className="flex justify-center items-center text-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Administateur</h1>
            <p className="mt-4">
              Gérer les utilisateurs et consulter les demandes de congé.
            </p>
          </div>
        </div>

        <UserList users={users} />
      </div>
    </>
  );
};
export default AdminDashboard;

import { useEffect, useState } from "react";
import { getAllUser } from "../../api/user.api";
import UserList from "../../components/dashboard/UsersList";
import type { UserType } from "../../typescript/user";
import type { LeaveRequestType } from "../../typescript/requestLeave";
import { getAllLeaveRequest } from "../../api/leave.api";
import { useAuth } from "../../context/AuthContext";
import AllLeaveRequestList from "../../components/dashboard/AllRequestList";
import UserRoleDoughnutChart from "../../components/charts/UserRoleDoughnutChart";
import LeaveStatusDoughnutChart from "../../components/charts/LeaveStatusDoughnutChart";

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequestType[]>([]);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);
  const [isLeaveLoaded, setIsLeaveLoaded] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (!user?.role) return; // sécurité
    const loadLeaveRequests = async () => {
      try {
        const data = await getAllLeaveRequest(user.role);
        setLeaveRequest(data);
        setIsLeaveLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    loadLeaveRequests();
  }, [user]);

  useEffect(() => {
    const loadAllUsers = async () => {
      try {
        const data = await getAllUser();
        setUsers(data);
        setIsUsersLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    loadAllUsers();
  }, []);

  if (!isUsersLoaded || !isLeaveLoaded) {
    return <div>loading ...</div>;
  }

  return (
    <div className="container space-y-10 m-auto my-4 mb-24 border border-neutral-500/20 shadowzy rounded-xl p-10">
      <div className="flex justify-center items-center text-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Administrateur</h1>
          <p className="mt-4">
            Gérer les utilisateurs et consulter les demandes de congé.
          </p>
        </div>
      </div>

      <div className="space-y-20">
        <div className="flex justify-center gap-10">
          <UserRoleDoughnutChart users={users} />
          <LeaveStatusDoughnutChart leaves={leaveRequest} />
        </div>

        <AllLeaveRequestList
          leaveRequests={leaveRequest}
          userRole={user?.role}
        />

        <UserList users={users} />
      </div>
    </div>
  );
};

export default AdminDashboard;

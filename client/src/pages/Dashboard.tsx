/**
 * Espace utilisateur
 * -- selon le ROLE de l'utilisateur --
 */
import { useAuth } from "../context/AuthContext";
import DashboardHeader from "../components/dashboard/dashboardHeader";
import AdminDashboard from "./admin/AdminDashboard";
import EmployeeDashboard from "./employee/EmployeeDashboard";
import ManagerDashboard from "./manager/ManagerDashboard";

type DashboardRoleDisplayProps = {
  role?: string;
};

const DashboardRoleDisplay = ({ role }: DashboardRoleDisplayProps) => {
  if (!role) {
    return <div> Aucun utilisteur connecté</div>;
  }

  switch (role) {
    case "ADMIN":
      return <AdminDashboard />;
    case "EMPLOYE":
      return <EmployeeDashboard />;
    case "GESTIONNAIRE":
      return <ManagerDashboard />;
  }
};

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <>
      <DashboardHeader />
      <DashboardRoleDisplay role={user?.role} />
    </>
  );
};

export default Dashboard;

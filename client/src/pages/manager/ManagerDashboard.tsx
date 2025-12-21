import { useEffect, useState } from "react";
import type { LeaveRequestType } from "../../typescript/requestLeave";
import TreateRequestModal from "../../components/TreateRequestModal";
import { getAllLeaveRequest, treateLeaveRequest } from "../../api/leave.api";
import { useAuth } from "../../context/AuthContext";
import AllLeaveRequestList from "../../components/dashboard/AllRequestList";
import LeaveStatusDoughnutChart from "../../components/charts/LeaveStatusDoughnutChart";

const ManagerDashboard = () => {
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequestType[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [treating, setTreating] = useState<LeaveRequestType | null>(null);
  const { user } = useAuth();

  const openTreateModal = (request: LeaveRequestType) => {
    setTreating(request);
  };

  const handleTreate = (data: Partial<LeaveRequestType>) => {
    console.log(data._id, data.statut);
    const statut = {
      statut: data.statut,
    };
    treateLeaveRequest(data._id, statut);
    window.location.reload();
  };

  useEffect(() => {
    const loadLeaveRequests = async () => {
      try {
        const data = await getAllLeaveRequest(user?.role as string);
        setLeaveRequest(data);
        setIsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    loadLeaveRequests();
  }, [user]);

  if (isLoaded === false) {
    return <div>loading ...</div>;
  }

  return (
    <>
      <div className="container space-y-10 m-auto my-4 border border-neutral-500/20 shadowzy rounded-xl  p-10">
        <div className="flex justify-start items-start">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Gestionnaire</h1>
            <p className="mt-4">Gestion et suivi des demandes de congé.</p>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <LeaveStatusDoughnutChart leaves={leaveRequest} />
        </div>

        <AllLeaveRequestList
          userRole={user?.role as string}
          leaveRequests={leaveRequest}
          onTreate={openTreateModal}
        />
      </div>
      <TreateRequestModal
        isOpen={!!treating}
        onClose={() => setTreating(null)}
        request={treating as LeaveRequestType}
        onSubmit={handleTreate}
      />
    </>
  );
};

export default ManagerDashboard;

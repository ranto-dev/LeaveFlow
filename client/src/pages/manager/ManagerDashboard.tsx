import { useEffect, useState } from "react";
import type { LeaveRequestType } from "../../typescript/requestLeave";
import { getAllLeaveRequest, treateLeaveRequest } from "../../api/manager";
import AllLeaveRequestList from "./AllLeaveRequestList";
import TreateRequestModal from "../../components/TreateRequestModal";

const ManagerDashboard = () => {
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequestType[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [treating, setTreating] = useState<LeaveRequestType | null>(null);

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
        const data = await getAllLeaveRequest();
        setLeaveRequest(data);
        setIsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    loadLeaveRequests();
  }, []);

  if (isLoaded === false) {
    return <div>loading ...</div>;
  }

  return (
    <>
      <div className="container space-y-10 m-auto my-4 border border-neutral-500/20 shadowzy rounded-xl  p-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Gestionnaire</h1>
            <p className="mt-4">Gestion et suivi des demandes de congé.</p>
          </div>
          <div>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search ..."
              className="border border-white rounded-xl p-2"
            />
          </div>
        </div>
        <AllLeaveRequestList
          onTreate={openTreateModal}
          leaveRequests={leaveRequest}
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

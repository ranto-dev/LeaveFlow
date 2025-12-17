import { useEffect, useState } from "react";

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/me", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setUser(response);
        console.log(response);
      });
  }, []);

  return (
    <div>
      <h1>User dashboard</h1>
    </div>
  );
};

export default UserDashboard;

/**
 * Point d'entrée de l'application
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/login";
import { RoleProtectedRoute } from "./routes/RoleProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import Unauthorized from "./pages/Unauthorized";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <RoleProtectedRoute role="ADMIN">
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager"
            element={
              <RoleProtectedRoute role={["GESTIONNAIRE", "ADMIN"]}>
                <ManagerDashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/employee"
            element={
              <RoleProtectedRoute role="EMPLOYE">
                <EmployeeDashboard />
              </RoleProtectedRoute>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

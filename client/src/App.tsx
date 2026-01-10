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
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          duration: 3500,
          style: {
            background: "rgba(17, 24, 39, 0.95)",
            color: "#F9FAFB",
            padding: "14px 20px",
            borderRadius: "12px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.15)",
            fontSize: "0.95rem",
            fontWeight: 500,
            backdropFilter: "blur(8px)",
          },
        }}
      />
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

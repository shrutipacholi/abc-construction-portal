import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PortalLayout from './pages/portal/PortalLayout';
import {
  PortalDashboard,
  PortalDocuments,
  PortalMessages,
  PortalMilestones,
  PortalPayments,
  PortalProjects,
  PortalReports,
} from './pages/portal/PortalPages';
import AdminLayout from './pages/admin/AdminLayout';
import {
  AdminAdministration,
  AdminAgreements,
  AdminApprovals,
  AdminAssign,
  AdminDesign,
  AdminExpenses,
  AdminFinanceQueue,
  AdminInquiries,
  AdminOverview,
  AdminPayments,
  AdminProjects,
  AdminQuotations,
  AdminReports,
  AdminVendors,
} from './pages/admin/AdminPages';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal" element={<PortalLayout />}>
          <Route index element={<PortalDashboard />} />
          <Route path="projects" element={<PortalProjects />} />
          <Route path="milestones" element={<PortalMilestones />} />
          <Route path="payments" element={<PortalPayments />} />
          <Route path="documents" element={<PortalDocuments />} />
          <Route path="messages" element={<PortalMessages />} />
          <Route path="reports" element={<PortalReports />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="assign" element={<AdminAssign />} />
          <Route path="quotations" element={<AdminQuotations />} />
          <Route path="agreements" element={<AdminAgreements />} />
          <Route path="approvals" element={<AdminApprovals />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="expenses" element={<AdminExpenses />} />
          <Route path="finance-queue" element={<AdminFinanceQueue />} />
          <Route path="design" element={<AdminDesign />} />
          <Route path="vendors" element={<AdminVendors />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="administration" element={<AdminAdministration />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

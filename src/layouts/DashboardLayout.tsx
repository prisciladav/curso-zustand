import { SideMenu } from '../components';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores';

export const DashboardLayout = () => {

  const authState = useAuthStore(state => state.status);
  const checkStatus = useAuthStore(state => state.checkStatus);

  if (authState === 'pending') {
    checkStatus();
    return <div>Cargando...</div>;
  }

  if (authState === 'unauthorized') {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="bg-slate-200 overflow-y-scroll w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white">
      <div className="flex flex-row relative w-screen">
        <SideMenu />

        <div className="w-full p-4">
          <Outlet />
        </div>

      </div>

    </div>
  );
};
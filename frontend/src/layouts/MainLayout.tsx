import { Outlet } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";

import MonitorList from "../components/Scanner/MonitorList";

const MainLayout = () => {
  return (
    <div className="flex w-full h-full py-10">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Outlet />

      <div className="relative my-3 mx-4 h-[100%]">
        <div className="border-t-0 border border-gray-500 w-[100%] h-full"></div>
      </div>

      <MonitorList />
    </div>
  );
};

export default MainLayout;

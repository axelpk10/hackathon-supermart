import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className={`flex-1 p-5 transition-all duration-300 ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;


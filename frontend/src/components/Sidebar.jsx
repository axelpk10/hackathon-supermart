import React from "react";
import { ChevronLeft, ChevronRight, BarChart2, User, Menu } from "lucide-react";

const Sidebar = ({ isCollapsed, setIsCollapsed, currentPath = "/" }) => {
  const [isAnalyticsExpanded, setIsAnalyticsExpanded] = React.useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`h-screen bg-[#f7f7f7] transition-all duration-300 border-r flex flex-col fixed top-0 left-0 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center p-4">
        {!isCollapsed && (
          <div className="text-3xl font-bold text-orange-500">SuperMart</div>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-1 rounded-full hover:bg-gray-100 ${
            isCollapsed ? "mx-auto" : "ml-auto"
          }`}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-grow">
        <ul>
          <li>
            <a
              href="/"
              className={`flex items-center py-3 px-4 ${
                currentPath === "/"
                  ? "bg-orange-100 text-orange-500"
                  : "hover:bg-gray-50"
              }`}
            >
              {isCollapsed ? (
                <Menu className="mx-auto" size={20} />
              ) : (
                <>
                  <Menu className="mr-3" size={20} />
                  <span>Homepage</span>
                </>
              )}
            </a>
          </li>

          {/* Analytics */}
          <li>
            <a
              href="/analytics"
              onClick={(e) => {
                e.preventDefault();
                setIsAnalyticsExpanded(!isAnalyticsExpanded);
              }}
              className={`flex items-center py-3 px-4 ${
                currentPath === "/analytics"
                  ? "bg-orange-100 text-orange-500"
                  : "hover:bg-gray-50"
              }`}
            >
              {isCollapsed ? (
                <BarChart2 className="mx-auto" size={20} />
              ) : (
                <>
                  <BarChart2 className="mr-3" size={20} />
                  <span>Analytics</span>
                </>
              )}
            </a>

            {!isCollapsed && isAnalyticsExpanded && (
              <ul className="ml-9 mt-1">
                {[
                  { path: "/analytics/overview", name: "Overview" },
                  {
                    path: "/analytics/customer-insights",
                    name: "Customer Insights",
                  },
                  {
                    path: "/analytics/store-performance",
                    name: "Store Performance",
                  },
                  {
                    path: "/analytics/shopping-behaviour",
                    name: "Shopping Behaviour",
                  },
                  { path: "/analytics/marketing", name: "Marketing" },
                ].map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      className={`block py-2 ${
                        currentPath === item.path
                          ? "text-orange-500 font-medium"
                          : ""
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Account */}
      <div className="mt-auto mb-6">
        <a
          href="/account"
          className={`flex items-center py-3 px-4 ${
            currentPath === "/account"
              ? "bg-orange-100 text-orange-500"
              : "hover:bg-gray-50"
          }`}
        >
          {isCollapsed ? (
            <User className="mx-auto" size={20} />
          ) : (
            <>
              <User className="mr-3" size={20} />
              <span>Account</span>
            </>
          )}
        </a>
      </div>
    </div>
  );
};

export default Sidebar;

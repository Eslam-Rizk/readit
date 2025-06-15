import { Link, Outlet } from "react-router";

function Settings() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="grid grid-cols-6 gap-4 mt-5">
        <div className="col-span-1 flex flex-col gap-2">
          <Link
            to="/settings/profile"
            className="text-blue-500 transition-all duration-300 ease-in-out hover:text-blue-700"
          >
            Profile Settings
          </Link>
          <Link
            to="/settings/notifications"
            className="text-blue-500 transition-all duration-300 ease-in-out hover:text-blue-700"
          >
            Notification Settings
          </Link>
          <Link
            to="/settings/privacy"
            className="text-blue-500 transition-all duration-300 ease-in-out hover:text-blue-700"
          >
            Privacy Settings
          </Link>
        </div>
        <div className="col-span-4 border rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Settings;

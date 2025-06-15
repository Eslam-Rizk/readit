import { Link, useLocation } from "react-router";
import { logout } from "../utils/LoggedInUser";
import { useUser } from "../contexts/userContext";

export default function Navbar() {
  const { user, setUser } = useUser();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "btn btn-primary hover:text-white"
      : "btn btn-ghost";
  };

  return (
    <div className="sticky top-0 navbar bg-base-100 shadow-xs shadow-primary z-10">
      <div className="flex-1 text-primary ">
        <Link to="/" className="mx-2 text-xl font-extrabold hover:text-primary">
          Readit
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0 gap-5">
          <li>
            <Link to="/" className={isActive("/")}>
              Feed
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <div className="dropdown dropdown-end m-0 p-0">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar hover:ring hover:ring-primary"
                  >
                    <div className="w-10 rounded-full">
                      <img alt="avatar" src={user.avatar} />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <Link to="/profile" className={isActive("/profile")}>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" className={isActive("/settings")}>
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        onClick={() => logout(setUser)}
                        className={isActive("/login")}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className={isActive("/login")}>
                Login
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/Register" className={isActive("/Register")}>
                Register
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

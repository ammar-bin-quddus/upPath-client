import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import useAuth from "../hooks/useAuth";

const Nav = () => {
  const { user, handleLogOut } = useAuth();
  return (
    <div className="w-full flex justify-between items-center">
      <div>
        <img className="w-40 h-20" src={logo} alt="logo" />
      </div>
      <div>
        <ul className="flex items-center gap-5">
          {user?.email ? (
            <>
              <li onClick={handleLogOut} className="bg-gray-800 px-3 py-1 text-white cursor-pointer hover:bg-white hover:text-black border border-gray-800 duration-300">
                Logout
              </li>
            </>
          ) : (
            <>
              <Link to="/login">
                <li className="bg-gray-800 px-3 py-1 text-white cursor-pointer hover:bg-white hover:text-black border border-gray-800 duration-300">
                  Login
                </li>
              </Link>
              <Link to="/signup">
                <li className="bg-gray-800 px-3 py-1 text-white cursor-pointer hover:bg-white hover:text-black border border-gray-800 duration-300">
                  Register
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Nav;

import { Form, Link, NavLink, useRouteLoaderData } from "react-router-dom";
import { logo } from "../assets";

const MainNavigation = () => {
  const token = useRouteLoaderData("root");

  return (
    <nav className="w-full sticky top-0 z-10 flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6bf4]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>
      <div className="flex justify-evenly">
        {token && (
          <div className="flex justify-items-start">
            <NavLink
              to="/create-post"
              className={({ isActive }) =>
                isActive
                  ? "text-xl font-inter font-medium text-black sm:px-1 px-4 mx-4 py-2 rounded-md underline underline-offset-8"
                  : "text-xl font-inter font-medium text-black sm:px-1 px-4 mx-4 py-2 rounded-md hover:underline underline-offset-8"
              }
              end
            >
              Create
            </NavLink>
            <Form action="/logout" method="post">
              <button className="text-xl font-inter font-medium text-black sm:px-1 px-4 py-2 rounded-md hover:underline underline-offset-8">
                Singout
              </button>
            </Form>
          </div>
        )}
        {!token && (
          <NavLink
            to="/auth?mode=login"
            className={({ isActive }) =>
              isActive
                ? "text-xl font-inter font-medium text-black px-8 py-2 rounded-md underline-offset-8 underline"
                : "text-xl font-inter font-medium text-black px-8 py-2 rounded-md underline-offset-8 hover:underline"
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;

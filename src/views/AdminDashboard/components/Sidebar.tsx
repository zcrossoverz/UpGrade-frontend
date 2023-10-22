import { PRIVATE_ROUTES } from "@/contants/routes";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname.replace("/admin", "");

  console.log(currentPath);

  return (
    <aside
      className={`text-white absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0`}
    >
      <div className='flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5'>
        <NavLink to=''>
          <div className='flex mt-4 ml-2 font-bold text-xl'>
            <p className='text-red-500'>Up</p>
            <p>Grade</p>
          </div>
        </NavLink>
      </div>

      <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
        <nav className='mt-5 py-4 px-4 lg:mt-9 lg:px-6'>
          <div>
            <h3 className='mb-4 ml-4 text-sm font-semibold text-gray-400'>
              MENU
            </h3>
            <div className='flex flex-col'>
              {PRIVATE_ROUTES.filter(
                ({ requireAdmin }) => requireAdmin === true
              ).map(({ name, path, children }, i) => (
                <Link
                  key={i.toString()}
                  to={path.replace("/", "")}
                  className={`mt-[5px] py-2 hover:bg-gray-600 px-4 min-w-[230px] rounded-sm ${
                    currentPath === path ? "bg-gray-600" : ""
                  }`}
                >
                  <div className='flex justify-between'>
                    {name}
                    <div
                      className={`flex items-center justify-center ${
                        children === undefined && "hidden"
                      }`}
                    >
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                  {/* <div className='ml-4'>sdf</div> */}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
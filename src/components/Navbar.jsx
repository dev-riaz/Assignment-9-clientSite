import Image from "next/image";
import Link from "next/link";
import { MdHealthAndSafety } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="navbar md:w-11/12 w-full mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="" href={"/"}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="" href={"allAppointments"}>
                  All Appointments
                </Link>
              </li>
              <li>
                <Link className="" href={"/dashboard"}>
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="logo p-2 rounded-2xl">
             
              <MdHealthAndSafety className="text-white " />
            </div>
            <h1 className="text-2xl font-bold text-[#112B5F]">DocAppoint</h1>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link className="" href={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className="" href={"/allAppointments"}>
                All Appointments
              </Link>
            </li>
            <li>
              <Link className="" href={"/dashboard"}>
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end space-x-2">
          <Link href={"/"} className="btn border-2 border-[#0F7A73] rounded-full shadow-none bg-white text-[#0F7A73]">
            Log In
          </Link>
          <Link href={"/"} className="btn bg-gradient-to-r from-[#0F7A73] to-[#5A54F2] text-white border-none hover:opacity-90 rounded-full shadow-none">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

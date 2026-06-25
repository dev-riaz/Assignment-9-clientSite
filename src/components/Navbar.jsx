"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { MdHealthAndSafety } from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Appointments", path: "/allAppointments" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="navbar md:w-11/12 mx-auto w-full">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-3 w-56 p-2 shadow"
            >
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`!bg-transparent !no-underline ${
                      isActive(link.path)
                        ? "!text-[#0F7A73] font-bold bg-[#EAF3F3]"
                        : "!text-gray-600 hover:!text-[#0F7A73]"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-[#0F7A73] to-[#5A54F2] p-2 rounded-xl">
              <MdHealthAndSafety size={24} className="text-white" />
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-[#112B5F]">
              DocAppoint
            </h1>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`!bg-transparent !rounded-none !no-underline font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? "!text-[#0F7A73] border-b-2 border-[#0F7A73]"
                      : "!text-gray-600 hover:!text-[#0F7A73]"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-2">
          {isPending ? (
            // Avoid a flash of the wrong buttons while session is loading
            <div className="h-9 w-24" />
          ) : session ? (
            <button
              onClick={handleSignOut}
              className="btn bg-red-500 hover:bg-red-600 text-white font-medium transition border-none rounded-full shadow-none hover:opacity-90"
            >
              LogOut<FiLogOut />
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="btn border-2 border-[#0F7A73] rounded-full shadow-none bg-white text-[#0F7A73] hover:bg-[#0F7A73] hover:text-white"
              >
                Log In
              </Link>

              <Link
                href="/register"
                className="btn bg-gradient-to-r from-[#0F7A73] to-[#5A54F2] text-white border-none rounded-full shadow-none hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

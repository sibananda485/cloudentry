import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../logo.png";
import Profile from "../profile.png";
import noteContext from "../context/notes/notesContext";

export default function Navbar() {
  const {userName} = useContext(noteContext)
  const navigate = useNavigate();
  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                onClick={() => {
                  document
                    .getElementById("mobile-menu")
                    .classList.toggle("hidden");
                }}
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          --> */}
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          --> */}
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-start justify-center sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  id="logo"
                  className="h-8 w-auto filter invert"
                  src={Logo}
                  alt="Your Company"
                />
                <Link to="/" className="text-white ms-3 text-2xl">
                  CloudEntry
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block h-fit">
                <div className="flex space-x-4">
                  {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                  <Link
                    to="/"
                    className={`${
                      useLocation().pathname === "/"
                        ? "bg-gray-900  text-white hover:bg-gray-900"
                        : ""
                    } text-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white`}
                    aria-current="page"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className={`${
                      useLocation().pathname === "/about"
                        ? "bg-gray-900 text-white hover:bg-gray-900"
                        : ""
                    } text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
                  >
                    About
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {!localStorage.getItem("token") && (
                <>
                  <Link
                    to="/login"
                    className="text-sm sm:text-base cursor-pointer bg-green-600 align-middle rounded ms-4 px-3 py-1 sm:flex text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="hidden cursor-pointer bg-blue-600 align-middle rounded ms-4 px-3 py-1 sm:flex text-white"
                  >
                    SignUp
                  </Link>
                </>
              )}

              {/* <!-- Profile dropdown --> */}
              {localStorage.getItem("token") && (
                <div className="relative ml-3">
                  <div className="flex items-center gap-2">
                    <p className="hidden text-cyan-200 font-semibold sm:block">
                      {userName}
                      </p>
                    <button
                      onClick={() => {
                        document
                          .getElementById("toggleMenu")
                          .classList.toggle("hidden");
                      }}
                      type="button"
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      {/* <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span> */}
                      <img
                        className="h-8 w-8 rounded-full filter invert"
                        src={Profile}
                        alt=""
                      />
                    </button>
                  </div>
                  <div
                    id="toggleMenu"
                    className="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                      }}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className="hidden sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

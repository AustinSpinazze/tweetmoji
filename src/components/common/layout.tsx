import { PropsWithChildren, useEffect } from "react";
import {
  SignUpButton,
  SignInButton,
  SignedOut,
  SignedIn,
  SignOutButton,
} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

import styles from "~/styles/navdrawer.module.css";

export const PageLayout = (props: PropsWithChildren) => {
  const { isSignedIn, user } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    const drawer = document.getElementById("nav-drawer");

    if (drawerOpen) {
      setTimeout(() => {
        drawer?.classList.add(`${styles.navDrawerContainerOpen!}`);
      }, 100);
    } else {
      setTimeout(() => {
        drawer?.classList.remove(`${styles.navDrawerContainerOpen!}`);
      }, 100);
    }
  }, [drawerOpen]);

  const NavigationLinks = () => {
    return (
      <>
        <SignedOut>
          <Link href="/">
            <li className="flex max-w-fit items-center gap-4 px-4 py-2 hover:rounded-full hover:bg-slate-300">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-6 w-6 fill-white"
              >
                <g>
                  <path d="M10.09 3.098L9.72 7h5.99l.39-4.089 1.99.187L17.72 7h3.78v2h-3.97l-.56 6h3.53v2h-3.72l-.38 4.089-1.99-.187.36-3.902H8.78l-.38 4.089-1.99-.187L6.77 17H2.5v-2h4.46l.56-6H3.5V7h4.21l.39-4.089 1.99.187zM14.96 15l.56-6H9.53l-.56 6h5.99z"></path>
                </g>
              </svg>
              <span className="text-md font-bold">Explore</span>
            </li>
          </Link>
        </SignedOut>
        <SignedIn>
          <Link href="/">
            <li className="flex max-w-fit items-center gap-4 px-4 py-2 hover:rounded-full hover:bg-slate-300">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-6 w-6 fill-white"
              >
                <g>
                  <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"></path>
                </g>
              </svg>
              <span className="text-md font-bold">Home</span>
            </li>
          </Link>
          {user?.username && (
            <Link href={`/@${user.username}`}>
              <li className="hover:bg-slate-300max-w-fit flex items-center gap-4 px-4 py-2 hover:rounded-full">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6 fill-white"
                >
                  <g>
                    <path d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z"></path>
                  </g>
                </svg>
                <span className="text-md font-bold">Profile</span>
              </li>
            </Link>
          )}
          <li className="text-md absolute bottom-0 max-w-fit items-center gap-4 px-4 py-2 pb-10 font-bold md:relative">
            <SignOutButton>Sign out</SignOutButton>
          </li>
        </SignedIn>
      </>
    );
  };

  const MobileNavigation = () => {
    return (
      <aside id="nav-drawer" className={styles.navDrawerContainer}>
        <nav>
          <button
            onClick={closeDrawer}
            className="absolute right-0 top-0 z-10 p-4"
          >
            <svg viewBox="0 0 20 20" className="h-8 w-8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 6l8 8m-8 0l8-8"
                className=" stroke-white"
              />
            </svg>
          </button>
          <ul className="space-y-2 pt-10">
            <NavigationLinks />
          </ul>
        </nav>
      </aside>
    );
  };

  const DesktopNavigation = () => (
    <nav className="hidden md:flex md:w-fit md:translate-x-0">
      <ul className="space-y-2">
        <NavigationLinks />
      </ul>
    </nav>
  );

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 ${
          drawerOpen ? "block" : "hidden"
        }`}
        onClick={closeDrawer}
      ></div>
      <div className="flex h-screen flex-col">
        <div
          className={
            isSignedIn
              ? "relative flex w-full flex-col justify-center md:flex-row"
              : "relative flex w-full flex-col justify-center pb-[72px] md:flex-row"
          }
        >
          <button onClick={() => toggleDrawer()} className="z-10 p-4 md:hidden">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8">
              <path
                fillRule="evenodd"
                d="M4 5h12a1 1 0 010 2H4a1 1 0 110-2zm0 6h12a1 1 0 010 2H4a1 1 0 110-2zm0 6h12a1 1 0 010 2H4a1 1 0 110-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <DesktopNavigation />
          <MobileNavigation />
          <main className="flex flex-col items-center justify-center md:border-x md:border-slate-400">
            <div className="h-full w-full md:w-[40rem]">{props.children}</div>
          </main>
        </div>
        <SignedOut>
          <section className="fixed bottom-0 flex h-[72px] w-full items-center justify-center bg-black py-4 md:justify-end md:bg-sky-500 md:px-36">
            <div className="flex w-full gap-6 px-6 md:w-auto md:px-0">
              <SignInButton mode="modal">
                <button className="w-1/2 rounded-3xl border border-white bg-transparent py-1 text-center font-bold md:w-auto md:px-4 md:py-1.5 md:hover:bg-sky-400">
                  Log in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="w-1/2 rounded-3xl bg-sky-500 px-4 py-1.5 text-center font-bold text-white hover:bg-slate-300 md:w-auto md:border md:border-white md:bg-slate-50 md:text-black">
                  Sign up
                </button>
              </SignUpButton>
            </div>
          </section>
        </SignedOut>
      </div>
    </>
  );
};

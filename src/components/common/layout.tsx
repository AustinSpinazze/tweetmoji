import type { PropsWithChildren } from "react";
import { SignUpButton, SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export const PageLayout = (props: PropsWithChildren) => {
  const { isSignedIn, user } = useUser();

  return (
    <>
      <div className="flex h-screen flex-col">
        <div
          className={
            isSignedIn
              ? "flex w-full justify-center"
              : "flex w-full justify-center pb-[72px]"
          }
        >
          <nav className="h-full p-4">
            <ul className="space-y-2">
              <SignedOut>
                <Link href="/">
                  <li className="flex items-center gap-4 px-4 py-2 hover:rounded-full hover:bg-slate-300">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-6 w-6 fill-white"
                    >
                      <g>
                        <path d="M10.09 3.098L9.72 7h5.99l.39-4.089 1.99.187L17.72 7h3.78v2h-3.97l-.56 6h3.53v2h-3.72l-.38 4.089-1.99-.187.36-3.902H8.78l-.38 4.089-1.99-.187L6.77 17H2.5v-2h4.46l.56-6H3.5V7h4.21l.39-4.089 1.99.187zM14.96 15l.56-6H9.53l-.56 6h5.99z"></path>
                      </g>
                    </svg>
                    <span className="text-lg font-bold">Explore</span>
                  </li>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/">
                  <li className="flex items-center gap-4 px-4 py-2 hover:rounded-full hover:bg-slate-300">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-6 w-6 fill-white"
                    >
                      <g>
                        <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"></path>
                      </g>
                    </svg>
                    <span className="text-lg font-bold">Home</span>
                  </li>
                </Link>
                {user?.username && (
                  <Link href={`/@${user.username}`}>
                    <li className="flex items-center gap-4 px-4 py-2 hover:rounded-full hover:bg-slate-300">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-6 w-6 fill-white"
                      >
                        <g>
                          <path d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z"></path>
                        </g>
                      </svg>
                      <span className="text-lg font-bold">Profile</span>
                    </li>
                  </Link>
                )}
              </SignedIn>
            </ul>
          </nav>
          <main className="flex flex-col items-center justify-center border-x border-slate-400">
            <div className="h-full md:w-[40rem]">{props.children}</div>
          </main>
        </div>
        <SignedOut>
          <section className="fixed bottom-0 flex h-[72px] w-full items-center justify-end bg-sky-500 px-36 py-4">
            <div className="flex gap-6">
              <SignInButton mode="modal">
                <button className="rounded-3xl border border-white bg-transparent px-4 py-1.5 font-bold hover:bg-sky-400">
                  Log in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-3xl border border-white bg-slate-50 px-4 py-1.5 font-bold text-black hover:bg-slate-300">
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

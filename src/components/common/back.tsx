import { useRouter } from "next/router";
import type { FC } from "react";

type Props = {
  text: string;
};

const Back: FC<Props> = ({ text }) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 p-3 align-middle">
      <button onClick={() => router.back()}>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5 max-w-full fill-white text-white"
        >
          <g>
            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
          </g>
        </svg>
      </button>
      <h1 className="text-2xl">{text}</h1>
    </div>
  );
};

export default Back;

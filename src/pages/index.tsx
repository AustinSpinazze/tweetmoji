import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { api } from "~/utils/api";
import { LoadingPage, LoadingSpinner } from "~/components/common/loading";
import { PageLayout } from "~/components/common/layout";
import { PostView } from "~/components/post/post-view";

const CreatePostWizard = () => {
  const [input, setInput] = useState<string>("");

  const { user } = useUser();
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0], {
          position: "bottom-center",
          icon: "👎",
        });
      } else {
        toast.error("Failed to post. Please try again.", {
          position: "bottom-center",
          icon: "👎",
        });
      }
    },
  });

  if (!user) return null;

  return (
    <div className="flex gap-3">
      <Image
        src={user.profileImageUrl}
        alt="Profile Image"
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        placeholder="Type some emojis!"
        className="grow bg-transparent text-xl outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
      />
      {input !== "" && !isPosting && (
        <button onClick={() => mutate({ content: input })}>Post</button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong...🙃</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching asap
  api.posts.getAll.useQuery();

  // Return empty div if user isn't loaded, since user tends to load faster
  if (!userLoaded) return <div />;

  return (
    <PageLayout>
      <h1 className="hidden px-4 py-5 text-xl font-bold text-slate-50 md:block">
        {isSignedIn ? "Home" : "Explore"}
      </h1>
      {isSignedIn && (
        <div className="border-b border-slate-400 p-4">
          <CreatePostWizard />
        </div>
      )}
      <Feed />
    </PageLayout>
  );
};

export default Home;

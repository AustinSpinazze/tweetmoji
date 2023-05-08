import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";
import { PageLayout } from "~/components/common/layout";
import { PostView } from "~/components/post/post-view";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import Back from "~/components/common/back";

type PageProps = {
  id: string;
};

const SinglePostPage: NextPage<PageProps> = ({ id }) => {
  const { data } = api.posts.getById.useQuery({
    id,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - ${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <Back text="Chirp" />
        <PostView {...data} />
        <div className="flex h-screen flex-col pt-6 text-center font-normal">
          <p>Comments section coming at some point? 🤷‍♂️</p>
        </div>
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("No post id found");

  await ssg.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;

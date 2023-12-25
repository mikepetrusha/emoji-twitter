import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import type { RouterOutputs } from "~/trpc/shared";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["post"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div key={post.id} className="flex flex-col gap-2 ">
      <div className="flex gap-2">
        <Image
          className="rounded-full"
          width={25}
          height={25}
          src={author.profileImageUrl}
          alt="userImage"
        />
        <span className="text-sm text-slate-300">
          @{author.username} · {dayjs(post.createdAt).fromNow()}
        </span>
      </div>
      <div>{post.content}</div>
    </div>
  );
};

export default async function Home() {
  return (
    <main className="">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <SignedIn>
          <UserButton />
          {/*<CreatePostWizard />*/}
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const data = await api.post.getAll.query();

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      {data?.map((post) => <PostView key={post.post.id} {...post} />)}

      <CreatePost />
    </div>
  );
}

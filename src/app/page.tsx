"use client";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import type { RouterOutputs } from "~/trpc/shared";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LoadingPage } from "~/app/_components/ui/LoadingSpinner";

dayjs.extend(relativeTime);

export default function Home() {
  return (
    <main className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <SignedIn>
        <UserButton />
        <CreatePost />
      </SignedIn>

      <SignedOut>
        <SignInButton />
      </SignedOut>

      <CrudShowcase />
    </main>
  );
}

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

const CrudShowcase = () => {
  const { data, isLoading } = api.post.getAll.useQuery();

  if (isLoading) return <LoadingPage />;

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      {data?.reverse().map((post) => <PostView key={post.post.id} {...post} />)}
    </div>
  );
};

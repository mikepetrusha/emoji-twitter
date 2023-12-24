import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { CreatePostWizard } from "~/app/_components/CreatePostWizard";

export default async function Home() {
  return (
    <main className="">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <SignedIn>
          <UserButton />
          <CreatePostWizard />
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
    <div className="w-full max-w-xs">
      {data?.map(({ post, author }) => (
        <div key={post.id}>
          {post.content} by {author?.username}
        </div>
      ))}

      <CreatePost />
    </div>
  );
}

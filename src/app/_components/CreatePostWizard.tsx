"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export const CreatePostWizard = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div>
      <Image
        priority={true}
        width={50}
        height={50}
        src={user?.imageUrl}
        alt="userImage"
      />
    </div>
  );
};

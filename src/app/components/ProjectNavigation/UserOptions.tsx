"use client"
import { FC } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

interface UserOptionsProps {}

const UserOptions: FC<UserOptionsProps> = ({}) => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex gap-2 items-center">
        <Image
          className="rounded-full shadow-md"
          src={session?.user?.image as string}
          alt="User image"
          width={32}
          height={32}
        />    
        <button
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }

  return;
}

export default UserOptions;
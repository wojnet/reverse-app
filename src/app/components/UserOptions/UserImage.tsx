import { FC } from 'react';
import Image from 'next/image';
import { Session } from 'next-auth';

interface UserImageProps {
  session: Session | null;
}

const UserImage: FC<UserImageProps> = ({ session }) => {
  if (session?.user?.image) {
    return <Image
      className="rounded-full [box-shadow:_2px_2px_7px_#0003]"
      src={session?.user?.image as string}
      alt="User image"
      width={36}
      height={36}
    />  
  }

  return <div className="w-9 h-9 flex bg-emerald-100 justify-center items-center rounded-full [box-shadow:_2px_2px_7px_#0003]">
    <p className="text-3xl text-emerald-500 font-bold">
      {session?.user?.name?.charAt(0).toUpperCase()}
    </p>
  </div>
  
}

export default UserImage;
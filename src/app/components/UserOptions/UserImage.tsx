import { FC, MouseEvent } from 'react';
import Image from 'next/image';
import { Session } from 'next-auth';
import { useAppDispatch } from '@/hooks/redux';
import { toggleDevMode } from '@/app/features/options/optionsSlice';

interface UserImageProps {
  session: Session | null;
}

const UserImage: FC<UserImageProps> = ({ session }) => {
  const dispatch = useAppDispatch();
  let firstClick: boolean = false;

  const handleOnClick = (event: MouseEvent<HTMLImageElement>) => {
    event.preventDefault();

    if (firstClick) {
      firstClick = false;
      dispatch(toggleDevMode());
    } else {
      firstClick = true;
      setTimeout(() => { firstClick = false }, 250);
    }
  }
  
  if (session?.user?.image) {
    return <Image
      className="w-[42px] h-[42px] rounded-full [box-shadow:_2px_2px_7px_#0003]"
      src={session?.user?.image as string}
      alt="User image"
      width={64}
      height={64}
      onClick={handleOnClick}
    />  
  }

  return <div className="w-9 h-9 flex bg-emerald-100 justify-center items-center rounded-full [box-shadow:_2px_2px_7px_#0003]">
    <p className="text-3xl text-emerald-500 font-bold">
      {session?.user?.name?.charAt(0).toUpperCase()}
    </p>
  </div>
  
}

export default UserImage;
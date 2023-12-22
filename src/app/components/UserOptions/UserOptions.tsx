"use client"
import { FC } from 'react';
import { signOut, useSession } from 'next-auth/react';
import UserImage from './UserImage';
import { useAppSelector } from '@/hooks/redux';
import { selectDevMode } from '@/app/features/options/optionsSlice';

interface UserOptionsProps {}

const UserOptions: FC<UserOptionsProps> = ({}) => {
  const { data: session } = useSession();
  const devMode = useAppSelector(selectDevMode);

  if (session) {
    return (
      <>
        <div className="flex gap-2 items-end select-none relative">
          { devMode && <code
            className="text-xs animate-pulse absolute top-[-25px]"
          >
            {"<> DEV </>"}
          </code> }
          <UserImage
            session={session}
          />
          <button
            className="text-xs font-bold border border-1 border-slate-600 p-[2px_6px] rounded-xl shadow-lg hover:scale-95 transition"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
        </div>
      </>
    );
  }

  return;
}

export default UserOptions;
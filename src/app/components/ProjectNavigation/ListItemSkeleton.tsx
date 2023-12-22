import { FC } from "react";

type ListItemSkeletonProps = {}

const ListItemSkeleton: FC<ListItemSkeletonProps> = () => {
  return (
    <div
      className="relative w-full h-10 bg-app-gray flex justify-between items-center shadow-md rounded-xl px-3 cursor-pointer outline-transparent hover:outline hover:outline-2 hover:outline-slate-100 hover:scale-95 select-none z-10 group transition animate-pulse"
    ></div>
  );
}

export default ListItemSkeleton;
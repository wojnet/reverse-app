"use client"
import { FC } from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from '@/utils/cn';

interface ListItemProps {
  id: string;
  name?: string;
  savedChanges?: boolean;
}

const ListItem: FC<ListItemProps> = ({
  id = "",
  name = "(no name)",
  savedChanges = true,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSelectProject = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (!id) {
      current.delete("id");
    } else {
      current.set("id", id);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  return (
    <button
      onClick={onSelectProject}
      className={cn(`bg-gray-200`, "w-full h-10 flex justify-between items-center shadow-md rounded-xl px-2 cursor-pointer outline-transparent hover:outline hover:outline-2 hover:outline-slate-100 hover:scale-95 select-none transition")}
    >
      <p className="italic text-sm">{name}</p>
      <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
    </button>
  );
}

export default ListItem;
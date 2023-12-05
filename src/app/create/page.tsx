import { FC } from "react";
import { SongType } from "../../types/song";
import { ProjectType } from "../../types/project";
import { getSong } from "@/utils/getSong";
import { getProjects } from "@/utils/projects/getProjects";
import Workspace from "../components/Workspace";
import { cc } from "@/utils/consoleColor";

type CreateType = {
  searchParams: {
    id?: string,
    edit?: string,
  };
};

const Create: FC<CreateType> = async ({ searchParams }) => {
  let songData: SongType | undefined = await getSong(searchParams.id);
  console.log(`${cc("[CONSOLE]", "info")} /create page.tsx songData:`, songData);
  // let projectsData: ProjectType[] = await getProjects();

  return (
    <Workspace
      songData={songData}
    />
  );
};

export default Create;
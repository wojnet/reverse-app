import { FC } from "react";
import { SongType } from "../../types/song";
import { ProjectType } from "../../types/project";
import { getSong } from "@/utils/getSong";
import { getProjects } from "@/utils/projects/getProjects";
import Workspace from "../components/Workspace";

type CreateType = {
  searchParams: {
    id?: string,
    edit?: string,
  };
};

const Create: FC<CreateType> = async ({ searchParams }) => {
  let songData: SongType = await getSong(searchParams.id);
  // let projectsData: ProjectType[] = await getProjects();

  return (
    <Workspace
      songData={songData}
      // projectsData={projectsData}
    />
  );
};

export default Create;
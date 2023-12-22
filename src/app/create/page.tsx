import { FC } from "react";
import Workspace from "../components/Workspace";

type CreateType = {
  searchParams: {
    id?: string
  };
};

const Create: FC<CreateType> = async ({ searchParams }) => {
  return (
    <Workspace />
  );
};

export default Create;
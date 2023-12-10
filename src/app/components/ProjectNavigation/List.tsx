// "use client";
import { FC, Suspense, useEffect } from 'react';
import ListItem from './ListItem';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchProjectsData, selectError, selectIsLoading, selectProjectsData } from '@/app/features/projects/projectsSlice';
import { ProjectType } from '@/types/project';
import ListItemSkeleton from './ListItemSkeleton';

type ListProps = {
  setUrlParam: (key: string, value: string) => void,
}

const List: FC<ListProps> = ({ setUrlParam }) => {
  const dispatch = useAppDispatch();

  const projectsData: ProjectType[] = useAppSelector(selectProjectsData);
  const projectsLoading = useAppSelector(selectIsLoading);

  const projectElements = projectsData.map((project, index) => <ListItem
    key={index}
    id={project._id}
    name={project.name}
    setUrlParam={setUrlParam}
  />);

  useEffect(() => {
    // console.log("List mounted");
    dispatch(fetchProjectsData());
  }, []);

  return (
    <ul className="w-full flex flex-col gap-2">
      { projectsLoading && <ListItemSkeleton /> }
      { !projectsLoading && projectElements }
    </ul>
  );
}

export default List;
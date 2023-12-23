// "use client";
import { FC, Suspense, useEffect } from 'react';
import ListItem from './ListItem';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchProjectsData, selectFetchError, selectIsFetching, selectIsInsertingNewProject, selectProjectsData } from '@/app/features/projects/projectsSlice';
import { ProjectType } from '@/types/project';
import ListItemSkeleton from './ListItemSkeleton';
import { AsyncThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

type ListProps = {
  setUrlParam: (key: string, value: string) => void,
}

const List: FC<ListProps> = ({ setUrlParam }) => {
  const dispatch = useAppDispatch();
  const projectsData: ProjectType[] = useAppSelector(selectProjectsData);
  const projectsLoading = useAppSelector(selectIsFetching);
  const isInsertingNewProject = useAppSelector(selectIsInsertingNewProject);

  const projectElements = projectsData.map((project, index) => <ListItem
    key={index}
    id={project._id}
    name={project.name}
    setUrlParam={setUrlParam}
  />);

  useEffect(() => {
    dispatch(fetchProjectsData());
  }, []);

  return (
    <ul className="w-full flex flex-col gap-2">
      { projectsLoading && <ListItemSkeleton /> }
      { !projectsLoading && projectElements }
      { isInsertingNewProject && <ListItemSkeleton /> }
    </ul>
  );
}

export default List;
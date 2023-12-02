import { FC } from 'react';
import ListItem from './ListItem';

interface ListProps {}

const List: FC<ListProps> = ({}) => {
  return (
    <ul className="w-full flex-1 flex flex-col gap-5">
      {/* FOR NOW */}
      { [...new Array(1)].map((_, index) => <ListItem key={index} id={"656506d6ef5772112c14d417"} name={`Skeleton Key`} />) }
    </ul>
  );
}

export default List;
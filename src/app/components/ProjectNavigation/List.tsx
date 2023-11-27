import { FC } from 'react';
import ListItem from './ListItem';

interface ListProps {
  
}

const List: FC<ListProps> = ({}) => {
  return (
    <ul className="w-full flex-1 flex flex-col gap-5">
      { [...new Array(2)].map((_, index) => <ListItem key={index} id={index.toString()} name={`Song ${index}`} />) }
    </ul>
  );
}

export default List;
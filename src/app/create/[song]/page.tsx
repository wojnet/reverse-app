import { FC } from 'react';

interface songPageProps {
  params: { song: string };
}

const songPage: FC<songPageProps> = ({ params }) => {
  return (
    <div className="w-full h-full flex-1 flex flex-col items-center p-5">
      <h3 className="text-xl">Song:</h3>
      <h1 className="text-3xl font-bold">
        {params.song}
      </h1>
    </div>
  );
}

export default songPage;
"use client"
import { FC } from "react";
import { useSearchParams } from "next/navigation";
import { sampleSong } from "@/data/sample/sampleSong";
import { SongType } from "../types/song";
import TitleBlock from "../components/SongBlocks/TitleBlock";
import TextBlock from "../components/SongBlocks/TextBlock";
import CommentBlock from "../components/SongBlocks/CommentBlock";

interface ICreate {}

const create: FC<ICreate> = () => {
  const song: SongType = sampleSong as SongType;

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (id === null) return (
    <p className="text-xl flex-1 text-center m-5">
      No song selected
    </p>
  );

  const songContents = song.contents.map((element, index) => {
    switch(element.type) {
      case "TITLE_BLOCK":
        return <TitleBlock 
          key={index}
          title={element.data.title}
          subtitle={element.data.subtitle}
        />
      case "TEXT_BLOCK":
        return <TextBlock
          key={index}
          paragraphs={element.data.paragraphs}
        />
      case "COMMENT_BLOCK":
        return <CommentBlock
          key={index}
          text={element.data.text}
        />
      default:
        return null;
    }
  })

  return (
    <div className="w-full h-full flex-1 flex flex-col items-center p-5 gap-5">
      { songContents }
    </div>
  );
}

export default create;
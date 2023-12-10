import { BlockType } from "./blocks"

type ChordType = {
  name: string,
  position: number
}

export type TitleBlockDataType = {
  title?: string,
  subtitle?: string
}

export type TextBlockDataType = {
  paragraphs?: {
    text: string,
    chords?: ChordType[]
  }[]
}

export type CommentBlockDataType = {
  text: string
}

export type SongType = {
  _id: string,
  name: string,
  userId: string,
  contents: {
    type: BlockType,
    data: any
    // data: TitleBlockDataType | TextBlockDataType | CommentBlockDataType
  }[]
}
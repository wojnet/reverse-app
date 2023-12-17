import { BlockType } from "./blocks"
import { RootNoteType, ShapeType } from "./chords"

export type ChordsType = {
  rootNote: RootNoteType,
  shape: ShapeType,
  position: number,
}

export type TitleBlockDataType = {
  title?: string,
  subtitle?: string
}

export type TextBlockDataType = {
  paragraphs?: {
    text: string,
    chords?: ChordsType[]
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
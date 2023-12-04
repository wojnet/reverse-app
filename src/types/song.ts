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
    type: "TITLE_BLOCK" | "TEXT_BLOCK" | "COMMENT_BLOCK",
    data: any
    // data: TitleBlockDataType | TextBlockDataType | CommentBlockDataType
  }[]
}
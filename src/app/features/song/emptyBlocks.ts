import { BlockType } from "@/types/blocks"

export const emptyCommentBlock: { type: BlockType, data: any } = {
  type: "COMMENT_BLOCK",
  data: {
    text: "Comment",
  }
};

export const emptyTextBlock: { type: BlockType, data: any } = {
  type: "TEXT_BLOCK",
  data: {
    paragraphs: [
      {
        text: "Text",
        chords: [],
      }
    ]
  }
};

export const emptyTitleBlock: { type: BlockType, data: any } = {
  type: "TITLE_BLOCK",
  data: {
    title: "Title",
    subtitle: "Subtitle",
  }
};

export const getEmptyBlock = (type: BlockType): { type: BlockType, data: any } | undefined => {
  switch (type) {
    case "COMMENT_BLOCK":
      return emptyCommentBlock;
    case "TEXT_BLOCK":
      return emptyTextBlock;
    case "TITLE_BLOCK":
      return emptyTitleBlock;
    default:
      return;
  }
}
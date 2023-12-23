import { ShapeType } from "@/types/chords";

const chordTable: { name: ShapeType, symbols: string[] }[] = [
  { name: "augmented", symbols: ["aug", "+"] },
  { name: "augmented 7", symbols: ["aug7"] },
  { name: "diminished", symbols: ["°"] },
  { name: "dominant 7", symbols: ["7"] },
  { name: "half diminished", symbols: ["m7b5", "ø"] },
  { name: "major", symbols: [""] },
  { name: "major 7", symbols: ["Maj7"] },
  { name: "minor", symbols: ["m"] },
  { name: "minor 7", symbols: ["m7"] },
]

const chordShapeToSymbol = (name: ShapeType): string => {
  const filteredTable = chordTable.filter((e) => e.name === name);
  if (!filteredTable.length) return "";
  return filteredTable[0].symbols[0];
}

export default chordShapeToSymbol;
const sampleSong = {
  name: "Buddy Holly",
  contents: [
    {
      type: "TITLE_BLOCK",
      data: {
        title: "Buddy Holly",
        subtitle: "Weezer"
      }
    },
    {
      type: "TEXT_BLOCK",
      data: {
        paragraphs: [
          {
            text: "Woo-ee-oo",
            chords: [
              {
                position: 1,
                rootNote: "A",
                shape: "major"
              }
            ]
          },
          {
            text: "I look just like Buddy Holly",
            chords: [
              {
                "rootNote": "D",
                "shape": "major",
                "position": 8,
              },
              {
                "rootNote": "E",
                "shape": "major",
                "position": 24,
              }
            ]
          },
        ]
      }
    }
  ]
}

export default sampleSong;
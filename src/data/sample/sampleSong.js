const sampleSong = {
  name: "Dziwak",
  contents: [
    {
      type: "TITLE_BLOCK",
      data: {
        title: "Dziwak",
        subtitle: "Radiogłowi"
      }
    },
    {
      type: "TEXT_BLOCK",
      data: {
        paragraphs: [
          {
            text: "Bo ja jestem krepem",
            chords: [
              {
                position: 1,
                rootNote: "G",
                shape: "major"
              }
            ]
          },
          {
            text: "Jestem dziwakiem",
            chords: [
              {
                "rootNote": "B",
                "shape": "major",
                "position": 8
              }
            ]
          },
        ]
      }
    }
  ]
}

export default sampleSong;
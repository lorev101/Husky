export const steps = [
  {
    id: 1,
    name: "Colosseo",
    description: "Trova l’anfiteatro più famoso di Roma.",
    lat: 41.8902,
    lng: 12.4922,
    challenges: [
      {
        question: "In che anno è stato inaugurato il Colosseo?",
        options: ["80 d.C.", "476 d.C.", "150 d.C.", "1 a.C."],
        answerIndex: 0
      },
      {
        question: "Chi lo ha commissionato?",
        options: ["Nerone", "Vespasiano", "Traiano", "Cesare"],
        answerIndex: 1
      }
    ]
  },
  {
    id: 2,
    name: "Fontana di Trevi",
    description: "Getta una moneta e fai un desiderio.",
    lat: 41.9009,
    lng: 12.4833,
    challenges: [
      {
        question: "Come si lancia la moneta secondo la tradizione?",
        options: [
          "Con la mano sinistra sulla spalla destra",
          "Con la destra sopra la sinistra",
          "Girandosi e lanciando dietro",
          "Con gli occhi chiusi"
        ],
        answerIndex: 2
      }
    ]
  }
];

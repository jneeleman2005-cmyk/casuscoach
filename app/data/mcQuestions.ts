export const mcQuestions = [
  {
    subject: "strafrecht",
    topic: "Poging",
    title: "De jas op de achterbank",
    text: "Daan slaat de ruit van een auto in en reikt naar een jas op de achterbank. Voordat hij de jas kan pakken, wordt hij aangehouden. Wat ligt juridisch het meest voor de hand?",
    answers: [
      {
        id: "A",
        text: "Voltooide diefstal",
        correct: false,
        explanation:
          "Onjuist. Er is nog geen goed weggenomen. Voor voltooide diefstal moet sprake zijn van wegnemen.",
      },
      {
        id: "B",
        text: "Strafbare poging",
        correct: true,
        explanation:
          "Juist. De gedraging is naar uiterlijke verschijningsvorm gericht op voltooiing van de diefstal.",
      },
      {
        id: "C",
        text: "Geen strafbaar feit",
        correct: false,
        explanation:
          "Onjuist. Het inslaan van de ruit en reiken naar de jas kan juist een begin van uitvoering opleveren.",
      },
    ],
  },
  {
    subject: "strafrecht",
    topic: "Medeplegen",
    title: "De uitkijk bij de scooter",
    text: "Noah forceert een scooterslot. Sam staat op de uitkijk en waarschuwt als er iemand aankomt. Zij hadden dit vooraf samen afgesproken. Wat is het meest waarschijnlijk?",
    answers: [
      {
        id: "A",
        text: "Sam kan medepleger zijn",
        correct: true,
        explanation:
          "Juist. Door de afspraak vooraf en zijn actieve bijdrage kan sprake zijn van nauwe en bewuste samenwerking.",
      },
      {
        id: "B",
        text: "Sam is nooit strafbaar omdat hij het slot niet forceert",
        correct: false,
        explanation:
          "Onjuist. Voor medeplegen hoef je niet zelf alle uitvoeringshandelingen te verrichten.",
      },
      {
        id: "C",
        text: "Alleen Noah is strafbaar",
        correct: false,
        explanation:
          "Onjuist. Sam levert mogelijk een voldoende significante bijdrage.",
      },
    ],
  },
  {
    subject: "strafrecht",
    topic: "Noodweer",
    title: "De klap op straat",
    text: "Mila wordt plotseling aangevallen met vuistslagen. Zij duwt de aanvaller hard weg, waardoor die valt. Welke voorwaarde is vooral relevant?",
    answers: [
      {
        id: "A",
        text: "Er moet sprake zijn van een ogenblikkelijke wederrechtelijke aanranding",
        correct: true,
        explanation:
          "Juist. Noodweer vereist onder meer een onmiddellijke wederrechtelijke aanval en noodzakelijke verdediging.",
      },
      {
        id: "B",
        text: "Noodweer kan alleen bij dodelijk geweld",
        correct: false,
        explanation:
          "Onjuist. Noodweer kan ook spelen bij andere fysieke aanvallen.",
      },
      {
        id: "C",
        text: "Boosheid is voldoende voor noodweer",
        correct: false,
        explanation:
          "Onjuist. Er moet sprake zijn van een concrete wederrechtelijke aanranding.",
      },
    ],
  },
  {
    subject: "strafrecht",
    topic: "Opzet",
    title: "De lekgestoken banden",
    text: "Rachid steekt bewust de banden van de auto van zijn buurman lek omdat hij boos is. Welk schuldverband ligt het meest voor de hand?",
    answers: [
      {
        id: "A",
        text: "Opzet",
        correct: true,
        explanation:
          "Juist. Hij handelt bewust en doelgericht. Boosheid sluit opzet niet uit.",
      },
      {
        id: "B",
        text: "Alleen culpa",
        correct: false,
        explanation:
          "Onjuist. Culpa ziet op verwijtbare onvoorzichtigheid; hier lijkt juist sprake van bewust handelen.",
      },
      {
        id: "C",
        text: "Geen opzet, want hij was boos",
        correct: false,
        explanation:
          "Onjuist. Emotie sluit opzet niet automatisch uit.",
      },
    ],
  },
  {
    subject: "strafrecht",
    topic: "Diefstal",
    title: "De koptelefoon in de tas",
    text: "Jesse stopt in een winkel een koptelefoon in zijn tas en loopt zonder te betalen naar buiten. Welk bestanddeel staat centraal?",
    answers: [
      {
        id: "A",
        text: "Wegnemen met het oogmerk van wederrechtelijke toe-eigening",
        correct: true,
        explanation: "Juist. Dat is de kern van diefstal.",
      },
      {
        id: "B",
        text: "Een ogenblikkelijke wederrechtelijke aanranding",
        correct: false,
        explanation: "Onjuist. Dat hoort bij noodweer.",
      },
      {
        id: "C",
        text: "Een hevige gemoedsbeweging",
        correct: false,
        explanation: "Onjuist. Dat hoort eerder bij noodweerexces.",
      },
    ],
  },
  {
    subject: "bestuursrecht",
    topic: "Belanghebbende",
    title: "Festival in het park",
    text: "Een gemeente verleent een vergunning voor een festival in een park. Een bewoner op 50 meter afstand maakt bezwaar wegens geluidsoverlast. Wat ligt het meest voor de hand?",
    answers: [
      {
        id: "A",
        text: "De bewoner kan belanghebbende zijn",
        correct: true,
        explanation:
          "Juist. Door de korte afstand kan hij feitelijke gevolgen van enige betekenis ondervinden.",
      },
      {
        id: "B",
        text: "Alleen de organisator is belanghebbende",
        correct: false,
        explanation:
          "Onjuist. Ook derden kunnen belanghebbende zijn als zij rechtstreeks geraakt worden.",
      },
      {
        id: "C",
        text: "Een bewoner kan nooit bezwaar maken tegen een festivalvergunning",
        correct: false,
        explanation:
          "Onjuist. Dat kan wel als hij belanghebbende is.",
      },
    ],
  },
];

export type McQuestion = (typeof mcQuestions)[number];
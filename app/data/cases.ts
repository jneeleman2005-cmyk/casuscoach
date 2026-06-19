export const cases = [
  {
    subject: "strafrecht",
    topic: "Poging",
    title: "De jas op de achterbank",
    text: "Daan loopt naar een geparkeerde auto, slaat de ruit in en reikt naar een jas op de achterbank. Voordat hij de jas kan pakken, wordt hij aangehouden. Beoordeel of sprake is van strafbare poging.",
    modelAnswer:
      "PROC/IRAC: De vraag is of Daan strafbaar is wegens poging. Voor poging is vereist dat sprake is van een voornemen tot het plegen van een misdrijf en een begin van uitvoering. Daan wilde de jas uit de auto wegnemen en heeft de autoruit al ingeslagen om die jas te pakken. Die gedraging is naar uiterlijke verschijningsvorm gericht op voltooiing van de diefstal. Daarom ligt strafbare poging tot diefstal voor de hand.",
  },
  {
    subject: "strafrecht",
    topic: "Medeplegen",
    title: "De uitkijk bij de scooter",
    text: "Noah forceert het slot van een scooter. Sam staat op de hoek van de straat op de uitkijk en waarschuwt Noah als er iemand aankomt. Zij hadden vooraf afgesproken de scooter samen te stelen. Beoordeel of Sam als medepleger kan worden aangemerkt.",
    modelAnswer:
      "PROC/IRAC: De vraag is of Sam medepleger is. Voor medeplegen is vereist dat sprake is van nauwe en bewuste samenwerking en een voldoende significante bijdrage. Sam heeft vooraf afspraken gemaakt en levert tijdens de uitvoering een actieve bijdrage door op de uitkijk te staan. Daardoor kan zijn bijdrage voldoende gewicht hebben. Medeplegen ligt daarom voor de hand.",
  },
  {
    subject: "strafrecht",
    topic: "Noodweer",
    title: "De klap op straat",
    text: "Mila wordt op straat plotseling aangevallen door iemand die haar meerdere vuistslagen geeft. Zij duwt de aanvaller hard weg, waardoor die valt en letsel oploopt. Beoordeel of Mila een beroep op noodweer kan doen.",
    modelAnswer:
      "PROC/IRAC: De vraag is of Mila een beroep op noodweer kan doen. Noodweer vereist een ogenblikkelijke wederrechtelijke aanranding en een noodzakelijke en proportionele verdediging. Mila werd plotseling fysiek aangevallen en verdedigde zich door de aanvaller weg te duwen. Als die reactie noodzakelijk en niet disproportioneel was, kan noodweer slagen.",
  },
  {
    subject: "bestuursrecht",
    topic: "Belanghebbende",
    title: "Festival in het park",
    text: "Een gemeente verleent een vergunning voor een groot festival in een park. Een bewoner die 50 meter van het park woont maakt bezwaar wegens geluidsoverlast. Beoordeel of hij belanghebbende kan zijn.",
    modelAnswer:
      "PROC/IRAC: De vraag is of de bewoner belanghebbende is. Daarvoor moet sprake zijn van een eigen, persoonlijk, objectief bepaalbaar, actueel en rechtstreeks belang. Omdat de bewoner op 50 meter afstand woont, kan hij feitelijke gevolgen van enige betekenis ondervinden, zoals geluidsoverlast. Daarom kan hij waarschijnlijk als belanghebbende worden aangemerkt.",
  },
  {
    subject: "bestuursrecht",
    topic: "Besluit",
    title: "De afgewezen vergunning",
    text: "Een student vraagt een evenementenvergunning aan bij de gemeente. De burgemeester wijst de aanvraag schriftelijk af. Beoordeel of deze afwijzing een besluit is in de zin van de Awb.",
    modelAnswer:
      "PROC/IRAC: De vraag is of de afwijzing een besluit is. Een besluit is een schriftelijke beslissing van een bestuursorgaan inhoudende een publiekrechtelijke rechtshandeling. De burgemeester is een bestuursorgaan, de afwijzing is schriftelijk en gericht op rechtsgevolg, namelijk het niet verkrijgen van de vergunning. De afwijzing is daarom waarschijnlijk een besluit.",
  },
  {
    subject: "goederenrecht",
    topic: "Eigendom",
    title: "De verkochte laptop",
    text: "Lars verkoopt zijn laptop aan Emma. Zij spreken af dat Emma direct eigenaar wordt, maar de laptop blijft nog een week bij Lars liggen. Beoordeel welke vereisten relevant zijn voor overdracht van eigendom.",
    modelAnswer:
      "PROC/IRAC: De vraag is of de eigendom rechtsgeldig is overgedragen. Voor overdracht is vereist: een geldige titel, beschikkingsbevoegdheid en levering. De koopovereenkomst kan de titel vormen en Lars lijkt beschikkingsbevoegd als eigenaar. Daarnaast moet levering plaatsvinden op de wettelijk voorgeschreven wijze. Zonder levering is Emma nog niet automatisch eigenaar.",
  },
];

export type Case = (typeof cases)[number];
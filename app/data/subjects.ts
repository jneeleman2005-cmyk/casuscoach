export const subjects = [
  {
    name: "Strafrecht",
    slug: "strafrecht",
    available: true,
    description:
      "Oefen met kernleerstukken uit het materiële strafrecht, zoals poging, medeplegen, noodweer en opzet.",
    topics: ["Poging", "Medeplegen", "Noodweer", "Opzet", "Diefstal"],
  },
  {
    name: "Bestuursrecht",
    slug: "bestuursrecht",
    available: true,
    description:
      "Oefen met besluiten, belanghebbenden, bezwaar, evenredigheid en handhaving.",
    topics: [
      "Besluit",
      "Belanghebbende",
      "Bezwaar",
      "Evenredigheid",
      "Handhaving",
    ],
  },
  {
    name: "Europees recht",
    slug: "europees-recht",
    available: true,
    description:
      "Oefen met voorrang, rechtstreekse werking, vrij verkeer en de instellingen van de Europese Unie.",
    topics: [
      "Voorrang",
      "Rechtstreekse werking",
      "Vrij verkeer",
      "EU-instellingen",
    ],
  },
  {
    name: "Internationaal recht",
    slug: "internationaal-recht",
    available: true,
    description:
      "Oefen met verdragen, staatsaansprakelijkheid, immuniteit en mensenrechten.",
    topics: [
      "Verdragen",
      "Staatsaansprakelijkheid",
      "Immuniteit",
      "Mensenrechten",
    ],
  },
  {
    name: "Staatsrecht",
    slug: "staatsrecht",
    available: true,
    description:
      "Oefen met grondrechten, trias politica, wetgeving en ministeriële verantwoordelijkheid.",
    topics: [
      "Grondrechten",
      "Trias politica",
      "Wetgeving",
      "Ministeriële verantwoordelijkheid",
    ],
  },
  {
    name: "Goederenrecht",
    slug: "goederenrecht",
    available: true,
    description:
      "Oefen met eigendom, bezit, houderschap en overdracht van goederen.",
    topics: ["Eigendom", "Bezit", "Houderschap", "Overdracht"],
  },
  {
    name: "Bedrijfsrecht",
    slug: "bedrijfsrecht",
    available: true,
    description:
      "Oefen met BV, NV, bestuurdersaansprakelijkheid en vertegenwoordiging.",
    topics: [
      "BV",
      "NV",
      "Bestuurdersaansprakelijkheid",
      "Vertegenwoordiging",
    ],
  },
  {
    name: "Openbare orde recht",
    slug: "openbare-orde-recht",
    available: true,
    description:
      "Oefen met APV, noodbevelen, noodverordeningen, Wet Damocles en demonstratierecht.",
    topics: [
      "APV",
      "Noodbevel",
      "Noodverordening",
      "Wet Damocles",
      "Demonstratierecht",
    ],
  },
];

export type Subject = (typeof subjects)[number];
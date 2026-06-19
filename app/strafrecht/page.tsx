"use client";

import { useState } from "react";

const questions = [
  {
    title: "Poging tot diefstal",
    text: "Daan slaat de ruit van een auto in om een jas uit de auto te pakken. Voordat hij de jas kan pakken, wordt hij aangehouden door de politie. Waarvan is juridisch het meest waarschijnlijk sprake?",
    answers: [
      {
        id: "A",
        text: "Voltooide diefstal",
        correct: false,
        explanation:
          "Onjuist. Er is nog geen goed weggenomen. Voor voltooide diefstal moet sprake zijn van wegnemen met het oogmerk van wederrechtelijke toe-eigening.",
      },
      {
        id: "B",
        text: "Poging tot diefstal",
        correct: true,
        explanation:
          "Juist. Daan heeft al een begin gemaakt met de uitvoering van de diefstal door de autoruit in te slaan met het doel de jas weg te nemen.",
      },
      {
        id: "C",
        text: "Alleen vernieling",
        correct: false,
        explanation:
          "Onjuist. Vernieling kan mogelijk ook aan de orde zijn, maar door het doel om de jas te pakken ligt poging tot diefstal voor de hand.",
      },
    ],
  },
  {
    title: "Voorbereiding",
    text: "Nina koopt bivakmutsen, tie-wraps en een nepvuurwapen. Uit chatgesprekken blijkt dat zij samen met een ander een overval op een supermarkt voorbereidt. Welk leerstuk ligt het meest voor de hand?",
    answers: [
      {
        id: "A",
        text: "Voorbereiding van een misdrijf",
        correct: true,
        explanation:
          "Juist. Bij voorbereiding gaat het om het opzettelijk voorhanden hebben van middelen die bestemd zijn tot het begaan van een ernstig misdrijf.",
      },
      {
        id: "B",
        text: "Voltooide overval",
        correct: false,
        explanation:
          "Onjuist. De overval is nog niet uitgevoerd. Er is dus nog geen voltooid gronddelict.",
      },
      {
        id: "C",
        text: "Noodweer",
        correct: false,
        explanation:
          "Onjuist. Noodweer gaat over noodzakelijke verdediging tegen een ogenblikkelijke wederrechtelijke aanranding. Daarvan is hier geen sprake.",
      },
    ],
  },
  {
    title: "Opzet",
    text: "Rachid steekt bewust de banden van de auto van zijn buurman lek omdat hij boos is. Welke vorm van schuldverband is hier het meest waarschijnlijk?",
    answers: [
      {
        id: "A",
        text: "Geen opzet, want hij was boos",
        correct: false,
        explanation:
          "Onjuist. Boosheid sluit opzet niet uit. Hij handelde juist bewust.",
      },
      {
        id: "B",
        text: "Opzet",
        correct: true,
        explanation:
          "Juist. Rachid wist wat hij deed en wilde de banden lek steken. Dat wijst op opzettelijk handelen.",
      },
      {
        id: "C",
        text: "Alleen culpa",
        correct: false,
        explanation:
          "Onjuist. Culpa ziet op verwijtbare onvoorzichtigheid. Hier lijkt sprake van bewust en doelgericht handelen.",
      },
    ],
  },
  {
    title: "Voorwaardelijk opzet",
    text: "Lisa gooit vanaf een brug een zware steen op een drukke rijbaan. Zij zegt later dat zij niemand wilde raken. Een automobilist raakt gewond. Welke redenering past het best bij voorwaardelijk opzet?",
    answers: [
      {
        id: "A",
        text: "Voorwaardelijk opzet kan aanwezig zijn als Lisa bewust de aanmerkelijke kans heeft aanvaard dat iemand geraakt zou worden.",
        correct: true,
        explanation:
          "Juist. Bij voorwaardelijk opzet gaat het om het bewust aanvaarden van een aanmerkelijke kans op het gevolg.",
      },
      {
        id: "B",
        text: "Voorwaardelijk opzet is uitgesloten omdat Lisa zegt dat zij niemand wilde raken.",
        correct: false,
        explanation:
          "Onjuist. Het gaat niet alleen om wat Lisa achteraf zegt, maar ook om wat uit de omstandigheden kan worden afgeleid.",
      },
      {
        id: "C",
        text: "Voorwaardelijk opzet vereist altijd dat iemand het gevolg daadwerkelijk heeft gewild.",
        correct: false,
        explanation:
          "Onjuist. Dat past eerder bij opzet als oogmerk. Voorwaardelijk opzet ziet juist op risicoaanvaarding.",
      },
    ],
  },
  {
    title: "Culpa",
    text: "Een automobilist rijdt veel te hard door een drukke woonwijk terwijl hij op zijn telefoon kijkt. Hij ziet een fietser te laat en veroorzaakt een ongeluk. Welk begrip is hier vooral relevant?",
    answers: [
      {
        id: "A",
        text: "Culpa/verwijtbare schuld",
        correct: true,
        explanation:
          "Juist. Bij culpa gaat het om aanmerkelijk verwijtbare onvoorzichtigheid. Hard rijden en telefoongebruik kunnen daarop wijzen.",
      },
      {
        id: "B",
        text: "Uitlokking",
        correct: false,
        explanation:
          "Onjuist. Uitlokking gaat over het bewegen van een ander tot het plegen van een strafbaar feit.",
      },
      {
        id: "C",
        text: "Doen plegen",
        correct: false,
        explanation:
          "Onjuist. Doen plegen gaat over het laten uitvoeren van een strafbaar feit door een niet-strafbare tussenpersoon.",
      },
    ],
  },
  {
    title: "Causaliteit",
    text: "Tim slaat Jan hard tegen het hoofd. Jan valt, wordt naar het ziekenhuis gebracht en overlijdt later aan complicaties die samenhangen met het letsel. Welke vraag staat centraal bij causaliteit?",
    answers: [
      {
        id: "A",
        text: "Of het overlijden redelijkerwijs aan het handelen van Tim kan worden toegerekend.",
        correct: true,
        explanation:
          "Juist. Bij causaliteit gaat het om de vraag of het gevolg juridisch aan de gedraging kan worden toegerekend.",
      },
      {
        id: "B",
        text: "Of Tim na het slaan spijt heeft gekregen.",
        correct: false,
        explanation:
          "Onjuist. Spijt kan relevant zijn voor strafmaat, maar niet voor de causaliteitsvraag.",
      },
      {
        id: "C",
        text: "Of Jan ouder was dan Tim.",
        correct: false,
        explanation:
          "Onjuist. Leeftijd kan soms feitelijk relevant zijn, maar is niet de kernvraag bij causaliteit.",
      },
    ],
  },
  {
    title: "Medeplegen",
    text: "Sam en Noah spreken af om samen een scooter te stelen. Sam houdt de omgeving in de gaten, terwijl Noah het slot forceert en de scooter meeneemt. Wat is juridisch het meest waarschijnlijk?",
    answers: [
      {
        id: "A",
        text: "Alleen Noah is strafbaar, want hij neemt de scooter feitelijk mee.",
        correct: false,
        explanation:
          "Onjuist. Sam kan ook strafbaar zijn als zijn bijdrage voldoende gewicht heeft en sprake is van nauwe en bewuste samenwerking.",
      },
      {
        id: "B",
        text: "Sam en Noah kunnen als medeplegers worden aangemerkt.",
        correct: true,
        explanation:
          "Juist. Er is vooraf overleg geweest en Sam levert een actieve bijdrage door op de uitkijk te staan. Dat kan medeplegen opleveren.",
      },
      {
        id: "C",
        text: "Sam is nooit strafbaar als hij het goed niet zelf wegneemt.",
        correct: false,
        explanation:
          "Onjuist. Voor medeplegen is niet vereist dat iemand alle uitvoeringshandelingen zelf verricht.",
      },
    ],
  },
  {
    title: "Medeplichtigheid",
    text: "Ruben weet dat zijn vriend een inbraak wil plegen. Hij geeft hem bewust een koevoet mee, maar gaat zelf niet mee naar de woning. Welke kwalificatie ligt het meest voor de hand?",
    answers: [
      {
        id: "A",
        text: "Medeplichtigheid, omdat Ruben behulpzaam is door een middel te verschaffen.",
        correct: true,
        explanation:
          "Juist. Het bewust verschaffen van een middel voor het misdrijf kan medeplichtigheid opleveren.",
      },
      {
        id: "B",
        text: "Medeplegen, omdat iedereen die helpt automatisch medepleger is.",
        correct: false,
        explanation:
          "Onjuist. Medeplegen vereist nauwe en bewuste samenwerking en een voldoende gewichtige bijdrage.",
      },
      {
        id: "C",
        text: "Geen strafbaarheid, omdat Ruben niet bij de woning aanwezig was.",
        correct: false,
        explanation:
          "Onjuist. Fysieke aanwezigheid bij het delict is niet altijd vereist voor strafbare deelneming.",
      },
    ],
  },
  {
    title: "Uitlokking",
    text: "Eva biedt Milan €500 aan als hij de telefoon van haar ex steelt. Milan doet dit vervolgens. Welk deelnemingsleerstuk past hier het best?",
    answers: [
      {
        id: "A",
        text: "Uitlokking",
        correct: true,
        explanation:
          "Juist. Eva beweegt Milan door een belofte van geld tot het plegen van een strafbaar feit.",
      },
      {
        id: "B",
        text: "Noodweer",
        correct: false,
        explanation:
          "Onjuist. Er is geen sprake van verdediging tegen een wederrechtelijke aanranding.",
      },
      {
        id: "C",
        text: "Overmacht in noodtoestand",
        correct: false,
        explanation:
          "Onjuist. Er is geen conflict van plichten of noodsituatie beschreven.",
      },
    ],
  },
  {
    title: "Doen plegen",
    text: "Een volwassene laat een jong kind, dat niet begrijpt wat het doet, een duur horloge uit een winkel pakken en aan hem geven. Welk leerstuk kan hier spelen?",
    answers: [
      {
        id: "A",
        text: "Doen plegen",
        correct: true,
        explanation:
          "Juist. Bij doen plegen gebruikt iemand een ander als instrument, terwijl die ander zelf niet strafbaar is.",
      },
      {
        id: "B",
        text: "Noodweerexces",
        correct: false,
        explanation:
          "Onjuist. Noodweerexces ziet op overschrijding van noodzakelijke verdediging door een hevige gemoedsbeweging.",
      },
      {
        id: "C",
        text: "Alleen poging",
        correct: false,
        explanation:
          "Onjuist. Als het horloge daadwerkelijk wordt weggenomen, kan sprake zijn van voltooiing. Het leerstuk doen plegen ziet op de rolverdeling.",
      },
    ],
  },
  {
    title: "Noodweer",
    text: "Mike wordt op straat plotseling aangevallen met vuistslagen. Hij duwt de aanvaller direct weg, waardoor die valt. Welke voorwaarde is vooral relevant voor noodweer?",
    answers: [
      {
        id: "A",
        text: "Er moet sprake zijn van een ogenblikkelijke wederrechtelijke aanranding.",
        correct: true,
        explanation:
          "Juist. Noodweer vereist onder meer een onmiddellijke en wederrechtelijke aanval waartegen verdediging noodzakelijk is.",
      },
      {
        id: "B",
        text: "Noodweer kan alleen bij verdediging tegen dodelijk geweld.",
        correct: false,
        explanation:
          "Onjuist. Noodweer kan ook bij andere vormen van wederrechtelijke aanranding.",
      },
      {
        id: "C",
        text: "Noodweer is altijd toegestaan zodra iemand boos wordt.",
        correct: false,
        explanation:
          "Onjuist. Boosheid is niet genoeg. Er moet sprake zijn van een concrete wederrechtelijke aanranding en noodzakelijke verdediging.",
      },
    ],
  },
  {
    title: "Noodweerexces",
    text: "Sara wordt aangevallen en mag zich verdedigen. Nadat de aanval feitelijk is gestopt, blijft zij doorslaan omdat zij in paniek is geraakt door de aanval. Welk leerstuk kan dan mogelijk relevant zijn?",
    answers: [
      {
        id: "A",
        text: "Noodweerexces",
        correct: true,
        explanation:
          "Juist. Bij noodweerexces gaat het om overschrijding van de grenzen van noodzakelijke verdediging door een hevige gemoedsbeweging veroorzaakt door de aanranding.",
      },
      {
        id: "B",
        text: "Uitlokking",
        correct: false,
        explanation:
          "Onjuist. Uitlokking gaat over het bewegen van een ander tot een strafbaar feit.",
      },
      {
        id: "C",
        text: "Voorbereiding",
        correct: false,
        explanation:
          "Onjuist. Voorbereiding gaat over handelingen voorafgaand aan een ernstig misdrijf.",
      },
    ],
  },
  {
    title: "Putatief noodweer",
    text: "Omar denkt ten onrechte dat iemand een mes trekt en slaat die persoon direct. Achteraf blijkt dat het om een telefoon ging. Welk begrip past hierbij?",
    answers: [
      {
        id: "A",
        text: "Putatief noodweer",
        correct: true,
        explanation:
          "Juist. Putatief noodweer ziet op een verontschuldigbare dwaling over het bestaan van een noodweersituatie.",
      },
      {
        id: "B",
        text: "Voltooide diefstal",
        correct: false,
        explanation:
          "Onjuist. De casus gaat niet over wegnemen van een goed, maar over een vermeende verdedigingssituatie.",
      },
      {
        id: "C",
        text: "Medeplegen",
        correct: false,
        explanation:
          "Onjuist. Er is geen sprake van samenwerking met een ander.",
      },
    ],
  },
  {
    title: "Overmacht in noodtoestand",
    text: "Een arts overtreedt in een acute noodsituatie een voorschrift om direct een mensenleven te redden. Welk leerstuk kan mogelijk relevant zijn?",
    answers: [
      {
        id: "A",
        text: "Overmacht in noodtoestand",
        correct: true,
        explanation:
          "Juist. Bij overmacht in noodtoestand gaat het om een conflict van plichten of belangen waarbij het zwaarwegende belang voorgaat.",
      },
      {
        id: "B",
        text: "Diefstal",
        correct: false,
        explanation:
          "Onjuist. De casus draait niet om wederrechtelijke toe-eigening van een goed.",
      },
      {
        id: "C",
        text: "Bewijsminimum",
        correct: false,
        explanation:
          "Onjuist. Bewijsminimum is een formeel strafrechtelijk bewijsbegrip, geen strafuitsluitingsgrond.",
      },
    ],
  },
  {
    title: "Ontoerekeningsvatbaarheid",
    text: "Een verdachte pleegt een strafbaar feit terwijl uit deskundigenonderzoek blijkt dat hij door een ernstige psychische stoornis zijn handelen niet kon overzien. Welk leerstuk kan relevant zijn?",
    answers: [
      {
        id: "A",
        text: "Ontoerekeningsvatbaarheid",
        correct: true,
        explanation:
          "Juist. Ontoerekeningsvatbaarheid kan spelen als het feit de verdachte wegens een gebrekkige ontwikkeling of ziekelijke stoornis niet kan worden toegerekend.",
      },
      {
        id: "B",
        text: "Poging",
        correct: false,
        explanation:
          "Onjuist. Poging gaat over een begin van uitvoering van een voorgenomen misdrijf.",
      },
      {
        id: "C",
        text: "Gekwalificeerde diefstal",
        correct: false,
        explanation:
          "Onjuist. Dat ziet op diefstal onder strafverzwarende omstandigheden.",
      },
    ],
  },
  {
    title: "Diefstal",
    text: "Jesse pakt in een winkel een koptelefoon, stopt die in zijn tas en loopt zonder te betalen naar buiten. Welk bestanddeel staat centraal bij diefstal?",
    answers: [
      {
        id: "A",
        text: "Wegnemen met het oogmerk van wederrechtelijke toe-eigening",
        correct: true,
        explanation:
          "Juist. Bij diefstal gaat het om het wegnemen van een goed dat aan een ander toebehoort met het oogmerk van wederrechtelijke toe-eigening.",
      },
      {
        id: "B",
        text: "Een ogenblikkelijke wederrechtelijke aanranding",
        correct: false,
        explanation:
          "Onjuist. Dat hoort bij noodweer.",
      },
      {
        id: "C",
        text: "Een hevige gemoedsbeweging",
        correct: false,
        explanation:
          "Onjuist. Dat is relevant bij noodweerexces.",
      },
    ],
  },
  {
    title: "Gekwalificeerde diefstal",
    text: "Twee personen breken 's nachts samen een woning binnen en nemen laptops mee. Welke kwalificatie ligt naast gewone diefstal voor de hand?",
    answers: [
      {
        id: "A",
        text: "Gekwalificeerde diefstal",
        correct: true,
        explanation:
          "Juist. Diefstal door twee of meer verenigde personen en/of met braak kan strafverzwarend werken.",
      },
      {
        id: "B",
        text: "Alleen eenvoudige belediging",
        correct: false,
        explanation:
          "Onjuist. De casus gaat over woninginbraak en wegnemen van goederen.",
      },
      {
        id: "C",
        text: "Alleen schuldheling",
        correct: false,
        explanation:
          "Onjuist. Heling gaat over het verwerven of voorhanden hebben van uit misdrijf afkomstige goederen, niet over het zelf stelen in deze casus.",
      },
    ],
  },
  {
    title: "Mishandeling",
    text: "Kevin geeft zonder rechtvaardiging een ander een harde klap in het gezicht, waardoor die pijn heeft. Welk delict ligt het meest voor de hand?",
    answers: [
      {
        id: "A",
        text: "Mishandeling",
        correct: true,
        explanation:
          "Juist. Het opzettelijk toebrengen van pijn of letsel kan mishandeling opleveren.",
      },
      {
        id: "B",
        text: "Diefstal",
        correct: false,
        explanation:
          "Onjuist. Er wordt niets weggenomen.",
      },
      {
        id: "C",
        text: "Valsheid in geschrift",
        correct: false,
        explanation:
          "Onjuist. Er is geen sprake van een vals document of geschrift.",
      },
    ],
  },
  {
    title: "Bedreiging",
    text: "Iemand stuurt aan zijn buurman: 'Ik steek vannacht je huis in brand terwijl jij slaapt.' De buurman neemt dit serieus. Welk delict kan aan de orde zijn?",
    answers: [
      {
        id: "A",
        text: "Bedreiging",
        correct: true,
        explanation:
          "Juist. Een ernstige dreiging met bijvoorbeeld brandstichting of geweld kan bedreiging opleveren.",
      },
      {
        id: "B",
        text: "Poging tot diefstal",
        correct: false,
        explanation:
          "Onjuist. De casus gaat niet over een begin van uitvoering van diefstal.",
      },
      {
        id: "C",
        text: "Overmacht",
        correct: false,
        explanation:
          "Onjuist. Er is geen sprake van een noodsituatie of conflict van plichten.",
      },
    ],
  },
  {
    title: "Vernieling",
    text: "Boos trapt Lars expres de spiegel van de auto van zijn buurman kapot. Welk delict ligt het meest voor de hand?",
    answers: [
      {
        id: "A",
        text: "Vernieling",
        correct: true,
        explanation:
          "Juist. Het opzettelijk en wederrechtelijk beschadigen of vernielen van een goed van een ander kan vernieling opleveren.",
      },
      {
        id: "B",
        text: "Doen plegen",
        correct: false,
        explanation:
          "Onjuist. Lars handelt zelf; er is geen tussenpersoon die als instrument wordt gebruikt.",
      },
      {
        id: "C",
        text: "Bewijsminimum",
        correct: false,
        explanation:
          "Onjuist. Dat is een bewijsrechtelijk begrip en geen delictsomschrijving.",
      },
    ],
  },
  {
    title: "Artikel 348 Sv",
    text: "De strafrechter moet eerst enkele voorvragen beantwoorden voordat hij aan de inhoudelijke beoordeling van de zaak toekomt. Welk artikel hoort daarbij?",
    answers: [
      {
        id: "A",
        text: "Artikel 348 Sv",
        correct: true,
        explanation:
          "Juist. Artikel 348 Sv ziet op de voorvragen, zoals de geldigheid van de dagvaarding en de bevoegdheid van de rechter.",
      },
      {
        id: "B",
        text: "Artikel 310 Sr",
        correct: false,
        explanation:
          "Onjuist. Artikel 310 Sr gaat over diefstal.",
      },
      {
        id: "C",
        text: "Artikel 47 Sr",
        correct: false,
        explanation:
          "Onjuist. Artikel 47 Sr ziet op daderschap en deelneming, zoals medeplegen en doen plegen.",
      },
    ],
  },
  {
    title: "Artikel 350 Sv",
    text: "Na de voorvragen beoordeelt de rechter onder meer of het feit bewezen is, welk strafbaar feit het oplevert en of de verdachte strafbaar is. Welk artikel hoort daarbij?",
    answers: [
      {
        id: "A",
        text: "Artikel 350 Sv",
        correct: true,
        explanation:
          "Juist. Artikel 350 Sv bevat de hoofdvragen van de strafrechter.",
      },
      {
        id: "B",
        text: "Artikel 6:162 BW",
        correct: false,
        explanation:
          "Onjuist. Dat artikel hoort bij de onrechtmatige daad in het burgerlijk recht.",
      },
      {
        id: "C",
        text: "Artikel 1:3 Awb",
        correct: false,
        explanation:
          "Onjuist. Dat artikel gaat over het besluitbegrip in het bestuursrecht.",
      },
    ],
  },
  {
    title: "Bewijsminimum",
    text: "Een verdachte bekent bij de politie, maar er is verder helemaal geen steunbewijs. Welke regel is dan relevant?",
    answers: [
      {
        id: "A",
        text: "Een bewezenverklaring mag niet uitsluitend op de verklaring van de verdachte steunen.",
        correct: true,
        explanation:
          "Juist. In het strafprocesrecht geldt dat een bewezenverklaring niet alleen op de verklaring van de verdachte mag rusten.",
      },
      {
        id: "B",
        text: "Een bekentenis is altijd genoeg.",
        correct: false,
        explanation:
          "Onjuist. Er is in beginsel aanvullend steunbewijs nodig.",
      },
      {
        id: "C",
        text: "Bij een bekentenis hoeft de rechter geen bewijs meer te beoordelen.",
        correct: false,
        explanation:
          "Onjuist. De rechter moet nog steeds beoordelen of wettig en overtuigend bewijs aanwezig is.",
      },
    ],
  },
  {
    title: "Dwangmiddelen",
    text: "De politie wil een verdachte aanhouden en zijn woning doorzoeken. Waar moet je juridisch vooral op letten?",
    answers: [
      {
        id: "A",
        text: "Of er een wettelijke bevoegdheid bestaat en aan de voorwaarden daarvoor is voldaan.",
        correct: true,
        explanation:
          "Juist. Dwangmiddelen vereisen een wettelijke grondslag en moeten voldoen aan de bijbehorende voorwaarden.",
      },
      {
        id: "B",
        text: "Of de politie het praktisch handig vindt.",
        correct: false,
        explanation:
          "Onjuist. Praktisch nut is niet genoeg. Er moet een wettelijke bevoegdheid zijn.",
      },
      {
        id: "C",
        text: "Of de verdachte toestemming geeft voor elke opsporingshandeling.",
        correct: false,
        explanation:
          "Onjuist. Sommige dwangmiddelen kunnen juist zonder toestemming worden toegepast, mits aan de wettelijke eisen is voldaan.",
      },
    ],
  },
  {
    title: "Rechtsmiddelen",
    text: "Een verdachte is het niet eens met het vonnis van de rechtbank en wil dat een hogere rechter de zaak beoordeelt. Welk rechtsmiddel ligt meestal voor de hand?",
    answers: [
      {
        id: "A",
        text: "Hoger beroep",
        correct: true,
        explanation:
          "Juist. Hoger beroep is het gewone rechtsmiddel tegen veel uitspraken van de rechtbank.",
      },
      {
        id: "B",
        text: "Noodweer",
        correct: false,
        explanation:
          "Onjuist. Noodweer is een strafuitsluitingsgrond, geen rechtsmiddel.",
      },
      {
        id: "C",
        text: "Medeplegen",
        correct: false,
        explanation:
          "Onjuist. Medeplegen is een deelnemingsvorm, geen manier om een uitspraak aan te vechten.",
      },
    ],
  },
  {
    title: "Voortbouwend appel",
    text: "Een verdachte stelt hoger beroep in tegen één onderdeel van de veroordeling en tegen de straf. Hoe wordt het hoger beroep in moderne strafprocesrechtelijke benadering vaak gezien?",
    answers: [
      {
        id: "A",
        text: "Als een voortbouwende behandeling waarbij het hof zich mede richt op de bezwaren tegen het vonnis.",
        correct: true,
        explanation:
          "Juist. Bij voortbouwend appel staat de behandeling in hoger beroep mede in het teken van de bezwaren die tegen het vonnis zijn aangevoerd.",
      },
      {
        id: "B",
        text: "Als een volledig nieuwe zaak waarin eerdere beslissingen nooit relevant zijn.",
        correct: false,
        explanation:
          "Onjuist. Hoger beroep kan breed zijn, maar het idee van voortbouwend appel is juist dat wordt voortgebouwd op de eerdere behandeling en bezwaren.",
      },
      {
        id: "C",
        text: "Als een bestuursrechtelijke bezwaarprocedure.",
        correct: false,
        explanation:
          "Onjuist. Hoger beroep in strafzaken is geen bestuursrechtelijke bezwaarprocedure.",
      },
    ],
  },
];

export default function StrafrechtPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentQuestionIndex];

  const selected = question.answers.find(
    (answer) => answer.id === selectedAnswer
  );

  function handleAnswer(answerId: string) {
    if (selectedAnswer !== null) return;

    const answer = question.answers.find((item) => item.id === answerId);

    setSelectedAnswer(answerId);
    setAnsweredQuestions((previous) => previous + 1);

    if (answer?.correct) {
      setScore((previous) => previous + 1);
    }
  }

  function handleNextQuestion() {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= questions.length) {
      setIsFinished(true);
      return;
    }

    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswer(null);
  }

  function restartQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnsweredQuestions(0);
    setIsFinished(false);
  }

  if (isFinished) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <a href="/" className="text-sm text-slate-400 hover:text-white">
            ← Terug naar home
          </a>

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Strafrecht · Resultaat
            </p>

            <h1 className="mt-4 text-4xl font-bold">Je score</h1>

            <p className="mt-6 text-6xl font-bold">
              {score}/{questions.length}
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              {score === questions.length
                ? "Perfect. Je beheerst deze basisvragen goed."
                : score >= 3
                ? "Netjes. Je zit op de goede weg, maar sommige leerstukken kun je nog scherper oefenen."
                : "Nog even dooroefenen. Lees vooral goed waarom de foute antwoorden niet kloppen."}
            </p>

            <button
              onClick={restartQuiz}
              className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Opnieuw oefenen
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="text-sm text-slate-400 hover:text-white">
          ← Terug naar home
        </a>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Strafrecht · MC-vraag {currentQuestionIndex + 1} van{" "}
              {questions.length}
            </p>

            <p className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
              Score: {score}/{answeredQuestions}
            </p>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-white transition-all"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <h1 className="mt-8 text-3xl font-bold">{question.title}</h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            {question.text}
          </p>

          <div className="mt-8 space-y-4">
            {question.answers.map((answer) => {
              const isSelected = selectedAnswer === answer.id;
              const showCorrect = selectedAnswer !== null && answer.correct;
              const showWrong = isSelected && !answer.correct;

              return (
                <button
                  key={answer.id}
                  onClick={() => handleAnswer(answer.id)}
                  disabled={selectedAnswer !== null}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    showCorrect
                      ? "border-green-700 bg-green-950/40"
                      : showWrong
                      ? "border-red-700 bg-red-950/40"
                      : isSelected
                      ? "border-white bg-slate-800"
                      : "border-slate-700 bg-slate-950 hover:bg-slate-800"
                  }`}
                >
                  <span className="font-bold">{answer.id}.</span> {answer.text}
                </button>
              );
            })}
          </div>

          {selected && (
            <div
              className={`mt-8 rounded-2xl border p-6 ${
                selected.correct
                  ? "border-green-700 bg-green-950/40"
                  : "border-red-700 bg-red-950/40"
              }`}
            >
              <h2 className="text-xl font-bold">
                {selected.correct ? "Goed antwoord" : "Niet helemaal"}
              </h2>

              <p className="mt-3 leading-7 text-slate-200">
                {selected.explanation}
              </p>

              <button
                onClick={handleNextQuestion}
                className="mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                {currentQuestionIndex + 1 === questions.length
                  ? "Bekijk resultaat"
                  : "Volgende vraag"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

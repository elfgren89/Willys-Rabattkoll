# Willys Rabattkoll

**Willys Rabattkoll** är en applikation som hjälper dig att snabbt och enkelt se och sortera Willys kampanjer baserat på hur mycket du kan spara. Projektet är byggt för att effektivt hämta och presentera information om rabatterade produkter från Willys.

## Funktioner

- **Sortering efter sparade pengar**: Produkterna visas i ordning efter hur mycket du kan spara.
- **Obegränsad scrollning**: Nya erbjudanden laddas in automatiskt när du skrollar längst ner på sidan.
- **Tydlig presentation**: Varje erbjudande innehåller:
  - Produktnamn
  - Tillverkare
  - Vikt/volym
  - Originalpris (överstruket)
  - Rabatterat pris (i stor, tydlig text)
  - Sparad summa (iögonfallande design)
- **Sammanfattning av erbjudanden**: Överst på sidan visas:
  - Antal erbjudanden
  - Sammanlagda sparade pengar
  - Högsta och lägsta rabatt
- **Responsiv design**: Användargränssnittet fungerar bra på både mobiler och datorer.
- **Mörkt och ljust läge**: Dynamisk växling mellan mörkt och ljust läge för bästa användarupplevelse.

## Teknologier

Projektet är byggt med följande teknologier:

### Frontend
- **React**: Komponentbaserat ramverk för att bygga användargränssnitt.
- **CSS**: Anpassad styling för responsiv design och tydlig visning av produkter.

### Backend
- **Flask**: Python-webbramverk som används för att hämta data från Willys API.
- **Flask-CORS**: För att hantera CORS-problem vid kommunikation mellan frontend och backend.
- **Requests**: Python-bibliotek för att skicka HTTP-förfrågningar.

### Deployment
- **GitHub**: Kodhantering och versionskontroll.
- **Vercel**: Deployment-plattform för att hantera frontend.
- **Railway eller annan PaaS**: Kan användas för att deploya backend.

## Installation och körning

### Förutsättningar
- **Node.js** (för frontend)
- **Python 3.8 eller nyare** (för backend)
- **Git** (för versionskontroll)

### Installation

1. **Kloning av repository**
   ```bash
   git clone https://github.com/elfgren89/Willys-Rabattkoll.git
   cd Willys-Rabattkoll

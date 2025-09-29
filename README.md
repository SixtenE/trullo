# Körguide

1. Klona repot
2. Installera med `npm install`
3. Starta servern med `npm run dev`
4. Gör request till `http://localhost:3000/api/tasks`

# Teoretiska resonemang kring Trullo

- Motivera ditt val av databas
  Jag valde nosql för att jag har använt sql mest och ville prova att använda det vi har lärt oss under den här kursen.

- Redogör vad de olika teknikerna (ex. verktyg, npm-paket, etc.) gör i applikationen
  Jag använder express som ramverk för min webbserver så att jag kan skriva routes på ett enklare sätt.
  Jag använder mongoose som abstraktion över mongodb.
  Jag använder zod för validering.
  Jag använder vitest och supertest för testing.

- Redogör översiktligt hur applikationen fungerar
  Det är ett api som hanterar "tasks" och "users". Det finns CRUD-rutter för båda resurserna.
  Input till task och user valideras med zod.
  Lösenord hashas med bcrypt.
  På tasks kan man uppdatera status och om en task är klar så sätts finshedAt till tiden då den blev klar.
  På tasks kan man ändra vem som är assigned och då verifieras att den användaren finns.

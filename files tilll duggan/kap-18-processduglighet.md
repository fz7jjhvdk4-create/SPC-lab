# 18 Processduglighet

Statistisk processtyrning med hjälp av styrdiagram är ett arbetssätt för att förbättra processer och för att bevara processer i statistisk jämvikt. En process som är i statistisk jämvikt kan dock ha så stor slumpmässig variation att många producerade enheter får mått utanför de satta toleransgränserna; se figur 18.1. Då måste justeringar göras i processen så att processutfallet hamnar inom toleransgränserna.

Vi ska i detta kapitel diskutera hur man kan undersöka och mäta förmågan hos en process att producera enheter som ligger inom uppsatta toleransgränser. Intresset kring dessa frågor har fått stor aktualitet via Sex Sigma (se avsnitt 24.1), men också på grund av det fokus på processer och krav på processer som finns i kvalitetsledningssystem som ISO 9000 och ISO/TS 16949; se kapitel 22. För en köpare av komponenter är det viktigt att kunna få ett kvitto på att de tillverkade komponenterna från processen har liten variation och mått inom toleransgränserna.

Förmågan hos en process att producera enheter med mått inom de satta toleransgränserna kallas dess *duglighet* med avseende på den studerade storheten. Med hjälp av informationen som erhålls från den statistiska processtyrningen kan olika mått för denna förmåga definieras. I detta kapitel ska vi presentera några olika duglighetsmått och studera den information de ger om processen. Vi ska också diskutera när och hur duglighetsstudier bör utföras. Även om duglighetsbegreppet mest används i samband med tillverkningsprocesser vill vi understryka att det är användbart också för andra typer av processer.

## 18.1 Duglighetsmått

Dugligheten hos en process bestäms av den statistiska fördelning som den studerade produktstorheten följer. När processen är i statistisk jämvikt kan denna fördelning i många fall med godtagbar approximation beskrivas av en normalfördelning. Dugligheten bestäms då av motsvarande genomsnittsvärde (väntevärde) $\mu$ och spridning (standardavvikelse) $\sigma$ samt av den övre toleransgränsen $T_ö$ och den undre toleransgränsen $T_u$. Detta illustreras i figur 18.1. Vi vill dock understryka att det finns situationer då utfallet knappast kan approximeras med en normalfördelning. Exempelvis är fördelningen ofta sned, när man studerar hållfasthet eller ytjämnhet. Tolkningen av duglighetsmåtten blir annorlunda i sådana fall.

Det är viktigt att notera att ett duglighetsmått bara går att använda som grund för en framtida prognos om processen är i statistisk jämvikt. I annat fall saknas kunskap om den fördelning som beskrivs i figur 18.1. Ofta används i industrin duglighetsmått utan kännedom om huruvida processen är i statistisk jämvikt eller ej.

> **Figur 18.1** Förmågan att tillverka enheter med mått inom toleransgränserna $T_ö$ och $T_u$ beror på processens spridning $\sigma$ och hur processen är centrerad, dvs var genomsnittsvärdet $\mu$ ligger i förhållande till toleransgränserna.

### 18.1.1 Några duglighetsindex

Ett mått på processens möjligheter att producera enheter inom de uppsatta toleransgränserna när man har en undre toleransgräns $T_u$ och en övre toleransgräns $T_ö$, är dess *duglighetsindex*

$$C_p = \frac{T_ö - T_u}{6\sigma}$$

Detta index anger förhållandet mellan det uppsatta toleransområdets längd (se figur 18.2) och *processens naturliga variation*, som är ett vanligt namn för $6\sigma$. Beteckningen "p" i indexet syftar på "process".

Ett stort värde på $C_p$ innebär att processen, om den är väl centrerad, kommer att producera enheter vars mått ligger inom toleransgränserna. Om $C_p$ däremot är för litet räcker inte en bra centrering; se figur 18.3(c).

Tidigare rekommenderades ofta att $C_p$ skulle uppfylla $C_p \geq 4/3 = 1{,}33$. I förbättringsprogrammet Sex Sigma ställs betydligt högre krav. En nackdel med $C_p$ är att detta index endast tar hänsyn till processens spridning och inte till centreringen. Det är därför ett index som snarast mäter de möjligheter processen kan ge om den är rätt centrerad. Däremot mäter det inte processens förmåga. Ett bättre namn på $C_p$ vore därför "möjlighetsindex". I enstaka engelsk litteratur används ibland namnet "process potential index".

> **Figur 18.2** Duglighetsindex $C_p$ är ett mått på processens spridning i relation till toleransområdets bredd. För att inte få enheter med mått utanför toleransområdet krävs, förutom ett tillräckligt stort värde på duglighetsindex $C_p$, att processen är väl centrerad.

> **Figur 18.3** (a) En process med ett stort värde på duglighetsindex $C_p$ kommer att producera enheter inom toleransgränserna om processen är väl centrerad. (b) En process med ett stort värde på duglighetsindex $C_p$ kommer att producera enheter med mått utanför toleransgränserna om processgenomsnittet ligger alltför långt från toleransområdets mitt. (c) En process med alltför litet värde på duglighetsindex $C_p$ kommer att producera enheter med mått utanför toleransområdet även om processen är väl centrerad.

Ett duglighetsindex som också tar hänsyn till processens centrering, dvs hur väl processen ligger inom toleransgränserna, är det *korrigerade duglighetsindexet*

$$C_{pk} = \min\left(\frac{T_ö - \mu}{3\sigma}, \frac{\mu - T_u}{3\sigma}\right)$$

Detta index mäter avståndet mellan processens genomsnittsvärde och närmaste toleransgräns i förhållande till $3\sigma$; se figur 18.4.

> **Figur 18.4** Det korrigerade duglighetsindexet $C_{pk}$ är lika med det minsta av $C_{pö}$ och $C_{pu}$. Här är $C_{pu}$ avståndet mellan genomsnittsvärdet $\mu$ och undre toleransgränsen $T_u$ i förhållande till halva processens naturliga spridning, medan $C_{pö}$ är motsvarande förhållande mellan $T_ö - \mu$ och $3\sigma$.

Har man bara en toleransgräns, antingen en övre toleransgräns $T_ö$ eller en undre $T_u$, kan man använda ensidiga duglighetsindex, exempelvis det *övre korrigerade duglighetsindexet*

$$C_{pö} = \frac{T_ö - \mu}{3\sigma}$$

eller det *undre korrigerade duglighetsindexet*

$$C_{pu} = \frac{\mu - T_u}{3\sigma}$$

Även om $C_{pk}$ är ett effektivare duglighetsmått än $C_p$ tar $C_{pk}$ inte hänsyn till om processens genomsnittsvärde avviker från målvärdet $T$. För att överbrygga denna svaghet presenterade Hsiang & Taguchi (1985) och Chan et al. (1988) ett index som, lite olyckligt, betecknas $C_{pm}$ och som definieras av

$$C_{pm} = \frac{T_ö - T_u}{6\sqrt{\sigma^2 + (\mu - T)^2}}$$

Vi ser att om $T = \mu$ så är $C_{pm} = C_p$. En generalisering av detta duglighetsindex, som även tar hänsyn till fallet att målvärdet inte ligger mitt i toleransområdet är

$$C_{pmk} = \frac{\min(T_ö - \mu, \mu - T_u)}{3\sqrt{\sigma^2 + (\mu - T)^2}}$$

som introducerades av Pearn et al. (1992) och studerats av Vännman (2001).

### 18.1.2 Statistisk osäkerhet

I allmänhet känner man inte genomsnittsvärdet $\mu$ och standardavvikelsen $\sigma$ för den process man studerar. Dessa mått måste då skattas med hjälp av mätvärden från tillverkningsprocessen. Man ersätter då $\mu$ och $\sigma$ med, exempelvis, $\bar{x}$ och $s$ beräknat på mätvärdena. Sådana skattade värden på duglighetsindex bör utmärkas, exempelvis med hjälp av *. Vi får då de skattade indexen $C_p^*$ eller $C_{pk}^*$.

Om man har ett litet observationsmaterial kan den slumpmässiga osäkerheten i dessa skattningar vara stor. Om exempelvis $C_p = 1{,}0$ och $n = 30$ så är sannolikheten ungefär 11% att få $C_p^* \geq 1{,}20$ och omkring 3% att få $C_p^* \geq 1{,}33$ om utfallet kommer från en normalfördelning. Om $C_p = 1{,}33$ och $n = 30$ så är sannolikheten ungefär 30% att få $C_p^* \leq 1{,}20$ och omkring 5% att få $C_p^* \leq 1{,}10$. Att $C_{pk}$ är en slumpvariabel illustreras också i figur 18.6, där 1000 simulerade värden från en process med $C_{pk} = 1{,}33$ spänner från ungefär 0,9 till drygt 1,9.

## 18.2 Maskin- och processduglighet

Även om man i en tillverkningsprocess försökt eliminera alla urskiljbara orsaker till variation visar det sig ofta att processens genomsnittsvärde varierar med tiden. Detta kan exempelvis bero på variationer mellan olika skift, olika maskiner eller varierande utgångsmaterial. Processen är då egentligen inte i statistisk jämvikt enligt den definition vi gav i avsnitt 7.3. Man kan dock tänka sig att en process kan ha en viss urskiljbar variation, men ändå vara predikterbar. Om vi exempelvis har material som kommer från en leverantör vars process är i statistisk jämvikt när vi studerar variationen mellan olika partier kan bilden se ut som i figurerna 18.7 och 18.8.

Om vi kan vara säkra på att den variation vi har mellan provgrupper hänför sig till källor för variation, som i sig är i statistisk jämvikt, kan man säga att processen är i *svag statistisk jämvikt*. Man kan då betrakta variationen i processens genomsnittsvärde, $\mu$, som en slumpvariabel, vars spridning är möjlig att uppskatta. I sådana fall är det fortfarande relevant att tala om processduglighet. I detta fall har man alltså två spridningskomponenter, dels en variation från enhet till enhet och dels en variation som beror på den långsammare variationen av genomsnittsnivån.

Om man enbart tar hänsyn till den förstnämnda variationen talar man om *maskinduglighet*, medan *processdugligheten* tar hänsyn till båda spridningskomponenterna. Duglighetsindex för maskinen brukar indiceras med "m", exempelvis $C_m$ och $C_{mk}$, på motsvarande sätt som $C_p$ och $C_{pk}$ avser duglighetsindex för processen.

Denna uppdelning av duglighetsbegreppet associerar starkt till tillverkningsprocesser. Eftersom motsvarande synsätt också är tillämpbart på andra typer av processer ersätts begreppen maskinduglighet och processduglighet alltmer med *korttidsduglighet* respektive *långtidsduglighet*, och man använder ofta beteckningen $C_{pk}$ för korttidsdugligheten (som vi ovan kallade maskinduglighet med beteckning $C_{mk}$) och $P_{pk}$ för långtidsdugligheten.

För att skatta maskindugligheten behöver vi således ett homogent datamaterial, taget under en kort tidsperiod med, exempelvis, samma material, samma inställning och samma skift.

För att skatta processdugligheten behöver vi dels studera processen under en längre tidsperiod och dels vara uppmärksamma på hur vi skattar spridningen. En skattning av processdugligheten kan exempelvis inte bygga på R-värden från ett antal provgrupper tagna under en längre tidsperiod. Vi kan ha konstant variation inom grupperna men en förskjutning av genomsnittsvärdet över samma tidsperiod; se figur 18.8.

Maskindugligheten kan uppskattas med hjälp av $\bar{x}_j$ och $s_j, j = 1, 2, ..., k$, där $k$ är antalet provgrupper tagna ifrån produktionen. Storheterna $\mu$ och $\sigma_I$ kan sedan skattas med hjälp av

$$\bar{\bar{x}} = \frac{1}{k}\sum_{j=1}^{k}\bar{x}_j \quad \text{respektive} \quad s_I = \sqrt{\frac{1}{k}\sum_{j=1}^{k}s_j^2}$$

Här är $s_I$ en skattning av spridningen $\sigma_I$ inom provgruppen.

Processvariationen kan beskrivas med två komponenter, dels $\sigma_I$, som är spridningen inom provgrupper, dels $\sigma_M$, som är spridningen mellan provgrupper, se figur 18.8.

Den totala spridningen kan då skrivas som

$$\sigma = \sqrt{\sigma_I^2 + \sigma_M^2}$$

vilket leder till att den totala spridningen $\sigma$ kan skattas med hjälp av $\bar{x}_j$ och $s_j, j = 1, 2, ..., k$, som

$$\sigma^* = \sqrt{s_{\bar{x}}^2 + \frac{n-1}{n}s_I^2}$$

där

$$s_{\bar{x}}^2 = \frac{1}{k-1}\sum_{j=1}^{k}(\bar{x}_j - \bar{\bar{x}})^2$$

För att beräkna en skattning av $C_{pk}$ använder vi nu $\sigma^*$ istället för $\sigma$ enligt formeln i avsnitt 18.1.1.

## 18.3 Duglighetsstudier

I kravstandarden ISO 9001:2015 för kvalitetsledningssystem (se kapitel 22) ingår duglighetsstudier indirekt genom att riskanalys har stor tyngd. Däremot finns duglighetsstudier som explicit krav i bilindustrins standard ISO/TS 16949:2016.

### 18.3.1 Definition

"Duglighetsstudier är ett arbetssätt för att mäta och analysera en produktegenskap för att avgöra processens förmåga att uppfylla de specifikationer som uppställts för egenskapen."; se Deleryd (1998b).

Duglighetsstudier bör genomföras för samtliga viktiga processer. Resultatet från studierna bidrar till att rikta uppmärksamhet på vilka processer som först och främst bör förbättras. Det bör påpekas att duglighetsindex sätter variation och genomsnittsvärde i förhållande till satta toleranser. Det är naturligtvis viktigt att inte duglighetsindex förbättras genom obefogad ökning av toleranser. Tvärtom, är det väsentligt att toleranserna är satta utifrån ställda krav och med omdöme och med utgångspunkt i kundernas behov och förväntningar.

### 18.3.2 Genomförande

En duglighetsstudie omfattar tre olika steg som tydligt kan kopplas till de tre första faserna i förbättringscykeln; se figur 18.9. Det fjärde steget i figur 18.9 "starta förbättringsprojekt" är resultatet av studien och svarar mot "lär"-fasen av förbättringscykeln.

**Identifiera viktiga parametrar och planera studien.** Eftersom det är opraktiskt och kostsamt att styra varje parameter eller egenskap på en produkt måste man välja ut de viktigaste. Innan duglighetsstudien genomförs ska den planeras. Några frågor då är: Vad ska mätas och hur? Vilka mätdon ska användas? Hur ska dessa kalibreras? "Brainstorming", eller på svenska "spånskiva", kan vara lämpligt arbetssätt för att fånga upp olika faktorer. Under denna fas är de sju förbättringsverktygen lämpliga att använda för att strukturera och analysera viktiga faktorer att studera.

**Skapa stabil process och samla mätvärden.** Om dugligheten ska fylla avsedd funktion måste processen vara i statistisk jämvikt, dvs stabil, när dugligheten skattas. Om processen inte är i jämvikt ger ett duglighets­värde bara en ögonblicksbild och kan inte användas för att bedöma dess framtida utfall. Innan man gör en duglighetsstudie är det därför viktigt att se till att maskinen eller processen är i statistisk jämvikt. En beskrivning av processutfallet i tiden är således en viktig komponent i en duglighetsstudie. Ett styrdiagram bör därför alltid finnas med som underlag för den slutliga duglighetsvärderingen.

**Skatta processdugligheten.** Enkla diagram, som histogram och lådagram (se kapitel 8), visualiserar dugligheten på ett bra sätt. För att få ett kvantitativt mått på dugligheten är det lämpligt att utnyttja något duglighetsindex. Att plotta mätvärdena på ett normalfördelningspapper ger då bra information och samtidigt ett test på om det aktuella måttet kan anses vara normalfördelat; se figur 18.10. När det gäller att bedöma vilka åtgärder som behöver sättas in som konsekvens av värdet på duglighetsindex är försöksplanering, de sju förbättringsverktygen och de sju ledningsverktygen till stor hjälp. En duglighetsstudie som bara utförs genom beräkning av ett duglighetsindex av den typ som diskuterades i avsnitt 18.2 blir lätt bara en lek med siffror. Det är lämpligt att använda normalfördelningspapper för att illustrera datamaterialet. Man kan då bedöma om ett antagande om normalfördelning är rimligt samtidigt som det är lättare att tolka materialet och genomföra analysen; se figur 18.10.

**Starta förbättringsprojekt.** Slutligen ska de åtgärder som identifierats sättas in om man bedömer att det är lämpligt. Om istället andra processer bör prioriteras får arbetet vänta. Lägg märke till att detta steg egentligen inte är en del av själva duglighetsstudien utan ett förbättringsarbete baserat på resultatet av duglighetsstudien.

### 18.3.3 Dataanalys och mätnoggrannhet

Frågan om osäkerhet hos skattningar på olika duglighetsindex har vi berört i avsnitt 18.1.2. Duglighetsindex, som mått för processer i statistisk jämvikt, är slumpvariabler. Det är viktigt att förstå detta och kunna hantera den osäkerhet som ett skattat index ger. Ett sätt är att arbeta med konfidensintervall och göra test. Konfidensintervall för $C_p$ finns utvecklade när processegenskapen kan anses normalfördelad; se Kotz & Lovelace (1998). För de något mer komplexa duglighetsindexen $C_{pk}$ och $C_{pm}$ finns endast approximativa konfidensintervall. Däremot saknas, såvitt vi vet, fortfarande konfidensintervall för $C_{pmk}$. Genom simuleringar kan man dock skaffa sig förståelse; se figur 18.6.

I flera situationer är den fördelning som ligger bakom den studerade variabeln inte symmetrisk, som normalfördelningen är, utan skev. Detta gäller exempelvis vid studium av ytjämnhet eller andra variabler som har en naturlig undre gräns vid noll. Frågan om duglighetsstudier för skeva fördelningar är inte helt enkel. Det finns några alternativ. Ett är att transformera observationerna så att de transformerade värdena kan anses vara normalfördelade. Ett annat är att utnyttja olika typer av approximationer.

### 18.3.4 Repeterbarhet och reproducerbarhet

En fråga som är viktig, men alltför ofta försummas, är mätnoggrannheten i relation till de krav som ställs; se exemplet med svetsar i avsnitt 10.4. Exempelvis är det viktigt att försäkra sig om att de mätinstrument som utnyttjas är dugliga och kalibrerade. Det totala felet vid mätning kan karaktäriseras av läge (stabilitet, noggrannhet och linjäritet) och spridning (repeterbarhet och reproducerbarhet).

Mätinstrument måste först och främst visa "i genomsnitt rätt". Detta kallas på engelska "unbiasedness". På svenska skulle man kunna använda begreppet "ojävigt". Noggrannheten är skillnaden mellan ett observerat genomsnittsmått och ett sökt värde. Stabiliteten är noggrannheten över tid när vi använder mätsystemet. Ofta varierar ett genomsnitsfel över mätområdet. Rutiner måste upprättas för att hantera dessa begrepp, annars finns risk för alltför stor osäkerhet.

De två begreppen *repeterbarhet* och *reproducerbarhet*, som brukar sammanfattas i begreppet R&R, är viktigast när vi diskuterar dugligheten hos mätinstrumentet så att vi får samma avläsning vid varje mätning vi gör av en egenskap. Repeterbarhet handlar om mätvariationen från mätning till mätning och syftar på den inneboende variationen i mätinstrumentet. Reproducerbarhet är kopplad till om olika personer erhåller och avläser samma mätresultat.

### 18.3.5 Tillämpning av duglighetsstudier

Duglighetsstudier, och det förbättringsarbete som bör bli följden av duglighetsstudierna, kan ses som ett led i arbetet med att bemästra variationen i organisationens processer.

Vanligen krävs att duglighetsindex för maskin respektive process ska vara minst 1,5 respektive 1,33. Detta kan först tyckas innebära hårda krav. Om utfallet kan beskrivas av en normalfördelning, duglighetsindex är 1,33 och väntevärdet (som här antas sammanfalla med målvärdet) ligger mitt emellan toleransgränserna, kommer endast 0,006% av enheterna att få mått utanför toleransgränserna; se tabell 18.1. Man bör då beakta att målet idag med Sex Sigma innebär ett duglighetsindex på $C_p = 2{,}0$, vilket innebär 0,002 fel per miljonen om processen är perfekt centrerad och utfallet normalfördelat; se tabell 18.1.

> **Tabell 18.1** Andelen defekta enheter för olika värden på duglighetsindex $C_p$ under antagandet att processen är i jämvikt och perfekt centrerad, dvs $\mu = M$. Andelen enheter med mått utanför någon av toleransgränserna med rätt målvärde är då lika med $2(1-\Phi(3C_p))$, där $\Phi$ betecknar fördelningsfunktionen till N(0,1). "Sigma" i tabellens första kolumn betecknar antalet standardavvikelser mellan processens genomsnittsvärde och närmaste toleransgräns.

| Sigma | $(T_O - T_u)/\sigma$ | Värde på $C_p$ | Defekta enheter per en miljon med rätt målvärde | Defekta per en miljon med +1,5 σ-skift |
|-------|----------------------|----------------|--------------------------------------------------|------------------------------------------|
| 2     | 4                    | 0,67           | 46 000                                           | 308 600                                  |
| 2,5   | 5                    | 0,83           | 12 500                                           | 158 700                                  |
| 3     | 6                    | 1,00           | 2 700                                            | 66 800                                   |
| 3,5   | 7                    | 1,17           | 500                                              | 22 700                                   |
| 4     | 8                    | 1,33           | 60                                               | 6 210                                    |
| 4,5   | 9                    | 1,50           | 7                                                | 1 350                                    |
| 5     | 10                   | 1,67           | 1,6                                              | 233                                      |
| 5,5   | 11                   | 1,83           | 1,04                                             | 32                                       |
| 6     | 12                   | 2,00           | 1,002                                            | 3,4                                      |

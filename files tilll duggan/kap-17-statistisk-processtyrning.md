# 17 Statistisk processtyrning

I detta kapitel ska vi fördjupa diskussionen kring hur man kan se på variation över tid, så kallad *diakron variation*, ur ett förbättringsperspektiv. Ett viktigt verktyg i förbättringsarbetet för att finna urskiljbara orsaker till variation är *styrdiagram* som vi berört i avsnitt 8.7. Idén är att man med vissa tidsmellanrum tar ut ett antal observationer, en provgrupp, från processen och med hjälp av dessa beräknar någon form av *kvalitetsindikator* som man avsätter i ett diagram. Det kan, till exempel, vara observationernas aritmetiska medelvärde, deras stickprovsstandardavvikelse eller det totala antalet fel i provgruppen. Man sätter sedan upp styrgränser inom vilka kvalitetsindikatorn bör hålla sig när processen inte har några urskiljbara källor till variation.

## 17.1 Principer för styrdiagram

Som kvalitetsindikator kan man tänka sig varje storhet som på ett bra sätt ger information om processens utfall. Indikatorn behöver alltså inte baseras på mätningar på själva produkten. Det är istället en fördel om indikatorn baseras på mätningar redan i själva processen och inte på den färdiga produkten, eftersom framförhållningen då blir större. Ofta övervakas en process med hjälp av flera kvalitetsindikatorer samtidigt.

Så länge den inprickade kvalitetsindikatorn håller sig inom föreskrivna gränser säger vi att processen är i *statistisk jämvikt* eller att vi har en *stabil process*. De föreskrivna gränserna kallas *styrgränser*. Den undre och övre styrgränsen betecknas $S_u$ respektive $S_ö$. I allmänhet markeras också en "idealnivå", ett *målvärde*, mellan styrgränserna med en *centrallinje, CL*, som ofta sätts lika med indikatorns *genomsnittsvärde* eller *väntevärde*; se figur 17.1. Om de inprickade värdena hamnar utanför någon av styrgränserna indikerar det att det kan finnas en urskiljbar källa till variation. Processen är troligen inte i statistisk jämvikt; se figur 17.1.

Vi vill redan här understryka den väsentliga skillnaden mellan styrgränser och toleransgränser. Styrgränser beräknas för att användas i ett styrdiagram med syfte att avgöra om den aktuella processen är stabil eller inte. Toleransgränser sätts för att avgöra om en enskild enhet uppfyller ställda produkt- eller kundkrav. Styrgränser är alltså kopplade till processen, medan toleransgränserna är kopplade till kundens krav på en enskild enhet.

Det är också viktigt att framhålla att variation finns i alla typer av processer och inte bara i tillverkningsprocesser. Processtyrning och processförbättring är därför lika relevant och användbart när det handlar om antal fel vid fakturering, tid för att hantera låneärenden, andel vårdrelaterade infektioner vid sjukhusvistelser eller antalet programmeringsfel vid programvaruutveckling.

> **Figur 17.1** Principen för ett styrdiagram. Man plottar med jämna tidsmellanrum en kvalitetsindikator i ett diagram där avståndet från centrallinjen till var och en av styrgränserna ofta är tre gånger standardavvikelsen för kvalitetsindikatorn.

### 17.1.1 Krav på styrdiagram

Innan vi diskuterar olika typer av styrdiagram sammanfattar vi några krav på ett bra styrdiagram. Vi såg några redan i avsnitt 8.7, men här utökar vi kravlistan. Styrdiagram bör uppfylla följande:

- med dess hjälp ska man snabbt upptäcka förändringar i processen
- med dess hjälp ska man snabbt upptäcka urskiljbar variation
- det ska kunna fungera som ett kvitto på att ett förbättringsarbete har varit framgångsrikt
- det ska inte ge "falskt alarm" i onödan, dvs risken ska vara liten att en punkt hamnar utanför styrgränserna när ingen förändring har skett och ingen urskiljbar källa till variation finns
- det ska vara enkelt att hantera
- man ska i styrdiagrammet kunna uppskatta tidpunkten för förändringen i processen och vilken typ av förändring som skett för att få hjälp i felsökningsarbetet
- det ska kunna fungera som ett kvitto på om processen varit stabil, dvs i statistisk jämvikt
- det ska kunna tjäna som underlag för värdering av spridningen hos processen och därmed processens förmåga att leverera enheter inom uppsatta toleranser. Denna förmåga kallas duglighet och återkommer i kapitel 18
- det ska vara motivationsstärkande och ständigt föra uppmärksamheten på variation i processen och på kvalitetsfrågor
- det ska ge information för justeringar av framtida styrdiagram. När man fått fler observationer kan man skatta CL och styrgränser bättre.

Några av punkterna ovan ger upphov till avvägningsproblem. Om man ökar känsligheten hos diagrammet, dvs gör det lättare att upptäcka urskiljbar variation, tenderar risken för falskt alarm att öka och vice versa. Detta problem löser man i allmänhet genom att basera beräkningarna på flera observationer och inte markera ett enskilt mätvärde. På så sätt minskar man osäkerheten hos den studerade kvalitetsindikatorn. Dessutom sätts vanliga styrgränser så att skillnaden mellan övre och undre styrgränsen är sex gånger standardavvikelsen för den inprickade kvalitetsindikatorns fördelning när processen är i statistisk jämvikt. Denna typ av styrdiagram kallas *Shewhart-diagram*. Vi ska se senare att denna princip innebär att risken för falskt alarm i en punkt som plottas i styrdiagrammet i allmänhet blir liten, även om den varierar ganska mycket mellan olika typer av diagram. Att risken för falskt alarm är liten innebär att det är långt mellan falska alarm.

Beroende på vilken typ av kvalitetsindikator man har kan styrdiagram delas in i två kategorier. Den ena är styrdiagram för antalsvariabler eller andelsvariabler. Sådana kallas ofta *attributdiagram*. Den andra är styrdiagram för kontinuerliga mätetal, som exempelvis längder, vikter, tider mm. De senare delas ofta in i styrdiagram för genomsnittsvärden och för spridningar. Vi börjar nedan med styrdiagram för antal och andelar.

## 17.2 Styrdiagram för antal och andelar

### 17.2.1 np-diagram och p-diagram

Det är vanligt att man bara räknar antal fel per provgrupp. Antag att det finns $n$ stycken enheter i varje provgrupp och att fel på enheterna inträffar oberoende av varandra. Antalet fel i en provgrupp kan då betraktas som en slumpvariabel. Om felsannolikheten är lika stor för alla enheter har vi en process som bara beror av slumpen. En process som har samma felsannolikhet för alla enheter är i statistisk jämvikt. Men det kan finnas urskiljbara källor till variation, kanske en orutinerad operatör som har hanterat en eller flera av provgrupperna felaktigt. Då är $p$ inte lika för alla provgrupper. Denna typ av urskiljbar variation, som ju är oönskad, vill vi gärna hitta för att kunna hantera eller eliminera.

Ett styrdiagram där vi kan upptäcka urskiljbar variation kan man få genom att rita en centrallinje, $CL = np$ och styrgränser $np \pm 3\sigma$, där $\sigma$ är standardavvikelsen för antal felaktiga, $x$. Standardavvikelsen $\sigma$ för en binomialfördelning beror av $n$ och $p$ och ges av $\sigma = \sqrt{np(1-p)}$. Ibland kan $np - 3\sigma$ bli negativt. Då får man sätta den undre styrgränsen $S_u = 0$.

Det är sällan man från början känner till vilket $p$-värde man bör använda. Det naturliga är då att man skattar $p$ från de observationer man gjort, dvs $p$ skattas av det totala antalet fel (eller motsvarande) dividerat med det totala antalet observationer. I samband med att man gjort ett förbättringsprojekt är det naturligt att man skattar $p$ från tiden innan man infört en förändring.

Det är dock inte alltid man har samma antal enheter i alla provgrupper. Istället har man kanske $n_i$ stycken enheter för provgrupp nummer $i$. När man därför ritar in styrgränserna på samma sätt som ovan kommer centrallinje och styrgränser att variera. Styrgränserna blir $n_i p \pm 3\sqrt{n_i p(1-p)}$. Denna typ av styrdiagram kallas ofta *np-diagram*.

Ett likartat diagram som har samma egenskaper är ett så kallat *p-diagram*, eller *felkvotsdiagram*, där man prickar kvoten $x_i/n_i$ istället för antalet $x_i$. Styrgränserna blir nu $p \pm 3\sqrt{p(1-p)/n_i}$.

#### Hur stort ska n väljas?

En fråga vid konstruktion av p-diagram är hur värdet på $n$ bör väljas. Bland de tumregler som förekommer kan nämnas:

- Välj $n > 50$ eller så stort att $np > 4$ (se Juran et al., 1974).
- Välj $n$ så stor att sannolikheten att få minst en defekt enhet i provgruppen är minst 0,90 (se Duncan, 1986).
- Välj $n$ så att sannolikheten att få utslag i första plottade punkten efter en viss bestämd förändring i $p$ blir minst 0,50 (se Duncan, 1986).

### 17.2.2 c-diagram

Poissonfördelningen är en fördelning som är släkt med binomialfördelningen. Om $n$ är stort och $p$ är "litet" i en binomialfördelning kan en binomialfördelning approximeras med en *Poissonfördelning* med väntevärde $m = np$. Typiska tillämpningar då en Poissonfördelning kan vara lämplig är antalet sällsynta händelser som exempelvis antal fel efter en viss körsträcka med en bil, antal trafikolyckor på en viss vägsträcka, antal vårdrelaterade infektioner på ett sjukhus eller antalet fel som inträffat under en viss tidsperiod. Standardavvikelsen för en Poissonfördelad slumpvariabel med väntevärde $m$ ges av $\sigma = \sqrt{m}$. Om $x_i$ är antalet händelser under tidsperiod $i$ och man har information från tidigare $x$-observationer om $m$, blir då styrgränserna $m \pm 3\sqrt{m}$. Om exempelvis $m$ är 25 blir styrgränserna $25 \pm 3\sqrt{25}$, dvs $S_u = 10$ och $S_ö = 40$. Ett styrdiagram av detta slag brukar kallas *c-diagram*.

## 17.3 Styrdiagram för variabeldata

Vi övergår nu till att diskutera styrdiagram för mätstorheter på en kontinuerlig skala. Exempelvis kan det handla om tiden för att utföra en viss tjänst, diametern på en bult, tid till leverans, betygsgenomsnitt i skolan eller tid till fel hos en viss typ av enhet. Vi exemplifierar först med idéer och begrepp kring styrdiagram för övervakning av förväntad nivå för en viss egenskap.

### 17.3.1 Provgruppsstorlek

Med vissa tidsmellanrum tar man då ut ett antal observationer, en *provgrupp*, från processen. Varje observation ger ett mätvärde $x_i$. Vi beräknar sedan det aritmetiska medelvärdet $\bar{x} = (x_1 + x_2 + ... + x_n)/n$ av de $n$ observationerna och använder detta som kvalitetsindikator för processen. Ett sådant styrdiagram brukar kallas ett $\bar{x}$-diagram. Antag att den kvalitetsvariabel vi önskar studera har väntevärdet $\mu$ och standardavvikelsen $\sigma$, som båda anses kända när processen är i statistisk jämvikt. Då är medelvärdet $\bar{x}$ en observation från en fördelning med samma väntevärde $\mu$ men med standardavvikelsen $\sigma/\sqrt{n}$; se figur 17.5. Vi har alltså mycket större chans att upptäcka en avvikelse från den förväntade nivån $\mu$ genom att betrakta det aritmetiska medelvärdet $\bar{x}$ istället för en enstaka observation. Hur stor bör då provgruppsstorleken $n$ vara?

Det händer att man ibland väljer att ha $n = 1$, dvs att varje enskild enhet mäts. Exempelvis mäts ibland alla tillverkade enheter. Detta kan vara nödvändigt, men slumpvariationen blir stor (se figur 17.6) och tiden mellan falska larm kan bli kort om man inte väljer ett större avstånd mellan styrgränserna än man normalt använder.

### 17.3.2 När ska man ta ut provgrupper?

Provtagningsfrekvensen har betydelse för styrdiagrammets effektivitet. Tar man ut provgrupper oftare erhåller man en bättre övervakning mot nya systematiska orsaker. Färre enheter produceras då innan styrdiagrammet indikerar förändringar. Provtagningskostnaderna ökar dock och man får oftare falskt alarm när processen är i statistisk jämvikt.

Det finns också en annan aspekt på tiden mellan provgrupper. Ibland kan produktionen delas in i olika naturliga och homogena avsnitt som kan bero på skift, råvaruleveranser eller produktionsutrustning. Sådana naturliga indelningar av produktionen brukar på engelska kallas *"rational subgroups"*. Ett förslag till svensk översättning är *naturliga avsnitt*. Tanken är att man inom de naturliga avsnitten av produktionen ska ha en så homogen produktion som möjligt. Om man lyckas så väl med indelningen att det knappast kan inträffa en systematisk förändring, ett urskiljbart bidrag till variationen inom ett avsnitt, räcker det att ta ut en provgrupp från varje avsnitt av produktionen. Med hjälp av denna provgrupp kan man då avgöra om den undersökta delen av produktionen utsatts för någon förändring eller inte.

### 17.3.3 Val av styrgränser

Valet av styrgränser ska göras så att det blir sällsynt med falskt alarm, dvs så att det är lång tid mellan falska alarm. Sannolikheten för falskt alarm måste då vara liten för varje inprickat värde. Låt oss anta att fördelningen för $\bar{x}$ är ungefär normalfördelad med väntevärde $\mu$ och standardavvikelse $\sigma/\sqrt{n}$, där $\sigma$ är standardavvikelsen för ett enskilt mätvärde. Då är sannolikheten för att ett $\bar{x}$-värde avviker mer än $3\sigma/\sqrt{n}$ från processens väntevärde $\mu$ endast 0,0027 när processen är i jämvikt. Om man stoppar processen när ett $\bar{x}$-värde avviker mer än $3\sigma/\sqrt{n}$ från $\mu$ stoppar man alltså processen i onödan i ungefär 0,27 % av fallen. Erfarenheten har visat att detta i allmänhet är en rimlig risk. Man använder därför oftast styrgränserna

$$S_ö = \mu + 3\sigma/\sqrt{n} \quad \text{och} \quad S_u = \mu - 3\sigma/\sqrt{n}$$

samt centrallinjen $C_L = \mu$. Eftersom avståndet mellan vardera styrgränsen och centrallinjen är tre gånger standardavvikelsen för vår kvalitetsindikator $\bar{x}$ sägs styrdiagrammet ha *3-sigma-gränser*. Det var sådana styrdiagram vi diskuterat i tidigare avsnitt.

Styrdiagram med 3-sigma-gränser ger dock olika risk för falskt alarm för olika diagramtyper. Detta beror på att kvalitetsindikatorerna har olika fördelningar. I mycket extrema fall kan risken för falskt alarm vid 3-sigma-gränser bli så stor som 0,11. I naturliga fall ger dock 3-sigma-gränser en risk för falskt alarm som är acceptabel.

### 17.3.4 Ett $\bar{x}$-diagram då $\mu$ och $\sigma$ är okända

Om man ska starta en process eller sätta igång den igen efter ett stopp känner man sällan väntevärdet $\mu$ och standardavvikelsen $\sigma$. Man måste då skatta dessa storheter för att få gränserna till styrdiagrammet. Då låter man processen gå ett tag och tar med jämna mellanrum ut provgrupper. Antag att man tar ut $k$ provgrupper om vardera $n$ enheter. En vanlig tumregel är att $k$ bör vara minst 20–25, helst upp mot 40. Detta beror på att risken för falskt alarm påverkas av antalet provgrupper. Ett annat skäl är att vi inte ska utnyttja styrgränser som vi beräknat med värden från en process som inte är i statistisk jämvikt och det behövs minst 20 provgrupper för att avgöra om processen är i jämvikt.

Som skattning av $\mu$ tas sedan medelvärdet $\bar{\bar{x}}$ av provgruppsmedel­värdena $\bar{x}_1, \bar{x}_2, ..., \bar{x}_k$, dvs

$$\bar{\bar{x}} = \frac{1}{k}(\bar{x}_1 + \bar{x}_2 + \cdots + \bar{x}_k)$$

Vi får samma numeriska resultat om vi beräknar det aritmetiska medelvärdet av alla $n$ gånger $k$ mätvärdena $x_{11}, x_{12}, ..., x_{kn}$.

Om vi känner $\sigma$ kan vi nu använda styrgränserna $\bar{\bar{x}} \pm 3\sigma/\sqrt{n}$, dvs

$$S_ö = \bar{x} + 3\frac{\sigma}{\sqrt{n}} \quad \text{och} \quad S_U = \bar{x} - 3\frac{\sigma}{\sqrt{n}}$$

Är också $\sigma$ okänd, vilket nästan alltid är fallet, måste vi med hjälp av våra mätvärden även skatta $\sigma$ och ersätta $\sigma$ i uttrycken för styrgränserna med denna skattning. Vi kan då använda två olika metoder, nämligen *s-metoden* eller *R-metoden*.

**s-metoden.** Om vi använder s-metoden beräknar vi först standardavvikelserna $s_1, s_2, ..., s_k$ för de olika provgrupperna och tar sedan som $\sigma$-skattning medelvärdet av dessa, dvs

$$\frac{s_1/c_4 + s_2/c_4 + \cdots + s_k/c_4}{k} = \frac{s_1 + s_2 + \cdots + s_k}{k} \cdot \frac{1}{c_4} = \frac{\bar{s}}{c_4}$$

där $c_4$ enbart beror på provgruppsstorleken $n$. Anledningen till förfarandet är att medelvärdet av de $k$ väntevärdesriktiga skattningarna $s_1/c_4, s_2/c_4, ..., s_k/c_4$ på $\sigma$ också är en väntevärdesriktig skattning på $\sigma$, men med mindre spridning än de enskilda skattningarna. Värden på konstanten $c_4$ för olika storlek på $n$ finns i statistiska tabeller och räknas automatiskt ut vid datorberäkningar.

Med denna skattning på $\sigma$ får vi styrgränserna

$$S_ö = \bar{x} + 3\frac{\bar{s}}{c_4\sqrt{n}} \quad \text{och} \quad S_u = \bar{x} - 3\frac{\bar{s}}{c_4\sqrt{n}}$$

**R-metoden.** Använder vi istället R-metoden för att skatta $\sigma$ beräknar vi först variationsbredden i varje provgrupp, dvs skillnaden mellan det största och minsta mätvärdet inom provgruppen. Med hjälp av dessa variationsbredder $R_1, R_2, ..., R_k$ skattar vi sedan $\sigma$ med $\bar{R}/d_2$, där $d_2$ gör att skattningen blir väntevärdesriktig. Värdet på $d_2$, som i statistikböcker ofta betecknas $\alpha_n$, beror endast på antalet observationer i provgrupperna och finns i de flesta statistiska tabellverk. Med denna skattning på $\sigma$ får man styrgränserna $\bar{x} \pm 3\bar{R}/(d_2\sqrt{n})$. Detta är det traditionella utseendet på styrgränserna till ett $\bar{x}$-diagram.

### 17.3.5 Styrdiagram för spridning

Övervakning av spridningen $\sigma$ kan ske med någon av kvalitetsindikatorerna $s$ eller $R$. Standardavvikelsen $s$ har fördelen att innehålla mer information om $\sigma$ och är därför normalt en bättre skattning. Variationsbredden $R$ är dock enklare att beräkna. Detta är dock knappast något argument för att utnyttja $R$ idag eftersom beräkningarna oftast görs automatiskt med hjälp av datorprogram. I båda metoderna, som beskrivs nedan, antas att indikatorn är ungefär normalfördelad.

**R-diagram.** Variationsbredden $R$, dvs skillnaden mellan det största och minsta mätvärdet, är ett mått på kvalitetsindikatorns spridning. Eftersom fördelningen till $R$ har väntevärdet $d_2\sigma$, och standardavvikelsen $d_3\sigma$, där $d_2$ och $d_3$ bara beror på provgruppsstorleken $n$ (och finns i statistiska tabeller) måste man plotta $R/d_2$ i styrdiagrammet om man vill ha $\sigma$ som centrallinje.

För att slippa att dividera varje R-värde som ska plottas med $d_2$ prickar man ofta $R$ i diagrammet och använder centrallinjen $CL = d_2\sigma$. Ett R-diagram med 3-sigma-gränser får då styrgränserna

$$S_ö = d_2\sigma + 3d_3\sigma = (d_2 + 3d_3)\sigma$$
$$CL = d_2\sigma$$
$$S_u = d_2\sigma - 3d_3\sigma = (d_2 - 3d_3)\sigma$$

Om $n = 5$ är $d_2 = 2{,}33$ och $d_3 = 0{,}86$. För $n \leq 5$ är $d_2 - 3d_3 < 0$. Man sätter då $S_u = 0$ eftersom det alltid gäller att $\sigma > 0$.

Är $\sigma$ okänd ersätter man $\sigma$ med skattningen $\bar{R}/d_2$, där $\bar{R}$ är medelvärdet av variationsbredderna till $k$ provgrupper. Det ger

$$S_ö = (d_2 + 3d_3)\bar{R}/d_2 \quad \text{och} \quad S_u = \max(0, d_2 - 3d_3)\bar{R}/d_2$$

**s-diagram.** Provgruppsstandardavvikelsen $s$ är observation från en fördelning med väntevärdet $c_4\sigma$ och variansen $(1-c_4^2)\sigma^2$, där $c_4$ beror på provgruppsstorleken $n$. När $n = 5$ är $c_4 = 0{,}94$. Plottar vi $s$ i ett styrdiagram som har 3-sigma-gränser får vi således

$$S_ö = c_4\sigma + 3\sigma\sqrt{1-c_4^2} = (c_4 + 3\sqrt{1-c_4^2})\sigma$$
$$CL = c_4\sigma$$
$$S_u = c_4\sigma - 3\sigma\sqrt{1-c_4^2} = (c_4 - 3\sqrt{1-c_4^2})\sigma$$

Om $c_4 - 3\sqrt{1-c_4^2} \leq 0$, vilket inträffar för $n \leq 5$, sätter man $S_u = 0$ eftersom standardavvikelsen aldrig är negativ.

Om $\sigma$ är okänd ersätter vi $\sigma$ med en punktskattning. Använder vi s-metoden och skattar $\sigma$ med $\bar{s}/c_4$ får vi styrgränserna

$$S_ö = (c_4 + 3\sqrt{1-c_4^2})\bar{s}/c_4 \quad \text{och} \quad S_u = (c_4 - 3\sqrt{1-c_4^2})\bar{s}/c_4$$

### 17.3.6 Kombination av $\bar{x}$- och R-diagram

I praktiken är det ofta lämpligt att man kombinerar styrdiagram för väntevärden och för spridningar. Oftast kombinerar man $\bar{x}$-diagram och R-diagram. Man talar då om $\bar{x}$-R-diagram. En sammanslagning av diagrammen ger ett sådant kombinerat diagram.

## 17.4 Känslighet

Känsligheten hos ett styrdiagram beskrivs bäst med hjälp av förväntad tid till alarm efter det att en viss förändring skett i processen. Antalet inprickade punkter tills första punkten hamnar utanför styrgränserna efter en förändring är en slumpvariabel vars väntevärde brukar kallas *ARL ("Average Run Length")*. Detta värde kan för ett styrdiagram med 3-sigma-gränser beräknas som $1/(1-L(\theta))$, där $L(\theta)$ är sannolikheten för att en enskild punkt hamnar utanför styrgränserna som funktion av processens avvikelse från målvärdet, centrallinjen CL; se Montgomery (2012). ARL-kurvan för ett $\bar{x}$-diagram med 3-sigma-gränser illustreras i figur 17.10.

Även provtagningsfrekvensen har betydelse för styrdiagrammets effektivitet. Om man tar ut provgrupper oftare erhåller man en bättre övervakning mot nya systematiska orsaker. Ett mindre antal enheter produceras då innan styrdiagrammet indikerar förändringar. Provtagningskostnaderna ökar däremot och man får oftare falskt alarm när processen är i statistisk jämvikt. Se också resonemanget i avsnitt 17.3.2.

## 17.5 Några andra styrdiagram

Som vi redan nämnt är det önskvärt att styrdiagram har en liten risk för falskt alarm och har stor känslighet, dvs snabbt ger utslag när en förändring av processen skett. I ett Shewhart-diagram plottas ett värde för varje provgrupp och vi får alarm om det värdet hamnar utanför någon av styrgränserna. Det enda sättet att öka känsligheten i denna typ av diagram är att öka provgruppsstorleken eller att oftare ta provgrupper. I detta avsnitt diskuterar vi kort några andra möjligheter att öka känsligheten genom att använda information från tidigare provgrupper.

Först ska vi bara nämna att man ibland för att värdera om ett förbättringsarbete gett effekt ritar ett linjediagram för de mätvärden man observerat före förändringen och räknar ut ett medianvärde. Om man någon gång efter förändringen får åtta punkter i följd under (eller över) denna median kan det tolkas som att det faktiskt blivit en förändring.

### 17.5.1 Western Electrics varningssignaler

Ett sätt att öka känsligheten i ett styrdiagram är att utnyttja mer information från det insamlade datamaterialet, exempelvis genom att också utnyttja resultat från tidigare plottade provgrupper. Vi ska här mycket kort beskriva några typer av styrdiagram baserade på denna princip.

En möjlighet är att utnyttja *modifierat Shewhart-diagram*, där hänsyn tas till tidigare plottade punkter och hur dessa ligger i förhållande till de så kallade *varningslinjerna*. Dessa läggs i regel in som 2-sigma-gränser. Här definierar man ett alarm som att en punkt hamnar utanför någon av styrgränserna eller att två på varandra följande punkter hamnat utanför samma varningslinje; se figur 17.11.

En generalisering av denna idé är att dela avståndet mellan 3-sigma-gränserna i zoner och utnyttja flera regler för alarm. Reglerna för alarm som illustreras i figur 17.12, och några till, utvecklades vid Western Electric (1956):

- **Regel 1:** En punkt utanför någon av 3-sigma-gränserna.
- **Regel 2:** Två punkter av tre i zon A på samma sida om centrallinjen, men innanför motsvarande styrgräns.
- **Regel 3:** Fyra av fem på varandra följande punkter på samma sida om centrallinjen, men utanför zon C.
- **Regel 4:** Åtta punkter i följd på samma sida om centrallinjen.

Man ska dock komma ihåg att om man använder flera regler för alarm så ökar inte bara känsligheten utan också risken för falskt alarm. Om alla fyra reglerna ovan utnyttjas är ARL-värdet ungefär 90 för en process som är i statistisk jämvikt, medan värdet är 370 om bara regel 1 används, dvs en punkt utanför någon av styrgränserna. Risken för falskt alarm är alltså fyra gånger så stor om alla fyra reglerna utnyttjas jämfört med då bara den första regeln används.

> **Figur 17.12** Illustration av Western Electrics regler för alarm som indikerar att urskiljbara orsaker till variation finns i processen. Styrdiagrammet delas in i zonerna A (±2–3σ), B (±1–2σ) och C (0–1σ från centrallinjen).

### 17.5.2 EWMA-diagram

Ytterligare en annan typ av styrdiagram är *EWMA ("Exponentially Weighted Moving Average")*, som introducerades av Roberts (1959), där man plottar ett viktat medelvärde av den nuvarande $x$-observationen, $x_n$ och det tidigare EWMA-värdet, $v_{n-1}$:

$$v_n = (1-\alpha)v_{n-1} + \alpha x_n$$

där startvärdet $v_0$ sätts lika med målvärdet och $\alpha$, $0 < \alpha < 1$, är en viktfaktor. I allmänhet väljer man $\alpha$ i intervallet $0{,}05 \leq \alpha \leq 0{,}25$. Ett vanligt val är $\alpha \approx 0{,}2$. Man kan generellt säga att små värden på $\alpha$ ger ett diagram som lättare upptäcker små ändringar i nivån. Det kan dock ta längre tid innan man får alarm för stora avvikelser.

Styrgränserna kan approximeras till $\mu \pm 3\sigma\sqrt{\alpha/(2-\alpha)}$.

EWMA-diagram är speciellt lämpade för situationer då man bara tar en observation per tillfälle, exempelvis i en kemisk industri eller processindustri.

### 17.5.3 En kommentar om positiv undre styrgräns

Man skulle kunna undra om en undre styrgräns som är positiv verkligen fyller någon funktion när man exempelvis räknar antalet felaktiga enheter, antalet felaktigheter på en enhet eller grupp av enheter. Detsamma gäller om man studerar spridning. Det är rimligen bara bra om vi får få fel eller liten spridning. Men det är viktigt att komma ihåg att information om att vi får färre fel eller mindre spridning än vad vi förväntar oss är ytterst värdefull. Om vi får en punkt under en positiv undre styrgräns kan det vara resultat av att vi genomfört en förbättring i processen så att antalet fel minskat eller spridningen minskat. Det kan också vara så att något hänt utan att vi aktivt gjort en förbättring med detta syfte. Skälet till den nya förbättrade nivån ska då identifieras och nya rutiner permanentas. Det kan till och med vara lämpligt att, när det gäller p-diagram, välja $n$ så att den undre styrgränsen blir positiv för att kunna identifiera sådana situationer.

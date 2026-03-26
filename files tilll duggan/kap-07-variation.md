# 7.3 Variation

I alla sammanhang upplever vi variationer vars orsaker vi inte kan precisera. I vissa fall är denna variation av godo – tänk, exempelvis, om alla vi människor var lika eller hade samma åsikter. I många situationer är variation dock en källa till besvär. Variation kan ibland vara svår att uttrycka i numeriska termer. Här är det dock sådan mätbar variation vi ska diskutera. Exempelvis varierar restiden till arbetet från dag till dag, antalet kunder ett företag har per dag, styrkan i en svetsfog mellan olika enheter i ett parti och antalet telefonsamtal till en organisations kundservice. Den japanske kvalitetsexperten Kaoru Ishikawa uttryckte det så: "vi lever i en värld av variationer" ("a world of dispersions"); se Ishikawa (1982).

Statistisk processtyrning är en vital del av arbetet med ständiga förbättringar (se kapitel 17). Många gånger har man inte ett statistiskt synsätt på processen. Detta medför att man kan missledas av den slumpmässiga variation man iakttar och tro att den är urskiljbar. Man försöker då på olika sätt kompensera för den. Resultatet blir att man istället ökar variationen i processen. Alltför ofta beskylls de människor som arbetar i en process för processens dåliga resultat, när det är slumpvariationer som ger upphov till problemen. Det lönar sig inte i sådana fall att styra eller kanske till och med byta ut medarbetare. Man har inte baserat sina beslut på fakta utan enbart på missriktad ambition. Med hjälp av statistisk processtyrning kan sådan *överstyrning* undvikas. Deming kallar detta problem *"tampering"*.

En speciell typ av urskiljbar variation är sällsynta källor till variation som kan få ett helt system på ända. Sådana kallas *svarta svanar*; se avsnitt 13.8. Exempel på sådana källor till variation är terrorattackerna på World Trade Center i USA den 11 september 2001 och den globala finanskrisen 2007–2008.

## Addition av variation

Orsaker till variation samverkar ofta additivt. Spridningen för de olika bidragen ska därför adderas kvadratiskt för att få den totala variansen för variationen. Antag, till exempel, att vi har fem oberoende källor till variation och att deras bidrag ska adderas; se figur 7.4. Om de olika bidragen har spridningarna (standardavvikelserna) 4, 2, 1, 1 och 1 kommer den totala spridningen att bli

$$\sqrt{4^2 + 2^2 + 1^2 + 1^2 + 1^2} = 4{,}8$$

Antag nu att vi lyckas finna den näst största orsaken till variation och att vi även lyckas eliminera denna orsak helt. Den resulterande standardavvikelsen blir då lika med

$$\sqrt{4^2 + 1^2 + 1^2 + 1^2} = 4{,}4$$

Spridningen, mätt med standardavvikelse, har således minskat med ungefär 10%. Om vi istället lyckas finna och eliminera den största källan till variation innebär detta en avsevärt större minskning i spridning. Efteråt blir den

$$\sqrt{2^2 + 1^2 + 1^2 + 1^2} = 2{,}6$$

Variationen, mätt som standardavvikelse, har nu nästan halverats. Det är följaktligen viktigt att vi ägnar kraft åt rätt problem i förbättringsarbetet. Att ägna kraft åt den näst största orsaken till variation är inte bara mindre lönsamt utan kan även vara demoraliserande eftersom det kan vara svårt att upptäcka resultatet av ansträngningarna. Att kunna se resultatet av förbättringsarbetet är viktigt för motivationen. Detta är en speciell version av Paretoprincipen som vi diskuterar i avsnitt 8.2.

> **Figur 7.4** Den totala variationen beror ofta på flera mer eller mindre oberoende orsaker. Den totala variansen är då summan av varianserna till de olika bidragen och standardavvikelsen kvadratroten ur denna varians.

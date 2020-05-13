         ___        ______     ____ _                 _  ___  
    New York Times - Twitter

Introducere
In ziua de astazi imaginea este foarte importanta atat in relatiile personale, cat si in mediul de business, de aceea trebuie sa fim mereu la curent cu toate noutatile. In secolul vitezei oamenii nu mai au timp sa citesca ziarul, fie el si electronic si ajung sa fie la curent cu o stire dintr-o postare de la Facebook sau cu ajutorul unei device inteligent care ne citeste articolele in timp ce noi ne pregatim de munca dimineata. Informatiile primite le purtam ca si subiecte de discutii cu partenerii, astfel incat ei sa prinda incredere in noi, in interesul nostru pentru industria in care lucram si in modul nostru de gandire si planificare intotdeauna dinamic.

Descrierea problemei
De cele mai multe ori putem intelege o stire doar din titlu sau, nu este nevoie sa pierdem timp pretios cu parcusul articolului, astfel ca ne-ar ajuta o lista consistenta de articole pe un anumit subiect ales de noi. De asemenea, ar fi folositor daca ne-am promova imaginea cu acest articol intr-un timp cat mai scurt cator mai multi parteneri, fara sa fie nevoie de o intalnire propriu-zisa pentru ca ei sa remarce acest lucru. Astfel, social-media ramane cel mai puternic canal de comunicare si promovare in zilele noastre. Sa cauti un articol bun dupa care sa intrii in aplicatie de socializare si sa il distribui este destul de time-consuming. 
In rezolvarea acestei problemei, am dezvoltat un concept de aplicatie care va duce la o imagine mai puternica si la o incredere sporita acordata de parteneri de afacere, prin construirea unui profil al omului mereu informat si preocupat de mediul in care isi dezvolta afacerea.

Descriere API
Pentru a putea avea o sursa de date pe care ne putem baza, am ales New York Times. Aceasta redactie este de incredere, sursele sunt multiple si verificate, astfel ca nu trebuie sa ne facem griji ca am distribuit un articol cu informatii eronate sau zvonuri neacreditate. NYT ofera posibilitatea utilizarii API-ul lor pentru preluare articole.
Acesta este website-ul lor:
 
Ofera desigur mai multe API-uri.
 
Pentru aplicatia mea am avut nevoie de Article Search API.
Exemplu de apel
https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey
FILTRE DE CAUTARE
Se folosesc filtre pentru a restrânge aria de căutare. Se pot specifica câmpurile și valorile pe care vor fi filtrate interogările. API-ul Search Search folosește Elasticsearch, astfel că interogarea filtrului folosește sintaxa standard Lucene. Se separa numele și valoarea câmpului filtrului cu un punct și înconjoara mai multe valori cu paranteze.

nume de câmp :( "valoare1" "valoare2" ... "valoare n")
Conectorul implicit pentru valorile dintre paranteze este OR. Dacă se declara o valoare bool explicită, aceasta trebuie să fie scrisă cu majuscule. Se pot filtra pe mai multe valori și câmpuri.
Exemple de interogare de filtrare
Limitați căutarea la articole cu The New York Times ca sursă:
fq = sursa :( "The New York Times")
Restrângeți-vă căutarea la articole de la biroul Arts sau Foreign:

fq = news_desk :( "Arts" "străin")
Restrângeți-vă căutarea la articole despre New York și de la biroul Arts:
fq = news_desk :( "Arts") ȘI glocări :( "NEW YORK CITY")
Dacă nu specificați un câmp, sfera de interogare a filtrului va căuta potriviri în corp, titlu și linie de cont. Exemplul de mai jos vă va restrânge căutarea la articole cu The New York Times în corp, titlu sau contur:
fq = The New York Times

Apelul de care am nevoie in aplicatie este:
https://api.nytimes.com/svc/search/v2/articlesearch.json
La acesta se vor adauga campurile de cautare cum este in captura de ecran urmatoare: 


Al doilea API folosit este cel al aplicatiei Twitter.
Pentru acesta mi-am creat un cont
 
Twitter este printre primele platforme de social media care a dezvoltat acest serviciu, astfel ca dispune de mai multe variante de autentificare.
 
Pentru aceasta, mi-am creat o aplicatie =, in calitate de developer.
 
Autenficarea este urmatoarea:
 
Apelul in postman ar trebui pe langa autenficare sa includa si parametrul “status” cu stasului pe care noi dorim sa il postam.
Endpointul este:
https://api.twitter.com/1.1/statuses/update.json?
Metoda este de tip POST:
Ca parametru “status” voi pune web.url-ul articolului din New York Times.
 



Interfata cu utilizatorul presupune o caseta text in care acesta va introduce subiectul de interes si un buton cautare.
In momentul apasarii butonului se creeaza un apel de tip GET la endpoint-ul https://api.nytimes.com/svc/search/v2/articlesearch.json?q=donaldtrump&api-key=i02AoGWka7y2MmGuS2y8Dl0xVXH0P9zu, In loc de “donaldtrump” va fi stringul introdus in caseta text. 
Din json-ul rezultat se va creea o lista de obiecte Article. Pe interfata cu utilizatorul sub caseta text si buton va aparea o lista sub forma tabelara cu titlul fiecarui articol si in dreptul fiecaruia un buton “POST”.
La apasarea butonului se va creea un apel de tipul POST la endpointul: https://api.twitter.com/1.1/statuses/update.json?status=Hello!
Dar in loc de “hello”, va fi web.url-ul articolului ales.
Astfel, prin doar doua apasari de buton putem promova o imagine de business impecabila fara a mai consuma timp sau resurse. 
Aceasta aplicatie pentru mine a reprezentat o ambitie deoarece consider ca este utila si ca dusa la un nivel mai avansat ar putea produce niste passive income doar ca sunt extrem de la inceput cu programarea si informatica si nu am putut da de cap erorilor, despre care stiu ca dupa ceva experienta mi s-are parea un fleac. La munca este o perioada extrem de incarcata, compania abia si-a revenit dupa un cyberattack si colegii nu a avut cum sa ma ajute. Vreau sa ma intorc la aceasta aplicatie in momentul in care voi fi in stare sa o duc mai departe. Imi pare rau ca nu prea am avut ce va arata.

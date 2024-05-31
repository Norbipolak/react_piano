const keys = {
    "C2": null,
    "Cs2": null,
    "D2": null, 
    "Ds2": null,
    "E2": null,
    "F2": null,
    "Fs2": null,
    "G2": null, 
    "Gs2": null, 
    "A2": null,
    "As2": null,
    "B2": null,

    "C3": null,
    "Cs3": null,
    "D3": null, 
    "Ds3": null,
    "E3": null,
    "F3": null,
    "Fs3": null,
    "G3": null, 
    "Gs3": null, 
    "A3": null,
    "As3": null,
    "B3": null
}
/*
Fontos, hogy itt nagy betűvel (kezdjük) írjuk a függvények nevét!!! 

nagyon fontos, hogy itt nem ez a színtaktika, hogy class="", hanem az, hogy className="" 
meg ha akarunk valamit itt a jsx-ben valamit style-val formázni, akkor 
->
style={{border: '3px solid red', width: '200px',  height: '200px'}}>
camel case kell {}

function Piano() {
    return(
        <div className="container">
            <div className="piano"></div>
        </div>
    )
}

export default Piano;

beimportáltuk ugye az App.js-be!!! 
import './App.css';
import Piano from './component/Piano';

function App() {
  return (
    <div className="App">
      <Piano/>
    </div>
  );
}

export default App;

és akkor ide a function-on belül megcsináljuk a jsx-szerkezetet!! 
*/
/*
csináltunk a css-ben egy külön class-t amit majd meg fognak kapni, ha le van nyomva ezt ugy nem lehetett megcsinálni az :active-val, 
mert a black-nél kijelölte volna a white-ot is és ezért lett a black-key-pressed meg a white-key-pressed osztály csinálva 
amire itt csinálunk egy press függvényt és majd ezt egy onClick-vel meg fogják kapni a white-key meg a black-key-ek is 
nagyon fontos itt a stopPropagation() használata 
*/

const press = (e, note)=> {
    e.stopPropagation();
    console.log(note);

    /*és akkor itt az e.target.classList-et használjuk!!!!! így tudunk itt az elemeknek egy class-t adni 
    még azt kellene tudnunk, hogy melyiknek adjuk meg, mert a white-oknak white-pressed kell black-nek és ezt megtudjuk a contains-ból!!!
    */
    if(e.target.classList.contains("white-key")) {
        e.target.classList.add("white-key-pressed");
    } else {
        e.target.classList.add("black-key-pressed");
    }
    /*
    szóval ha a e.target.classList.contains()-val megnézzük, hogy white-key-e ha igen akkor hozzáadjuk a white-key-pressed-et 
    ha meg nem tartalmazza, akkor csak black-key lehet tehát az else-vel hozzáadjuk a black-key-pressed-et 
    
    nagyon fontos, hogy ezt meg onClick-vel hozzá kell adni a jsx elemnek!!! 
    <div className="white-key" onClick={press}> sőt ez nem is onClick lesz hanem onMouseDown
    de viszont azt szeretnénk, hogy ez ne legyen kijelölve csak akkor egy iddeig, mert így most végig, örökre ki lesz jelölve 
    ezért kell egy olyan függvény amivel majd levesszük ezt a kijelölést!!! 
    */ 
    /*
    a note, amit várt az megkapta az onMouseDown-val meghíváskor -> onMouseDown={(e)=>press(e, "C2")}
    itt kell egy new Audio() hogy lejátszuk azt a file-t aminek a fileneve C2.wav
    */ 
    //const audio = new Audio();
    //nagyon fontos, hogy itt kell a require mindig, ha meg akarunk adni src-t!! ! 
    //audio.src = require(`../piano_sounds/${note}.wav`);
    /*
    és akkor így csináltuk meg az elérési útvonalat és most már a onMouseDown-ra ez fog megszólalni ha play()-eljük  
    */
    //audio.play();
    //ez majd meg lehet oldani, hogy a release-nél leállítsa, mert ez egy hosszú hang 4s
    /*
    de most csak ugye ez az egy hang van meg és minden hangnak kell majd egy audioplayer 
    ezért csinálunk egy objektumot, aminek a kulcsai ilyen audioplayer-ek lesznek, hogy C2,C3,A2 meg ilyesmi
    ezt az objektum legfelül lesz!!! és mivel ez nem fog változni ez lehet egy sima const useState nélkül!! 
    const keys = {
    "C2": new Audio().src = require(`../piano_sounds/C2.wav`)
    }
    és megadtuk neki az elérési útvonalat csak itt nem lesz note ezért be kell írni oda, hogy C2!!!! 
    mert a note ugye az csak ez a függvényen belül érhető el!!!! 
    Nagyon fontos!!!! 
    hogy akkor már itt nincs szükség arra, hogy itt meglegyen a new Audio() meg az src stb. mert azt már ott megadtuk neki 
    és itt ebből a keys objektumból nekünk a note-adik kulcs kell majd!!!!!!!! 
    mert a kulcsok ugy lettek elnevezve, mint itt amit ez a press függvény megkap majd meghíváskor az onMouseDown-val
    ->  
    */
    console.log(keys[note]); //és itt megkapjuk ezt -> new Audio().src = require(`../piano_sounds/C2.wav`) jelen esetben de másik note-nál másikat
    //folytatódik ahol van ***
    keys[note].play();
};

const release = (e, note)=> {
    e.stopPropagation();

    if(e.target.classList.contains("white-key")) {
        e.target.classList.remove("white-key-pressed");
    } else {
        e.target.classList.remove("black-key-pressed")
    }


/*
onMouseDown-val megadtuk, hogy rakja rá a class-et onMouseUp-ra meg, hogy vegye le!!! 
<div className="white-key" onMouseDown={press} onMouseUp={release}>

de fontos, hogy tudnunk kell, hogy melyik billentyűt nyomtuk le ezért a press meg a release függvény is várni fog egy note-ot!!!!! 
const press = (e, note)=> {
és akkor már itt az onMouseUp-val meg tudjuk kapni az e-t is meg ott meg kell adni hogy melyik note-ot nyomtuk le
onMouseDown={(e)=>press(e, "C2")} !!!!!! 

és a press függvényben console.log(note);s
akkor ott már tudjuk, hogy mi a note, mert már megadtuk, hogy "C2" meghívásnál!!! 
és itt a src-be be vannak másolva a hangok pl. a C2!!! C2.wav a fileneve 
innen fogjuk tudni, hogy ennek a megnyomásával a C2-t fogjuk lejátszani, mert megadtuk ugye 
és a press függvényben a console.log(note) -> C2 lesz 

hogyan fogjuk lejátszani a press-ben a C2.wav, hogy van ugye a new Audio() aminek van egy olyanja, hogy src és ide kell megadni az elérési 
útvolnalat!!! 
*/ 
/*
***
az a baj, hogy ezt lefordítja és még sem biztos, hogy így jó lesz hanem ahelyett, hogy rögtön ott a const keys-ben adjuk meg az 
elérési útvonalat, ahelyett 
const keys = {
    "C2": new Audio().src = require(`../piano_sounds/C2.wav`)
}
tehát ehelyett ezeknek az értéke null lesz és majd csinálunk egy függvényt a const createKeyPlayers-et 
const keys = {
    "C2": null,
    "Cs2": null,
    "D2": null
}
fontos, hogy itt a kulcsok is kapnak "", nem úgy, mint sima JavaScriptben!!! 
itt a release is megcsináljuk, mint a press-re, hogy ez is kapjon egy note-ot és ezzel majd leállítjuk!!! 
vár egy note-ot is 
-> 
const release = (e, note)=> 
és itt meghíváskor a onMouseUp-nál meg is kapja
onMouseUp={(e)=>release(e, "C2")}>
és akkor a pause-val meg letudjuk állítani 
*/ 
keys[note].pause();
//csak akkor itt még vissza is kell tekerni nekünk erre kell a currentTime = 0;
keys[note].currentTime = 0;
};
/*
és ha ez kész van akkor meg kell csinálni az összes hangra(jsx elemre) most csak a főhangokra -> a white-key-ekre 
és ott a note-ot meg kell adni mindegyiknél 
pl. <div className="white-key" onMouseDown={(e)=>press(e, "D2")} onMouseUp={(e)=>release(e, "D2")}>
<div className="white-key" onMouseDown={(e)=>press(e, "E2")} onMouseUp={(e)=>release(e, "E2")}></div>

meg a keys objektumot is ki kell majd egészíteni, mert csak 3-at csináltunk eddig 
const keys = {
    "C2": null,
    "Cs2": null,
    "D2": null, 
    "E2": null
}
és akkor ezeket most kézzel be kell írogatni meg div-ekben, hogy megkapja a press meg a release a note-ot 
meg ugye keys objektumot is ki kell végig tölteni, hogy meg legyen az elérési útvonal

*/
const createKeyPlayers = ()=> {
    for(const keyValue of Object.entries(keys)) {
    //[["C2": null], ["Cs2":null], ["D2":null]] entries tömbben tömbök értékpárokkal és akkor ezen végigmegyünk egy for-val
    const player = new Audio();
    player.src = require(`../piano_sounds/${keyValue[0].wav}`);
    keys[keyValue[0]] = player;
    /*
    és akkor keys[keyValue[0]] -> tehát C2 mert az nulladik indexen lévő dolog itt a tömbökben ["C2": null]
    annak megadtuk értékként az elérési útvonalat ahol szintén a keyValue[0] kell -> require(`../piano_sounds/${keyValue[0].wav}`)
    és akkor így majd nem kell mindegyiknek külön megadni az elérési útvonalat 

    és ezt a createPlayers-t az elején kell csak lefutatni egyszer, ezért meghívjuk egy useEffect-ben!!! 
    console.log(keyValue)
    ["C2": null]
    ["Cs2":null]
    ["D2":null]
    ami után megcsináltuk ezeket, hogy const player .. meg keys[keyValue[0]] = player!!! azután ez lett 
    */
    }
    console.log(keys);
    //{C2: audio, Cs2: audio, D2: audio}
    //és ha ez meg van, akkor visszamegyünk a press-be ahol keys[note].play() tehát lejátszuk az adott hangot!!!! 
};

useEffect(()=> {
    createKeyPlayers();
}, [])

/*
Megcsináltuk a white-okat és most jönnek a black-player-ek, de viszont itt lehet egyfajta gond, hogy van bennük egy s és ezt URL kódolja
a böngésző és nem fogja megtalálni!!! 
<div className="black-key" onMouseDown={(e)=>press(e, "Cs2")} onMouseUp={(e)=>release(e, "Cs2")}></div>

itt megpróbáltuk az encodeURICompoenent-et meg decodeURIComponent-et de ez nem müködött szóval a keys-ben meg itt is amikor megadjuk 
jsx-ben note-nak át fogjuk valamire írni Cs2 -> Cs3-ra vagy valamilyen ilyesmire, hogy ne kelljen decode vagy encode-olni!! 
meg nagyon fontos, hogy akkor a fileneveket is ahogy vannak mentve, azt is át kell majd írni!!! 

const keys = {
    "C2": null,
    "Cs2": null,
    "D2": null, 
    "Ds2": null,

*/

function Piano() {
    return(
        <div className="container">
            <div className="piano">
                <div className="white-key" onMouseDown={(e)=>press(e, "C2")} onMouseUp={(e)=>release(e, "C2")}>
                    <div className="black-key" onMouseDown={(e)=>press(e, "Cs2")} onMouseUp={(e)=>release(e, "Cs2")}></div>
                </div>
                <div className="white-key" onMouseDown={(e)=>press(e, "D2")} onMouseUp={(e)=>release(e, "D2")}>
                    <div className="black-key"></div>
                </div>
                <div className="white-key" onMouseDown={(e)=>press(e, "E2")} onMouseUp={(e)=>release(e, "E2")}></div>
                <div className="white-key" onMouseDown={(e)=>press(e, "F2")} onMouseUp={(e)=>release(e, "F2")}>
                    <div className="black-key"></div>
                </div>
                <div className="white-key" onMouseDown={(e)=>press(e, "G2")} onMouseUp={(e)=>release(e, "G2")}>
                    <div className="black-key"></div>
                </div>
                <div className="white-key" onMouseDown={(e)=>press(e, "B2")} onMouseUp={(e)=>release(e, "B2")}>
                    <div className="black-key"></div>
                </div>
                <div className="white-key" onMouseDown={(e)=>press(e, "C3")} onMouseUp={(e)=>release(e, "C3")}></div>
                <div className="white-key" onMouseDown={(e)=>press(e, "D3")} onMouseUp={(e)=>release(e, "D3")}>
                    <div className="black-key"></div>
                </div>
                <div className="white-key" onMouseDown={(e)=>press(e, "E3")} onMouseUp={(e)=>release(e, "E3")}>
                    <div className="black-key"></div>
                </div>
                <div className="white-key" onMouseDown={(e)=>press(e, "F3")} onMouseUp={(e)=>release(e, "F3")}></div>
                <div className="white-key" onMouseDown={(e)=>press(e, "G3")} onMouseUp={(e)=>release(e, "G3")}>
                    <div className="black-key"></div>
                </div>
                <div className="white-key" onMouseDown={(e)=>press(e, "A3")} onMouseUp={(e)=>release(e, "A3")}>
                    <div className="black-key"></div>
                </div>
                <div className="white-key" onMouseDown={(e)=>press(e, "B3")} onMouseUp={(e)=>release(e, "B3")}>
                    <div className="black-key"></div>
                </div>
                <div className="white-key" onMouseDown={(e)=>press(e, "C4")} onMouseUp={(e)=>release(e, "C4")}></div>
                <div className="white-key" onMouseDown={(e)=>press(e, "A2")} onMouseUp={(e)=>release(e, "A2")}></div>
            </div>
        </div>
    )
}

export default Piano;
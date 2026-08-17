import React from "react";
import "../../assets/what_section.css";
import Title from "../parts/Title";
import svoura from "../../images/Deftero_kokkinisvoura.png";
import spiel from "../../images/Spiel_und_Theater_.jpg";
import freepress from "../../images/freepress.webp";

function normalizeGreek(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
const address = "Οδός Ευριπίδου 3, Νεφελοκοκκυγία, ΤΚ: 1955,";
const tel = "Τηλ: 27530 10000";
const city = normalizeGreek("Νεφελοκοκκυγία");
const newspaper_name = normalizeGreek("Επιδαυριανή");
var today = new Date();
var formatter = new Intl.DateTimeFormat("el-GR", { month: "long" });
const month = normalizeGreek(formatter.format(today));
formatter = new Intl.DateTimeFormat("el-GR", { weekday: "long" });
const weekday = normalizeGreek(formatter.format(today));
const dd = String(today.getDate()).padStart(2, "0");
const yyyy = today.getFullYear();

const title1 = "-Να την σφάξω; -Ο,τι πουν τα παιδιά";
const author1 = "Καθημερινή - Γιώργος Λάντζας";
const text1_1 =
  "Κύριε διευθυντά, Οι παραστάσεις στο αρχαίο θέατρο της Επιδαύρου που διοργανώνει το Φεστιβάλ Αθηνών Επιδαύρου (Φεστιβάλ στη συνέχεια για συντομία) είναι απαραίτητο μέρος στο καλοκαιρινό πολιτισμικό πρόγραμμα κάθε σκεπτόμενου πολίτη.";
const text1_2 =
  "Φανταστείτε όμως να υπάρχει μια διαδικασία παρεμβατική στη δράση έτσι όπως πρόκειται να εξελιχθεί στη σκηνή: ο Ορέστης αφού συζητά με τον Πυλάδη και την Ηλέκτρα να ζητά και τη γνώμη του κοινού για το εάν πρέπει να σφάξει τη μητέρα του. Να αρχίζει μια μεγάλη συζήτηση όπου οι θεατές εκφράζονται ποικιλοτρόπως, με λόγο, με ζωγραφιές, με χορό, με στιχάκια κι από όλο αυτό το… χάος να διαμορφώνεται η συνέχεια της τραγωδίας. Αυτό θα ήταν η κορωνίδα της εκπαιδευτικής λειτουργίας και στη βελτίωση της διαπροσωπικής συμπεριφοράς αλλά και στη Δημοκρατία του κοινού!";
const page_1 = "Σελ. 3";
const link1 = "https://www.kathimerini.gr/opinion/readers/562514425/";

const title2 = normalizeGreek("Οι Μικροί Ιχνευτές στην Κόκκινη Σβούρα");
const author2 = "Κόκκινη Σβούρα - Ιωάννα Νιαώτη";
const text2_1 =
  "Σήμερα Παρασκευή η Κόκκινη Σβούρα ετοιμάζει τη βαλίτσα της, ετοιμάζεται για Φεστιβάλ, ετοιμάζεται για δημιουργική απασχόληση για παιδιά, ετοιμάζεται να στριφογυρίσει στο Αρχαίο Θέατρο της Επιδαύρου.";
const text2_2 =
  "Η θεατρολόγος Αγγελική Τσάκωνα απαντά σε όλες τις απορίες της Κόκκινης Σβούρας και εξηγεί ποια είναι η φιλοσοφία του θεατροπαιδαγωγικού προγράμματος των Μικρών Ιχνευτών. ";
const link2 =
  "https://www.ertecho.gr/radio/deftero/show/kokkini-svoura/podcast/407526/";
const page_2 = "Σελ. 6";

const title3 = normalizeGreek("Οι Μικροί Ιχνευτές στα βήματα του Κάστορφ");
const author3 = "Spiel und Theater - Klaus Wegele";
const text3_1 =
  "Ο Γερμανός θεατροπαιδαγωγός Klaus Wegele επισκέπτεται την Επίδαυρο και παίρνει συνέντευξη από την ομάδα των Μικρών Ιχνευτών.";
const text3_2 =
  "Η πρωτοποριακή ματιά του Φρανκ Κάστορφ στην παράσταση Μήδεια εμπνέει τους Μικρούς Ιχνευτές για την δημιουργία ενός ξεχωριστού θεατροπαιδαγωγικού προγράμματος.";
const citation3 =
  "Die Farben der entworfenen Kostüme entsprechen einer Seite der Medea";
const link3 = "https://schul.theater/spielt-doch-keine-rolle/";
const page_3 = "Σελ. 4";

const title4 = normalizeGreek(
  "Μια φανταστική μέρα με την κόρη μου στο Αρχαίο Θέατρο Επιδαύρου!"
);
const author4 = "WomenOnly - Ζέτα Δούκα";
const text4_1 =
  "Πήγα μαζί με τη Θάλεια, για πρώτη φορά στον ευλογημένο αυτό τόπο. Και μπορεί να μην παρακολούθησε την παράσταση (εκτός των πρακτικών δυσκολιών, θεώρησα ότι το θέμα θα ήταν και κάπως σκληρό για το 8χρονο παιδί μου), ήταν όμως στην ομάδα δημιουργικής απασχόλησης που παρέχεται στα παιδιά κατά τη διάρκεια που οι γονείς παρακολουθούν την παράσταση.";
const text4_2 =
  "Εξαιρετική ιδέα, ακόμη πιο εξαιρετική η υλοποίηση της από την ομάδα των φροντιστών, που μαθαίνουν στα παιδιά όχι μόνο την ιστορία του έργου που διαδραματίζεται στο θέατρο, μέσα από τραγούδια και παιχνίδια, αλλά μεταδίδουν και τα μηνύματα που ο εκάστοτε σκηνοθέτης θέλει να μοιραστεί με το κοινό. Η Θάλεια βγήκε κατενθουσιασμένη και θέλει από τώρα να προγραμματίσουμε την επόμενη φορά που θα έρθουμε.";
const link4 = "https://www.womenonly.gr/news/celebrity-news/131059270/";
const page_4 = "Σελ. 7";

const title5 = normalizeGreek(
  "Φεστιβάλ Αθηνών Επιδαύρου: Οκτώ χρόνια «Μικροί Ιχνευτές»"
);
const author5 = "Ελεύθερος Τύπος - Ξένια Στούκα";
const text5_1 =
  "Τέλος Σεπτεμβρίου και ο νους επιστρέφει στα καλοκαιρινά ηλιοβασιλέματα της Επιδαύρου. Τότε που θεατές ανηφορίζουν προς το αρχαίο θέατρο για να πάρουν τη θέση τους στο κοίλον…";
const text5_2 =
  "Κι ενώ οι μεγάλοι προετοιμάζονται να απολαύσουν τη μαγεία του αρχαίου θεάτρου της Επιδαύρου, έχουν την πολύτιμη δυνατότητα τα παιδιά τους την ώρα της παράστασης να ζήσουν ένα μοναδικό ταξίδι εξερεύνησης, παιχνιδιού και δημιουργίας μέσα από το πρωτοποριακό θεατροπαιδαγωγικό πρόγραμμα «Μικροί Ιχνευτές» του Φεστιβάλ Αθηνών Επιδαύρου, σε συνεργασία με το Διεθνές Δίκτυο Αρχαίου Δράματος του υπουργείου Πολιτισμού";
const link5 = "https://www.eleftherostypos.gr/psychagogia/festival-athinon-epidavrou-okto-chronia-mikroi-ichneftes/amp";
const page_5 = "Σελ. 10";



function WhatSection() {
  return (
    <>
      <section id="what-section">
        <div className="head">
          <div className="headerobjectswrapper">
            <div className="weatherforcastbox">
              <span className="italic-span">{address}</span>
              <br />
              <span>{tel}</span>
            </div>
            <header>{newspaper_name}</header>
          </div>
          <div className="subhead">
            {city}, {weekday} {dd} {month}, {yyyy}
          </div>
        </div>
        <div className="content container-fluid">
          <div className="collumns justify-content-center row">
            <div className="collumn col-lg-3">
              <a href={link1} target="_blank" className="article-link">
                <div className="head">
                  <span className="headline hl3">{title1}</span>
                  <p>
                    <span className="headline hl4">{author1}</span>
                  </p>
                </div>
                <p>{text1_1}</p>
                <p>
                  {text1_2} <b>{page_1}</b>
                </p>
              </a>
            </div>
            <div className="collumn col-lg-3">
              <a href={link2} target="_blank" className="article-link">
                <div className="head">
                  <span className="headline hl5">{title2}</span>
                  <p>
                    <span className="headline hl6">{author2}</span>
                  </p>
                </div>
                <p>{text2_1}</p>
                <figure className="figure">
                  <img className="media" src={svoura} alt="" />
                  <figcaption className="figcaption"></figcaption>
                </figure>
                <p>
                  {text2_2} <b>{page_2}</b>
                </p>
              </a>
            </div>
            <div className="collumn col-lg-3">
              <a href={link3} target="_blank" className="article-link">
                <div className="head">
                  <span className="headline hl1">{title3}</span>
                  <p>
                    <span className="headline hl2">{author3}</span>
                  </p>
                </div>
                <p>{text3_1}</p>
                <figure className="figure">
                  <img className="media" src={spiel} alt="" />
                  <figcaption className="figcaption"></figcaption>
                </figure>
                <p>
                  <span className="citation">"{citation3}"</span>
                  {text3_2} <b>{page_3}</b>
                </p>
              </a>
            </div>
            <div className="collumn col-lg-3">
              <a href={link4} target="_blank" className="article-link">
                <div className="head">
                  <span className="headline hl3">{title4}</span>
                  <p>
                    <span className="headline hl4">{author4}</span>
                  </p>
                </div>
                <p>{text4_1}</p>
                <p>
                  {text4_2} <b>{page_4}</b>
                </p>
              </a>
            </div>

            <div className="collumn col-lg-3">
              <a href={link5} target="_blank" className="article-link">
                <div className="head">
                  <span className="headline hl1">{title5}</span>
                  <p>
                    <span className="headline hl2">{author5}</span>
                  </p>
                </div>
                <p><span className="citation">"{text5_1}"</span></p>
                <figure className="figure">
                  <img className="media" src={freepress} alt="" />
                  <figcaption className="figcaption"></figcaption>
                </figure>
                <p>
                  
                  {text5_2} <b>{page_5}</b>
                </p>
              </a>
            </div>



            
          </div>
        </div>
      </section>
    </>
  );
}

export default WhatSection;

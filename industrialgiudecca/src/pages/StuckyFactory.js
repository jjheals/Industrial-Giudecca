import React, { useEffect, useState, useRef } from 'react';
import '../css/StuckyFactory.css';
import { Link } from 'react-router-dom';

function StuckyFactory() {
    const [headerVisible, setHeaderVisible] = useState(true);
    const lastScrollYRef = useRef(window.pageYOffset);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;
            const imageContainer = document.querySelector('.factory-image-container');

            // Adjust parallax effect for the image
            const translateYImage = currentScrollY * 0.7;
            imageContainer.style.transform = `translateY(${translateYImage}px)`;

            // Determine scroll direction to show/hide header
            if (currentScrollY > lastScrollYRef.current) {
                // Scrolling down
                setHeaderVisible(false);
            } else {
                // Scrolling up
                setHeaderVisible(true);
            }
            lastScrollYRef.current = currentScrollY;
        };

        const throttledHandleScroll = throttle(handleScroll, 16); // Throttle the scroll event

        window.addEventListener('scroll', throttledHandleScroll);

        return () => {
            window.removeEventListener('scroll', throttledHandleScroll);
        };
    }, []);

    // Throttle function to limit the execution rate
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    }

    return (
        <div className="stucky-factory">
            <header className={headerVisible ? '' : 'hidden'}>
                <h1>Welcome to the Stucky Factory</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/factory">Factory Homepage</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section className="factory-info">
                    <div
                        className="factory-image-container"
                        style={{
                            backgroundImage: `url(${process.env.PUBLIC_URL}/stucky12.jpg)`,
                        }}
                    ></div>
                    <div className="factory-description">
                        <h2>About Stucky Factory</h2>
                        <p>
                            Il Molino Stucky fu costruito tra il 1884 e il 1895 per iniziativa di Giovanni Stucky, imprenditore e finanziere di nobile famiglia svizzera, il cui padre si era spostato nel Veneto con un'italiana della famiglia Forti. La progettazione dell'imponente complesso fu affidata all'architetto Ernst Wullekopf, che realizzò uno dei maggiori esempi di architettura neogotica applicata ad un edificio industriale. Le stanze dello stabile conservano tutt'oggi nel soffitto i diamanti a punta rovesciata caratteristici delle tramogge dell'antico mulino[1].

                            L'edificio colpisce per le sue proporzioni anomale rispetto a quelle delle tradizionali architetture veneziane presenti su entrambe le sponde del Canale della Giudecca.

                            L'idea originale di istituire un mulino nella laguna veneta venne a Giovanni Stucky intorno alla metà dell'Ottocento in seguito allo studio del funzionamento di diversi mulini in paesi esteri. In base a tali studi, l'imprenditore decise di sfruttare il canale veneziano per un veloce trasporto via acqua del grano da destinare al mulino dell'isola di Giudecca.

                            L'impianto modello - dotato di illuminazione a gas - dava lavoro, a pieno regime, a millecinquecento operai impegnati in turni che coprivano l'intera giornata ed era in grado di macinare, nel periodo di maggiore funzionalità, 2.500 quintali di farina al giorno[2].

                            Nel 1895 il complesso preesistente sul quale il mulino sorgeva fu ampliato su progetto dell'architetto Wullekopf e suddiviso in due distinte aree: una - maggiore e a sviluppo verticale - includeva il mulino, i magazzini e i silos nonché gli uffici; una seconda - costituita da edifici più bassi - ospitava il solo pastificio. Fu allora che assunse le sembianze attuali.

                            Wullekopf volle dotare l'edificio della classica e caratteristica facciata neo-gotica con impresso il nome del proprietario del mulino sormontato da un gigantesco orologio, un prospetto diventato da allora un simbolo dell'architettura industriale in Italia.

                            L'inizio della decadenza del Molino Stucky - che fu anche adibito a pastificio - ebbe inizio a partire dagli anni 1910, ma la situazione degli Stucky peggiorò quando Benito Mussolini decise la rivalutazione della lira. Di conseguenza, Gian Carlo Stucky, figlio del defunto Giovanni, ebbe crescenti difficoltà a vendere i suoi prodotti e dovette chiudere le filiali in Argentina, Stati Uniti, Egitto e Inghilterra. Quando Mussolini avviò la politica economica autarchica - una campagna propagandistica volta a promuovere la produzione nazionale di materie prime - i profitti aziendali crollarono, perché l'attività degli Stucky era basata sull'approvvigionamento a buon mercato del grano per i loro mulini all'estero. Nel 1955, dopo un lungo periodo di crisi e una tribolata vicenda sindacale (lo stabilimento fu occupato per un mese dai cinquecento dipendenti), si giunse all'irreversibile chiusura.[3][1]

                            Rilevata nel 1994 dalla società Acqua Pia Antica Marcia (gruppo Acqua Marcia), l'antica area industriale è stata posta quattro anni dopo sotto la tutela della Soprintendenza alle Belle Arti. Lasciandone inalterata l'architettura neo-gotica, è stata poi sottoposta ad uno dei maggiori restauri conservativi d'Europa riguardanti direttamente un antico opificio.

                            La fine delle traversie dell'antico complesso è giunta a metà degli anni 2000 con la stipula di una partnership economico-finanziaria fra Acqua Marcia e la catena di alberghi Hilton,[4] in base alla quale l'area è stata destinata a complesso immobiliare dotato di "residence", centro congressi e sede alberghiera capace di 379 stanze, ristorante e piscina panoramici, una sala convegni da duemila posti. I manufatti necessari al restauro sono stati selezionati con la supervisione della Soprintendenza alle Belle Arti dopo un attento studio cromatico che garantisse una completa aderenza al disegno originale della costruzione. Quattrocentocinquantamila sono stati i mattoni necessari per il completo restauro del monumentale palazzo, degno, secondo le parole del sindaco di Venezia, Massimo Cacciari, di una architettura da città anseatica[5]. Il 15 aprile 2003, quando i lavori di ristrutturazione erano già in corso, l'Hilton Molino Stucky Venice è stato colpito da un vasto incendio che ha distrutto l'intera parte centrale dello stabile, danneggiato in particolare la torre, la piccola loggia e il cappello - ovvero il punto più alto dello stabile - nonché il prospetto laterale della struttura, la parete est, quasi interamente crollata nel rio sottostante. L'incendio è stato domato dopo intense ore di lavoro da parte dei vigili del fuoco, giunti con due grandi motobarche e due elicotteri per l'opera di controllo e spegnimento, contrastata dal forte vento e resa complessa dalle grandi dimensioni dell'edificio.[6]

                            Il complesso ha avviato l'operatività nel giugno 2007.

                            Nel 2016 la proprietà viene in parte ceduta dal gruppo Acqua Marcia, in amministrazione controllata, al gruppo The Marseglia Group per quanto riguarda la sola parte gestita ad uso hotel e non quella residenziale che rimane di proprietà dei primi rispettivi privati residenti. Mentre una perizia del tribunale di Venezia ha valutato il complesso in 350 milioni di euro[7], il prezzo finale concordato per la cessione è di 280 milioni di euro (737.000 euro a camera).[8]
                        </p>
                    </div>
                </section>

                <section className="white-space"></section>
            </main>
        </div>
    );
}

export default StuckyFactory;
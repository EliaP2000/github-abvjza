import { decimalDigest } from '@angular/compiler/src/i18n/digest';
import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
}

class ordinePrenotazione { //per eliminare il problema della ripetizione delle strutture
  prenotazione = [];
  constructor(posti, elementName) { //Il costruttore prende come parametri: l'array con i posti già prenotati e il nome dell'elemento HTML che ospita i bottoni
    var element = document.getElementById(elementName);
    //crea i bottoni e le file di bottoni a ricreare il teatro che vogliamo costruire. Poi li inserisce nell'array prenotazione
    this.prenotazione = posti.map((fila, i) => { 
      var p = fila.map((nome, j) => {
        var btn = document.createElement('button'); //crea i bottoni
        element.appendChild(btn);
        btn.value = nome;
        btn.style.color = (nome !== "x") ? 'red' : 'green'; //cambio di colore se contenente un nome oppure una x (posto non prenotato)
        btn.innerHTML = 'P' + (j + 1) + (i + 1); 
        btn.addEventListener('click', this.selezionaPosto); //selezione il posto al click restituendo successivamente il valore del bottone
        return btn;
      });
      element.appendChild(document.createElement('br'));
      return p;
    });
  }
  selezionaPosto () { //input box per inserire un nominativo da inserire nel nostro teatro. Inserito il nominativo si fa click su un posto e il nominativo viene registrato nel bottone in corrispondenza al posto. Insieme, il colore del tasto diventa rosso per segnalare che il posto è occupato, e il contenuto dell'input box viene cancellato.
    if ( prenotaEl.value !== "" ) {
      this.value = prenotaEl.value;
      this.style.color = "red";
      prenotaEl.value="";
    }
    else
      nomeEl.innerHTML = this.value 
  };
 toArray() { //funzione che trasforma l'array di bottoni in un array di stringhe
    return this.prenotazione.map((fila) =>
      fila.map( x => x.value)
    );
  }
}

const prenotaEl = (document.getElementById('prenota') as HTMLInputElement);
const nomeEl = (document.getElementById('nome') as HTMLInputElement);

//costanti che definiscono la grandezza del teatro 
const nfilePlatea = 7;
const npostiPlatea = 10;
const nfilePalchi = 4;
const npostiPalchi = 6;

const teatro = { //stampa la platea e i palchi
  platea: Array(nfilePlatea).fill("").map(() => Array(npostiPlatea).fill("x")),
  palchi: Array(nfilePalchi).fill("").map(() => Array(npostiPalchi).fill("x")),
};

function mostraTeatro() { //mostra l'array risultante
  console.log(plateaPrenotazione.toArray());
  console.log(palchiPrenotazione.toArray());
 }

//posti inseriti a priori con nomi prestabiliti
teatro.platea[2][1] = 'Alessio';
teatro.platea[3][4] = 'Gianna';
teatro.palchi[3][1] = 'Luigi';

//chaimata e inserimento nelle variabili della funzione OrdinePrenotazione per prenotare i posti in platea e sui palchi
var plateaPrenotazione = new ordinePrenotazione(teatro.platea, 'platea');
var palchiPrenotazione = new ordinePrenotazione(teatro.palchi, 'palchi');

//al click richiama la funzione mostraTeatro che richiama la funzione toArray e mostrando in console il teatro come un array di stringhe e non di pulsanti
document.getElementById('Vedi').addEventListener('click', mostraTeatro);

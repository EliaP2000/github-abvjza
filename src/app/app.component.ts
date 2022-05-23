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
};

selezionaPosto() {//input box per inserire un nominativo da inserire nel nostro teatro. Inserito il nominativo si fa click su un posto e il nominativo viene registrato nel bottone in corrispondenza al posto. Insieme, il colore del tasto diventa rosso per segnalare che il posto è occupato, e il contenuto dell'input box viene cancellato.
  if ( prenotaEl.value !== "" ) {
    this.value = prenotaEl.value;
    this.style.color = "red";
    prenotaEl.value="";
  }
  else
    nomeEl.innerHTML = this.value;
}

toArray() { //funzione che trasforma l'array di bottoni in un array di stringhe
  return this.prenotazione.map((fila) =>
    fila.map( x => x.value)
  );
}
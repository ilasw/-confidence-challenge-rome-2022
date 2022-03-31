## Advanced State Management in Redux Toolkit e TypeScript: training & challenge

Redux è stato creato nel 2015 e pur avendo 7 anni, un'infinità nel mondo JavaScript, non li dimostra.

Negli anni, infatti, sono nate moltissime altre librerie e strategie per la gestione dello stato ma Redux rimane ancora oggi una delle soluzioni più stabili, performanti e utilizzate in ambito enterprise.
Nel frattempo Redux è cresciuto: nuovi hook, è uscito Redux Toolkit (RTK) che ne semplifica notevolmente l'utilizzo e, di recente,  RTK Query che lo potenzia ulteriormente.

In questa sessione di training su Redux (livello intermedio-avanzato) analizzeremo le fondamenta del pattern e affronteremo alcuni scenari real-world allo scopo di capirne realmente il potenziale.

Questo repository contiene il workshop dell'evento.
Ma non è tutto: al termine della sessione di training di due ore avrai la possibilità di partecipare ad un workshop per affrontare diverse sfide divise su più livelli di difficoltà, allo scopo di dare a tutti l'opportunità di imparare e mettersi alla prova.
Pensi di non essere in grado di partecipare?
Non preoccuparti, i nostri tutor ti aiuteranno a completare l'esercizio.
L'unico requisito per partecipare ai workshop e alle sfide è che tu sappia già utilizzare React.


---

## CRITERI DI VALUTAZIONE

* **comprensione requisiti**: il risultato finale soddisfa tutti i requisiti e non contiene bug 
* **Best practices**: JS / React / Redux
* **clean coding**
* **BONUS**: fully typed
* **BONUS**: per soluzioni "geniali" (punto bonus per qualche trick/soluzione che colpisce particolarmente la giuria)


---

# AVVIO DEL PROGETTO

Per avviare simultaneamente client React e server che fornisce le API REST per completare la challenge:

```bash
npm start  
```

> Se necessario, server e cliente, possono essere avviati separatamente utilizzando `npm run react:start` e `npm run server` 

---

# CHALLENGE RULES

### CHALLENGE #1: PAGINA "WORKSPACES"

Vengono fornite le API REST necessarie al funzionamento, i types e un layout base per la gestione dei workspace di lavoro. 
Il tuo goal è quello di completare la schermata seguendo le indicazioni seguenti e guardando il risultato finale che vogliamo ottenere prendendo spunto dalla gif animata:
 
![1.workspaces](https://github.com/fb-talks/redux-time-tracker-confidence/blob/master/_assets/animations/1.workspace-crud.gif)

* La pagina che dovrai completare è visibile all'url [http://localhost:3000/](http://localhost:3000/) ed è disponibile nel componente `src/pages/workspaces/Workspace.tsx`
* Per utilizzare le API REST aprire il file `/src/utils/workspaces.actions.ts` in cui troverai delle funzioni dimostrative che sfruttano gli endpoint REST con i parametri necessari al loro funzionamento.
  * Nella UI non è necessario gestire gli errori del server ma, nel caso lo facessi, sarà valutato positivamente. La UI non include, tuttavia, elementi grafici per la loro visualizzazione, perciò dovrai gestire anche questo scenario.
* Utilizzare React-Redux e Redux Toolkit (già inclusi come dipendenze del progetto) per la gestione di stato, side effect e business logic della pagina.
  * Evitare l'utilizzo di `useState` e `useReducer` a meno che tu non voglia usarli per la gestione dello stato locale del form.
* Puoi utilizzare un middleware a piacere tra Thunk (già incluso), Redux-Saga o Redux-Observable. Puoi anche utilizzare RTK query. 
* Dovrai gestire l'inserimento e la modifica dei workspace come illustrato nella gif sopra. Unico campo obbligatorio è il workspace `name` che dovrà contenere  minimo 3 caratteri.
* BONUS: Creare (almeno) un componente per la lista e uno per il form per migliorare manutenibilià e leggibilità del codice.

> NOTA: se non sei in grado di utilizzare Redux puoi provare a risolverlo utilizzando esclusivamente React.

---

### CHALLENGE #2: GESTIONE ATTIVITÀ

L'obiettivo di questa prova è quello di completare la pagina di una singola attività utilizzando Redux e Redux Toolkit.

#### REQUISITI generali:

* Utilizzare React-Redux e Redux Toolkit (già inclusi come dipendenze) per la gestione dello stato della pagina.
* Non puoi utilizzare `useState` / `useReducer` eccetto per l'eventuale stato locale di un form o funzionalità puramente legate alla user interface. Cerca di sfruttare Redux per la maggior parte delle operazioni.
* Puoi utilizzare un middleware a piacere tra Thunk (già incluso), Redux-Saga o Redux-Observable. Puoi anche utilizzare RTK query.

---

#### TASK 1) CRUD ATTIVITÀ

Ogni workspace contiene diverse attività / task.
In questa sfida dovrai gestire le operazioni CRUD di un singolo workspace, quindi creazione, modifica, cancellazione, clone e time tracking di tutte le sue attività.

Avete già a disposizione il layout JSX, i type e le funzioni per invocare le API REST con i parametri necessari al loro funzionamento (in `utils/activities.actions.ts`)

Puoi vedere il risultato finale che dovresti ottenere nell'animazione sottostante:

![Activity CRUD](https://github.com/fb-talks/redux-time-tracker-confidence/blob/master/_assets/animations/2.activities-crud.gif)


#### REQUISITI:
* La pagina che dovrai completare è visibile all'url [http://localhost:3000/workspaces/1](http://localhost:3000/workspaces/1) ed è disponibile nel componente `src/pages/activities/Activities.tsx`
* Per utilizzare le API REST aprire il file `/utils/activities.actions.ts` in cui troverai delle funzioni dimostrative che sfruttano gli endpoint REST con i parametri necessari al loro funzionamento.
* Visualizzare l'elenco delle attività (`GET`) di uno specifico workspace (migra l'attuale codice che utilizza uno stato locale e sfrutta, invece, Redux Toolkit) 
* Inserimento nuova attività tramite il form (`POST`)
* Cancellazione attività al click dell'icona "Trash" (`DELETE`)
* Clone delle attività al click dell'icona "Duplicate"
  * Quando un'attività viene clonata dovrà impostare a `null` i campi `duration`, `priority` e `status`. 

Non devi, preoccuparti di:
* Modificare i campi di un'attività esistente: sarà richiesto nel "Task 2" con specifici requisiti.
* gestire potenziali errori del server ma, nel caso lo facessi, sarà valutato positivamente. La UI non include, tuttavia, elementi grafici per la loro visualizzazione, perciò dovrai gestire anche questo scenario.
* del timer (PLAY, STOP, PAUSA): sarà una sfida opzionale che potrai svolgere dopo.

---

#### TASK 2) MODIFICA ATTIVITÀ 

Gestire la modifica dei campi `title`, `description`, `assignedTo` e `priority` di un'attività già creata.

![Activity CRUD](https://github.com/fb-talks/redux-time-tracker-confidence/blob/master/_assets/animations/3.activities-edit.gif)


#### REQUISITI:

* Il salvataggio dev'essere effettuato quando l'utente seleziona una voce dal menu a tendina oppure alla perdita del focus di un campo di input.
* Utilizzare l'API REST come illustrato nella funzione `setField` disponibile in `utils/activities.actions.ts`.
  * L'endpoint (`PATCH`) richiede come payload un oggetto che contiene il campo da modificare, ad es. `{ title: 'Fabio Biondi' }`
* **FONDAMENTALE**: Creare un'unica azione Redux per gestire l'aggiornamento di tutti i campi, chiamata anch'essa `setField`. 
* Gestire la priorità visualizzando il colore della priorità come previsto dal layout 

Non devi preoccuparti di:
* _inline editing_: la GIF mostra il risultato finale con funzionalità di inline editing. In questa fase puoi utilizzare dei semplici campi di input come già inseriti nel layout

> Cerca di fare del tuo meglio per tipizzare il codice utilizzando TypeScript.

Di seguito alcuni esempi che mostrano il dispatch dell'azione `setField` che dovrai effettuare ad ogni aggiornamento di un campo:

`setField(idAttività, fieldName, fieldValue)`

* es. `setField(1001, 'title', 'Fabio Biondi')`
* es. `setField(1002, 'description', 'lorem ipsum')`
* es. `setField(1003, 'assignedTo', { id: 1, name: 'Mario Rossi' })`
* es. `setField(1004, 'priority', 'running')`


---

#### TASK 3) InLine Editing

Creare un componente riutilizzabile per la gestione inline dell'editing  dei campi `title` e `description` come mostrato nella gif seguente:

![inline editing](https://github.com/fb-talks/redux-time-tracker-confidence/blob/master/_assets/animations/3.activities-edit.gif)

A titolo esemplificativo potresti creare un componente da utilizzare al posto di un elemento `input` in questo modo:

```typescript
<InlineInput
  value={activity.title}
  requiredLength={3}
  placeholder="title"
  onBlur={text => onSetField(activity.id, 'title', text)}
/>
```

> sei comunque libero di trovare altre soluzioni

---

#### TASK 4) Time Tracking 

Gestire il time tracking  delle attività come mostrato nella GIF sottostante e seguendo i requisiti:

![Timer](https://github.com/fb-talks/redux-time-tracker-confidence/blob/master/_assets/animations/4.activities-timer.gif)

#### REQUISITI

* Può essere avviato il timer di un'attività alla volta.
* Non può essere avviata un'attività se la precedente non è stata completata. Si parte dalla prima e, via via, tutte le altre, una ad una.
* Una volta completata l'attività non potrà più essere modificata.
* Ogni attività inizialmente ha uno `status` impostato a `null` .
* I pulsanti per avvio, pausa e stop dell'attività sono visibili solo sull'attività corrente:
  * `AVVIO`: salvare su DB lo `status` con il valore della costante `STATUS_MODE.RUNNING` 
  * `PAUSA`: salvare su DB  lo `status` con il valore `STATUS_MODE.PAUSED` e la `duration` (in secondi)
  * `STOP`: salvare su DB  lo `status` con il valore `STATUS_MODE.COMPLETED` e la `duration` (il totale, in secondi)

> Nel file `utils/activity-timer.actions.ts` trovi già le funzioni per invocare le API utili al salvataggio del tempo trascorso.


* Funzionamento dei pulsanti Avvio, Pausa e Stop:
  * Visualizzare il pulsante AVVIO solo sull'attività che può essere avviata.
  * Visualizzare i pulsanti PAUSE e STOP dopo aver cliccato su start. Il pulsante START sarà quindi nascosto e sarà visualizzato il tempo trascorso nel formato `00:00:00` 
  * Visualizzare il pulsante START e STOP quando l'attività è in stato di "pausa"
  * Al completamento dell'attività (pulsante STOP) visualizzare la durata totale dell'attività (i pulsanti non saranno più visibili).
  * Quando tutte le attività sono state completate non si dovrebbe più vedere alcun pulsante.
  * Nel caso inserissi una nuova attività, sarà possibile avviarla come già descritto negli step precedenti



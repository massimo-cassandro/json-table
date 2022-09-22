"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaults = void 0;
const defaults = {
  columns: [],
  // definizione delle colonne
  data: [],
  // dati
  footerData: [],
  caption: null,
  addRowIndex: false,
  // se true aggiunge un attributo data al tr con l'indice del record json
  tableClassName: 'table',
  wrapperClassName: 'table-responsive',
  centerAlignClassName: 'text-center',
  rightAlignClassName: 'text-right',
  percClassName: 'perc',
  euroClassName: 'euro',
  showZero: false,
  zeroValuesChar: '\u2014',
  showDownloadBtn: false,
  downloadBtnLabel: 'Download',
  downloadBtnClassName: 'btn btn-outline-secondary btn-sm',
  separateDownloadBtn: false,
  // se true viene restituito un array con tabella e pulsante download separati
  downloadFilename: 'download',
  downloadFormat: 'excel',
  // 'excel' o 'csv'
  trCallback: null,
  // array di eventuali fogli da aggiungere all'excel nel download
  // ogni elemento dell'array è un oggetto con
  // name - nome dela foglio
  // data - array già formattato da trasformare in excel
  extraDownloadSheets: null
};
exports.defaults = defaults;
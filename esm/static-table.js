/**
 * StaticTable versione esm
 * Utilizza gli stessi tracciati di jQuery datatable
 * @param {object} columns - elenco delle colonne.
 * @author Massimo Cassandro
 */

import uniqid from '@massimo-cassandro/m-utilities/js-utilities/unique-id';
import fileDownload from 'js-file-download';

import {defaults} from '../src/defaults';
import {data_types} from '../src/columns-data-types';
import setClassName from '../src/set-className';
import tableToCsv from '../src/table-to-csv';
import setDownloadFilename from '../src/set-download-filename';


function StaticTable(params) {

  params = {
    ...{
      columns                 : [], // definizione delle colonne
      data                    : [], // dati
      footerData              : [],
      caption                 : null,
      addRowIndex             : false, // se true aggiunge un attributo data al tr con l'indice del record json
      tableClassName          : defaults.tableClassName,
      wrapperClassName        : defaults.wrapperClassName,
      centerAlignClassName    : defaults.centerAlignClassName,
      rightAlignClassName     : defaults.rightAlignClassName,
      percClassName           : defaults.percClassName,
      euroClassName           : defaults.euroClassName,
      showZero                : defaults.showZero,
      zeroValuesChar          : defaults.zeroValuesChar,
      showDownloadBtn         : defaults.showDownloadBtn,
      downloadBtnLabel        : defaults.downloadBtnLabel,
      downloadBtnClassName    : defaults.downloadBtnClassName,
      downloadFilename        : defaults.downloadFilename,

      trCallback              : defaults.trCallback,
    },
    ...params
  };

  const columns_default = {
    title                     : null, // titolo colonna (testo th)
    key                       : null, // chiave oggetto del json
    dataType                  : null, // tipo dati
    className                 : null, // classe
    render                    : null, // funziona ad hoc per il rendering
    parse                     : null, // funzione ad hoc per ottenere il valore
    rowHeading                : false // se true, i dati sono inseriti in un th anziché un td
  };

  // assegnazione columns defaults
  params.columns = params.columns.map(col => {return {...columns_default, ...col};});

  const table_id = uniqid();

  try {

      const TableHeadings = () => {
        return params.columns.map((col, idx) => {
          return `<th class="${setClassName(col, false)}" scope='col'>
            ${col.title}
          </th>`;
        }).join('');
      };

      const tableRows = (data) => {
        return data.map((row, idx) => {

          let tr_attrs = '';
          if(params.addRowIndex) {
            tr_attrs += ` data-idx="${idx}"`;
          }
          if(params.trCallback && typeof params.trCallback === 'function') {
            tr_attrs += ' ' + params.trCallback(row);
          }

          return `<tr${tr_attrs}>
            ${params.columns.map((col, i) => {
              let content,
                addFormatClass = true;

              if(col.parse && typeof col.parse === 'function') {
                content = col.parse(row);
              } else {
                content = row[col.key];
              }

              if(content === null) {
                content = '';
                addFormatClass = false;

              } else if(content === 0 && !params.showZero) {
                content = params.zeroValuesChar;
                addFormatClass = false;

              } else if(col.render && typeof col.render === 'function') {
                content = col.render(content);

              } else if(col.dataType && data_types[col.dataType]?.render) {
                content = data_types[col.dataType].render(content);
              }

              const isTh = col.rowHeading && i === 0,
                CellTag = isTh? 'th' : 'td';

              return `<${CellTag}${isTh? ' scope="row"' : ''}
                  class="${setClassName(col, addFormatClass)}">${content}</${CellTag}>`;

            }).join('')}
          </tr$>`
        }).join('');
      };

      return `<div class="${params.wrapperClassName}">
        <table class="${params.tableClassName}" id="${table_id}">
          ${params.caption? `<caption>${params.caption}</caption>` : ''}
          <thead>
            <tr>
              ${TableHeadings()}
            </tr>
          </thead>
          <tbody>
            ${tableRows(params.data)}
          </tbody>
          ${params.footerData?.length? `<tfoot>${tableRows(params.footerData)}</tfoot>` : ''}
        </table>
      </div>`;
      // ${params.showDownloadBtn?
      //   `<div class="${params.rightAlignClassName}">
      //     <button type="button"
      //       class="${params.downloadBtnClassName}"
      //       onClick={() => {
      //         fileDownload(
      //           tableToCsv(document.getElementBy(table_id)),
      //           setDownloadFilename(params.downloadFilename)
      //         );
      //       }}
      //     >{params.downloadBtnLabel}</button>
      //     {/* eslint-enable jsx-a11y/anchor-is-valid */}
      //   </div>`
      // }
      // `;

  } catch(e) { //throw error
    console.error( e ); // eslint-disable-line
  } // finally {}
}

export default StaticTable;

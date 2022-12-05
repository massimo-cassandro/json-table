/**
 * JsonTable versione esm
 * Utilizza gli stessi tracciati di jQuery datatable
 * @param {object} params - parametri di configurazione.
 * @author Massimo Cassandro
 */

import uniqid from '@massimo-cassandro/m-utilities/js-utilities/unique-id';

import {defaults} from '../src/defaults';
import {data_types} from '../src/columns-data-types';
import setClassName from '../src/set-className';
import downloadExcel from '../src/download-excel';


function JsonTable(params) {

  params = {
    ...defaults,
    ...params
  };

  const columns_default = {
    title                     : null, // titolo colonna (testo th)
    key                       : null, // chiave oggetto del json
    dataType                  : null, // tipo dati
    className                 : null, // classe
    render                    : null, // funzione ad hoc per il rendering
    parse                     : null, // funzione ad hoc per elaborare il valore
    rowHeading                : false // se true, viene creato un elemento th[scope=row] invece di un td
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

        return `<tr${tr_attrs}>` +
          params.columns.map((col, i) => {
            let content,
              addFormatClass = true;

            if(row[col.key] === null) {
              content = '';
            } else {

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
            }

            const isTh = col.rowHeading && i === 0,
              CellTag = isTh? 'th' : 'td';

            return `<${CellTag}${isTh? ' scope="row"' : ''}
                class="${setClassName(col, addFormatClass)}">${content}</${CellTag}>`;

          }).join('') +
        '</tr>'
      }).join('');
    };

    let downloadBtn = '';
    if(params.showDownloadBtn) {
      const btn_id = table_id + '-dwnld-btn';
      downloadBtn =
        `<div class="${params.rightAlignClassName}">
          <button type="button"
            id="${btn_id}"
            class="${params.downloadBtnClassName}"
          >${params.downloadBtnLabel}</button>
        </div>`;

      document.body.addEventListener('click', e => {
        if(e.target.id === btn_id) {

          downloadExcel(params);

        }
      }, false);
    }

    const table = `<div class="${params.wrapperClassName}">
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

    if(params.showDownloadBtn && params.separateDownloadBtn) {
      return [
        table,
        downloadBtn
      ];
    } else {

      return table + downloadBtn;
    }


  } catch(e) { //throw error
    console.error( e ); // eslint-disable-line
  } // finally {}
}

export default JsonTable;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uniqueId = _interopRequireDefault(require("@massimo-cassandro/m-utilities/js-utilities/unique-id"));

var _defaults = require("../src/defaults");

var _columnsDataTypes = require("../src/columns-data-types");

var _setClassName = _interopRequireDefault(require("../src/set-className"));

var _downloadExcel = _interopRequireDefault(require("../src/download-excel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * StaticTable versione esm
 * Utilizza gli stessi tracciati di jQuery datatable
 * @param {object} columns - elenco delle colonne.
 * @author Massimo Cassandro
 */
function StaticTable(params) {
  params = { ..._defaults.defaults,
    ...params
  };
  const columns_default = {
    title: null,
    // titolo colonna (testo th)
    key: null,
    // chiave oggetto del json
    dataType: null,
    // tipo dati
    className: null,
    // classe
    render: null,
    // funzione ad hoc per il rendering
    parse: null,
    // funzione ad hoc per ottenere il valore
    rowHeading: false // se true, i dati sono inseriti in un th anziché un td

  }; // assegnazione columns defaults

  params.columns = params.columns.map(col => {
    return { ...columns_default,
      ...col
    };
  });
  const table_id = (0, _uniqueId.default)();

  try {
    const TableHeadings = () => {
      return params.columns.map((col, idx) => {
        return `<th class="${(0, _setClassName.default)(col, false)}" scope='col'>
            ${col.title}
          </th>`;
      }).join('');
    };

    const tableRows = data => {
      return data.map((row, idx) => {
        let tr_attrs = '';

        if (params.addRowIndex) {
          tr_attrs += ` data-idx="${idx}"`;
        }

        if (params.trCallback && typeof params.trCallback === 'function') {
          tr_attrs += ' ' + params.trCallback(row);
        }

        return `<tr${tr_attrs}>
            ${params.columns.map((col, i) => {
          let content,
              addFormatClass = true;

          if (row[col.key] === null) {
            content = '';
          } else {
            if (col.parse && typeof col.parse === 'function') {
              content = col.parse(row);
            } else {
              content = row[col.key];
            }

            if (content === null) {
              content = '';
              addFormatClass = false;
            } else if (content === 0 && !params.showZero) {
              content = params.zeroValuesChar;
              addFormatClass = false;
            } else if (col.render && typeof col.render === 'function') {
              content = col.render(content);
            } else if (col.dataType && _columnsDataTypes.data_types[col.dataType]?.render) {
              content = _columnsDataTypes.data_types[col.dataType].render(content);
            }
          }

          const isTh = col.rowHeading && i === 0,
                CellTag = isTh ? 'th' : 'td';
          return `<${CellTag}${isTh ? ' scope="row"' : ''}
                  class="${(0, _setClassName.default)(col, addFormatClass)}">${content}</${CellTag}>`;
        }).join('')}
          </tr$>`;
      }).join('');
    };

    let downloadBtn = '';

    if (params.showDownloadBtn) {
      const btn_id = table_id + '-dwnld-btn';
      downloadBtn = `<div class="${params.rightAlignClassName}">
            <button type="button"
              id="${btn_id}"
              class="${params.downloadBtnClassName}"
            >${params.downloadBtnLabel}</button>
          </div>`;
      document.body.addEventListener('click', e => {
        if (e.target.id === btn_id) {
          (0, _downloadExcel.default)(params);
        }
      }, false);
    }

    const table = `<div class="${params.wrapperClassName}">
        <table class="${params.tableClassName}" id="${table_id}">
          ${params.caption ? `<caption>${params.caption}</caption>` : ''}
          <thead>
            <tr>
              ${TableHeadings()}
            </tr>
          </thead>
          <tbody>
            ${tableRows(params.data)}
          </tbody>
          ${params.footerData?.length ? `<tfoot>${tableRows(params.footerData)}</tfoot>` : ''}
        </table>
      </div>`;

    if (params.showDownloadBtn && params.separateDownloadBtn) {
      return [table, downloadBtn];
    } else {
      return table + downloadBtn;
    }
  } catch (e) {
    //throw error
    console.error(e); // eslint-disable-line
  } // finally {}

}

var _default = StaticTable;
exports.default = _default;
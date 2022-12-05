import {StaticTable} from '../dist/react/components/StaticTable';

// npx rollup --input public/esm_demo.js --file public/esm_demo.min.js --format iife --watch

(() => {

  const table = StaticTable({
    tableClassName:'table table-striped table-hover',
    caption:'table-caption',
    columns:[
      {
        key         : 'id',
        title       : '#',
        dataType    : 'num',
        rowHeading  : true
      },
      {
        key         : 'isActive',
        title       : 'Bool (to do)',
        dataType    : 'bool'
      },
      {
        title       : 'parsed',
        parse       : row => row.number2 - row.number1,
        dataType    : 'num'
      },
      {
        key         : 'date',
        title       : 'Date',
        dataType    : 'date'
      },
      {
        key         : 'datetime',
        title       : 'Datetime (todo)',
        dataType    : 'datetime'
      },
      {
        key         : 'perc',
        title       : 'Perc.',
        dataType    : 'perc'
      },
      {
        key         : 'percDecimal',
        title       : 'Perc. (decimal)',
        dataType    : 'percDecimal'
      },
      {
        key         : 'euro',
        title       : 'Euro',
        dataType    : 'euro'
      }

    ],
    data: [
      {
        'id': 350,
        'isActive': true,
        'number1': 1081.55,
        'number2': 4411.51,
        'date': '2017-06-20',
        'datetime': '2015-02-21T01:23:49',
        'text': 'sit officia in',
        'perc': 42.33,
        'percDecimal': 0.19,
        'euro': 879.21
      },
      {
        'id': 1197,
        'isActive': true,
        'number1': 1955.62,
        'number2': 4670.17,
        'date': '2016-09-18',
        'datetime': '2016-10-29T02:05:34',
        'text': 'deserunt velit',
        'perc': 8,
        'percDecimal': 0.22,
        'euro': 215.68
      },
      {
        'id': 859,
        'isActive': true,
        'number1': 1228.38,
        'number2': 4113.09,
        'date': '2018-05-16',
        'datetime': '2017-11-12T11:09:41',
        'text': 'tempor excepteur aliqua anim',
        'perc': 95.48,
        'percDecimal': 0.24,
        'euro': 683.96
      }
    ]
  });

  document.getElementById('demo').innerHTML = table;

})();

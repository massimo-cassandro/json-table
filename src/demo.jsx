import './src-demo-assets/demo.scss';
import {JsonTable} from './lib/index';
import {StaticTable} from './lib/index';
import jsonDemo from './src-demo-assets/static-table-demo.json';

function Demo() {
  return (<>
    <h1>Demo</h1>

    <h2>Json Table</h2>
    {/*
      {
        "id": 1063,
        "isActive": false,
        "amount1": 1026.5,
        "amount2": 3256.25,
        "age": 33,
        "email": "gildaharding@bicol.com",
        "phone": "(912) 531-3743",
        "date": {
          "date": "2019-01-13T05:14:32 -01:00",
          "timezone_type": 3,
          "timezone": "Europe/Berlin"
        },
        "about": "sit dolor nostrud officia id cillum occaecat Lorem cupidatat consequat esse sunt ut est velit sit minim exercitation"
      },
    */}
    <div className='position-relative'>
      <JsonTable
        caption='Table caption'
        tableClassName='table table-bordered'
        ajaxUrl='./demo-assets/ajax-demo.json'
        order={[[1,'desc']]}
        columns={[
          {
            title       : '#',
            data        : 'id',
            className   : 'text-end'
          },
          {
            title       : 'Date',
            data        : 'date',
            className   : 'text-end',
            type        : 'sf_date'
          },
          {
            data        : 'age',
            visible     : false
          },
          {
            title       : 'Amounts diff.',
            render      : row => row.amount2 - row.amount1,
            type        : 'euro'
          },
          {
            title       : 'About',
            data        : 'about'
          },
          {
            title       : 'Email',
            data        : 'email'
          },
          {
            title       : 'Phone',
            data        : 'phone'
          },
          {
            title       : 'Boolean (to do)',
            data        : 'isActive'
          }
        ]}
      />
    </div>

    <h2>Static Table</h2>
    {/*
      {
        "id": 350,
        "isActive": true,
        "number1": 1081.55,
        "number2": 4411.51,
        "date": "2017-06-20",
        "datetime": "2015-02-21T01:23:49",
        "text": "sit officia in",
        "perc": 42.33,
        "percDecimal": 0.19,
        "euro": 879.21
      },
    */}

    <StaticTable
      tableClassName='table table-striped table-hover'
      showDownloadBtn={true}
      caption='table-caption'
      columns={[
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

      ]}
      data={jsonDemo}
    />

  </>);
}

export default Demo;

import './demo.css';
import {JsonTable} from './lib/index';

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

    <h2>Static Table</h2>

  </>);
}

export default Demo;

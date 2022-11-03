import './demo-assets/demo.css';
import {JsonTable} from './lib/index';

function Demo() {
  return (<>
    <h1>Demo</h1>

    <h2>Json Table</h2>
    <div>
      <JsonTable
        caption='Importi scontati dalla quota annuale'
        tableClassName='table table-bordered'
        ajaxUrl={process.env.DASHBOARD_PRATICHE_GOLD}
        order={[[1,'desc']]}
        columns={[
          {
            title       : '#',
            data        : 'id',
            className   : 'text-right'
          },
          {
            title       : 'Data',
            data        : 'data',
            className   : 'text-right',
            type        : 'sf_date'
          },
          {
            title       : 'Agenzia',
            data        : 'denominazioneAgenzia',
            includeIf   : props.app_data.user.isStaff,
            render: row => {
              return <>
                #{row.agenziaId} {row.denominazioneAgenzia}<br/>
                <small>{row.comune} ({row.prov})</small>
              </>;
            }
          },
          {
            data        : 'agenziaId',
            visible     : false,
            includeIf   : props.app_data.user.isStaff
          },
          {
            data        : 'comune',
            visible     : false,
            includeIf   : props.app_data.user.isStaff
          },
          {
            data        : 'prov',
            visible     : false,
            includeIf   : props.app_data.user.isStaff
          },
          {
            title       : 'Operatore',
            data        : 'operatore',
          },
          {
            title       : 'Causale',
            data        : 'causale',
            render: row => {
              let str   = [];
              if(row.nome) {
                str.push(`${row.nome} (${row.operatore})`);
                if(row.causale) {
                  str.push('/');
                }
              }
              str.push(row.causale);
              return str.join(' ');
            }
          },
          {
            title       : 'Tipo prodotto',
            data        : 'tipoProdotto'
          },
          {
            title       : 'Importo',
            data        : 'importo',
            className   : 'text-right',
            type        : 'euro'
          },
          {
            data        : 'dossierId',
            visible     : false
          },
          {
            data        : 'praticaId',
            visible     : false
          }

        ]}
      />

    </div>

    <h2>Static Table</h2>
    <div></div>
  </>);
}

export default Demo;

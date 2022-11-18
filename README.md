# jsonTable
Html table builder from Ajax json


## Changelog

* v. 0.x (nov 2022)

## TODO

* rivedere classi e props demo
* unificare json table e static table
  * aggiunta parametro "ajax" true|false (se tru usa `ajaxUrl`, se false usa `data`)
* jsdoc

### json table
* fix props.icone in jsonTable (viene bypassata dal default)
* opzione per usare paramentri più semplici non compatibili con dt
* add parse cell method (unificare tipi con static Table)
* rivedere css, utilizzo custom props
* bug: se un elemento è posizionato sopra la tabella, il posizionamento sticky funziona male (vedi popuop salvadanaio)


### static Table react
* unire con versione esm


### Nuove funzionalità
* responsive table

* https://www.raymondcamden.com/2022/05/23/building-table-sorting-and-pagination-in-a-web-component
* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table?retiredLocale=it#table_sorting
* https://pencilandpaper.io/articles/user-experience/ux-pattern-analysis-enterprise-data-tables/
* https://medium.com/design-with-figma/the-ultimate-guide-to-designing-data-tables-7db29713a85a
* https://www.taniarascia.com/front-end-tables-sort-filter-paginate/
* https://medium.com/nextux/design-better-data-tables-4ecc99d23356

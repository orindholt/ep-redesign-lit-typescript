# EP Redesign Repo TypeScript

## Instruktioner:

Buildet kan blive vist på [GitHub Pages](https://orindholt.github.io/ep-redesign-lit-typescript/), eller på live lokal server i mappen `/docs`.
Alle udviklingsfiler og assets ligger i `/dev`.

For at køre udviklingsfilerne, kør: `npm run serve`.
<br/>For at bygge sitet, kør: `npm run build`.

For at udlukkende vise det statiske kan de to web-components blive udkommenteret/fjernet:
<br/>`<!-- <log-in></log-in> -->`<br/>

Component `<log-in></log-in>` er login modulet som bliver toggled på login knappen i navbaren.

Navigationen `<nav></nav>` og footeren `<footer></footer>` er bygget statisk.

Buildet på GitHub Pages virker nuværende ikke på andre browsere end **Chrome**, og **Andriod**.
Men det har selvfølgelig ikke indflydelse på koden og kan sagtens blive trukket ud, uden problemer.

## HUSK!

[Hard reload](https://fabricdigital.co.nz/blog/how-to-hard-refresh-your-browser-and-clear-cache) og clear cachen så du får det nyeste version af css'en.

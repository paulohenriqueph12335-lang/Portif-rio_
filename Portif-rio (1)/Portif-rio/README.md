# Portif-rio_
Interactive business portfolio focused on Project Management, Business Intelligence, Data Analytics, Process Automation, and AI. Featuring real-world case studies, dashboards, and scalable solutions that transform complex challenges into measurable business results.


## Espaço de portfólio

Este repositório agora inclui uma landing page estática em `index.html`, com estilos em `styles.css`, para apresentar projetos, competências, indicadores e contato profissional.

## Workspace interativo (nova versão)

O `index.html` agora é um app de página única com três estados: **Início**, **Cases** e **Workspace**. Cada case (Traduzzo, Atento Brasil, Toyota, Sobre & Método) abre como um ambiente com janelas independentes — dashboard, método, resultados etc. — que podem ser movidas, minimizadas e fechadas.

Todo o conteúdo (cases, KPIs, textos de cada janela) vive em `script.js`, no objeto `PROJECTS`. Para adicionar um novo case, basta acrescentar um item nesse array com seu próprio conjunto de janelas — não é preciso tocar no motor de janelas (`openWindow`, `closeWindow`, `makeDraggable` etc.).

(function(){
"use strict";

const yearEl = document.querySelector('#current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   ÍCONES — cada módulo do workspace usa um ícone consistente
   entre o dock lateral e o cabeçalho da janela.
   ============================================================ */
const ICONS = {
  dashboard:'<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="12" width="4" height="9" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="10" y="7" width="4" height="14" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="17" y="3" width="4" height="18" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>',
  arquitetura:'<svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="6" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="6" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="18" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 7.5L15 16M16 7.5L9 16M8.5 6H15.5" stroke="currentColor" stroke-width="1.3"/></svg>',
  fluxo:'<svg viewBox="0 0 24 24" fill="none"><path d="M3 6h6a3 3 0 013 3v6a3 3 0 003 3h6" stroke="currentColor" stroke-width="1.5"/><path d="M17 15l4 3-4 3M7 3L3 6l4 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  ia:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l1.8 5.6L19 9l-5.2 1.4L12 16l-1.8-5.6L5 9l5.2-1.4L12 2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M19 15l.9 2.6L22 18.5l-2.1.9L19 22l-.9-2.6-2.1-.9 2.1-.9L19 15z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>',
  resultados:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.6 6.9 7.4.4-5.7 4.8 1.9 7.2L12 17.3 5.8 21.3l1.9-7.2L2 9.3l7.4-.4z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
  docs:'<svg viewBox="0 0 24 24" fill="none"><path d="M6 2h9l5 5v15H6z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M15 2v5h5M9 12h6M9 16h6M9 8h2" stroke="currentColor" stroke-width="1.3"/></svg>',
  contas:'<svg viewBox="0 0 24 24" fill="none"><path d="M4 21V6l8-4 8 4v15" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M9 21v-6h6v6M9 10h.01M15 10h.01M9 14h.01M15 14h.01" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  metodo:'<svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="18" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="11" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="5" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M7.6 16.6L10.4 12.6M13.6 9.6L16.4 6.6" stroke="currentColor" stroke-width="1.3"/></svg>',
  competencias:'<svg viewBox="0 0 24 24" fill="none"><path d="M3 11l8-8 9 9-8 8z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="8.5" cy="8.5" r="1.4" stroke="currentColor" stroke-width="1.3"/></svg>',
  formacao:'<svg viewBox="0 0 24 24" fill="none"><path d="M2 8l10-4 10 4-10 4-10-4z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6 10.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5.5M22 8v6" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
  contato:'<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M4 6.5l8 6 8-6" stroke="currentColor" stroke-width="1.4"/></svg>'
};

/* ============================================================
   CONTEÚDO — dados reais do portfólio de Paulo Henrique.
   Em um projeto maior isto viveria em /content/projects.json;
   aqui fica isolado neste objeto para que adicionar um novo case
   não exija tocar no motor de janelas abaixo.
   ============================================================ */
const PROJECTS = [
  {
    id:'traduzzo',
    tag:'CASO 01 — PROSPECÇÃO B2B · AUTOMAÇÃO',
    name:'CRM de Prospecção via E-mail — Traduzzo',
    summary:'Liderança no desenvolvimento do primeiro CRM de prospecção por e-mail da empresa, com IA aplicada à automação de processos e às estratégias de negociação.',
    stack:['CRM próprio','Automação','IA aplicada','Outlook','2025 — atual'],
    windows:[
      {id:'dashboard', title:'Dashboard', icon:'dashboard', live:true},
      {id:'arquitetura', title:'Arquitetura', icon:'arquitetura', live:false},
      {id:'fluxo', title:'Fluxo de Prospecção', icon:'fluxo', live:false},
      {id:'ia', title:'IA · Classificador', icon:'ia', live:true},
      {id:'docs', title:'Documentação', icon:'docs', live:false},
      {id:'resultados', title:'Resultados', icon:'resultados', live:false},
    ],
    defaultOpen:['dashboard','resultados'],
    content:{
      dashboard(){
        return `
          <div class="section-title">Visão geral</div>
          <div class="kpi-grid">
            <div class="kpi-card"><div class="label">Escala de envio</div><div class="value signal">20 → 10.000+</div><div class="sub">e-mails por dia</div></div>
            <div class="kpi-card"><div class="label">Conversão de leads</div><div class="value teal">+10%</div><div class="sub">após estruturação do CRM</div></div>
            <div class="kpi-card"><div class="label">Custos operacionais</div><div class="value">−16%</div><div class="sub">com automação de processos</div></div>
            <div class="kpi-card"><div class="label">Papel</div><div class="value" style="font-size:15px">Liderança de desenvolvimento</div><div class="sub">primeiro CRM de prospecção da empresa</div></div>
          </div>
          <div class="section-title">Evolução do volume diário</div>
          <div class="chart-box">
            <div class="chart-legend"><span><i style="background:var(--signal)"></i>E-mails/dia (ilustrativo)</span></div>
            ${chart([20,350,2200,6100,10400],null,['M1','M2','M3','M4','M5'])}
          </div>
        `;
      },
      arquitetura(){
        return `
          <div class="section-title">Topologia multi-perfil</div>
          <div class="diagram-box">${archDiagram()}</div>
          <p class="p">O CRM roda em três perfis sobre a mesma base: <b>CEO</b> (dashboard e KPIs consolidados), <b>Matriz</b> (servidor central e banco de dados) e <b>Usuário</b> (estação de prospecção e disparo). Liderei a definição desse desenho para permitir operação distribuída sem perder controle central.</p>
          <div class="section-title">Decisões que sustentam a escala</div>
          <ul class="node-list">
            <li><span class="n-badge">01</span><div class="n-text"><b>Sincronização entre estações</b><span>Cada operador prospecta sem depender de conexão constante com a matriz.</span></div></li>
            <li><span class="n-badge">02</span><div class="n-text"><b>Controle de limite de envio</b><span>Fila com janela de disparo protege a reputação do domínio de e-mail.</span></div></li>
            <li><span class="n-badge">03</span><div class="n-text"><b>Visão executiva centralizada</b><span>O perfil CEO acompanha a operação de todas as estações em um único painel.</span></div></li>
          </ul>
        `;
      },
      fluxo(){
        const steps = [
          ['Prospecção','Busca e qualificação de leads por segmento de atividade.'],
          ['Fila de envio','Respeita limites de disparo para não comprometer a entregabilidade.'],
          ['Disparo','Envio via integração com Outlook, com registro de cada envio.'],
          ['Classificação de resposta','IA aplicada à triagem automática das respostas recebidas.'],
          ['Negociação','Estratégia de negociação apoiada por IA para respostas de interesse.'],
          ['Atualização do CRM','Status do lead atualizado e disponível no dashboard executivo.'],
        ];
        return `
          <div class="section-title">Do lead à negociação</div>
          <div class="flow-row">
            ${steps.map((s,i)=>`<div class="flow-step"><div class="flow-num">${String(i+1).padStart(2,'0')}</div><div class="flow-text"><b>${s[0]}</b><span>${s[1]}</span></div></div>`).join('')}
          </div>
        `;
      },
      ia(){
        return `
          <div class="section-title">Categorias de resposta</div>
          <div class="badge-row">
            <span class="badge green">INTERESSE</span>
            <span class="badge rose">NEGATIVO</span>
            <span class="badge signal">AUTO_REPLY</span>
            <span class="badge gray">BOUNCE</span>
            <span class="badge rose">SPAM_REPORT</span>
            <span class="badge teal">INDEFINIDO</span>
          </div>
          <div class="section-title">Cascata de classificação</div>
          <div class="cascade">
            <span class="stage">Modelo local</span><span class="arrow">→</span>
            <span class="stage">Modelo em nuvem</span><span class="arrow">→</span>
            <span class="stage">Palavras-chave (fallback)</span>
          </div>
          <p class="p">A IA classifica automaticamente cada resposta recebida e apoia a estratégia de negociação — reduzindo o tempo gasto em triagem manual de caixa de entrada e priorizando quem demonstrou interesse real.</p>
        `;
      },
      docs(){
        return `
          <div class="section-title">Estrutura de uso por perfil</div>
          <div class="doc-card"><h4>👑 CEO / Executivo</h4><ul><li>Dashboard com KPIs consolidados</li><li>Visão geral da operação de todas as estações</li></ul></div>
          <div class="doc-card"><h4>🏢 Matriz / Servidor</h4><ul><li>Banco de dados central</li><li>Orquestra a sincronização entre estações</li></ul></div>
          <div class="doc-card"><h4>👤 Usuário / Estação</h4><ul><li>Prospecção e disparo de e-mails</li><li>Conecta-se automaticamente ao servidor</li></ul></div>
        `;
      },
      resultados(){
        const items=[
          ['Escala de 20 para +10.000 e-mails/dia','Estrutura de fila e disparo controlado permitiu crescer a operação sem perder entregabilidade.'],
          ['+10% na taxa de conversão de leads','Ganho após a estruturação do CRM e da triagem de respostas por IA.'],
          ['−16% nos custos operacionais','Automação de processos reduziu trabalho manual repetitivo na prospecção.'],
        ];
        return `<div class="section-title">Resultados do case</div>${items.map(i=>`<div class="result-item"><div class="result-check"><svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div><b>${i[0]}</b><span>${i[1]}</span></div></div>`).join('')}`;
      }
    }
  },

  {
    id:'atento',
    tag:'CASO 02 — CUSTOMER SUCCESS · CX',
    name:'Relacionamento Multi-conta — Atento Brasil',
    summary:'Especialista em Relacionamento e Suporte Estratégico atendendo três contas simultâneas, cada uma com um desafio de CX diferente.',
    stack:['Samsung','Livelo','UOL','2 anos e 10 meses'],
    windows:[
      {id:'dashboard', title:'Dashboard', icon:'dashboard', live:false},
      {id:'contas', title:'Contas', icon:'contas', live:false},
      {id:'metodo', title:'Método aplicado', icon:'metodo', live:false},
      {id:'resultados', title:'Resultados', icon:'resultados', live:false},
    ],
    defaultOpen:['dashboard','contas'],
    content:{
      dashboard(){
        return `
          <div class="section-title">Visão geral</div>
          <div class="kpi-grid">
            <div class="kpi-card"><div class="label">Contas simultâneas</div><div class="value signal">3</div><div class="sub">Samsung · Livelo · UOL</div></div>
            <div class="kpi-card"><div class="label">Tempo na função</div><div class="value teal">2a 10m</div><div class="sub">relacionamento multi-conta</div></div>
            <div class="kpi-card"><div class="label">Equipe liderada</div><div class="value">45 pessoas</div><div class="sub">suporte técnico Samsung</div></div>
            <div class="kpi-card"><div class="label">Reconhecimento</div><div class="value" style="font-size:15px">Funcionário do Mês</div><div class="sub">conta Samsung</div></div>
          </div>
          <p class="p">Cada conta exigia um tipo diferente de gestão de relacionamento: liderança e KPIs/SLAs na Samsung, cross-sell e evolução de NPS na Livelo, retenção ativa na UOL.</p>
        `;
      },
      contas(){
        return `
          <div class="section-title">As três frentes</div>
          <div class="account-grid">
            <div class="account-card"><h4>Samsung</h4><p>Liderança de suporte técnico de 45 pessoas, treinamentos de equipe e acompanhamento de KPIs/SLAs. Reconhecimento como Funcionário do Mês.</p></div>
            <div class="account-card"><h4>Livelo</h4><p>Onboarding e cross-sell com foco em evolução do NPS — construindo relacionamento contínuo com o cliente ao longo da jornada.</p></div>
            <div class="account-card"><h4>UOL</h4><p>Projeto "Anjo da Guarda": atuação focada em redução de cancelamentos e fortalecimento da retenção.</p></div>
          </div>
        `;
      },
      metodo(){
        const steps=[
          ['Diagnóstico','Mapeamento da jornada real de cada conta, identificando onde a retenção ou a satisfação travavam.'],
          ['Estruturação','Definição de indicadores (KPIs/SLAs/NPS) específicos para o desafio de cada cliente.'],
          ['Execução','Condução de treinamentos, onboarding e negociação, conta a conta.'],
          ['Retenção & growth','Acompanhamento de NPS/CSAT e churn, ajustando a operação a partir do que o cliente mostrava.'],
        ];
        return `<div class="section-title">Aplicado às três contas</div><div class="flow-row">${steps.map((s,i)=>`<div class="flow-step"><div class="flow-num">${String(i+1).padStart(2,'0')}</div><div class="flow-text"><b>${s[0]}</b><span>${s[1]}</span></div></div>`).join('')}</div>`;
      },
      resultados(){
        const items=[
          ['Liderança reconhecida na Samsung','Gestão de 45 pessoas, treinamentos e KPIs/SLAs resultaram no título de Funcionário do Mês.'],
          ['Evolução de NPS na Livelo','Onboarding e cross-sell estruturados para acompanhar a evolução do relacionamento.'],
          ['Menos cancelamentos na UOL','Projeto "Anjo da Guarda" com foco direto em retenção de clientes em risco.'],
        ];
        return `<div class="section-title">Resultados do case</div>${items.map(i=>`<div class="result-item"><div class="result-check"><svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div><b>${i[0]}</b><span>${i[1]}</span></div></div>`).join('')}`;
      }
    }
  },

  {
    id:'toyota',
    tag:'CASO 03 — GESTÃO DE PROCESSOS',
    name:'Agendamento Estratégico — Toyota',
    summary:'Otimização da agenda operacional e da prospecção de clientes como Agendador Estratégico, com foco em conversão e experiência do cliente.',
    stack:['Agenda operacional','Prospecção','9 meses'],
    windows:[
      {id:'dashboard', title:'Dashboard', icon:'dashboard', live:false},
      {id:'fluxo', title:'Processo', icon:'fluxo', live:false},
      {id:'resultados', title:'Resultados', icon:'resultados', live:false},
    ],
    defaultOpen:['dashboard','resultados'],
    content:{
      dashboard(){
        return `
          <div class="section-title">Visão geral</div>
          <div class="kpi-grid">
            <div class="kpi-card"><div class="label">Duração do projeto</div><div class="value signal">9 meses</div><div class="sub">como Agendador Estratégico</div></div>
            <div class="kpi-card"><div class="label">Agenda operacional</div><div class="value teal">Otimizada</div><div class="sub">reorganização de prioridades</div></div>
            <div class="kpi-card"><div class="label">Conversão</div><div class="value" style="font-size:16px">Em alta</div><div class="sub">mais agendamentos convertidos</div></div>
            <div class="kpi-card"><div class="label">NPS</div><div class="value" style="font-size:16px">Em melhora</div><div class="sub">experiência do cliente</div></div>
          </div>
        `;
      },
      fluxo(){
        const steps=[
          ['Diagnóstico da agenda','Levantamento dos gargalos na agenda operacional existente.'],
          ['Reorganização de prioridades','Ajuste da agenda para equilibrar volume e qualidade de atendimento.'],
          ['Prospecção ativa','Contato direto com clientes para geração de novos agendamentos.'],
          ['Acompanhamento de conversão','Monitoramento de comparecimento e experiência pós-agendamento.'],
        ];
        return `<div class="section-title">Processo de otimização</div><div class="flow-row">${steps.map((s,i)=>`<div class="flow-step"><div class="flow-num">${String(i+1).padStart(2,'0')}</div><div class="flow-text"><b>${s[0]}</b><span>${s[1]}</span></div></div>`).join('')}</div>`;
      },
      resultados(){
        const items=[
          ['Otimização de agenda operacional','Reorganização das prioridades reduziu atrito na rotina de agendamentos.'],
          ['Aumento na conversão de agendamentos','Prospecção ativa gerou mais agendamentos efetivamente realizados.'],
          ['Melhoria do NPS','Ajustes no processo refletiram em uma experiência mais fluida para o cliente.'],
        ];
        return `<div class="section-title">Resultados do case</div>${items.map(i=>`<div class="result-item"><div class="result-check"><svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div><b>${i[0]}</b><span>${i[1]}</span></div></div>`).join('')}`;
      }
    }
  },

  {
    id:'sobre',
    tag:'PERFIL',
    name:'Sobre & Método',
    summary:'Método de trabalho, competências, formação e contato — o workspace por trás de todos os cases.',
    stack:['Método','Competências','Formação','Contato'],
    windows:[
      {id:'metodo', title:'Método', icon:'metodo', live:false},
      {id:'competencias', title:'Competências', icon:'competencias', live:false},
      {id:'formacao', title:'Formação', icon:'formacao', live:false},
      {id:'contato', title:'Contato', icon:'contato', live:true},
    ],
    defaultOpen:['metodo','competencias'],
    content:{
      metodo(){
        const steps=[
          ['Diagnóstico','Mapeio a jornada real do cliente e identifico onde a conversão ou a retenção hoje travam.'],
          ['Estruturação','Defino processo, CRM e indicadores (KPIs/SLAs/NPS) que sustentam a operação.'],
          ['Execução','Conduzo prospecção, onboarding e negociação, com automação e IA reduzindo trabalho manual.'],
          ['Retenção & growth','Acompanho NPS/CSAT e churn, e ajusto a operação com base no que o cliente mostra.'],
        ];
        return `<div class="section-title">Da prospecção à retenção, sem pular etapa</div><div class="flow-row">${steps.map((s,i)=>`<div class="flow-step"><div class="flow-num">${String(i+1).padStart(2,'0')}</div><div class="flow-text"><b>${s[0]}</b><span>${s[1]}</span></div></div>`).join('')}</div>`;
      },
      competencias(){
        const groups=[
          ['Customer Success',['Onboarding','Retenção','Churn Prevention','Jornada do Cliente','NPS','CSAT']],
          ['Gestão',['Gestão de Projetos','Otimização de Processos','Liderança de Equipes','KPIs/SLAs']],
          ['Vendas & Negócios',['Prospecção B2B','Vendas Consultivas','Cross-sell','Negociação Estratégica']],
          ['Tecnologia',['CRM','IA para Automação','Análise de Dados','Pacote Office Avançado']],
        ];
        return groups.map(g=>`<div class="skill-block"><h4>${g[0]}</h4><div class="tag-grid">${g[1].map(s=>`<span>${s}</span>`).join('')}</div></div>`).join('');
      },
      formacao(){
        const items=['Publicidade e Propaganda — FMU (cursando)','Análise de Dados — Matecademy Brasil (em andamento)','Web Designer — Net Brasil (120h)','Informática Profissionalizante — Colégio Nippo (160h)','Inglês — Nível B1/B2'];
        return `<div class="section-title">Formação &amp; certificações</div><div class="tag-grid dashed">${items.map(i=>`<span>${i}</span>`).join('')}</div>`;
      },
      contato(){
        return `
          <div class="section-title">Vamos conversar?</div>
          <p class="p">Aberto a novas oportunidades em Customer Success, CX e Gestão de Projetos. Diadema – SP · atendimento remoto ou presencial na Grande São Paulo.</p>
          <div class="contact-block">
            <a href="mailto:paulohenrique.ph12335@gmail.com">${ICONS.contato}paulohenrique.ph12335@gmail.com</a>
            <a href="tel:+5511993518961">${ICONS.contato}(11) 99351-8961</a>
            <a href="https://www.linkedin.com/in/paulo-henrique-santos-brito-801a51206" target="_blank" rel="noopener noreferrer">${ICONS.contato}LinkedIn</a>
            <a href="https://portif-rio-production.up.railway.app/" target="_blank" rel="noopener noreferrer">${ICONS.contato}Site no Railway</a>
          </div>
        `;
      }
    }
  }
];

/* ============================================================
   Helpers de gráfico / diagrama (SVG puro, sem libs)
   ============================================================ */
function chart(seriesA, seriesB, labels){
  const w=560,h=170,pad=28,n=seriesA.length,vals=seriesB?seriesA.concat(seriesB):seriesA;
  const max=Math.max(...vals)*1.15;
  const gap=(w-pad*2)/n, bw=gap*0.5;
  let bars='';
  for(let i=0;i<n;i++){
    const x=pad+i*gap+gap*0.25;
    const hA=(seriesA[i]/max)*(h-pad*2);
    bars+=`<rect x="${x}" y="${h-pad-hA}" width="${bw*(seriesB?0.55:1)}" height="${hA}" rx="2" fill="#ff6a45" opacity="0.85"/>`;
    if(seriesB){
      const hB=(seriesB[i]/max)*(h-pad*2);
      bars+=`<rect x="${x+bw*0.6}" y="${h-pad-hB}" width="${bw*0.4}" height="${hB}" rx="2" fill="#3fd0af" opacity="0.85"/>`;
    }
  }
  let lbl='';
  for(let i=0;i<n;i++){
    const x=pad+i*gap+gap*0.3;
    lbl+=`<text x="${x}" y="${h-6}" font-family="IBM Plex Mono" font-size="9" fill="#6b6f79">${labels[i]}</text>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><line x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}" stroke="rgba(255,255,255,.07)" stroke-width="1"/>${bars}${lbl}</svg>`;
}

function archDiagram(){
  return `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">
    <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#6b6f79"/></marker></defs>
    <line x1="150" y1="150" x2="320" y2="80" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#arrow)"/>
    <line x1="320" y1="80" x2="150" y2="150" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#arrow)"/>
    <line x1="320" y1="220" x2="150" y2="150" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#arrow)"/>
    <line x1="150" y1="150" x2="320" y2="220" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#arrow)"/>
    <line x1="490" y1="150" x2="320" y2="80" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#arrow)"/>
    <line x1="320" y1="80" x2="490" y2="150" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#arrow)"/>
    <line x1="490" y1="150" x2="320" y2="220" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#arrow)"/>
    <line x1="320" y1="220" x2="490" y2="150" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#arrow)"/>
    <text x="320" y="150" text-anchor="middle" font-family="IBM Plex Mono" font-size="9.5" fill="#6b6f79">sincronização entre estações</text>
    <rect x="70" y="122" width="160" height="56" rx="10" fill="#2b3140" stroke="rgba(255,106,69,.42)" stroke-width="1.2"/>
    <text x="150" y="146" text-anchor="middle" font-family="Fraunces" font-size="13" font-weight="600" fill="#f5f3ec">Matriz</text>
    <text x="150" y="163" text-anchor="middle" font-family="IBM Plex Mono" font-size="9.5" fill="#6b6f79">servidor · banco central</text>
    <rect x="250" y="52" width="140" height="52" rx="10" fill="#222735" stroke="rgba(255,255,255,.15)" stroke-width="1.2"/>
    <text x="320" y="74" text-anchor="middle" font-family="Fraunces" font-size="12.5" font-weight="600" fill="#f5f3ec">CEO</text>
    <text x="320" y="90" text-anchor="middle" font-family="IBM Plex Mono" font-size="9" fill="#6b6f79">dashboard · leitura</text>
    <rect x="250" y="194" width="140" height="52" rx="10" fill="#222735" stroke="rgba(255,255,255,.15)" stroke-width="1.2"/>
    <text x="320" y="216" text-anchor="middle" font-family="Fraunces" font-size="12.5" font-weight="600" fill="#f5f3ec">Usuário A</text>
    <text x="320" y="232" text-anchor="middle" font-family="IBM Plex Mono" font-size="9" fill="#6b6f79">prospecção · disparo</text>
    <rect x="420" y="122" width="150" height="56" rx="10" fill="#222735" stroke="rgba(255,255,255,.15)" stroke-width="1.2"/>
    <text x="495" y="146" text-anchor="middle" font-family="Fraunces" font-size="12.5" font-weight="600" fill="#f5f3ec">Usuário B · C</text>
    <text x="495" y="163" text-anchor="middle" font-family="IBM Plex Mono" font-size="9" fill="#6b6f79">estações adicionais</text>
  </svg>`;
}

/* ============================================================
   ROUTER
   ============================================================ */
const views = { home: byId('view-home'), projects: byId('view-projects'), workspace: byId('view-workspace') };
function byId(id){ return document.getElementById(id); }

function navigate(view, opts){
  Object.values(views).forEach(v=>v.classList.remove('active'));
  views[view].classList.add('active');
  if(view==='workspace' && opts && opts.projectId) openWorkspace(opts.projectId);
}
document.addEventListener('click', e=>{
  const t = e.target.closest('[data-nav]');
  if(t){ navigate(t.dataset.nav); }
});

/* ============================================================
   PROJECTS LIST
   ============================================================ */
function projectThumb(){
  return `<svg viewBox="0 0 210 126"><rect width="210" height="126" fill="#222735"/>
    <circle cx="44" cy="86" r="2" fill="#ff6a45"/><circle cx="114" cy="44" r="2" fill="#3fd0af"/><circle cx="168" cy="82" r="2" fill="#ff6a45"/>
    <line x1="44" y1="86" x2="114" y2="44" stroke="#3a4658" stroke-opacity=".5" stroke-width="1"/>
    <line x1="114" y1="44" x2="168" y2="82" stroke="#3a4658" stroke-opacity=".5" stroke-width="1"/>
    <rect x="28" y="18" width="52" height="18" rx="4" fill="none" stroke="#3a4658"/>
    <rect x="132" y="88" width="52" height="18" rx="4" fill="none" stroke="#3a4658"/>
    <rect x="82" y="58" width="46" height="18" rx="4" fill="none" stroke="#ff6a45" stroke-opacity=".6"/>
  </svg>`;
}

function renderProjects(){
  const list = byId('projectsList');
  list.innerHTML = PROJECTS.map(p=>`
    <div class="project-row" data-project="${p.id}">
      <div class="project-thumb">${projectThumb()}</div>
      <div class="project-meta">
        <span class="p-tag">${p.tag}</span><h3>${p.name}</h3><p>${p.summary}</p>
        <div class="project-stack">${p.stack.map(s=>`<span>${s}</span>`).join('')}</div>
      </div>
      <div class="row-arrow">Abrir Workspace
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
    </div>`).join('');
  list.querySelectorAll('.project-row[data-project]').forEach(row=>{
    row.addEventListener('click', ()=> navigate('workspace', {projectId: row.dataset.project}));
  });
}
renderProjects();

/* ============================================================
   WORKSPACE / WINDOW MANAGER
   ============================================================ */
let currentProject = null;
let zTop = 10;
const openWindows = new Map();

function openWorkspace(projectId){
  const project = PROJECTS.find(p=>p.id===projectId) || PROJECTS[0];
  currentProject = project;
  byId('wsProjectTitle').textContent = project.name;

  openWindows.clear();
  byId('wsCanvas').querySelectorAll('.win').forEach(w=>w.remove());
  byId('wsTaskbar').innerHTML = '';
  byId('wsTaskbar').classList.remove('has-items');
  updateEmptyState();
  updateOpenCount();

  const dock = byId('wsDock');
  dock.innerHTML = project.windows.map(m=>`
    <button class="dock-btn" data-module="${m.id}" aria-label="${m.title}">
      ${ICONS[m.icon]}<span class="tip">${m.title}</span>
    </button>`).join('');
  dock.querySelectorAll('.dock-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> toggleWindow(btn.dataset.module));
  });

  (project.defaultOpen || []).forEach((id,i)=> openWindow(id, i));
}

function moduleDef(id){ return currentProject.windows.find(m=>m.id===id); }

function updateEmptyState(){ byId('wsEmpty').style.display = openWindows.size ? 'none' : 'flex'; }
function updateOpenCount(){
  const n = openWindows.size;
  byId('wsOpenCount').textContent = n===0 ? '0 janelas abertas' : n===1 ? '1 janela aberta' : n+' janelas abertas';
}
function refreshDockState(){
  document.querySelectorAll('.dock-btn').forEach(b=> b.classList.toggle('is-open', openWindows.has(b.dataset.module)));
}

function toggleWindow(id){
  if(openWindows.has(id)){
    const w = openWindows.get(id);
    if(w.minimized){ restoreWindow(id); } else { focusWindow(id); }
  } else {
    openWindow(id);
  }
}

function openWindow(id, cascadeIndex){
  if(openWindows.has(id)) { restoreWindow(id); focusWindow(id); return; }
  const def = moduleDef(id);
  if(!def) return;
  const canvas = byId('wsCanvas');
  const isMobile = window.innerWidth <= 860;
  const idx = cascadeIndex!=null ? cascadeIndex : openWindows.size;
  const w = document.createElement('div');
  w.className = 'win';
  w.style.width = '560px';
  w.style.height = '460px';
  const baseX = 30 + (idx%4)*30;
  const baseY = 20 + (idx%4)*26;
  w.style.transform = `translate(${baseX}px, ${baseY}px)`;
  w.dataset.x = baseX; w.dataset.y = baseY; w.dataset.id = id;

  const renderer = currentProject.content[id];
  w.innerHTML = `
    <div class="win-header">
      <div class="win-header-left">${ICONS[def.icon]}${def.live?'<span class="live"></span>':''}<span>${def.title}</span></div>
      <div class="win-header-right">
        <button class="win-btn min" aria-label="Minimizar"><svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
        <button class="win-btn close" aria-label="Fechar"><svg viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
      </div>
    </div>
    <div class="win-body">${renderer ? renderer() : '<p class="p">Conteúdo em breve.</p>'}</div>
  `;
  canvas.appendChild(w);
  openWindows.set(id, {el:w, minimized:false});

  w.querySelector('.win-btn.close').addEventListener('click', e=>{ e.stopPropagation(); closeWindow(id); });
  w.querySelector('.win-btn.min').addEventListener('click', e=>{ e.stopPropagation(); minimizeWindow(id); });
  w.addEventListener('pointerdown', ()=> focusWindow(id));
  if(!isMobile) makeDraggable(w, w.querySelector('.win-header'));

  focusWindow(id);
  updateEmptyState();
  updateOpenCount();
  refreshDockState();
}

function closeWindow(id){
  const w = openWindows.get(id);
  if(!w) return;
  w.el.classList.add('closing');
  setTimeout(()=>{ w.el.remove(); }, 220);
  openWindows.delete(id);
  removeTaskChip(id);
  updateEmptyState();
  updateOpenCount();
  refreshDockState();
}

function minimizeWindow(id){
  const w = openWindows.get(id);
  if(!w || w.minimized) return;
  w.minimized = true;
  w.el.classList.add('minimizing');
  setTimeout(()=>{ w.el.style.display='none'; w.el.classList.remove('minimizing'); }, 300);
  addTaskChip(id);
  updateEmptyState();
}

function restoreWindow(id){
  const w = openWindows.get(id);
  if(!w) return;
  w.minimized = false;
  w.el.style.display = 'flex';
  removeTaskChip(id);
  focusWindow(id);
  updateEmptyState();
}

function focusWindow(id){
  const w = openWindows.get(id);
  if(!w) return;
  document.querySelectorAll('.win').forEach(el=>el.classList.remove('focused'));
  zTop += 1;
  w.el.style.zIndex = zTop;
  w.el.classList.add('focused');
}

function addTaskChip(id){
  const def = moduleDef(id);
  const bar = byId('wsTaskbar');
  if(bar.querySelector(`[data-chip="${id}"]`)) return;
  const chip = document.createElement('button');
  chip.className = 'task-chip';
  chip.dataset.chip = id;
  chip.innerHTML = `<span class="dot"></span>${def.title}`;
  chip.addEventListener('click', ()=> restoreWindow(id));
  bar.appendChild(chip);
  bar.classList.add('has-items');
}
function removeTaskChip(id){
  const bar = byId('wsTaskbar');
  const chip = bar.querySelector(`[data-chip="${id}"]`);
  if(chip) chip.remove();
  if(!bar.children.length) bar.classList.remove('has-items');
}

function makeDraggable(win, handle){
  let dragging=false, sx=0, sy=0, ox=0, oy=0;
  handle.addEventListener('pointerdown', e=>{
    if(e.target.closest('.win-btn')) return;
    dragging = true;
    sx = e.clientX; sy = e.clientY;
    ox = parseFloat(win.dataset.x)||0; oy = parseFloat(win.dataset.y)||0;
    handle.setPointerCapture(e.pointerId);
  });
  handle.addEventListener('pointermove', e=>{
    if(!dragging) return;
    const canvas = byId('wsCanvas').getBoundingClientRect();
    let nx = ox + (e.clientX - sx);
    let ny = oy + (e.clientY - sy);
    nx = Math.max(-200, Math.min(canvas.width - 80, nx));
    ny = Math.max(0, Math.min(canvas.height - 40, ny));
    win.style.transform = `translate(${nx}px, ${ny}px)`;
    win.dataset.x = nx; win.dataset.y = ny;
  });
  handle.addEventListener('pointerup', e=>{ dragging=false; try{handle.releasePointerCapture(e.pointerId);}catch(_){} });
  handle.addEventListener('pointercancel', ()=> dragging=false);
}

document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){
    const focused = document.querySelector('.win.focused');
    if(focused) closeWindow(focused.dataset.id);
  }
});

/* ============================================================
   RELÓGIO
   ============================================================ */
function pad(n){ return String(n).padStart(2,'0'); }
function tickClock(){
  const d = new Date();
  const t = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  const clockEl = byId('wsClock'); if(clockEl) clockEl.textContent = t;
  const statusEl = byId('statusLine'); if(statusEl) statusEl.textContent = `SISTEMA ONLINE · Diadema, SP · ${t.slice(0,5)}`;
}
tickClock(); setInterval(tickClock, 1000);

/* ============================================================
   REDE AMBIENTE NA HOME
   ============================================================ */
(function ambient(){
  const canvas = byId('homeCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W,H,pts=[];
  function size(){ W = canvas.width = canvas.offsetWidth * devicePixelRatio; H = canvas.height = canvas.offsetHeight * devicePixelRatio; }
  function init(){
    size();
    const n = Math.min(42, Math.floor((canvas.offsetWidth*canvas.offsetHeight)/28000));
    pts = Array.from({length:n},()=>({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-0.5)*0.16*devicePixelRatio, vy:(Math.random()-0.5)*0.16*devicePixelRatio
    }));
  }
  function frame(){
    ctx.clearRect(0,0,W,H);
    for(const p of pts){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;
      if(p.y<0||p.y>H)p.vy*=-1;
    }
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const a=pts[i],b=pts[j];
        const d = Math.hypot(a.x-b.x,a.y-b.y);
        const maxD = 160*devicePixelRatio;
        if(d<maxD){
          ctx.strokeStyle = `rgba(255,106,69,${(1-d/maxD)*0.12})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    for(const p of pts){
      ctx.beginPath(); ctx.arc(p.x,p.y,1.6*devicePixelRatio,0,Math.PI*2);
      ctx.fillStyle='rgba(255,106,69,0.5)'; ctx.fill();
    }
    if(!reduced) requestAnimationFrame(frame);
  }
  window.addEventListener('resize', init);
  init();
  if(reduced){ frame(); } else { requestAnimationFrame(frame); }
})();

})();

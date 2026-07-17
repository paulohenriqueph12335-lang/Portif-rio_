(function(){
"use strict";

/* ============================================================
   Ícones dos módulos do Workspace Traduzzo
   ============================================================ */
const ICONS = {
  dashboard:'<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="12" width="4" height="9" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="10" y="7" width="4" height="14" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="17" y="3" width="4" height="18" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>',
  arquitetura:'<svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="6" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="6" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="18" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 7.5L15 16M16 7.5L9 16M8.5 6H15.5" stroke="currentColor" stroke-width="1.3"/></svg>',
  fluxo:'<svg viewBox="0 0 24 24" fill="none"><path d="M3 6h6a3 3 0 013 3v6a3 3 0 003 3h6" stroke="currentColor" stroke-width="1.5"/><path d="M17 15l4 3-4 3M7 3L3 6l4 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  ia:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l1.8 5.6L19 9l-5.2 1.4L12 16l-1.8-5.6L5 9l5.2-1.4L12 2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M19 15l.9 2.6L22 18.5l-2.1.9L19 22l-.9-2.6-2.1-.9 2.1-.9L19 15z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>',
  docs:'<svg viewBox="0 0 24 24" fill="none"><path d="M6 2h9l5 5v15H6z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M15 2v5h5M9 12h6M9 16h6M9 8h2" stroke="currentColor" stroke-width="1.3"/></svg>',
  resultados:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.6 6.9 7.4.4-5.7 4.8 1.9 7.2L12 17.3 5.8 21.3l1.9-7.2L2 9.3l7.4-.4z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>'
};

/* ============================================================
   Módulos do case Traduzzo (mesmo conteúdo real do case card:
   escala 20→10.000+ e-mails/dia, +10% conversão, −16% custos)
   ============================================================ */
const MODULES = [
  {id:'dashboard', title:'Dashboard', icon:'dashboard', live:true},
  {id:'arquitetura', title:'Arquitetura', icon:'arquitetura', live:false},
  {id:'fluxo', title:'Fluxo de Prospecção', icon:'fluxo', live:false},
  {id:'ia', title:'IA · Classificador', icon:'ia', live:true},
  {id:'docs', title:'Documentação', icon:'docs', live:false},
  {id:'resultados', title:'Resultados', icon:'resultados', live:false},
];
const DEFAULT_OPEN = ['dashboard','resultados'];

const RENDER = {
  dashboard(){
    return `
      <div class="tw-section-title">Visão geral</div>
      <div class="tw-kpi-grid">
        <div class="tw-kpi-card"><div class="tw-label">Escala de envio</div><div class="tw-value tw-signal">20 → 10.000+</div><div class="tw-sub">e-mails por dia</div></div>
        <div class="tw-kpi-card"><div class="tw-label">Conversão de leads</div><div class="tw-value tw-teal">+10%</div><div class="tw-sub">após estruturação do CRM</div></div>
        <div class="tw-kpi-card"><div class="tw-label">Custos operacionais</div><div class="tw-value">−16%</div><div class="tw-sub">com automação de processos</div></div>
        <div class="tw-kpi-card"><div class="tw-label">Papel</div><div class="tw-value" style="font-size:14px">Liderança de desenvolvimento</div><div class="tw-sub">primeiro CRM de prospecção da empresa</div></div>
      </div>
      <div class="tw-section-title">Evolução do volume diário</div>
      <div class="tw-chart-box">
        <div class="tw-chart-legend"><span><i style="background:#ff5a36"></i>E-mails/dia (ilustrativo)</span></div>
        ${chart([20,350,2200,6100,10400],['M1','M2','M3','M4','M5'])}
      </div>`;
  },
  arquitetura(){
    return `
      <div class="tw-section-title">Topologia multi-perfil</div>
      <div class="tw-diagram-box">${archDiagram()}</div>
      <p class="tw-p">O CRM roda em três perfis sobre a mesma base: <b>CEO</b> (dashboard e KPIs consolidados), <b>Matriz</b> (servidor central e banco de dados) e <b>Usuário</b> (estação de prospecção e disparo). Liderei a definição desse desenho para permitir operação distribuída sem perder controle central.</p>
      <div class="tw-section-title">Decisões que sustentam a escala</div>
      <ul class="tw-node-list">
        <li><span class="tw-n-badge">01</span><div class="tw-n-text"><b>Sincronização entre estações</b><span>Cada operador prospecta sem depender de conexão constante com a matriz.</span></div></li>
        <li><span class="tw-n-badge">02</span><div class="tw-n-text"><b>Controle de limite de envio</b><span>Fila com janela de disparo protege a reputação do domínio de e-mail.</span></div></li>
        <li><span class="tw-n-badge">03</span><div class="tw-n-text"><b>Visão executiva centralizada</b><span>O perfil CEO acompanha a operação de todas as estações em um único painel.</span></div></li>
      </ul>`;
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
    return `<div class="tw-section-title">Do lead à negociação</div><div class="tw-flow-row">${steps.map((s,i)=>`<div class="tw-flow-step"><div class="tw-flow-num">${String(i+1).padStart(2,'0')}</div><div class="tw-flow-text"><b>${s[0]}</b><span>${s[1]}</span></div></div>`).join('')}</div>`;
  },
  ia(){
    return `
      <div class="tw-section-title">Categorias de resposta</div>
      <div class="tw-badge-row">
        <span class="tw-badge tw-green">INTERESSE</span>
        <span class="tw-badge tw-rose">NEGATIVO</span>
        <span class="tw-badge tw-signal">AUTO_REPLY</span>
        <span class="tw-badge tw-gray">BOUNCE</span>
        <span class="tw-badge tw-rose">SPAM_REPORT</span>
        <span class="tw-badge tw-teal">INDEFINIDO</span>
      </div>
      <div class="tw-section-title">Cascata de classificação</div>
      <div class="tw-cascade">
        <span class="tw-stage">Modelo local</span><span class="tw-arrow">→</span>
        <span class="tw-stage">Modelo em nuvem</span><span class="tw-arrow">→</span>
        <span class="tw-stage">Palavras-chave (fallback)</span>
      </div>
      <p class="tw-p">A IA classifica automaticamente cada resposta recebida e apoia a estratégia de negociação — reduzindo o tempo gasto em triagem manual de caixa de entrada e priorizando quem demonstrou interesse real.</p>`;
  },
  docs(){
    return `
      <div class="tw-section-title">Estrutura de uso por perfil</div>
      <div class="tw-doc-card"><h4>👑 CEO / Executivo</h4><ul><li>Dashboard com KPIs consolidados</li><li>Visão geral da operação de todas as estações</li></ul></div>
      <div class="tw-doc-card"><h4>🏢 Matriz / Servidor</h4><ul><li>Banco de dados central</li><li>Orquestra a sincronização entre estações</li></ul></div>
      <div class="tw-doc-card"><h4>👤 Usuário / Estação</h4><ul><li>Prospecção e disparo de e-mails</li><li>Conecta-se automaticamente ao servidor</li></ul></div>`;
  },
  resultados(){
    const items=[
      ['Escala de 20 para +10.000 e-mails/dia','Estrutura de fila e disparo controlado permitiu crescer a operação sem perder entregabilidade.'],
      ['+10% na taxa de conversão de leads','Ganho após a estruturação do CRM e da triagem de respostas por IA.'],
      ['−16% nos custos operacionais','Automação de processos reduziu trabalho manual repetitivo na prospecção.'],
    ];
    return `<div class="tw-section-title">Resultados do case</div>${items.map(i=>`<div class="tw-result-item"><div class="tw-result-check"><svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div><b>${i[0]}</b><span>${i[1]}</span></div></div>`).join('')}`;
  }
};

function chart(values, labels){
  const w=560,h=170,pad=28,n=values.length,max=Math.max(...values)*1.15;
  const gap=(w-pad*2)/n, bw=gap*0.5;
  let bars='';
  for(let i=0;i<n;i++){
    const x=pad+i*gap+gap*0.25;
    const hh=(values[i]/max)*(h-pad*2);
    bars+=`<rect x="${x}" y="${h-pad-hh}" width="${bw}" height="${hh}" rx="2" fill="#ff5a36" opacity="0.85"/>`;
  }
  let lbl='';
  for(let i=0;i<n;i++){
    const x=pad+i*gap+gap*0.3;
    lbl+=`<text x="${x}" y="${h-6}" font-family="IBM Plex Mono" font-size="9" fill="#6b6f79">${labels[i]}</text>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><line x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}" stroke="rgba(255,255,255,.08)" stroke-width="1"/>${bars}${lbl}</svg>`;
}

function archDiagram(){
  return `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">
    <defs><marker id="twArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#6b6f79"/></marker></defs>
    <line x1="150" y1="150" x2="320" y2="80" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#twArrow)"/>
    <line x1="320" y1="80" x2="150" y2="150" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#twArrow)"/>
    <line x1="320" y1="220" x2="150" y2="150" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#twArrow)"/>
    <line x1="150" y1="150" x2="320" y2="220" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#twArrow)"/>
    <line x1="490" y1="150" x2="320" y2="80" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#twArrow)"/>
    <line x1="320" y1="80" x2="490" y2="150" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#twArrow)"/>
    <line x1="490" y1="150" x2="320" y2="220" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#twArrow)"/>
    <line x1="320" y1="220" x2="490" y2="150" stroke="#6b6f79" stroke-width="1.2" marker-end="url(#twArrow)"/>
    <text x="320" y="150" text-anchor="middle" font-family="IBM Plex Mono" font-size="9.5" fill="#6b6f79">sincronização entre estações</text>
    <rect x="70" y="122" width="160" height="56" rx="10" fill="#222735" stroke="rgba(255,90,54,.45)" stroke-width="1.2"/>
    <text x="150" y="146" text-anchor="middle" font-family="Fraunces" font-size="13" font-weight="600" fill="#f5f3ec">Matriz</text>
    <text x="150" y="163" text-anchor="middle" font-family="IBM Plex Mono" font-size="9.5" fill="#6b6f79">servidor · banco central</text>
    <rect x="250" y="52" width="140" height="52" rx="10" fill="#1b1f29" stroke="rgba(255,255,255,.16)" stroke-width="1.2"/>
    <text x="320" y="74" text-anchor="middle" font-family="Fraunces" font-size="12.5" font-weight="600" fill="#f5f3ec">CEO</text>
    <text x="320" y="90" text-anchor="middle" font-family="IBM Plex Mono" font-size="9" fill="#6b6f79">dashboard · leitura</text>
    <rect x="250" y="194" width="140" height="52" rx="10" fill="#1b1f29" stroke="rgba(255,255,255,.16)" stroke-width="1.2"/>
    <text x="320" y="216" text-anchor="middle" font-family="Fraunces" font-size="12.5" font-weight="600" fill="#f5f3ec">Usuário A</text>
    <text x="320" y="232" text-anchor="middle" font-family="IBM Plex Mono" font-size="9" fill="#6b6f79">prospecção · disparo</text>
    <rect x="420" y="122" width="150" height="56" rx="10" fill="#1b1f29" stroke="rgba(255,255,255,.16)" stroke-width="1.2"/>
    <text x="495" y="146" text-anchor="middle" font-family="Fraunces" font-size="12.5" font-weight="600" fill="#f5f3ec">Usuário B · C</text>
    <text x="495" y="163" text-anchor="middle" font-family="IBM Plex Mono" font-size="9" fill="#6b6f79">estações adicionais</text>
  </svg>`;
}

/* ============================================================
   Motor de janelas (escopo isolado ao overlay #twOverlay)
   ============================================================ */
function byId(id){ return document.getElementById(id); }

const overlay = byId('twOverlay');
if (overlay) {
  const openBtn = byId('openTraduzzoWorkspace');
  const closeBtn = byId('twClose');
  const dock = byId('twDock');
  const canvas = byId('twCanvas');
  const empty = byId('twEmpty');
  const taskbar = byId('twTaskbar');
  const openCountEl = byId('twOpenCount');

  let zTop = 10;
  const openWindows = new Map();
  let built = false;

  function openWorkspace(){
    overlay.hidden = false;
    requestAnimationFrame(()=> overlay.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    if(!built){ buildDock(); DEFAULT_OPEN.forEach((id,i)=> openWindow(id,i)); built = true; }
  }
  function closeWorkspace(){
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(()=>{ overlay.hidden = true; }, 300);
  }

  if (openBtn) openBtn.addEventListener('click', openWorkspace);
  if (closeBtn) closeBtn.addEventListener('click', closeWorkspace);
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape' && !overlay.hidden) closeWorkspace();
  });

  function buildDock(){
    dock.innerHTML = MODULES.map(m=>`
      <button class="tw-dock-btn" data-module="${m.id}" aria-label="${m.title}">
        ${ICONS[m.icon]}<span class="tw-tip">${m.title}</span>
      </button>`).join('');
    dock.querySelectorAll('.tw-dock-btn').forEach(btn=>{
      btn.addEventListener('click', ()=> toggleWindow(btn.dataset.module));
    });
  }

  function moduleDef(id){ return MODULES.find(m=>m.id===id); }
  function updateEmpty(){ empty.style.display = openWindows.size ? 'none' : 'flex'; }
  function updateCount(){
    const n = openWindows.size;
    openCountEl.textContent = n===0 ? '0 janelas abertas' : n===1 ? '1 janela aberta' : n+' janelas abertas';
  }
  function refreshDock(){
    dock.querySelectorAll('.tw-dock-btn').forEach(b=> b.classList.toggle('is-open', openWindows.has(b.dataset.module)));
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
    if(openWindows.has(id)){ restoreWindow(id); focusWindow(id); return; }
    const def = moduleDef(id);
    if(!def) return;
    const isMobile = window.innerWidth <= 860;
    const idx = cascadeIndex != null ? cascadeIndex : openWindows.size;
    const w = document.createElement('div');
    w.className = 'tw-win';
    w.style.width = '560px';
    w.style.height = '440px';
    const baseX = 30 + (idx % 4) * 30;
    const baseY = 20 + (idx % 4) * 26;
    w.style.transform = `translate(${baseX}px, ${baseY}px)`;
    w.dataset.x = baseX; w.dataset.y = baseY; w.dataset.id = id;

    w.innerHTML = `
      <div class="tw-win-header">
        <div class="tw-win-header-left">${ICONS[def.icon]}${def.live ? '<span class="tw-live"></span>' : ''}<span>${def.title}</span></div>
        <div class="tw-win-header-right">
          <button class="tw-win-btn tw-min-win" aria-label="Minimizar"><svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
          <button class="tw-win-btn tw-close-win" aria-label="Fechar"><svg viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
        </div>
      </div>
      <div class="tw-win-body">${RENDER[id] ? RENDER[id]() : '<p class="tw-p">Conteúdo em breve.</p>'}</div>
    `;
    canvas.appendChild(w);
    openWindows.set(id, {el:w, minimized:false});

    w.querySelector('.tw-close-win').addEventListener('click', e=>{ e.stopPropagation(); closeWindow(id); });
    w.querySelector('.tw-min-win').addEventListener('click', e=>{ e.stopPropagation(); minimizeWindow(id); });
    w.addEventListener('pointerdown', ()=> focusWindow(id));
    if(!isMobile) makeDraggable(w, w.querySelector('.tw-win-header'));

    focusWindow(id);
    updateEmpty(); updateCount(); refreshDock();
  }

  function closeWindow(id){
    const w = openWindows.get(id);
    if(!w) return;
    w.el.classList.add('closing');
    setTimeout(()=> w.el.remove(), 200);
    openWindows.delete(id);
    removeChip(id);
    updateEmpty(); updateCount(); refreshDock();
  }

  function minimizeWindow(id){
    const w = openWindows.get(id);
    if(!w || w.minimized) return;
    w.minimized = true;
    w.el.classList.add('minimizing');
    setTimeout(()=>{ w.el.style.display='none'; w.el.classList.remove('minimizing'); }, 300);
    addChip(id);
    updateEmpty();
  }

  function restoreWindow(id){
    const w = openWindows.get(id);
    if(!w) return;
    w.minimized = false;
    w.el.style.display = 'flex';
    removeChip(id);
    focusWindow(id);
    updateEmpty();
  }

  function focusWindow(id){
    const w = openWindows.get(id);
    if(!w) return;
    canvas.querySelectorAll('.tw-win').forEach(el=> el.classList.remove('focused'));
    zTop += 1;
    w.el.style.zIndex = zTop;
    w.el.classList.add('focused');
  }

  function addChip(id){
    const def = moduleDef(id);
    if(taskbar.querySelector(`[data-chip="${id}"]`)) return;
    const chip = document.createElement('button');
    chip.className = 'tw-chip';
    chip.dataset.chip = id;
    chip.innerHTML = `<span class="tw-chip-dot"></span>${def.title}`;
    chip.addEventListener('click', ()=> restoreWindow(id));
    taskbar.appendChild(chip);
    taskbar.classList.add('has-items');
  }
  function removeChip(id){
    const chip = taskbar.querySelector(`[data-chip="${id}"]`);
    if(chip) chip.remove();
    if(!taskbar.children.length) taskbar.classList.remove('has-items');
  }

  function makeDraggable(win, handle){
    let dragging=false, sx=0, sy=0, ox=0, oy=0;
    handle.addEventListener('pointerdown', e=>{
      if(e.target.closest('.tw-win-btn')) return;
      dragging = true;
      sx = e.clientX; sy = e.clientY;
      ox = parseFloat(win.dataset.x)||0; oy = parseFloat(win.dataset.y)||0;
      handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener('pointermove', e=>{
      if(!dragging) return;
      const rect = canvas.getBoundingClientRect();
      let nx = ox + (e.clientX - sx);
      let ny = oy + (e.clientY - sy);
      nx = Math.max(-200, Math.min(rect.width - 80, nx));
      ny = Math.max(0, Math.min(rect.height - 40, ny));
      win.style.transform = `translate(${nx}px, ${ny}px)`;
      win.dataset.x = nx; win.dataset.y = ny;
    });
    handle.addEventListener('pointerup', e=>{ dragging=false; try{ handle.releasePointerCapture(e.pointerId); }catch(_){} });
    handle.addEventListener('pointercancel', ()=> dragging=false);
  }
}

})();

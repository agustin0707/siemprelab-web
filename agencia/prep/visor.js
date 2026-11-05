// Visor de fotos a pantalla completa · Agencia de Viajes SiempreLab
// Lo usan la prep y la presentación. Trae sus propios estilos para no depender de ninguna hoja.
// Se abre:
//  · tocando cualquier foto de una galería (.galeria img) o de un carrusel (.carrusel-pista img)
//  · con un botón [data-visor-lugar="llave1,llave2"] (fotos de LUGARES o FOTOS_PANORAMAS)
//  · desde código: abrirVisor(fotos, indice, titulo)
// Cada foto: { src, grande, nota, credito, licencia, pagina }

(function () {
  const estilos = `
  .visor { position: fixed; inset: 0; z-index: 1000; background: rgba(12, 12, 12, 0.96); color: #fff; display: grid; grid-template-rows: auto 1fr auto auto; font-family: inherit; opacity: 0; transition: opacity .18s; }
  .visor[hidden] { display: none; }
  .visor.abierto { opacity: 1; }
  .visor-barra { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 16px; font-family: 'Space Mono', ui-monospace, monospace; font-size: 12px; color: rgba(255,255,255,.75); }
  .visor-barra strong { color: #fff; font-family: inherit; font-weight: 400; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .visor-cerrar { flex: none; width: 40px; height: 40px; border-radius: 50%; border: 0; background: rgba(255,255,255,.12); color: #fff; font-size: 24px; line-height: 1; cursor: pointer; }
  .visor-cerrar:hover, .visor-flecha:hover { background: rgba(255,255,255,.25); }
  .visor-escena { position: relative; min-height: 0; display: grid; place-items: center; padding: 0 56px; touch-action: pan-y; }
  .visor-escena img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 6px; user-select: none; -webkit-user-drag: none; transition: opacity .15s; }
  .visor-escena img.cargando { opacity: .35; }
  .visor-flecha { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; border: 0; background: rgba(255,255,255,.12); color: #fff; font-size: 26px; line-height: 1; cursor: pointer; padding-bottom: 3px; }
  .visor-flecha.izq { left: 8px; } .visor-flecha.der { right: 8px; }
  .visor-pie { padding: 10px 16px 4px; text-align: center; min-height: 52px; }
  .visor-pie p { margin: 0 0 4px; font-size: 16px; line-height: 1.35; }
  .visor-pie a { font-family: 'Space Mono', ui-monospace, monospace; font-size: 10px; color: rgba(255,255,255,.6); text-decoration: none; }
  .visor-pie a:hover { color: #fff; }
  .visor-tiras { display: flex; gap: 6px; overflow-x: auto; padding: 8px 16px 14px; scrollbar-width: none; justify-content: safe center; }
  .visor-tiras::-webkit-scrollbar { display: none; }
  .visor-tiras button { flex: 0 0 64px; height: 44px; padding: 0; border: 2px solid transparent; border-radius: 6px; overflow: hidden; background: #222; cursor: pointer; opacity: .55; transition: opacity .15s, border-color .15s; }
  .visor-tiras button[aria-current="true"] { opacity: 1; border-color: #fff; }
  .visor-tiras img { width: 100%; height: 100%; object-fit: cover; display: block; }
  @media (max-width: 600px) {
    .visor-escena { padding: 0 6px; }
    .visor-flecha { width: 36px; height: 36px; font-size: 22px; background: rgba(0,0,0,.4); }
    .visor-pie p { font-size: 14px; }
  }
  .galeria img, .carrusel-pista img { cursor: zoom-in; }
  .galeria-ampliar { position: absolute; top: 8px; right: 8px; z-index: 2; height: 28px; padding: 0 10px; border-radius: 99px; border: 0; background: rgba(0,0,0,.55); color: #fff; font-family: 'Space Mono', ui-monospace, monospace; font-size: 10px; cursor: pointer; }
  .galeria-ampliar:hover { background: rgba(0,0,0,.8); }`;
  const hoja = document.createElement('style');
  hoja.textContent = estilos;
  document.head.append(hoja);

  const visor = document.createElement('div');
  visor.className = 'visor';
  visor.hidden = true;
  visor.setAttribute('role', 'dialog');
  visor.setAttribute('aria-modal', 'true');
  visor.setAttribute('aria-label', 'Fotos');
  visor.innerHTML = `
    <div class="visor-barra"><strong data-v-titulo></strong><span data-v-n></span><button type="button" class="visor-cerrar" data-v-cerrar aria-label="Cerrar">×</button></div>
    <div class="visor-escena" data-v-escena>
      <img alt="" data-v-img>
      <button type="button" class="visor-flecha izq" data-v-paso="-1" aria-label="Foto anterior">‹</button>
      <button type="button" class="visor-flecha der" data-v-paso="1" aria-label="Foto siguiente">›</button>
    </div>
    <div class="visor-pie"><p data-v-nota></p><a target="_blank" rel="noopener" data-v-credito></a></div>
    <div class="visor-tiras" data-v-tiras></div>`;
  document.body.append(visor);

  const q = (s) => visor.querySelector(s);
  const img = q('[data-v-img]');
  let fotos = [];
  let indice = 0;
  let volverA = null; // el elemento que tenía el foco antes de abrir

  function mostrar(i) {
    indice = (i + fotos.length) % fotos.length;
    const f = fotos[indice];
    img.classList.add('cargando');
    img.onload = () => img.classList.remove('cargando');
    img.src = f.grande || f.src;
    img.alt = f.nota || q('[data-v-titulo]').textContent;
    q('[data-v-n]').textContent = `${indice + 1} / ${fotos.length}`;
    q('[data-v-nota]').textContent = f.nota || '';
    const cred = q('[data-v-credito]');
    cred.textContent = f.credito ? `foto: ${f.credito}${f.licencia ? ' · ' + f.licencia : ''}` : '';
    cred.href = f.pagina || '#';
    cred.hidden = !f.credito;
    visor.querySelectorAll('.visor-flecha').forEach((b) => { b.hidden = fotos.length < 2; });
    visor.querySelectorAll('[data-v-tiras] button').forEach((b, j) => b.setAttribute('aria-current', String(j === indice)));
    const activo = q(`[data-v-tiras] button:nth-child(${indice + 1})`);
    if (activo) activo.scrollIntoView({ block: 'nearest', inline: 'center' });
    // Precarga la siguiente para que no se vea el salto
    const sig = fotos[(indice + 1) % fotos.length];
    if (sig) new Image().src = sig.grande || sig.src;
  }

  window.abrirVisor = function (lista, i = 0, titulo = '') {
    // Sin fotos vacías ni repetidas
    fotos = (lista || []).filter((f, i, todas) => f && f.src && todas.findIndex((x) => x && x.src === f.src) === i);
    if (!fotos.length) return;
    volverA = document.activeElement;
    q('[data-v-titulo]').textContent = titulo;
    q('[data-v-tiras]').innerHTML = fotos.length > 1 ? fotos.map((f, j) =>
      `<button type="button" data-v-ir="${j}" aria-label="Foto ${j + 1}"><img src="${f.src}" alt="" loading="lazy"></button>`).join('') : '';
    visor.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => visor.classList.add('abierto'));
    mostrar(i);
    q('[data-v-cerrar]').focus();
  };

  function cerrar() {
    visor.classList.remove('abierto');
    visor.hidden = true;
    img.removeAttribute('src');
    document.documentElement.style.overflow = '';
    if (volverA && volverA.focus) volverA.focus();
  }

  // Fotos de una o varias llaves de LUGARES / FOTOS_PANORAMAS
  window.fotosDeLugares = function (llaves) {
    const banco = typeof FOTOS_PANORAMAS !== 'undefined' ? FOTOS_PANORAMAS : {};
    const lugares = typeof LUGARES !== 'undefined' ? LUGARES : {};
    return [].concat(llaves || []).flatMap((k) => banco[k] || (lugares[k] ? lugares[k].fotos : []));
  };

  visor.addEventListener('click', (e) => {
    if (e.target.closest('[data-v-cerrar]')) return cerrar();
    const paso = e.target.closest('[data-v-paso]');
    if (paso) return mostrar(indice + Number(paso.dataset.vPaso));
    const ir = e.target.closest('[data-v-ir]');
    if (ir) return mostrar(Number(ir.dataset.vIr));
    // Tocar el fondo (no la foto ni el texto) cierra
    if (e.target === visor || e.target === q('[data-v-escena]')) cerrar();
  });

  document.addEventListener('keydown', (e) => {
    if (visor.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); cerrar(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); mostrar(indice + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); mostrar(indice - 1); }
    else if (e.key === 'Tab') {
      // El foco no se escapa del visor
      const focos = [...visor.querySelectorAll('button:not([hidden]), a:not([hidden])')];
      const i = focos.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); focos[focos.length - 1].focus(); }
      else if (!e.shiftKey && i === focos.length - 1) { e.preventDefault(); focos[0].focus(); }
    }
  }, true);

  // Deslizar con el dedo
  let x0 = null;
  const escena = q('[data-v-escena]');
  escena.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  escena.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 45) mostrar(indice + (dx < 0 ? 1 : -1));
  });

  // Abre todas las fotos del grupo (galería o carrusel) partiendo por la tocada
  function abrirGrupo(foto) {
    if (!foto) return;
    const grupo = foto.closest('.galeria, .carrusel-pista');
    const imgs = [...grupo.querySelectorAll('img')];
    const lista = imgs.map((im) => {
      const a = im.closest('figure') && im.closest('figure').querySelector('figcaption a');
      return {
        src: im.currentSrc || im.src,
        grande: im.dataset.grande || '',
        nota: im.dataset.nota || '',
        credito: a ? a.textContent.replace(/ · .*$/, '') : '',
        licencia: im.dataset.licencia || '',
        pagina: a ? a.href : ''
      };
    });
    abrirVisor(lista, imgs.indexOf(foto), foto.dataset.titulo || foto.alt.replace(/, foto \d+$/, ''));
  }

  // Toque en una foto de galería o carrusel: abre todas las de ese grupo
  document.addEventListener('click', (e) => {
    const boton = e.target.closest('[data-visor-lugar]');
    if (boton) {
      e.preventDefault();
      const llaves = boton.dataset.visorLugar.split(',').map((s) => s.trim()).filter(Boolean);
      abrirVisor(fotosDeLugares(llaves), Number(boton.dataset.visorI || 0), boton.dataset.visorTitulo || '');
      return;
    }
    // El botón ⤢ de la galería abre en la foto que se está viendo
    const ampliar = e.target.closest('[data-ampliar]');
    if (ampliar) {
      const g = ampliar.closest('.galeria-caja').querySelector('.galeria');
      const imgs = g.querySelectorAll('img');
      abrirGrupo(imgs[Math.round(g.scrollLeft / (g.clientWidth || 1))] || imgs[0]);
      return;
    }
    const foto = e.target.closest('.galeria img, .carrusel-pista img');
    if (foto) abrirGrupo(foto);
  });
})();

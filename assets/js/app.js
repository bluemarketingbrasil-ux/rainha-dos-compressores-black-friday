(function(){
  var d=document;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Horário: aberto agora, no fuso de Goiânia */
  var H={0:null,1:[480,1080],2:[480,1080],3:[480,1080],4:[480,1080],5:[480,1080],6:[480,720]};
  function now(){
    var p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',weekday:'short',hour:'numeric',minute:'numeric',hourCycle:'h23'}).formatToParts(new Date());
    var o={}; p.forEach(function(x){o[x.type]=x.value});
    return {wd:{Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday], m:(+o.hour)*60+(+o.minute)};
  }
  function nextOpen(t){
    var names=['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
    for(var i=0;i<8;i++){ var w=(t.wd+i)%7, h=H[w]; if(!h) continue; if(i===0 && t.m>=h[0]) continue; return (i===0?'hoje':(i===1?'amanhã':names[w]))+' às 8h'; }
  }
  try{
    var t=now(), h=H[t.wd], s=d.getElementById('status'), open = h && t.m>=h[0] && t.m<h[1];
    s.classList.toggle('open',!!open);
    s.querySelector('span').textContent = open ? 'Aberto agora · fecha às '+(h[1]/60)+'h' : 'Fechado agora · abre '+nextOpen(t);
    var row=d.querySelector('#hours [data-d="'+t.wd+'"]'); if(row) row.classList.add('today');
  }catch(e){}

  /* Entradas por seção */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{rootMargin:'0px 0px -6% 0px',threshold:.08}) : null;
  d.querySelectorAll('.rv, #bars').forEach(function(el){ io ? io.observe(el) : el.classList.add('in'); });

  /* WhatsApp flutuante e barra móvel aparecem depois do topo */
  var mbar=d.getElementById('mbar'), hero=d.getElementById('hero'), fab=d.getElementById('fab');
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){ var vis=es[0].isIntersecting; mbar.classList.toggle('on', !vis); fab.classList.toggle('hide', vis); if(vis){ fab.classList.remove('open'); } },{threshold:0,rootMargin:'-120px 0px 0px 0px'}).observe(hero);
  } else { mbar.classList.add('on'); fab.classList.remove('hide'); }
  var mb=mbar.querySelector('button'), fb=fab.querySelector('button');
  mb.addEventListener('click',function(){ var o=mbar.classList.toggle('sheet-open'); mb.setAttribute('aria-expanded',o); });
  fb.addEventListener('click',function(){ var o=fab.classList.toggle('open'); fb.setAttribute('aria-expanded',o); });
  d.addEventListener('click',function(e){
    if(!fab.contains(e.target)){ fab.classList.remove('open'); fb.setAttribute('aria-expanded','false'); }
    if(!mbar.contains(e.target)){ mbar.classList.remove('sheet-open'); mb.setAttribute('aria-expanded','false'); }
  });
  d.addEventListener('keydown',function(e){ if(e.key==='Escape'){ fab.classList.remove('open'); mbar.classList.remove('sheet-open'); } });

  /* Qual compressor: troca a foto na moldura e monta a mensagem */
  var USES = {"oficina": {"label": "Oficina e funilaria", "img": "assets/img/cat-pistao.webp", "alt": "Compressor de pistão Chicago Pneumatic", "title": "Compressor de pistão de 10 a 20 PCM", "text": "Pressão de 140 a 175 psi para pistola de pintura, chave de impacto e calibragem, com reservatório de 100 a 200 litros para o motor não ficar ligando e desligando.", "list": ["Marcas como Schulz, Chiaperini, Pressure e Motomil", "Monofásico ou trifásico, conforme a energia da oficina"], "shop": "https://rainhadoscompressores.com.br/categoria-produto/compressores-pistao/?utm_source=landing&utm_medium=lp&utm_campaign=qual_compressor"}, "industria": {"label": "Indústria com uso contínuo", "img": "assets/img/cat-parafuso.webp", "alt": "Compressor de parafuso Schulz", "title": "Compressor de parafuso", "text": "Feito para trabalhar o dia inteiro, com menos consumo de energia por litro de ar. A potência (HP) e a vazão são dimensionadas pela sua linha de produção.", "list": ["Opções de 15 a 30 HP com Techto, Moufi e Schulz", "Locação disponível enquanto o investimento não sai"], "shop": "https://rainhadoscompressores.com.br/categoria-produto/compressores-parafuso/?utm_source=landing&utm_medium=lp&utm_campaign=qual_compressor"}, "agro": {"label": "Agro, obra ou local sem energia", "img": "assets/img/cat-gasolina.webp", "alt": "Compressor Pressure Agro com motor a combustão", "title": "Compressor com motor a combustão", "text": "Para fazenda, obra e lugares sem energia elétrica: motor a gasolina ou diesel, de 10 a 20 PCM, pronto para ir na caminhonete.", "list": ["Pressure, Chiaperini e Motomil", "Também vendido sem motor, para acoplar ao seu"], "shop": "https://rainhadoscompressores.com.br/categoria-produto/compressores-a-gasolina/?utm_source=landing&utm_medium=lp&utm_campaign=qual_compressor"}, "odonto": {"label": "Consultório ou laboratório", "img": "assets/img/cat-isento.webp", "alt": "Compressor isento de óleo Chiaperini", "title": "Compressor isento de óleo", "text": "Ar sem óleo para consultório odontológico, laboratório, estética e alimentos, onde o ar não pode contaminar o trabalho.", "list": ["Schulz e Chiaperini", "Peças e manutenção na nossa assistência técnica"], "shop": "https://rainhadoscompressores.com.br/categoria-produto/compressores-odontologicos/?utm_source=landing&utm_medium=lp&utm_campaign=qual_compressor"}, "lavajato": {"label": "Lava-jato e borracharia", "img": "assets/img/cat-pistao.webp", "alt": "Compressor de pistão para borracharia", "title": "Compressor de pistão de 15 a 20 PCM", "text": "Para calibrar pneus, limpar e usar ferramentas pneumáticas o dia todo, com reservatório de 150 a 250 litros.", "list": ["Também temos lavadoras de alta pressão Jacto e Wayne", "Peças e manutenção no mesmo lugar"], "shop": "https://rainhadoscompressores.com.br/categoria-produto/compressores-pistao/?utm_source=landing&utm_medium=lp&utm_campaign=qual_compressor"}, "casa": {"label": "Casa, hobby e marcenaria", "img": "assets/img/cat-moto.webp", "alt": "Motocompressor Tekna", "title": "Motocompressor de 8 a 10 PCM", "text": "Leve e fácil de levar para pintura pequena, encher pneus, marcenaria e ferramentas de uso leve. Liga na tomada.", "list": ["A partir de cerca de R$ 600 na loja online", "Kits com mangueira e acessórios"], "shop": "https://rainhadoscompressores.com.br/categoria-produto/motocompressor/?utm_source=landing&utm_medium=lp&utm_campaign=qual_compressor"}};
  var WA = {vendas:'5562998577057', aluguel:'5562998577057'}; /* Black Friday: um único WhatsApp */
  var CHECK='<svg aria-hidden="true"><use href="#check"/></svg>';
  var img=d.getElementById('r-img'), forEl=d.getElementById('r-for'), title=d.getElementById('r-title'), text=d.getElementById('r-text'), list=d.getElementById('r-list'), wa=d.getElementById('r-wa'), wal=d.getElementById('r-wa-label'), shop=d.getElementById('r-shop'), who=d.getElementById('r-who');
  Object.keys(USES).forEach(function(k){ var i=new Image(); i.src=USES[k].img; });
  function render(first){
    var key=(d.querySelector('input[name=uso]:checked')||{}).value||'oficina', u=USES[key];
    var mode=(d.querySelector('input[name=mode]:checked')||{}).value||'comprar';
    if(img.getAttribute('src')!==u.img && !first){
      img.classList.add('swap');
      setTimeout(function(){ img.src=u.img; img.alt=u.alt; requestAnimationFrame(function(){ img.classList.remove('swap'); }); }, reduce?0:220);
    } else { img.src=u.img; img.alt=u.alt; }
    forEl.textContent='Indicado para '+u.label.charAt(0).toLowerCase()+u.label.slice(1);
    title.textContent=u.title; text.textContent=u.text;
    list.innerHTML=''; u.list.forEach(function(x){ var li=d.createElement('li'); li.innerHTML=CHECK; li.appendChild(d.createTextNode(x)); list.appendChild(li); });
    var msg = mode==='alugar'
      ? 'Olá! Vim pelo site na Black Friday e quero ALUGAR um compressor para '+u.label.toLowerCase()+'. Pelo que vi, seria '+u.title.toLowerCase()+'. Podem me passar valores e disponibilidade?'
      : 'Olá! Vim pelo site na Black Friday e preciso de um compressor para '+u.label.toLowerCase()+'. Pelo que vi, seria '+u.title.toLowerCase()+'. Pode me ajudar a escolher o modelo certo?';
    wa.href='https://wa.me/'+(mode==='alugar'?WA.aluguel:WA.vendas)+'?text='+encodeURIComponent(msg);
    wa.dataset.ev = mode==='alugar' ? 'whatsapp_aluguel' : 'whatsapp_vendas';
    wal.textContent = mode==='alugar' ? 'Consultar locação no WhatsApp' : 'Pedir indicação no WhatsApp';
    who.textContent = 'Atendimento no WhatsApp: (62) 99857-7057';
    shop.style.display = mode==='alugar' ? 'none':'';
  }
  d.querySelectorAll('input[name=uso],input[name=mode]').forEach(function(i){ i.addEventListener('change',function(){
    render(false);
    if(i.name==='uso' && window.innerWidth<=980){
      var r=d.querySelector('.seg')||d.querySelector('.result'); if(!r) return; var top=r.getBoundingClientRect().top;
      if(top>window.innerHeight*0.55){ var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches; window.scrollTo({top:window.scrollY+top-84,behavior:rm?'auto':'smooth'}); }
    }
  }); });
  render(true);

  /* FAQ: uma pergunta aberta por vez */
  d.querySelectorAll('.acc details').forEach(function(x){ x.addEventListener('toggle',function(){ if(x.open) d.querySelectorAll('.acc details').forEach(function(y){ if(y!==x) y.open=false; }); }); });

  /* Medição de cliques (GTM / GA4 / Meta, se instalados) */
  window.dataLayer = window.dataLayer || [];
  d.addEventListener('click',function(e){
    var a=e.target.closest('[data-ev]'); if(!a) return;
    var p={event:'lp_click', lp_action:a.dataset.ev, lp_position:a.dataset.pos||''};
    window.dataLayer.push(p);
    if(window.gtag) gtag('event', a.dataset.ev, {position:p.lp_position});
    if(window.fbq && /^whatsapp/.test(a.dataset.ev)) fbq('track','Contact',{content_name:a.dataset.ev});
  });
})();

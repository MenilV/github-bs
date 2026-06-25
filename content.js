(function () {
  'use strict';

  const DEBUG = true;
  const log = (...args) => DEBUG && console.log('[GitHub BS]', ...args);
  const err = (...args) => console.error('[GitHub BS]', ...args);

  const GHBS_CLASS = 'ghbs-active';

  // World Cup victory banner (BiH 3:1 Katar) — shows until the cutoff date,
  // then hides itself automatically. Month is 0-indexed, so 6 = July.
  // Currently set to hide from 2 July 2026 onward.
  const VICTORY_CUTOFF = new Date(2026, 6, 2, 0, 0, 0);
  const isVictoryActive = () => new Date() < VICTORY_CUTOFF;

  const BOSNIAN_QUOTES = [
    'Polako se daleko stiže.',
    'Ko rano rani, dvije sreće grabi.',
    'Bogu iza nogu — najsigurnije.',
    'Nije zlato sve što sija, ali ćevapi jesu.',
    'Bolje vrabac u ruci nego golub na grani.',
    'Gdje ima dima, ima i ćevapa.',
    'Šta možeš danas, nemoj ostavljati za sutra.',
    'Bez muke nema nauke — ni ćevapa bez ražnja.',
    'Šta’š ti, ma ne znaš ti to.',
  ];

  const STICKY_MESSAGES = [
    'Ne zaboravi pull request za ražnjiće! 🥩',
    'Sastanak u 15:00 — donesi ćevape!',
    'Deploy na producku: petak poslije ručka.',
    'Review: ramstew fan club PR #42 🔥',
    'Danas je dan za refaktorisanje legacy koda.',
    'Nemoj pushati petkom poslije 16h! ⚠️',
    'Burek sa mesom za sprint planning.',
    'Git merge — reci ne ratu, reci da ćevapu.',
  ];

  const STATUS_ITEMS = [
    { label: 'GitHub', status: 'ONLINE', color: 'green' },
    { label: 'API', status: 'ONLINE', color: 'green' },
    { label: 'Ćevapi', status: 'FRESH', color: 'yellow' },
    { label: 'Rakija', status: 'PREMIUM', color: 'purple' },
  ];

  const BALKAN_COMMITS = [
    'fix: proradilo samo od sebe',
    'feat: dodao nešto boga pitaj šta je',
    'chore: kafa gotova odoh ja',
    'fix: popravio što je Đuro pokvario',
    'style: šminka čista',
    'refactor: bog otac ne zna šta sam ovdje uradio',
    'docs: mrsko mi pisat dokumentaciju',
    'feat: radi na mom računaru, sretno na produkciji',
    'chore: kumin mali rek’o da ovako treba',
    'fix: zakrpio da drži vodu dok majstori odu',
    'bug: ne radi al nema veze popiću kafu pa ću vidjet',
    'test: testirao na sebi i dobro je',
    'merge: ko preživi pritisnuće merge',
    'feat: ubacio bureka sa sirom da nerviram sarajlije',
    'fix: maknuo bag da šef ne galami',
    'WIP: radim al sporo',
    'fix: vratio kako je bilo prije nego što sam pokvario',
    'chore: Fikro otišao u peMziju, zaboravio obrisati logove s AI accounta'
  ];

  const CHART_DATA = [
    { label: 'Commitova danas', value: 85 },
    { label: 'PR-ova otvorenih', value: 62 },
    { label: 'Issues riješenih', value: 45 },
    { label: 'Redova koda', value: 92 },
    { label: 'Popijenih kafa', value: 78 },
  ];

  const COFFEE_TIMES = [10, 13, 16];

  const GRANDMA_ADVICE = [
    'Džezva je pristavljena, izdrži sine! ☕',
    'Kafa se ne pije na brzinu, polako s tim kodom.',
    'Propuh u kodu, zatvori prozore i skuhaj jednu.',
    'Ko rano rani, tri kafe popije.',
    'Uzdahni, popij vode, kafa samo što nije.',
    'Bez kafe nema rada, a bez rada nema pite. 🥧',
    'Ako ti se spava, nisi dovoljno kafa popio.',
    'Sastanak može čekati, kafa ne može.',
    'Ako Fikro može u peMziju, možeš i ti na pauzu.'
  ];

  const MOCK_TRENDING_REPOS = [
    { name: 'cevap-api', desc: 'REST API za naručivanje desetke u pola s lukom.', stars: '132', lang: 'Go', langColor: '#00ADD8' },
    { name: 'rakija-blockchain', desc: 'Decentralizovani konsenzus za destilaciju šljive.', stars: '98', lang: 'Rust', langColor: '#deb887' },
    { name: 'burek-detector', desc: 'AI model koji provjerava da li je pita sa sirom ili burek.', stars: '254', lang: 'Python', langColor: '#3572A5' }
  ];

  const MONTHS_BS = [
    'januar', 'februar', 'mart', 'april', 'maj', 'juni',
    'juli', 'august', 'septembar', 'oktobar', 'novembar', 'decembar',
  ];

  const DAYS_BS = [
    'nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota',
  ];

  function el(tag, classes, html) {
    const e = document.createElement(tag);
    if (classes) e.className = classes;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getUsername() {
    const meta = document.querySelector('meta[name="user-login"]');
    if (meta) return meta.getAttribute('content');
    const avatar = document.querySelector('.avatar-user');
    if (avatar) return avatar.getAttribute('alt')?.replace('@', '') || 'Beroš';
    return 'Beroš';
  }

  function currentDateBS() {
    const d = new Date();
    return `${DAYS_BS[d.getDay()]}, ${d.getDate()}. ${MONTHS_BS[d.getMonth()]} ${d.getFullYear()}.`;
  }

  function buildWeatherWidget() {
    return el('div', 'ghbs-card ghbs-weather-widget', `
      <div class="ghbs-card-header">🌤 Vrijeme</div>
      <div class="ghbs-weather-body">
        <div class="ghbs-weather-icon">☀</div>
        <div class="ghbs-weather-info">
          <div class="ghbs-weather-temp">29°C</div>
          <div class="ghbs-weather-condition">Sunčano</div>
        </div>
        <div class="ghbs-weather-location">Sarajevo</div>
      </div>
    `);
  }

  function buildQuoteCard() {
    const quote = randomFrom(BOSNIAN_QUOTES);
    return el('div', 'ghbs-card ghbs-quote-card', `
      <div class="ghbs-card-header">📜 Mudrost dana</div>
      <div class="ghbs-quote-body">
        <div class="ghbs-quote-text">"${quote}"</div>
        <div class="ghbs-quote-attribution">— narodna poslovica</div>
      </div>
    `);
  }

  function buildWelcomeBanner() {
    const username = getUsername();
    return el('div', 'ghbs-card ghbs-welcome-banner', `
      <div class="ghbs-welcome-accent"></div>
      <div class="ghbs-welcome-content">
        <h2 class="ghbs-welcome-title">Dobrodošli nazad, <span class="ghbs-welcome-user">${username}</span>!</h2>
        <p class="ghbs-welcome-date">${currentDateBS()}</p>
        <p class="ghbs-welcome-subtitle">Spremni za novi dan kodiranja? 🚀</p>
      </div>
    `);
  }

  function buildVictoryBanner() {
    return el('div', 'ghbs-card ghbs-victory-banner', `
      <div class="ghbs-victory-accent"></div>
      <div class="ghbs-victory-content">
        <div class="ghbs-victory-trophy">🏆</div>
        <div class="ghbs-victory-text">
          <h2 class="ghbs-victory-title">ZMAJEVI SLAVE! 🇧🇦</h2>
          <div class="ghbs-victory-score">
            <span class="ghbs-victory-team">🇧🇦 BiH</span>
            <span class="ghbs-victory-num ghbs-victory-num-win">3</span>
            <span class="ghbs-victory-dash">:</span>
            <span class="ghbs-victory-num">1</span>
            <span class="ghbs-victory-team">Katar 🇶🇦</span>
          </div>
          <p class="ghbs-victory-subtitle">Svjetsko prvenstvo — idemo dalje, ko nas može zaustaviti! ⚽🔥</p>
        </div>
      </div>
    `);
  }

  let confettiLaunched = false;
  function launchConfetti() {
    if (confettiLaunched || document.querySelector('.ghbs-confetti-container')) return;
    confettiLaunched = true;

    const colors = ['#002395', '#FECB00', '#ffffff', '#f59e0b', '#22c55e'];
    const container = el('div', 'ghbs-confetti-container');
    const pieces = 80;
    for (let i = 0; i < pieces; i++) {
      const piece = el('span', 'ghbs-confetti-piece');
      piece.style.left = (Math.random() * 100) + 'vw';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = (Math.random() * 1.2) + 's';
      piece.style.animationDuration = (2.6 + Math.random() * 1.8) + 's';
      piece.style.width = (5 + Math.random() * 6) + 'px';
      piece.style.height = (8 + Math.random() * 8) + 'px';
      piece.style.opacity = (0.7 + Math.random() * 0.3).toFixed(2);
      container.appendChild(piece);
    }
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 6000);
    log('Confetti launched — BiH 3:1 Katar! 🇧🇦');
  }

  function buildChartWidget() {
    const rows = CHART_DATA.map(
      (item) => `
        <span class="ghbs-chart-label">${item.label}</span>
        <div class="ghbs-chart-bar-track">
          <div class="ghbs-chart-bar-fill" style="width: ${item.value}%"></div>
        </div>
        <span class="ghbs-chart-value">${item.value}%</span>
      `
    ).join('');
    return el('div', 'ghbs-card ghbs-chart-widget', `
      <div class="ghbs-card-header">📊 Statistički podaci</div>
      <div class="ghbs-chart-body">${rows}</div>
    `);
  }

  function buildStatusBox() {
    const rows = STATUS_ITEMS.map(
      (item) => `
        <span class="ghbs-status-label">${item.label}</span>
        <div class="ghbs-status-value-container">
          <span class="ghbs-status-dot ghbs-status-dot-${item.color}"></span>
          <span class="ghbs-status-text ghbs-status-${item.color}">${item.status}</span>
        </div>
      `
    ).join('');
    return el('div', 'ghbs-card ghbs-status-box', `
      <div class="ghbs-card-header">🔌 Status</div>
      <div class="ghbs-status-body">${rows}</div>
    `);
  }

  function buildStickyNote() {
    const msg = randomFrom(STICKY_MESSAGES);
    return el('div', 'ghbs-card ghbs-sticky-note', `
      <div class="ghbs-card-header">📌 Podsjetnik</div>
      <div class="ghbs-sticky-body">
        <div class="ghbs-sticky-content">${msg}</div>
      </div>
    `);
  }

  function getNextCoffeeTime() {
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;
    
    let targetHour = COFFEE_TIMES.find(h => h > currentHour);
    let isTomorrow = false;
    
    if (targetHour === undefined) {
      targetHour = COFFEE_TIMES[0];
      isTomorrow = true;
    }
    
    const targetDate = new Date();
    if (isTomorrow) {
      targetDate.setDate(targetDate.getDate() + 1);
    }
    targetDate.setHours(targetHour, 0, 0, 0);
    
    const diffMs = targetDate - now;
    const diffMin = Math.round(diffMs / 1000 / 60);
    const hours = Math.floor(diffMin / 60);
    const mins = diffMin % 60;
    
    const maxIntervalMin = 180;
    const progressPercent = Math.max(0, Math.min(100, ((maxIntervalMin - diffMin) / maxIntervalMin) * 100));
    
    return { hours, mins, progressPercent };
  }

  function buildCoffeeTracker() {
    const { hours, mins, progressPercent } = getNextCoffeeTime();
    
    let timeText = '';
    if (hours > 0) {
      timeText = `Još ${hours} h i ${mins} min`;
    } else {
      timeText = `Još ${mins} minuta`;
    }
    if (hours === 0 && mins === 0) {
      timeText = 'VRIJEME JE ZA KAFICU! ☕';
    }
    
    const advice = randomFrom(GRANDMA_ADVICE);
    
    const container = el('div', 'ghbs-card ghbs-coffee-tracker');
    container.innerHTML = `
      <div class="ghbs-card-header">☕ Do kafe</div>
      <div class="ghbs-coffee-body">
        <div class="ghbs-coffee-countdown">${timeText}</div>
        <div class="ghbs-coffee-progress-track">
          <div class="ghbs-coffee-progress-fill" style="width: ${hours === 0 && mins === 0 ? 100 : progressPercent}%"></div>
        </div>
        <div class="ghbs-coffee-advice">"${advice}"</div>
      </div>
    `;
    
    const interval = setInterval(() => {
      if (!document.body.contains(container)) {
        clearInterval(interval);
        return;
      }
      const data = getNextCoffeeTime();
      const countdownEl = container.querySelector('.ghbs-coffee-countdown');
      const fillEl = container.querySelector('.ghbs-coffee-progress-fill');
      
      let nextText = '';
      if (data.hours > 0) {
        nextText = `Još ${data.hours} h i ${data.mins} min`;
      } else {
        nextText = `Još ${data.mins} minuta`;
      }
      if (data.hours === 0 && data.mins === 0) {
        nextText = 'VRIJEME JE ZA KAFICU! ☕';
      }
      
      if (countdownEl) countdownEl.textContent = nextText;
      if (fillEl) fillEl.style.width = `${data.hours === 0 && data.mins === 0 ? 100 : data.progressPercent}%`;
    }, 60000);
    
    return container;
  }

  function buildCommitGenerator() {
    const container = el('div', 'ghbs-card ghbs-commit-generator');
    container.innerHTML = `
      <div class="ghbs-card-header">💻 Balkan Commit</div>
      <div class="ghbs-commit-body">
        <div class="ghbs-commit-display-container">
          <code class="ghbs-commit-text">${randomFrom(BALKAN_COMMITS)}</code>
        </div>
        <div class="ghbs-commit-actions">
          <button class="ghbs-btn-action ghbs-commit-generate-btn">🔄 Generiši</button>
          <button class="ghbs-btn-action ghbs-commit-copy-btn">📋 Kopiraj</button>
        </div>
      </div>
    `;

    const generateBtn = container.querySelector('.ghbs-commit-generate-btn');
    const copyBtn = container.querySelector('.ghbs-commit-copy-btn');
    const commitText = container.querySelector('.ghbs-commit-text');

    generateBtn.addEventListener('click', () => {
      commitText.textContent = randomFrom(BALKAN_COMMITS);
      copyBtn.textContent = '📋 Kopiraj';
    });

    copyBtn.addEventListener('click', () => {
      const text = commitText.textContent;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = '✅ Kopirano!';
      }).catch(err => {
        log('Failed to copy text: ', err);
      });
    });

    return container;
  }

  function buildTrendingWidget() {
    const repos = MOCK_TRENDING_REPOS.map(
      (repo) => `
        <div class="ghbs-trending-repo">
          <div class="ghbs-trending-repo-title">
            <span class="ghbs-trending-repo-icon">📦</span>
            <a href="#" class="ghbs-trending-repo-name">${repo.name}</a>
          </div>
          <p class="ghbs-trending-repo-desc">${repo.desc}</p>
          <div class="ghbs-trending-repo-meta">
            <span class="ghbs-trending-repo-lang">
              <span class="ghbs-trending-repo-lang-dot" style="background-color: ${repo.langColor}"></span>
              ${repo.lang}
            </span>
            <span class="ghbs-trending-repo-stars">⭐ ${repo.stars}</span>
          </div>
        </div>
      `
    ).join('');
    return el('div', 'ghbs-card ghbs-trending-widget', `
      <div class="ghbs-card-header">🔥 Popularni repozitoriji</div>
      <div class="ghbs-trending-body">${repos}</div>
    `);
  }

  function buildFooter() {
    return el('div', 'ghbs-footer', `
      <div class="ghbs-footer-inner">
        <span class="ghbs-footer-brand">Bosanski Github</span>
        <span class="ghbs-footer-tagline">Štampano u Bosni 🇧🇦</span>
        <span class="ghbs-footer-copy">© ${new Date().getFullYear()} — Ćevapi open source</span>
      </div>
    `);
  }

  function injectWidgets() {
    const sidebar = document.querySelector('.dashboard-sidebar, [data-testid="dashboard-sidebar"]');
    const newsFeed = document.querySelector('.news, [data-testid="dashboard-feed"]');

    if (!sidebar && !newsFeed) {
      log('Sidebar or News Feed not found, skipping widget injection');
      return;
    }

    // --- Sidebar Injection (Stats, Commit Gen, Coffee Tracker) ---
    if (sidebar && !document.querySelector('.ghbs-sidebar-widgets')) {
      const sidebarContainer = el('div', 'ghbs-sidebar-widgets');
      sidebarContainer.appendChild(buildChartWidget());
      sidebarContainer.appendChild(buildCommitGenerator());
      sidebarContainer.appendChild(buildCoffeeTracker());
      
      sidebar.appendChild(sidebarContainer);
    }

    // --- Main Feed Injection (Welcome, Weather, Proverbs, Sticky Note) ---
    if (newsFeed && !document.querySelector('.ghbs-feed-widgets')) {
      const feedContainer = el('div', 'ghbs-feed-widgets');
      const victoryActive = isVictoryActive();
      if (victoryActive) feedContainer.appendChild(buildVictoryBanner());
      feedContainer.appendChild(buildWelcomeBanner());
      if (victoryActive) launchConfetti();

      const topGrid = el('div', 'ghbs-widgets-grid');
      topGrid.appendChild(buildWeatherWidget());
      topGrid.appendChild(buildQuoteCard());
      topGrid.appendChild(buildStickyNote());
      
      feedContainer.appendChild(topGrid);
      newsFeed.prepend(feedContainer);
    }

    // --- Right Column Status Injection (beneath changelog) ---
    // Primary anchor is the right-rail changelog panel. GitHub drops that panel
    // on narrower widths / layout changes, so when it's missing we relocate the
    // widget into the left sidebar instead of letting it silently disappear.
    if (!document.querySelector('.ghbs-status-box')) {
      const changelogHeader = Array.from(document.querySelectorAll('h2, h3, [data-content="Latest from our changelog"], .f5.text-bold'))
        .find(el => el.textContent.includes('Latest from our changelog') || el.textContent.includes('Najnovije iz dnevnika promjena'));
      const changelogContainer = changelogHeader
        && (changelogHeader.closest('.Box, .Box-row, [data-testid="changelog-container"]') || changelogHeader.parentElement);

      if (changelogContainer && changelogContainer.parentNode) {
        const statusBox = buildStatusBox();
        statusBox.style.marginTop = '16px';
        changelogContainer.parentNode.insertBefore(statusBox, changelogContainer.nextSibling);
        log('Status box injected beneath changelog');
      } else {
        // No right rail — fall back to the left sidebar so it stays visible.
        const sidebarWidgets = document.querySelector('.ghbs-sidebar-widgets');
        if (sidebarWidgets) {
          sidebarWidgets.appendChild(buildStatusBox());
          log('Status box fell back to left sidebar (no changelog anchor)');
        }
      }
    }

    // --- Right Column Trending Injection (beneath status box) ---
    if (!document.querySelector('.ghbs-trending-widget')) {
      const statusBox = document.querySelector('.ghbs-status-box');
      if (statusBox && statusBox.parentNode) {
        const trendingWidget = buildTrendingWidget();
        trendingWidget.style.marginTop = '16px';
        statusBox.parentNode.insertBefore(trendingWidget, statusBox.nextSibling);
        log('Trending widget injected beneath status box');
      } else {
        // Fallback: if statusBox is not found, try to inject beneath changelog
        const changelogHeader = Array.from(document.querySelectorAll('h2, h3, [data-content="Latest from our changelog"], .f5.text-bold'))
          .find(el => el.textContent.includes('Latest from our changelog') || el.textContent.includes('Najnovije iz dnevnika promjena'));
        
        if (changelogHeader) {
          const container = changelogHeader.closest('.Box, .Box-row, [data-testid="changelog-container"]') || changelogHeader.parentElement;
          if (container && container.parentNode) {
            const trendingWidget = buildTrendingWidget();
            trendingWidget.style.marginTop = '16px';
            container.parentNode.insertBefore(trendingWidget, container.nextSibling);
            log('Trending widget injected beneath changelog (status box fallback)');
          }
        }
      }
    }

    // --- Footer Injection ---
    if (!document.querySelector('.ghbs-footer')) {
      const main = document.querySelector('main, .application-main');
      if (main) {
        main.appendChild(buildFooter());
      }
    }

    log('Widgets integrated into DOM');
  }

  function localizeUI() {
    const translations = [
      { selector: '[data-content="Dashboard"]', text: 'Nadzorna ploča' },
      { selector: 'button[aria-label="Search or jump to…"]', attr: 'aria-label', text: 'Pretraži (ili nađi štelu)…' },
      { selector: '.header-search-input', attr: 'placeholder', text: 'Pretraga (fali ti papir)... 📄' },
      { selector: '[data-content="Home"]', text: 'Početna' },
      { selector: '[data-content="Top Repositories"]', text: 'Najpopularniji repozitoriji' },
      { selector: 'input[placeholder="Find a repository..."]', attr: 'placeholder', text: 'Pronađi repozitorij...' },
      { selector: '[data-content="New"]', text: 'Novi belaj 🚀' },
      { selector: '[data-content="Latest from our changelog"]', text: 'Najnovije iz dnevnika promjena' },
      { selector: 'a[href$="/changelog"]', text: 'Pogledaj dnevnik →' },
      { selector: 'button[aria-label="Ask Copilot"]', text: 'Pitaj' },
      { selector: '[data-content="All repositories"]', text: 'Svi repozitoriji' },
      { selector: '[data-content="Create issue"]', text: 'Kreiraj issue' },
      { selector: '[data-content="Write code"]', text: 'Piši kod' },
      { selector: '[data-content="Show more"]', text: 'Prikaži više' },
      { selector: '[data-content="Show less"]', text: 'Prikaži manje' },
      { selector: '[data-content="Copilot"]', text: 'Copilot' },
      { selector: '[data-content="Agent"]', text: 'Agent' },
      { selector: '[data-content="Explore"]', text: 'Istraži' },
      { selector: '[data-content="Pull requests"]', text: 'Pull requestovi' },
      { selector: '[data-content="Issues"]', text: 'Issue-i' },
      { selector: '[data-content="Codespaces"]', text: 'Codespaces' },
      { selector: '[data-content="Marketplace"]', text: 'Tržnica' },
      { selector: '[data-content="Notifications"]', text: 'Obavijesti' },
      { selector: '[data-content="Settings"]', text: 'Postavke' },
      { selector: '[data-content="Your profile"]', text: 'Vaš profil' },
      { selector: '[data-content="Your repositories"]', text: 'Vaši repozitoriji' },
      { selector: '[data-content="Your organizations"]', text: 'Vaše organizacije' },
      { selector: '[data-content="Your projects"]', text: 'Vaši projekti' },
      { selector: '[data-content="Your stars"]', text: 'Vaše zvijezde' },
      { selector: '[data-content="Your gists"]', text: 'Vaši gistovi' },
    ];

    translations.forEach(({ selector, text, attr }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (attr) {
          if (el.getAttribute(attr) !== text) {
            el.setAttribute(attr, text);
          }
        } else {
          let hasUpdated = false;
          Array.from(el.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
              if (node.textContent.trim() !== text) {
                node.textContent = node.textContent.replace(node.textContent.trim(), text);
                hasUpdated = true;
              }
            }
          });
          if (!hasUpdated && el.childNodes.length === 0 && el.textContent !== text) {
            el.textContent = text;
          }
        }
      });
    });

    document.querySelectorAll('a[href="/new"] .Button-label, a[href^="/new"] .Button-label').forEach(el => {
      Array.from(el.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === 'New') {
          node.textContent = node.textContent.replace('New', 'Novi belaj 🚀');
        }
      });
    });

    const textMap = {
      'Dashboard': 'Nadzorna ploča',
      'Home': 'Početna',
      'Top Repositories': 'Najpopularniji repozitoriji',
      'Find a repository...': 'Pronađi repozitorij...',
      'New': 'Novi belaj 🚀',
      'Latest from our changelog': 'Najnovije iz dnevnika promjena',
      'View changelog': 'Pogledaj dnevnik',
      'View changelog →': 'Pogledaj dnevnik →',
      'Ask': 'Pitaj',
      'All repositories': 'Svi repozitoriji',
      'Create issue': 'Kreiraj issue',
      'Write code': 'Piši kod',
      'Show more': 'Prikaži više',
      'Show less': 'Prikaži manje',
      'Explore': 'Istraži',
      'Pull requests': 'Pull requestovi',
      'Issues': 'Issue-i',
      'Codespaces': 'Codespaces',
      'Marketplace': 'Tržnica',
      'Notifications': 'Obavijesti',
      'Recent activity': 'Nedavna aktivnost',
      'Filter by type': 'Filtriraj po tipu',
      'Public': 'Javno',
      'Private': 'Privatno',
      'Settings': 'Postavke',
      'Sign out': 'Odjavi se',
      'Your profile': 'Vaš profil',
      'Your repositories': 'Vaši repozitoriji',
      'Your organizations': 'Vaše organizacije',
      'Your projects': 'Vaši projekti',
      'Your stars': 'Vaše zvijezde',
      'Your gists': 'Vaši gistovi',
      'Upgrade': 'Nadogradi',
      'Feature preview': 'Pregled novih opcija',
      'Help': 'Pomoć',
      'Type / to search': 'Pretraga (fali ti papir)... 📄',
      'Search or jump to...': 'Pretraži (ili nađi štelu)... 🔍',
      'Search...': 'Uplati taksu pa traži... 💸',
      'New enterprise installation API now in public preview': 'Novi enterprise installation API je sada u javnom pregledu',
      'Start Copilot cloud agent tasks via the REST API': 'Pokrenite Copilot cloud agent zadatke putem REST API-ja',
      'GitHub Enterprise Server 3.21 release candidate is available': 'GitHub Enterprise Server 3.21 release candidate je dostupan',
      'Copilot code review: Comment experience improvements': 'Copilot code review: Poboljšanja iskustva komentarisanja',
    };

    const timeRegex = /^(\d+)\s+(hours?|days?|minutes?)\s+ago$/i;

    ['header', '.application-main', '.dashboard-sidebar', 'main'].forEach((containerSelector) => {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          const text = node.textContent.trim();
          if (textMap[text] || timeRegex.test(text)) return NodeFilter.FILTER_ACCEPT;
          return NodeFilter.FILTER_REJECT;
        },
      });

      const nodesToReplace = [];
      while (walker.nextNode()) {
        nodesToReplace.push(walker.currentNode);
      }

      nodesToReplace.forEach((node) => {
        const text = node.textContent.trim();
        if (textMap[text]) {
          if (!node.textContent.includes(textMap[text])) {
            node.textContent = node.textContent.replace(text, textMap[text]);
          }
        } else {
          const match = text.match(timeRegex);
          if (match) {
            const count = match[1];
            const unit = match[2].toLowerCase();
            let unitBs = unit;
            if (unit.startsWith('hour')) unitBs = 'sati';
            else if (unit.startsWith('day')) unitBs = parseInt(count) === 1 ? 'dan' : 'dana';
            else if (unit.startsWith('min')) unitBs = 'minuta';
            const newText = `prije ${count} ${unitBs}`;
            if (!node.textContent.includes(newText)) {
              node.textContent = node.textContent.replace(text, newText);
            }
          }
        }
      });
    });
  }

  function enhanceActivityFeed() {
    const newsItems = document.querySelectorAll('.news li, .news article, .news .Box-row');

    newsItems.forEach((item) => {
      if (item.classList.contains('ghbs-enhanced')) return;
      item.classList.add('ghbs-enhanced', 'ghbs-feed-item');

      const time = item.querySelector('relative-time, time');
      if (time) time.classList.add('ghbs-time');
    });
  }

  function showSearchBureaucracyWarning(inputEl) {
    if (document.querySelector('.ghbs-search-warning')) return;
    
    const warning = el('div', 'ghbs-search-warning');
    warning.innerHTML = `
      <span class="ghbs-warning-icon">⚠️</span>
      <div class="ghbs-warning-body">
        <div class="ghbs-warning-title">Fali ti papir!</div>
        <p class="ghbs-warning-desc">Nedostaje rodni list (ne stariji od 6 mjeseci) i taksa od 2 KM za pretragu.</p>
        <button class="ghbs-warning-bribe-btn">💸 Traži preko štele</button>
      </div>
    `;
    
    const rect = inputEl.getBoundingClientRect();
    warning.style.top = `${rect.bottom + window.scrollY + 8}px`;
    warning.style.left = `${rect.left + window.scrollX}px`;
    warning.style.width = `${Math.max(280, rect.width)}px`;
    
    document.body.appendChild(warning);
    
    const bribeBtn = warning.querySelector('.ghbs-warning-bribe-btn');
    bribeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      const body = warning.querySelector('.ghbs-warning-body');
      body.innerHTML = `
        <div class="ghbs-warning-title" style="color: var(--ghbs-success) !important;">✅ Sređeno!</div>
        <p class="ghbs-warning-desc">Amidža Salko je odobrio pretragu preko reda bez uplatnice.</p>
      `;
      
      setTimeout(() => {
        warning.classList.add('ghbs-fade-out');
        setTimeout(() => warning.remove(), 300);
      }, 2500);
    });
    
    const dismissHandler = (e) => {
      if (!warning.contains(e.target) && e.target !== inputEl) {
        warning.classList.add('ghbs-fade-out');
        setTimeout(() => warning.remove(), 300);
        document.removeEventListener('click', dismissHandler);
      }
    };
    
    setTimeout(() => {
      document.addEventListener('click', dismissHandler);
    }, 100);
  }

  function waitForRendered(timeout) {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      const check = () => {
        const hasHeader = !!document.querySelector('header');
        const hasMain = !!document.querySelector('main, .application-main');
        if (hasHeader && hasMain) {
          resolve();
          return;
        }
        if (Date.now() - start > timeout) {
          log('Render timeout — proceeding anyway');
          resolve();
          return;
        }
        requestAnimationFrame(check);
      };
      requestAnimationFrame(check);
    });
  }

  function injectCrochet() {
    if (!document.querySelector('.ghbs-crochet')) {
      const crochet = el('div', 'ghbs-crochet');
      crochet.style.backgroundImage = `url('${chrome.runtime.getURL('crochet.png')}')`;
      document.body.appendChild(crochet);
      log('Crochet doily injected at top of page');
    }
  }

  function scanAndInject() {
    injectWidgets();
    injectCrochet();
  }


  async function applySkin() {
    try {
      if (document.body.classList.contains(GHBS_CLASS)) {
        enhanceActivityFeed();
        return;
      }

      log('Waiting for GitHub render...');
      await waitForRendered(5000);

      log('Applying GitHub BS skin...');

      const header = document.querySelector('header');
      if (header) {
        header.classList.add('ghbs-topbar');
      }

      document.body.classList.add(GHBS_CLASS);

      scanAndInject();
      localizeUI();
      enhanceActivityFeed();

      const activeNav = document.querySelector('.Header-item .selected, .header-nav-link.selected, nav a[aria-current="page"]');
      if (activeNav) {
        activeNav.classList.add('ghbs-nav-active');
      }

      log('GitHub BS skin applied successfully');
    } catch (e) {
      err('Error applying skin:', e);
    }
  }

  function init() {
    log('Initializing...');

    const path = window.location.pathname;
    if (path !== '/' && path !== '/dashboard') {
      log('Not on dashboard — skipping');
      return;
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      applySkin();
    } else {
      document.addEventListener('DOMContentLoaded', () => applySkin());
    }

    document.addEventListener('turbo:render', () => {
      log('Turbo navigation — re-applying');
      document.body.classList.remove(GHBS_CLASS);
      applySkin();
    });

    document.addEventListener('pjax:end', () => {
      log('Pjax navigation — re-applying');
      document.body.classList.remove(GHBS_CLASS);
      applySkin();
    });

    window.addEventListener('popstate', () => {
      document.body.classList.remove(GHBS_CLASS);
      applySkin();
    });

    // Coalesce mutation bursts (including the extension's own injected nodes)
    // into a single pass per frame to avoid layout thrash and self-triggering.
    let updateScheduled = false;
    const observer = new MutationObserver((mutations) => {
      if (updateScheduled) return;
      const hasAddedNodes = mutations.some((m) => m.addedNodes.length > 0);
      if (!hasAddedNodes) return;
      updateScheduled = true;
      requestAnimationFrame(() => {
        updateScheduled = false;
        scanAndInject();
        localizeUI();
        enhanceActivityFeed();
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Intercept clicks on search inputs or buttons to display bureaucracy warning
    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, input');
      if (!target) return;

      const isSearchButton = target.matches('button[aria-label*="Search"], button[aria-label*="Pretraži"]');
      const isSearchInput = target.matches('.header-search-input, input[placeholder*="Pretragu"], input[placeholder*="search"]');

      if (isSearchButton || isSearchInput) {
        showSearchBureaucracyWarning(target);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

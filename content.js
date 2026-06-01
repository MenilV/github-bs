(function () {
  'use strict';

  const DEBUG = true;
  const log = (...args) => DEBUG && console.log('[GitHub BS]', ...args);
  const err = (...args) => console.error('[GitHub BS]', ...args);

  const GHBS_CLASS = 'ghbs-active';

  const BOSNIAN_QUOTES = [
    'Polako se daleko stiže.',
    'Ko rano rani, dvije sreće grabi.',
    'Bogu iza nogu — najsigurnije.',
    'Nije zlato sve što sija, ali ćevapi jesu.',
    'Bolje vrabac u ruci nego golub na grani.',
    'Gdje ima dima, ima i ćevapa.',
    'Šta možeš danas, nemoj ostavljati za sutra.',
    'Bez muke nema nauke — ni ćevapa bez ražnja.',
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
    'fix: vratio kako je bilo prije nego što sam pokvario'
  ];

  const CHART_DATA = [
    { label: 'Commitova danas', value: 85 },
    { label: 'PR-ova otvorenih', value: 62 },
    { label: 'Issues riješenih', value: 45 },
    { label: 'Redova koda', value: 92 },
    { label: 'Popijenih kafa', value: 78 },
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
        <span class="ghbs-footer-brand">git.ba</span>
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

    // --- Sidebar Injection (Stats, Commit Gen) ---
    if (sidebar && !document.querySelector('.ghbs-sidebar-widgets')) {
      const sidebarContainer = el('div', 'ghbs-sidebar-widgets');
      sidebarContainer.appendChild(buildChartWidget());
      sidebarContainer.appendChild(buildCommitGenerator());
      
      sidebar.appendChild(sidebarContainer);
    }

    // --- Main Feed Injection (Welcome, Weather, Proverbs, Sticky Note) ---
    if (newsFeed && !document.querySelector('.ghbs-feed-widgets')) {
      const feedContainer = el('div', 'ghbs-feed-widgets');
      feedContainer.appendChild(buildWelcomeBanner());

      const topGrid = el('div', 'ghbs-widgets-grid');
      topGrid.appendChild(buildWeatherWidget());
      topGrid.appendChild(buildQuoteCard());
      topGrid.appendChild(buildStickyNote());
      
      feedContainer.appendChild(topGrid);
      newsFeed.prepend(feedContainer);
    }

    // --- Right Column Status Injection (beneath changelog) ---
    if (!document.querySelector('.ghbs-status-box')) {
      const changelogHeader = Array.from(document.querySelectorAll('h2, h3, [data-content="Latest from our changelog"], .f5.text-bold'))
        .find(el => el.textContent.includes('Latest from our changelog') || el.textContent.includes('Najnovije iz dnevnika promjena'));

      if (changelogHeader) {
        const container = changelogHeader.closest('.Box, .Box-row, [data-testid="changelog-container"]') || changelogHeader.parentElement;
        if (container && container.parentNode) {
          const statusBox = buildStatusBox();
          statusBox.style.marginTop = '16px';
          container.parentNode.insertBefore(statusBox, container.nextSibling);
          log('Status box injected beneath changelog');
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
      { selector: 'button[aria-label="Search or jump to…"]', attr: 'aria-label', text: 'Pretraži ili idi na…' },
      { selector: '.header-search-input', attr: 'placeholder', text: 'Pritisni / za pretragu' },
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
      'Type / to search': 'Pritisni / za pretragu',
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

      const classes = item.className;
      let badgeType = 'blue';
      let badgeLabel = 'PR';

      if (classes.includes('push')) { badgeType = 'green'; badgeLabel = 'Push'; }
      else if (classes.includes('issues') || classes.includes('issue')) { badgeType = 'purple'; badgeLabel = 'Issue'; }
      else if (classes.includes('pull_request') || classes.includes('pull-request')) { badgeType = 'blue'; badgeLabel = 'PR'; }
      else if (classes.includes('star')) { badgeType = 'yellow'; badgeLabel = 'Star'; }
      else if (classes.includes('fork')) { badgeType = 'green'; badgeLabel = 'Fork'; }
      else if (classes.includes('release') || classes.includes('tag')) { badgeType = 'green'; badgeLabel = 'Release'; }
      else if (classes.includes('comment')) { badgeType = 'blue'; badgeLabel = 'Komentar'; }
      else if (classes.includes('member') || classes.includes('team')) { badgeType = 'purple'; badgeLabel = 'Tim'; }
      else if (classes.includes('create')) { badgeType = 'green'; badgeLabel = 'Kreirano'; }
      else if (classes.includes('delete')) { badgeType = 'red'; badgeLabel = 'Obrisano'; }

      const badge = el('span', `ghbs-badge ghbs-badge-${badgeType}`, badgeLabel);
      const titleEl = item.querySelector('.title, strong, a');
      if (titleEl && !item.querySelector('.ghbs-badge')) {
        titleEl.parentNode?.insertBefore(badge, titleEl);
      } else if (!item.querySelector('.ghbs-badge')) {
        item.prepend(badge);
      }

      const time = item.querySelector('relative-time, time');
      if (time) time.classList.add('ghbs-time');
    });
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

    const observer = new MutationObserver((mutations) => {
      let needsUpdate = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          needsUpdate = true;
          break;
        }
      }
      if (needsUpdate) {
        scanAndInject();
        localizeUI();
        enhanceActivityFeed();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

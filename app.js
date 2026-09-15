const A = '/docs/public/assets/'

const navigation = [
  ['00 / Overview', [['about', 'About Xinu Mail', '/preview/description/']]],
  ['01 / Deploy', [
    ['dashboard', 'Cloudflare Dashboard', '/guide/dashboard/'],
    ['action', 'GitHub Actions', '/guide/action/'],
    ['command', 'Command Line', '/guide/command/'],
    ['environment', 'Environment Variables', '/guide/environment/'],
    ['update', 'Updating', '/guide/update/']
  ]],
  ['02 / Configure', [
    ['sending', 'Email Sending', '/system/sending/'],
    ['storage', 'Object Storage', '/system/object-storage/'],
    ['turnstile', 'Turnstile', '/system/turnstile/'],
    ['forward', 'Email Forwarding', '/system/forward/']
  ]],
  ['03 / Reference', [['api', 'API Reference', '/api/api-doc/']]]
]

const icons = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16.2 16.2 4 4"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .7A11.5 11.5 0 0 0 8.4 23c.6.1.8-.3.8-.6v-2.2c-3.4.7-4.1-1.4-4.1-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2A11.4 11.4 0 0 1 12 5.5c1 0 2 .1 2.9.4 2.2-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .7Z"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="7" y="7" width="13" height="14" rx="1"/><path d="M16 7V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h3"/></svg>'
}

const table = (headers, rows) => `<div class="table-wrap"><table><thead><tr>${headers.map(x => `<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
const image = (file, alt) => `<img src="${A}${file}" alt="${alt}" loading="lazy">`
const notice = (title, text) => `<div class="notice"><strong>${title}</strong><p>${text}</p></div>`
const code = (lang, value) => `<div class="code-block"><span class="code-label">${lang}</span><button class="copy-button" type="button" aria-label="Copy code">${icons.copy}</button><pre><code>${value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</code></pre></div>`
const section = (id, title, body) => `<section class="doc-section" id="${id}"><h2>${title}</h2>${body}</section>`

const pages = {
  about: {
    title: 'About Xinu Mail',
    intro: 'A Cloudflare-native mail system for operating multiple addresses and domains without a resident server.',
    sections: [
      ['overview', 'System Overview', '<p>Xinu Mail receives messages through Cloudflare Email Routing and runs its API and web interface on Cloudflare Workers. D1 stores structured data, KV stores settings and lightweight objects, and R2 or an S3-compatible service can store attachments.</p>'],
      ['capabilities', 'Capabilities', '<ul><li>Multiple email addresses and domains from one installation</li><li>Role-based administration and invitation keys</li><li>Inbound mail, outbound delivery, attachments, and forwarding</li><li>Cloudflare Turnstile protection and authenticated public API access</li></ul>'],
      ['architecture', 'Architecture', table(['Layer', 'Service'], [['Runtime', 'Cloudflare Workers'], ['Database', 'Cloudflare D1'], ['Cache and settings', 'Cloudflare KV'], ['Object storage', 'KV, R2, or S3-compatible storage'], ['Inbound mail', 'Cloudflare Email Routing'], ['Outbound mail', 'Cloudflare Email Service or Resend']])]
    ]
  },
  dashboard: {
    title: 'Dashboard Deployment',
    sections: [
      ['account-preparation', 'Account Preparation', '<p>Register a Cloudflare account at <a href="https://dash.cloudflare.com/">dash.cloudflare.com</a> and add your domain.</p>' + image('1.Ceip4Aks.png', 'Cloudflare account dashboard showing an active domain')],
      ['create-project', 'Create the Project', '<ol><li>Fork or clone <a href="https://github.com/maillab/cloud-mail">the Cloud Mail repository</a>.</li><li>Create a Worker project.</li><li>Choose <strong>Import from GitHub</strong>.</li><li>Set the root directory to <code>mail-worker</code> and deploy.</li></ol>' + image('1.C_OKFTJq.png', 'Create a Worker project in Cloudflare') + image('2.yrULln52.png', 'Import a Worker project from GitHub') + image('3.BlAKorP8.png', 'Set the Cloud Mail Worker root directory')],
      ['environment', 'Configure Environment Variables', table(['Variable', 'Required', 'Description'], [['<code>domain</code>', 'Yes', 'Email domains, such as <code>["example.com"]</code>'], ['<code>admin</code>', 'Yes', 'Administrator email address'], ['<code>jwt_secret</code>', 'Yes', 'A long, unique, randomly generated signing secret']]) + notice('Secret handling', 'Never publish <code>jwt_secret</code> in screenshots, logs, issue reports, or source control. Use Cloudflare encrypted secret controls.')],
      ['databases', 'Bind Databases', '<ol><li>Create a KV namespace and D1 database.</li><li>Add bindings named exactly <code>kv</code> and <code>db</code>.</li></ol>' + image('4-4.Ddg5IGmI.png', 'Cloudflare storage database creation screen') + image('4.d1DzXNm-.png', 'Cloudflare Worker D1 and KV bindings')],
      ['email-routing', 'Configure Email Routing', image('6.B8ZEA4eb.png', 'Cloudflare Email Routing setup') + image('7.Bm0YMP0b.png', 'Cloudflare Email Routing destination configuration') + image('8.jfYabKoj.png', 'Cloudflare Email Routing catch-all Worker rule')],
      ['initialize', 'Initialize and Sign In', '<ol><li>Open <code>https://&lt;worker-domain&gt;/api/init/&lt;jwt-secret&gt;</code> in a trusted browser session.</li><li>Remove that URL from browser history because it contains the secret.</li><li>Open the Worker domain, register the administrator account, and sign in.</li></ol>' + image('9.UpdVuA4A.png', 'Xinu Mail sign-in screen')]
    ]
  },
  action: {
    title: 'GitHub Actions',
    sections: [
      ['token', 'Create an API Token', '<ol><li>Create a Cloudflare API token from a suitable template.</li><li>Configure the required Worker, D1, KV, R2, and domain permissions.</li><li>Store the token immediately as a GitHub Actions secret.</li><li>Copy your Cloudflare account ID.</li></ol>' + image('4.C308-3iz.png', 'Cloudflare API token template selection') + image('5.DrnTPa3l.png', 'Cloudflare API token permissions') + image('7.DG2icI9U.png', 'Cloudflare account ID location')],
      ['secrets', 'Configure Repository Secrets', table(['Secret', 'Required', 'Description'], [['CLOUDFLARE_API_TOKEN', 'Yes', 'Cloudflare API token'], ['CLOUDFLARE_ACCOUNT_ID', 'Yes', 'Cloudflare account ID'], ['CUSTOM_DOMAIN', 'Yes', 'Worker custom domain'], ['DOMAIN', 'Yes', 'Email domain array'], ['ADMIN', 'Yes', 'Administrator address'], ['JWT_SECRET', 'Yes', 'Long random signing secret'], ['NAME', 'No', 'Worker project name'], ['D1_DATABASE_ID', 'No', 'Existing D1 database ID'], ['KV_NAMESPACE_ID', 'No', 'Existing KV namespace ID']]) + image('9.BSzKTXoh.png', 'GitHub repository Actions secrets list')],
      ['deploy', 'Run Deployment', '<ol><li>Run the deployment workflow.</li><li>Wait for all workflow steps to complete.</li><li>Configure Email Routing and open the custom domain.</li></ol>' + image('10.D1da10Ql.png', 'Run the GitHub Actions workflow') + image('11.BgS0gJ4t.png', 'Completed GitHub Actions deployment workflow')]
    ]
  },
  command: {
    title: 'Command Line Deployment',
    sections: [
      ['prerequisites', 'Prerequisites', '<ul><li>Node.js 22 or newer</li><li>pnpm</li><li>A Cloudflare account with an active domain</li></ul>' + code('shell', 'git clone https://github.com/maillab/cloud-mail\ncd cloud-mail/mail-worker\npnpm install')],
      ['configuration', 'Worker Configuration', '<p>Configure D1, KV, optional R2 or Email Service bindings, Workers AI, static assets, cron triggers, and build command in <code>mail-worker/wrangler.toml</code>.</p>' + code('toml', 'name = "cloud-mail"\nmain = "src/index.js"\ncompatibility_date = "2025-06-04"\nkeep_vars = true\n\n[[d1_databases]]\nbinding = "db"\ndatabase_name = "email"\ndatabase_id = "<D1_DATABASE_ID>"\n\n[[kv_namespaces]]\nbinding = "kv"\nid = "<KV_NAMESPACE_ID>"\n\n[ai]\nbinding = "ai"\n\n[assets]\nbinding = "assets"\ndirectory = "./dist"\nnot_found_handling = "single-page-application"\nrun_worker_first = true\n\n[triggers]\ncrons = ["*/30 * * * *", "0 16 * * *"]\n\n[build]\ncommand = "pnpm --prefix ../mail-vue install && pnpm --prefix ../mail-vue run build"')],
      ['remote', 'Remote Deployment', '<ol><li>Create the KV namespace and D1 database.</li><li>Set bindings and environment values.</li><li>Deploy with the command below.</li><li>Configure the Email Routing catch-all rule.</li><li>Initialize the database through the protected initialization URL.</li></ol>' + code('shell', 'pnpm run deploy')]
    ]
  },
  environment: {
    title: 'Environment Variables',
    sections: [['variables', 'Optional Variables', table(['Worker variable', 'Action secret', 'Default', 'Description'], [['ai_model', 'AI_MODEL', '@cf/meta/llama-3.1-8b-instruct', 'Workers AI model'], ['analysis_cache', 'ANALYSIS_CACHE', 'false', 'Analytics cache feature flag'], ['project_link', 'PROJECT_LINK', 'true', 'Show the project link on the sign-in page']]) + notice('Storage', 'Use encrypted secret storage for credentials and signing keys. Ordinary feature flags can remain Worker variables.')]]
  },
  update: {
    title: 'Updating',
    sections: [
      ['actions', 'GitHub Actions Deployment', '<p>Sync the current source into your repository. The configured workflow will build and deploy the update automatically.</p>'],
      ['dashboard', 'Dashboard Deployment', '<ol><li>Sync the source branch connected to Cloudflare.</li><li>Confirm the <code>db</code> and <code>kv</code> bindings remain attached.</li><li>Back up important data before database changes.</li><li>Visit the protected initialization URL once to apply idempotent migrations.</li></ol>']
    ]
  },
  sending: {
    title: 'Email Sending',
    intro: 'Xinu Mail can send external messages through Resend or an optional Cloudflare Email Service binding.',
    sections: [['resend', 'Configure Resend', '<ol><li>Register at <a href="https://resend.com/">Resend</a>, add your domain, and verify its DNS records.</li><li>Create an API key and store it in Xinu Mail system settings.</li><li>Add <code>https://&lt;worker-domain&gt;/api/webhooks</code> as the status callback.</li><li>Select the delivery events you need.</li><li>Complete the sending configuration in Xinu Mail.</li></ol>' + image('1.DwYi9syY.png', 'Resend domain verification screen') + image('2.FAyxtFE4.png', 'Resend webhook callback configuration') + image('4.B6iEcvcq.png', 'Resend webhook event selection') + image('5.DXbq-DgO.png', 'Xinu Mail sending configuration') + notice('Credential handling', 'Never expose the complete Resend API key in screenshots, logs, or source control.')]]
  },
  storage: {
    title: 'Object Storage',
    intro: 'Attachments use KV by default. R2 or another S3-compatible provider can be configured for object storage.',
    sections: [['r2', 'Configure R2', '<ol><li>Create an R2 bucket.</li><li>Configure a custom domain if public object delivery is required.</li><li>Add the optional <code>r2</code> binding or <code>R2_BUCKET_NAME</code> Action value.</li><li>Complete object storage settings in Xinu Mail.</li></ol>' + image('1.DDX40T9J.png', 'Create a Cloudflare R2 bucket') + image('2.wkBqZxnz.png', 'Configure an R2 custom domain') + image('3.BH3jpxf4.png', 'Xinu Mail object storage configuration')]]
  },
  turnstile: {
    title: 'Turnstile',
    sections: [['widget', 'Configure Human Verification', '<ol><li>Create a Turnstile widget for the Xinu Mail hostname.</li><li>Copy its site key and secret key.</li><li>Open System Settings and configure human verification.</li></ol>' + image('1.DpI-QwiV.png', 'Create a Cloudflare Turnstile widget') + image('3.DOxY6443.png', 'Xinu Mail Turnstile configuration') + notice('Secret key', 'The site key is public. Treat the secret key as a credential and never include it in screenshots, logs, or source control.')]]
  },
  forward: {
    title: 'Email Forwarding',
    sections: [
      ['telegram', 'Forward to Telegram', '<ol><li>Open the verified <code>@BotFather</code> account.</li><li>Create a bot and store its token securely.</li><li>Send a message to the bot.</li><li>Request <code>https://api.telegram.org/bot&lt;BOT_TOKEN&gt;/getUpdates</code> and copy only the numeric <code>chat.id</code>.</li><li>Configure Telegram forwarding in Xinu Mail.</li></ol>' + image('1.COkzfE5i.png', 'Verified BotFather account in Telegram') + image('3.DdcugslA.png', 'Send an initial message to a Telegram bot') + image('5.BvE5wcey.png', 'Xinu Mail Telegram forwarding configuration') + notice('Bot token', 'Anyone with the bot token can control the bot. Do not publish the token or the getUpdates response.')],
      ['email', 'Forward to Another Address', '<ol><li>Complete destination address verification in Cloudflare.</li><li>Configure email forwarding in Xinu Mail System Settings.</li></ol>' + image('6.FvUPZDU2.png', 'Cloudflare destination address verification') + image('7.BWZlPlip.png', 'Xinu Mail email forwarding configuration')]
    ]
  },
  api: {
    title: 'API Reference',
    intro: 'Public API requests use the raw token value in the Authorization header. Regenerating the global token invalidates the previous token.',
    sections: [
      ['generate-token', 'Generate Token', '<p><strong>POST</strong> <code>/api/public/genToken</code></p>' + table(['Parameter', 'Type', 'Required'], [['email', 'string', 'Yes'], ['password', 'string', 'Yes']]) + code('json', '{\n  "email": "admin@example.com",\n  "password": "your-password"\n}')],
      ['email-query', 'Email Query', '<p><strong>POST</strong> <code>/api/public/emailList</code></p>' + table(['Parameter', 'Type', 'Default', 'Description'], [['toEmail', 'string', '', 'Recipient; supports SQL LIKE patterns'], ['sendName', 'string', '', 'Sender name'], ['sendEmail', 'string', '', 'Sender email'], ['subject', 'string', '', 'Subject'], ['content', 'string', '', 'HTML content'], ['timeSort', 'string', 'desc', 'asc or desc'], ['type', 'integer', '', '0 inbox, 1 sent'], ['isDel', 'integer', '', '0 normal, 1 deleted'], ['num', 'integer', '1', 'Page number'], ['size', 'integer', '20', 'Items per page']]) + code('json', '{\n  "code": 200,\n  "message": "success",\n  "data": [{\n    "emailId": 999,\n    "subject": "Hello world",\n    "createTime": "2026-09-15 23:59:59",\n    "type": 0,\n    "isDel": 0\n  }]\n}')],
      ['add-user', 'Add User', '<p><strong>POST</strong> <code>/api/public/addUser</code></p>' + table(['Parameter', 'Type', 'Required', 'Description'], [['list', 'array&lt;object&gt;', 'Yes', 'Users to create'], ['email', 'string', 'Yes', 'Email address'], ['password', 'string', 'No', 'Generated when omitted'], ['roleName', 'string', 'No', 'Default role when omitted']])]
    ]
  }
}

function renderHeader(page) {
  const top = [['home', 'Index', '/'], ['dashboard', 'Deploy', '/guide/dashboard/'], ['sending', 'Configure', '/system/sending/'], ['api', 'API', '/api/api-doc/']]
  document.querySelector('#site-header').className = 'site-header'
  document.querySelector('#site-header').innerHTML = `<nav class="nav" aria-label="Main navigation"><a class="brand" href="/"><img src="/mail-mark.svg" alt=""><span>Xinu Mail</span></a><div class="search"><input id="search-input" type="search" placeholder="Search documentation" aria-label="Search documentation"><span class="search-icon">${icons.search}</span><div id="search-results" class="search-results" hidden></div></div><div class="top-links">${top.map(([id, text, href]) => `<a class="${page === id ? 'active' : ''}" href="${href}">${text}</a>`).join('')}</div><a class="github" href="https://github.com/x-inu/Doc-Cloud-Mail" aria-label="Documentation source on GitHub">${icons.github}</a><button class="menu-button" type="button" aria-label="Toggle navigation">${icons.menu}</button></nav>`
}

function renderSidebar(page) {
  const el = document.querySelector('#sidebar')
  if (!el) return
  el.setAttribute('aria-label', 'Documentation navigation')
  el.innerHTML = navigation.map(([label, items]) => `<section class="nav-group"><h2>${label}</h2>${items.map(([id, text, href]) => `<a class="${page === id ? 'active' : ''}" href="${href}">${text}</a>`).join('')}</section>`).join('')
}

function renderHome() {
  document.querySelector('#main').innerHTML = `<section class="home-hero"><div class="hero-content"><div class="eyebrow">Xinu Mail</div><h1 class="hero-title">Your mail system,<br>at the edge.</h1><p class="hero-copy">Deploy a private, multi-address email service on Cloudflare Workers. This field guide covers infrastructure, delivery, storage, forwarding, and the public API.</p><div class="hero-actions"><a class="button primary" href="/guide/dashboard/">Start deployment</a><a class="button" href="/api/api-doc/">Read the API</a></div></div><img class="hero-mark" src="/mail-mark.svg" alt="Xinu Mail at sign mark"></section><section class="feature-grid" aria-label="Documentation categories"><a class="feature" href="/guide/dashboard/"><span class="feature-index">01</span><h2>Edge-native</h2><p>Workers, D1, KV, R2, and Email Routing form a serverless mail stack.</p><span>Deploy from the dashboard →</span></a><a class="feature" href="/preview/description/"><span class="feature-index">02</span><h2>Multi-address</h2><p>Operate multiple mailboxes and domains from one installation.</p><span>Read the system overview →</span></a><a class="feature" href="/system/sending/"><span class="feature-index">03</span><h2>Delivery</h2><p>Configure outbound mail, attachments, verification, and forwarding.</p><span>Configure delivery →</span></a><a class="feature" href="/api/api-doc/"><span class="feature-index">04</span><h2>Automation</h2><p>Query messages and provision users through an authenticated API.</p><span>Open the API reference →</span></a></section><section class="system-strip"><strong>SYSTEM / DOCUMENTATION</strong><div class="system-meta"><span>RUNTIME / CLOUDFLARE WORKERS</span><span>DATA / D1 + KV + R2</span><span>INTERFACE / WEB + API</span></div></section>`
}

function renderPage(page) {
  const data = pages[page]
  document.querySelector('#main').innerHTML = `<header class="doc-head"><div class="eyebrow">MAIL / FIELD NOTES</div><h1>${data.title}</h1>${data.intro ? `<p>${data.intro}</p>` : ''}</header>${data.sections.map(([id, title, body]) => section(id, title, body)).join('')}`
  const outline = document.querySelector('#outline')
  outline.innerHTML = `<h2>On this page</h2>${data.sections.map(([id, title]) => `<a href="#${id}">${title}</a>`).join('')}`
}

function setupInteractions() {
  const menu = document.querySelector('.menu-button')
  if (menu) menu.addEventListener('click', () => {
    document.body.classList.toggle('menu-open')
    menu.innerHTML = document.body.classList.contains('menu-open') ? icons.close : icons.menu
  })
  const search = document.querySelector('.search')
  const input = document.querySelector('#search-input')
  const results = document.querySelector('#search-results')
  document.querySelector('.search-icon').addEventListener('click', () => { search.classList.toggle('open'); input.focus() })
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase()
    const matches = navigation.flatMap(x => x[1]).filter(([, text]) => text.toLowerCase().includes(query))
    results.innerHTML = matches.map(([, text, href]) => `<a href="${href}">${text}</a>`).join('') || '<a href="#">No matching pages</a>'
    results.hidden = !query
  })
  document.addEventListener('click', event => {
    if (!search.contains(event.target)) results.hidden = true
  })
  document.querySelectorAll('.copy-button').forEach(button => button.addEventListener('click', async () => {
    await navigator.clipboard.writeText(button.nextElementSibling.textContent)
    button.setAttribute('aria-label', 'Copied')
    setTimeout(() => button.setAttribute('aria-label', 'Copy code'), 1200)
  }))
}

const currentPage = document.body.dataset.page
renderHeader(currentPage)
if (currentPage === 'home') renderHome()
else { renderSidebar(currentPage); renderPage(currentPage) }
document.querySelector('#site-footer').className = 'site-footer'
document.querySelector('#site-footer').innerHTML = '<span>Xinu Mail / Cloudflare-native email infrastructure</span><span>Documentation maintained by x-inu</span>'
setupInteractions()

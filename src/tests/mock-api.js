const http = require('http');

const PORT = 5050;

const MOCK_USER = {
  userId: "user-123",
  cursorId: "cursor-123",
  username: "admin",
  firstName: "Admin",
  lastName: "User",
  email: "admin@example.com",
  role: "Admin",
  token: "mock-jwt-token"
};

const MOCK_DASHBOARD = {
  totalCompanies: 15,
  totalUsers: 42,
  activeUsers: 30,
  totalArticles: 120,
  totalSuppliers: 8,
  totalCustomers: 25,
  generatedAt: new Date().toISOString(),
};

let MOCK_COMPANIES = [
  {
    id: 'c1',
    name: 'Organización Demo 1',
    taxId: 'B12345678',
    address: 'Calle Principal 1',
    phone: '555-0001',
    email: 'contacto@demo1.com',
    isActive: true,
  },
  {
    id: 'c2',
    name: 'Organización Demo 2',
    taxId: 'B87654321',
    address: 'Avenida Secundaria 2',
    phone: '555-0002',
    email: 'contacto@demo2.com',
    isActive: false,
  },
];

const MOCK_LOGS = {
  logs: [
    { id: 1, level: 'Information', message: 'Test log 1', timeStamp: new Date().toISOString(), source: 'Test' },
    { id: 2, level: 'Warning', message: 'Test log 2', timeStamp: new Date().toISOString(), source: 'Test' },
  ],
  totalCount: 2,
  pageNumber: 1,
  pageSize: 100,
  totalPages: 1,
};

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  console.log(`${req.method} ${path}`);

  // Login
  if (path === '/api/admin/auth/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      let parsed = {};
      try {
        parsed = JSON.parse(body || '{}');
      } catch (e) {}
      const user = parsed.Usuario || parsed.username || '';
      const pass = parsed.Contraseña || parsed.password || '';
      // Rechazar credenciales de test para login-ko
      if (user === 'invalid' || pass === 'wrong') {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(MOCK_USER));
    });
    return;
  }

  // Dashboard
  if (path === '/api/admin/dashboard/summary' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(MOCK_DASHBOARD));
    return;
  }

  // Companies List (baseUrl includes /api, so path is /api/company)
  if ((path === '/api/company' || path === '/company') && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(MOCK_COMPANIES));
    return;
  }

  // Company Create
  if ((path === '/api/company' || path === '/company') && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body);
      const newCompany = { ...data, id: `new-${Date.now()}`, isActive: true };
      MOCK_COMPANIES = [...MOCK_COMPANIES, newCompany];
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newCompany));
    });
    return;
  }

  // Company Get by ID
  const companyIdMatch = path.match(/^\/api\/company\/([^/]+)$/) || path.match(/^\/company\/([^/]+)$/);
  if (companyIdMatch && req.method === 'GET') {
    const id = companyIdMatch[1];
    const company = MOCK_COMPANIES.find(c => c.id === id);
    if (company) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(company));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
    return;
  }

  // Company Update
  if (companyIdMatch && req.method === 'PUT') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const id = companyIdMatch[1];
      const data = JSON.parse(body);
      const idx = MOCK_COMPANIES.findIndex(c => c.id === id);
      if (idx >= 0) {
        MOCK_COMPANIES[idx] = { ...MOCK_COMPANIES[idx], ...data };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(MOCK_COMPANIES[idx]));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not Found' }));
      }
    });
    return;
  }

  // Logs
  if ((path.startsWith('/api/admin/logs') || path === '/api/admin/logs') && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(MOCK_LOGS));
    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
  console.log(`Mock API running on port ${PORT}`);
});

// Sistema de dados em memória
let suppliers = [
  { id: 1, name: 'Fornecedor ABC Ltda', cnpj: '12.345.678/0001-90', email: 'contato@abc.com', phone: '(11) 1111-1111', address: 'Rua A, 123', status: 'active' },
  { id: 2, name: 'Distribuidora XYZ S.A.', cnpj: '98.765.432/0001-10', email: 'vendas@xyz.com', phone: '(11) 2222-2222', address: 'Av. B, 456', status: 'active' },
  { id: 3, name: 'Tech Solutions Corp', cnpj: '11.222.333/0001-44', email: 'info@techsolutions.com', phone: '(11) 3333-3333', address: 'Rua C, 789', status: 'inactive' }
];

let products = [
  { id: 1, name: 'Smartphone Galaxy S23', sku: 'SM001', category: 'eletrônicos', price: 2499.00, stock: 45, supplier: 1, description: 'Smartphone Samsung Galaxy S23', status: 'active' },
  { id: 2, name: 'Notebook Dell Inspiron', sku: 'NB002', category: 'eletrônicos', price: 3299.00, stock: 12, supplier: 2, description: 'Notebook Dell Inspiron 15', status: 'active' },
  { id: 3, name: 'Tênis Nike Air Max', sku: 'TN003', category: 'esportes', price: 399.00, stock: 0, supplier: 3, description: 'Tênis Nike Air Max 270', status: 'inactive' }
];

let clients = [
  { id: 1, name: 'João Silva Santos', document: '123.456.789-00', email: 'joao@email.com', phone: '(11) 99999-9999', address: 'Rua X, 100', date: '15/11/2024', status: 'active' },
  { id: 2, name: 'Maria Oliveira', document: '987.654.321-00', email: 'maria@email.com', phone: '(11) 88888-8888', address: 'Av. Y, 200', date: '20/11/2024', status: 'active' }
];

let currentUser = null;

// Login Functions
function showLoginForm() {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('registerForm').classList.add('hidden');
}

function showRegisterForm() {
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('registerForm').classList.remove('hidden');
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Simulação de login
  if (email === 'admin@admin.com' && password === '123456') {
    currentUser = { name: 'Admin', email: email };
    login();
  } else {
    showAlert('Email ou senha incorretos!', 'error');
  }
});

document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    showAlert('Senhas não coincidem!', 'error');
    return;
  }

  // Simulação de registro
  currentUser = { name: name, email: email };
  showAlert('Cadastro realizado com sucesso!', 'success');
  setTimeout(() => {
    login();
  }, 1500);
});

function login() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('userName').textContent = `Bem-vindo, ${currentUser.name}`;
  document.getElementById('userAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
  updateDashboard();
}

function logout() {
  currentUser = null;
  document.getElementById('loginScreen').style.display = 'flex';
  showLoginForm();
}

// Navigation Functions
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });

  // Remove active class from all nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });

  // Show selected section
  document.getElementById(sectionId).classList.add('active');

  // Add active class to clicked nav link
  event.target.classList.add('active');

  // Update page title
  const titles = {
    'dashboard': 'Dashboard Principal',
    'mercadolivre': 'Integração Mercado Livre',
    'fornecedores': 'Gestão de Fornecedores',
    'produtos': 'Gestão de Produtos',
    'clientes': 'Gestão de Clientes',
    'configuracoes': 'Configurações do Sistema'
  };
  document.getElementById('pageTitle').textContent = titles[sectionId];
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// Dashboard Functions
function updateDashboard() {
  document.getElementById('supplierCount').textContent = suppliers.filter(s => s.status === 'active').length;
  document.getElementById('syncCount').textContent = Math.floor(Math.random() * 200) + 100;
  document.getElementById('newUsers').textContent = Math.floor(Math.random() * 15) + 5;

  const now = new Date();
  document.getElementById('lastSync').textContent = `Última sync: ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
}

// Supplier Functions
function showSupplierForm() {
  document.getElementById('supplierForm').classList.remove('hidden');
}

function hideSupplierForm() {
  document.getElementById('supplierForm').classList.add('hidden');
  clearSupplierForm();
}

function clearSupplierForm() {
  document.getElementById('supplierName').value = '';
  document.getElementById('supplierCNPJ').value = '';
  document.getElementById('supplierEmail').value = '';
  document.getElementById('supplierPhone').value = '';
  document.getElementById('supplierAddress').value = '';
}

function saveSupplier() {
  const name = document.getElementById('supplierName').value;
  const cnpj = document.getElementById('supplierCNPJ').value;
  const email = document.getElementById('supplierEmail').value;
  const phone = document.getElementById('supplierPhone').value;
  const address = document.getElementById('supplierAddress').value;

  if (!name || !cnpj || !email || !phone) {
    showAlert('Preencha todos os campos obrigatórios!', 'error');
    return;
  }

  const newSupplier = {
    id: suppliers.length + 1,
    name: name,
    cnpj: cnpj,
    email: email,
    phone: phone,
    address: address,
    status: 'active'
  };

  suppliers.push(newSupplier);
  updateSuppliersTable();
  hideSupplierForm();
  showAlert('Fornecedor cadastrado com sucesso!', 'success');
  updateDashboard();
}

function updateSuppliersTable() {
  const tbody = document.getElementById('suppliersTable');
  tbody.innerHTML = '';

  suppliers.forEach(supplier => {
    const row = tbody.insertRow();
    row.innerHTML = `
          <td>${supplier.name}</td>
          <td>${supplier.cnpj}</td>
          <td>${supplier.email}</td>
          <td><span class="status-badge status-${supplier.status}">${supplier.status === 'active' ? 'Ativo' : 'Inativo'}</span></td>
          <td>
            <button class="btn" onclick="editSupplier(${supplier.id})">Editar</button>
            <button class="btn btn-danger" onclick="deleteSupplier(${supplier.id})">Excluir</button>
          </td>
        `;
  });
}

function editSupplier(id) {
  const supplier = suppliers.find(s => s.id === id);
  if (supplier) {
    document.getElementById('supplierName').value = supplier.name;
    document.getElementById('supplierCNPJ').value = supplier.cnpj;
    document.getElementById('supplierEmail').value = supplier.email;
    document.getElementById('supplierPhone').value = supplier.phone;
    document.getElementById('supplierAddress').value = supplier.address;
    showSupplierForm();
  }
}

function deleteSupplier(id) {
  confirmAction('Excluir Fornecedor', 'Tem certeza que deseja excluir este fornecedor?', () => {
    suppliers = suppliers.filter(s => s.id !== id);
    updateSuppliersTable();
    showAlert('Fornecedor excluído com sucesso!', 'success');
    updateDashboard();
  });
}

// Product Functions
function showProductForm() {
  document.getElementById('productForm').classList.remove('hidden');
}

function hideProductForm() {
  document.getElementById('productForm').classList.add('hidden');
  clearProductForm();
}

function clearProductForm() {
  document.getElementById('productName').value = '';
  document.getElementById('productSKU').value = '';
  document.getElementById('productCategory').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productStock').value = '';
  document.getElementById('productSupplier').value = '';
  document.getElementById('productDescription').value = '';
}

function saveProduct() {
  const name = document.getElementById('productName').value;
  const sku = document.getElementById('productSKU').value;
  const category = document.getElementById('productCategory').value;
  const price = parseFloat(document.getElementById('productPrice').value);
  const stock = parseInt(document.getElementById('productStock').value);
  const supplier = parseInt(document.getElementById('productSupplier').value);
  const description = document.getElementById('productDescription').value;

  if (!name || !sku || !category || !price || !stock || !supplier) {
    showAlert('Preencha todos os campos obrigatórios!', 'error');
    return;
  }

  const newProduct = {
    id: products.length + 1,
    name: name,
    sku: sku,
    category: category,
    price: price,
    stock: stock,
    supplier: supplier,
    description: description,
    status: stock > 0 ? 'active' : 'inactive'
  };

  products.push(newProduct);
  updateProductsTable();
  hideProductForm();
  showAlert('Produto cadastrado com sucesso!', 'success');
}

function updateProductsTable() {
  const tbody = document.getElementById('productsTable');
  tbody.innerHTML = '';

  products.forEach(product => {
    const row = tbody.insertRow();
    const statusText = product.stock > 0 ? 'Disponível' : 'Esgotado';
    const statusClass = product.stock > 0 ? 'status-active' : 'status-inactive';

    row.innerHTML = `
          <td>${product.name}</td>
          <td>${product.sku}</td>
          <td>${product.category}</td>
          <td>R$ ${product.price.toFixed(2).replace('.', ',')}</td>
          <td>${product.stock}</td>
          <td><span class="status-badge ${statusClass}">${statusText}</span></td>
          <td>
            <button class="btn" onclick="editProduct(${product.id})">Editar</button>
            <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Excluir</button>
          </td>
        `;
  });
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    document.getElementById('productName').value = product.name;
    document.getElementById('productSKU').value = product.sku;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productSupplier').value = product.supplier;
    document.getElementById('productDescription').value = product.description;
    showProductForm();
  }
}

function deleteProduct(id) {
  confirmAction('Excluir Produto', 'Tem certeza que deseja excluir este produto?', () => {
    products = products.filter(p => p.id !== id);
    updateProductsTable();
    showAlert('Produto excluído com sucesso!', 'success');
  });
}

// Client Functions
function showClientForm() {
  document.getElementById('clientForm').classList.remove('hidden');
}

function hideClientForm() {
  document.getElementById('clientForm').classList.add('hidden');
  clearClientForm();
}

function clearClientForm() {
  document.getElementById('clientName').value = '';
  document.getElementById('clientDocument').value = '';
  document.getElementById('clientEmail').value = '';
  document.getElementById('clientPhone').value = '';
  document.getElementById('clientAddress').value = '';
}

function saveClient() {
  const name = document.getElementById('clientName').value;
  const document = document.getElementById('clientDocument').value;
  const email = document.getElementById('clientEmail').value;
  const phone = document.getElementById('clientPhone').value;
  const address = document.getElementById('clientAddress').value;

  if (!name || !document || !email || !phone) {
    showAlert('Preencha todos os campos obrigatórios!', 'error');
    return;
  }

  const newClient = {
    id: clients.length + 1,
    name: name,
    document: document,
    email: email,
    phone: phone,
    address: address,
    date: new Date().toLocaleDateString('pt-BR'),
    status: 'active'
  };

  clients.push(newClient);
  updateClientsTable();
  hideClientForm();
  showAlert('Cliente cadastrado com sucesso!', 'success');
}

function updateClientsTable() {
  const tbody = document.getElementById('clientsTable');
  tbody.innerHTML = '';

  clients.forEach(client => {
    const row = tbody.insertRow();
    row.innerHTML = `
          <td>${client.name}</td>
          <td>${client.document}</td>
          <td>${client.email}</td>
          <td>${client.phone}</td>
          <td>${client.date}</td>
          <td><span class="status-badge status-${client.status}">${client.status === 'active' ? 'Ativo' : 'Inativo'}</span></td>
          <td>
            <button class="btn" onclick="editClient(${client.id})">Editar</button>
            <button class="btn btn-danger" onclick="deleteClient(${client.id})">Excluir</button>
          </td>
        `;
  });
}

function editClient(id) {
  const client = clients.find(c => c.id === id);
  if (client) {
    document.getElementById('clientName').value = client.name;
    document.getElementById('clientDocument').value = client.document;
    document.getElementById('clientEmail').value = client.email;
    document.getElementById('clientPhone').value = client.phone;
    document.getElementById('clientAddress').value = client.address;
    showClientForm();
  }
}

function deleteClient(id) {
  confirmAction('Excluir Cliente', 'Tem certeza que deseja excluir este cliente?', () => {
    clients = clients.filter(c => c.id !== id);
    updateClientsTable();
    showAlert('Cliente excluído com sucesso!', 'success');
  });
}

// Settings Functions
function saveSettings() {
  const companyName = document.getElementById('companyName').value;
  const companyEmail = document.getElementById('companyEmail').value;
  const systemTheme = document.getElementById('systemTheme').value;
  const systemLanguage = document.getElementById('systemLanguage').value;
  const autoBackup = document.getElementById('autoBackup').value;
  const emailNotifications = document.getElementById('emailNotifications').value;

  // Simulação de salvamento de configurações
  showAlert('Configurações salvas com sucesso!', 'success');
}

function resetSettings() {
  confirmAction('Restaurar Configurações', 'Tem certeza que deseja restaurar as configurações padrão?', () => {
    document.getElementById('companyName').value = 'AdminPro Solutions';
    document.getElementById('companyEmail').value = 'admin@adminpro.com';
    document.getElementById('systemTheme').value = 'default';
    document.getElementById('systemLanguage').value = 'pt-BR';
    document.getElementById('autoBackup').value = 'daily';
    document.getElementById('emailNotifications').value = 'all';
    showAlert('Configurações restauradas!', 'success');
  });
}

// Export Functions
function exportData(type) {
  let data = [];
  let filename = '';

  switch (type) {
    case 'suppliers':
      data = suppliers;
      filename = 'fornecedores.csv';
      break;
    case 'products':
      data = products;
      filename = 'produtos.csv';
      break;
    case 'clients':
      data = clients;
      filename = 'clientes.csv';
      break;
  }

  if (data.length > 0) {
    const csv = convertToCSV(data);
    downloadCSV(csv, filename);
    showAlert(`Dados de ${type} exportados com sucesso!`, 'success');
  } else {
    showAlert('Nenhum dado para exportar!', 'error');
  }
}

function convertToCSV(data) {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
  ].join('\n');

  return csvContent;
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function createFullBackup() {
  const backupData = {
    suppliers: suppliers,
    products: products,
    clients: clients,
    timestamp: new Date().toISOString(),
    version: '1.0'
  };

  const jsonData = JSON.stringify(backupData, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `backup_completo_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showAlert('Backup completo criado com sucesso!', 'success');
}

// Mercado Livre Functions
function connectMercadoLivre() {
  showAlert('Conectando ao Mercado Livre...', 'info');
  setTimeout(() => {
    document.getElementById('mlStatus').innerHTML = '<span class="status-badge status-active">Conectado</span>';
    document.getElementById('mlProducts').textContent = Math.floor(Math.random() * 50) + 10;
    showAlert('Conectado ao Mercado Livre com sucesso!', 'success');
  }, 2000);
}

function syncProducts() {
  showAlert('Sincronizando produtos...', 'info');
  setTimeout(() => {
    const syncCount = Math.floor(Math.random() * 20) + 5;
    document.getElementById('mlProducts').textContent = parseInt(document.getElementById('mlProducts').textContent) + syncCount;
    document.getElementById('lastSync').textContent = `Última sync: ${new Date().toLocaleTimeString()}`;
    showAlert(`${syncCount} produtos sincronizados!`, 'success');
  }, 3000);
}

function publishProduct() {
  const selectedProducts = document.querySelectorAll('input[name="productSelect"]:checked');
  if (selectedProducts.length === 0) {
    showAlert('Selecione pelo menos um produto para publicar!', 'error');
    return;
  }

  showAlert(`Publicando ${selectedProducts.length} produto(s) no Mercado Livre...`, 'info');
  setTimeout(() => {
    showAlert('Produtos publicados com sucesso!', 'success');
    selectedProducts.forEach(checkbox => checkbox.checked = false);
  }, 2000);
}

// Utility Functions
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; font-size: 18px; cursor: pointer; float: right;">&times;</button>
      `;

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    if (alertDiv.parentElement) {
      alertDiv.remove();
    }
  }, 5000);
}

function confirmAction(title, message, callback) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').textContent = message;
  document.getElementById('confirmModal').style.display = 'block';

  document.getElementById('confirmBtn').onclick = () => {
    callback();
    closeModal();
  };
}

function closeModal() {
  document.getElementById('confirmModal').style.display = 'none';
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
  // Show dashboard by default
  showSection('dashboard');

  // Update tables with initial data
  updateSuppliersTable();
  updateProductsTable();
  updateClientsTable();

  // Set up periodic dashboard updates
  setInterval(updateDashboard, 30000); // Update every 30 seconds
});

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById('confirmModal');
  if (event.target === modal) {
    closeModal();
  }
};

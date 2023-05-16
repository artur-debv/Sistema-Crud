// Dados de exemplo
let records = [];

// Função para renderizar os registros na tabela
function renderRecords() {
  const recordsBody = document.getElementById('recordsBody');
  recordsBody.innerHTML = '';

  for (const record of records) {
    const newRow = recordsBody.insertRow();
    newRow.innerHTML = `
      <td>${record.name}</td>
      <td>${record.email}</td>
      <td>
        <button class="editBtn" data-id="${record.id}">Editar</button>
        <button class="deleteBtn" data-id="${record.id}">Excluir</button>
      </td>
    `;

    const editBtn = newRow.querySelector('.editBtn');
    const deleteBtn = newRow.querySelector('.deleteBtn');

    editBtn.addEventListener('click', () => editRecord(record.id, newRow));
    deleteBtn.addEventListener('click', () => deleteRecord(record.id, newRow));
  }
}

// Função para exibir o formulário de adição de registro
function showAddForm() {
  const addForm = document.getElementById('addForm');
  addForm.style.display = 'block';
}

// Função para ocultar o formulário de adição de registro
function hideAddForm() {
  const addForm = document.getElementById('addForm');
  addForm.style.display = 'none';
}

// Função para adicionar um novo registro
function addRecord(event) {
  event.preventDefault();

  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');

  const name = nameInput.value;
  const email = emailInput.value;
  const id = Date.now(); // Geração de ID único simples

  const record = { id, name, email };
  records.push(record);

  renderRecords();

  // Limpar o formulário
  nameInput.value = '';
  emailInput.value = '';

  hideAddForm();
}

// Função para editar um registro
function editRecord(recordId, row) {
  const name = prompt('Novo nome:');
  const email = prompt('Novo email:');

  const record = records.find(record => record.id === recordId);
  if (record) {
    record.name = name;
    record.email = email;

    // Atualizar a linha na tabela
    const nameCell = row.cells[0];
    const emailCell = row.cells[1];

    nameCell.textContent = name;
    emailCell.textContent = email;
  }
}

// Função para excluir um registro
function deleteRecord(recordId, row) {
  const confirmDelete = confirm('Tem certeza de que deseja excluir este registro?');
  if (confirmDelete) {
    records = records.filter(record => record.id !== recordId);
    row.remove();
  }
}

// Event listeners
document.getElementById('addBtn').addEventListener('click', showAddForm);
document.getElementById('addForm').addEventListener('submit', addRecord);

// Renderizar registros iniciais
renderRecords();
// API Base URL
const API_URL = '/api';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadRecords();
});

// Setup event listeners
function setupEventListeners() {
    const form = document.getElementById('anamnesis-form');
    form.addEventListener('submit', handleFormSubmit);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Show tab
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`${tabName}-tab`).classList.add('active');
    event.target.classList.add('active');
    
    if (tabName === 'list') {
        loadRecords();
    }
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch(`${API_URL}/anamnesis`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('Anamnese salva com sucesso!', 'success');
            event.target.reset();
            loadRecords();
        } else {
            showNotification('Erro ao salvar anamnese', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao conectar com o servidor', 'error');
    }
}

// Load all records
async function loadRecords() {
    const container = document.getElementById('records-list');
    container.innerHTML = '<p class="loading">Carregando registros...</p>';
    
    try {
        const response = await fetch(`${API_URL}/anamnesis`);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
            container.innerHTML = '';
            result.data.forEach(record => {
                container.appendChild(createRecordCard(record));
            });
        } else {
            container.innerHTML = '<div class="empty-state">Nenhum registro encontrado. Crie sua primeira anamnese!</div>';
        }
    } catch (error) {
        console.error('Erro:', error);
        container.innerHTML = '<div class="empty-state">Erro ao carregar registros</div>';
    }
}

// Create record card
function createRecordCard(record) {
    const card = document.createElement('div');
    card.className = 'record-card';
    
    const formattedDate = new Date(record.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    card.innerHTML = `
        <div class="record-header">
            <h3>${record.patientName}</h3>
            <button class="btn-delete" onclick="deleteRecord(${record.id})">🗑️ Excluir</button>
        </div>
        <div class="record-info">
            <div class="info-item">
                <span class="info-label">Idade</span>
                <span class="info-value">${record.age} anos</span>
            </div>
            <div class="info-item">
                <span class="info-label">Gênero</span>
                <span class="info-value">${record.gender}</span>
            </div>
            ${record.phone ? `
            <div class="info-item">
                <span class="info-label">Telefone</span>
                <span class="info-value">${record.phone}</span>
            </div>
            ` : ''}
            ${record.email ? `
            <div class="info-item">
                <span class="info-label">Email</span>
                <span class="info-value">${record.email}</span>
            </div>
            ` : ''}
            <div class="info-item">
                <span class="info-label">Data de Registro</span>
                <span class="info-value">${formattedDate}</span>
            </div>
        </div>
        <div class="info-item" style="margin-top: 15px;">
            <span class="info-label">Queixa Principal</span>
            <span class="info-value">${record.chiefComplaint}</span>
        </div>
        ${record.currentIllness ? `
        <div class="info-item" style="margin-top: 10px;">
            <span class="info-label">História da Doença Atual</span>
            <span class="info-value">${record.currentIllness}</span>
        </div>
        ` : ''}
    `;
    
    return card;
}

// Delete record
async function deleteRecord(id) {
    if (!confirm('Tem certeza que deseja excluir este registro?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/anamnesis/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('Registro excluído com sucesso!', 'success');
            loadRecords();
        } else {
            showNotification('Erro ao excluir registro', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao conectar com o servidor', 'error');
    }
}

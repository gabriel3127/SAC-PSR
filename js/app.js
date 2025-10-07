// js/app.js

// Formatar data
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// Obter cor por status
function getStatusColor(status) {
  const colors = {
    'em andamento': '#f59e0b',
    'resolvida': '#10b981'
  };
  return colors[status] || '#6b7280';
}

// Obter cor por prioridade
function getPriorityColor(prioridade) {
  const colors = {
    'baixa': '#10b981',
    'média': '#f59e0b',
    'alta': '#ef4444'
  };
  return colors[prioridade] || '#6b7280';
}

// Mostrar notificação
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Upload de arquivo
async function uploadFile(file, bucket = 'occurrences') {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Validar email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Carregar opções de select
async function loadSelectOptions(selectId, tableName, valueField = 'id', textField = 'nome') {
  const select = document.getElementById(selectId);
  if (!select) return;
  
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .order(textField);
  
  if (error) {
    console.error(`Erro ao carregar ${tableName}:`, error);
    return;
  }
  
  select.innerHTML = '<option value="">Selecione...</option>';
  data.forEach(item => {
    const option = document.createElement('option');
    option.value = item[valueField];
    option.textContent = item[textField];
    select.appendChild(option);
  });
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
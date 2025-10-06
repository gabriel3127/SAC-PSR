// js/auth.js

// Verificar se usuário está logado
async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    const currentPath = window.location.pathname;
    const fileName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    if (fileName !== 'index.html' && fileName !== '') {
      window.location.href = 'index.html';
    }
    return null;
  }
  
  // Buscar dados do usuário na tabela users
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_user_id', session.user.id)
    .single();
  
  if (error || !user) {
    console.error('Erro ao buscar usuário:', error);
    console.log('Session user id:', session.user.id);
    alert('Erro: Usuário não encontrado na tabela users. Verifique o console.');
    await supabase.auth.signOut();
    window.location.href = 'index.html';
    return null;
  }
  
  console.log('Usuário autenticado:', user);
  return user;
}

// Login
async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    throw error;
  }
  
  return data;
}

// Logout
async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}

// Verificar se é admin
function isAdmin(user) {
  return user && user.role === 'admin';
}

// Proteger páginas admin
async function requireAdmin() {
  const user = await checkAuth();
  if (!user || !isAdmin(user)) {
    alert('Acesso negado! Apenas administradores.');
    window.location.href = 'dashboard.html';
    return null;
  }
  return user;
}
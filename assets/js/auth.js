// assets/js/auth.js
import { supabase } from './supabaseClient.js';

const qs = (s) => document.querySelector(s);

// toggle between login and signup
document.addEventListener('DOMContentLoaded', () => {
  const toggle = qs('#toggle-auth');
  if (toggle) {
    toggle.addEventListener('click', () => {
      qs('#login-card').classList.toggle('hidden');
      qs('#signup-card').classList.toggle('hidden');
    });
  }

  qs('#signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = qs('#su-email').value.trim();
    const password = qs('#su-pass').value;
    if (!email || !password) return alert('enter email & password');
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return alert(error.message);
    // optionally create profile here (if backend trigger not present)
    alert('Signup success! Check your email to confirm. Login after verification.');
  });

  qs('#login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = qs('#li-email').value.trim();
    const password = qs('#li-pass').value;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return alert(error.message);
    }
    // redirect to home after login
    window.location.href = 'index.html';
  });

  qs('#logout-btn')?.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = 'auth.html';
  });
});

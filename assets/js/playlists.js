// assets/js/playlists.js
import { supabase } from './supabaseClient.js';

const container = document.getElementById('playlist-container');

async function load() {
  if (!container) return;
  container.innerHTML = 'Loading...';
  const mode = localStorage.getItem('bundo_mode') || null;
  let query = supabase.from('playlists').select('*').order('created_at', { ascending: true });
  if (mode) query = supabase.from('playlists').select('*').eq('mode', mode);
  const { data, error } = await query;
  if (error) {
    container.innerHTML = 'Error loading playlists';
    console.error(error);
    return;
  }
  if (!data || data.length === 0) {
    container.innerHTML = '<p>No playlists yet. Seed some in Supabase.</p>';
    return;
  }
  container.innerHTML = '';
  data.forEach(p => {
    const card = document.createElement('div');
    card.className = 'playlist-card';
    card.innerHTML = `
      <div class="cover">${p.cover_path ? `<img src="${p.cover_path}" alt="${p.title}">` : '🎵'}</div>
      <div class="meta">
        <h3>${p.title}</h3>
        <p>${p.platform}</p>
        <a class="open-btn" href="${p.url}" target="_blank" rel="noopener">Open</a>
      </div>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', load);

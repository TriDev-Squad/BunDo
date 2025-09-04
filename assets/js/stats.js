// assets/js/stats.js
import { supabase } from './supabaseClient.js';

async function loadStats() {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) {
    alert('Please login to see stats');
    window.location.href = 'auth.html';
    return;
  }

  // profile streak
  const { data: profile, error: pErr } = await supabase.from('profiles').select('streak_count').eq('id', user.id).single();
  if (pErr) console.error(pErr);
  document.getElementById('streak-count').innerText = profile?.streak_count ?? 0;

  // total minutes (sum of completed sessions)
  const { data: sessions, error: sErr } = await supabase.from('sessions').select('planned_minutes, actual_minutes, started_at').eq('user_id', user.id).eq('completed', true);
  if (sErr) console.error(sErr);
  const total = (sessions || []).reduce((sum, r) => sum + (r.actual_minutes ?? r.planned_minutes ?? 0), 0);
  document.getElementById('total-minutes').innerText = total;

  // show recent sessions
  const recent = (sessions || []).sort((a,b) => new Date(b.started_at) - new Date(a.started_at)).slice(0,5);
  const list = document.getElementById('recent-sessions');
  list.innerHTML = '<h3>Recent sessions</h3>';
  if (recent.length === 0) list.innerHTML += '<p>No sessions yet.</p>';
  else {
    const ul = document.createElement('ul');
    recent.forEach(s => {
      const li = document.createElement('li');
      li.innerText = `${s.actual_minutes ?? s.planned_minutes} min — ${new Date(s.started_at).toLocaleString()}`;
      ul.appendChild(li);
    });
    list.appendChild(ul);
  }
}

document.addEventListener('DOMContentLoaded', loadStats);

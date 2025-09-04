// assets/js/timer.js
import { supabase } from './supabaseClient.js';

const $ = (s) => document.querySelector(s);
let timerId = null;
let secondsLeft = 25 * 60;

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

async function init() {
  const mode = localStorage.getItem('bundo_mode') || 'focus';
  $('#mode-title').innerText = `Mode: ${mode}`;
  const durationInput = $('#duration-input');
  durationInput.addEventListener('change', () => {
    const min = parseInt(durationInput.value, 10) || 25;
    secondsLeft = min * 60;
    $('#timer-display').innerText = formatTime(secondsLeft);
  });

  $('#timer-display').innerText = formatTime(secondsLeft);

  $('#start-btn').addEventListener('click', startTimer);
  $('#pause-btn').addEventListener('click', pauseTimer);
  $('#reset-btn').addEventListener('click', resetTimer);
}

function startTimer() {
  if (timerId) return;
  timerId = setInterval(() => {
    if (secondsLeft <= 0) {
      clearInterval(timerId);
      timerId = null;
      onComplete();
      return;
    }
    secondsLeft -= 1;
    $('#timer-display').innerText = formatTime(secondsLeft);
  }, 1000);
}

function pauseTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function resetTimer() {
  pauseTimer();
  const min = parseInt($('#duration-input').value, 10) || 25;
  secondsLeft = min * 60;
  $('#timer-display').innerText = formatTime(secondsLeft);
}

async function onComplete() {
  alert('Session completed! +50 coins (demo)');
  // Save session to Supabase
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) {
    alert('Login to save session');
    return;
  }
  const plannedMin = parseInt($('#duration-input').value, 10) || 25;
  // Insert session row
  const { error } = await supabase.from('sessions').insert([{
    user_id: user.id,
    mode: localStorage.getItem('bundo_mode') || 'focus',
    planned_minutes: plannedMin,
    actual_minutes: plannedMin,
    completed: true,
    ended_at: new Date().toISOString()
  }]);
  if (error) {
    console.error(error);
    alert('Could not save session (check console)');
  } else {
    // optionally update local UI or redirect to stats
    window.location.href = 'stats.html';
  }
}

document.addEventListener('DOMContentLoaded', init);

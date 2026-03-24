import { client } from '../lib/appwrite.js';

// Example starter code for your Appwrite + JS app.
// Edit this file to begin building your application.

export async function init() {
  try {
    console.log('Appwrite endpoint:', import.meta.env.VITE_APPWRITE_ENDPOINT);
    console.log('Appwrite project:', import.meta.env.VITE_APPWRITE_PROJECT_ID);
    // Try a ping to verify connectivity
    const res = await client.ping();
    console.log('Ping result:', res);
    renderStatus(true);
  } catch (e) {
    console.warn('Ping failed:', e);
    renderStatus(false, e);
  }
}

function renderStatus(ok, err) {
  const el = document.getElementById('status-message');
  const desc = document.getElementById('status-description');
  if (!el || !desc) return;
  if (ok) {
    el.textContent = 'Connected to Appwrite';
    desc.textContent = '';
  } else {
    el.textContent = 'Not connected';
    desc.textContent = err && err.message ? String(err.message) : 'Check console for details';
  }
}

// Auto-init when loaded in browser
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    // do not block; it's fine if ping fails
    init().catch(() => {});
  });
}

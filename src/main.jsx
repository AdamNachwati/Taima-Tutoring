import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// Mock API handler for Stripe
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const [urlObj, options] = args;
  const url = typeof urlObj === 'string' ? urlObj : urlObj.toString();
  if (url.endsWith('/api/create-checkout-session') && options?.method === 'POST') {
    console.log('Mocking Stripe checkout...');
    const data = JSON.parse(options.body);
    // Open real Stripe test checkout in new tab for realistic payment UI demo
    const testAmount = data.price * 100; // cents
    const stripeTestUrl = `https://js.stripe.com/v3/buy-button?publishableKey=${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}&clientReferenceId=test&items[0][name]=${encodeURIComponent(data.pkg)}&items[0][amount]=${testAmount}`;
    window.open(stripeTestUrl, '_blank');
    // Then simulate success
    setTimeout(() => {
      window.location.href = '/tutoring?session_id=mock_success&status=success';
    }, 1500);
    return Promise.resolve({
      ok: true,
      json: async () => ({ id: 'mock_session', status: 'success' }),
    });
  }
  return originalFetch(...args);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

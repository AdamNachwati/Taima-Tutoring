let nextId = 1;
const inquiries = [];
const resources = [];
const testimonials = [];

export const db = { 
  auth: { 
    isAuthenticated: async ()=>false, 
    me: async ()=>null 
  }, 
  entities: new Proxy({
    TutoringInquiry: {
      create: async (data) => {
        const id = nextId++;
        inquiries.push({ id, ...data });
        return { id, ...data };
      },
      list: async () => inquiries,
    },
    Resource: {
      filter: async (filter, sort, limit) => {
        let result = resources;
        if (filter.status === 'published') result = result.filter(r => r.status === 'published');
        if (sort === '-created_date') result.reverse();
        if (limit) result = result.slice(0, limit);
        return result;
      },
      create: async (data) => {
        const id = nextId++;
        resources.push({ id, created_date: Date.now(), ...data });
        return { id, ...data };
      },
    },
    Testimonial: {
      list: async (sort, limit) => {
        let result = testimonials;
        if (sort === '-created_date') result.reverse();
        if (limit) result.slice(0, limit);
        return result;
      },
      create: async (data) => {
        const id = nextId++;
        testimonials.push({ id, created_date: Date.now(), ...data });
        return { id, ...data };
      },
    },
  }, {
    get(target, prop) {
      if (prop in target) return target[prop];
      return {
        filter: async () => [],
        get: async () => null, 
        create: async () => ({}), 
        update: async () => ({}), 
        delete: async () => ({}),
      };
    }
  }),
  integrations:{
    Core:{
      UploadFile:async()=>({ file_url:'' }) 
    } 
  } 
}; 

// Mock API endpoint for Stripe
if (typeof window !== 'undefined') {
  window.apiHandlers = window.apiHandlers || {};
  window.apiHandlers['POST /api/create-checkout-session'] = async (req) => {
    const data = await req.json();
    // Mock Stripe session URL (in real app, call stripe.checkout.sessions.create on server)
    const mockUrl = `https://checkout.stripe.com/pay/mock-session-${Date.now()}#successUrl=${encodeURIComponent(window.location.origin + '/tutoring?session_id=mock')}&cancelUrl=${encodeURIComponent(window.location.origin + '/tutoring')}`;
    return new Response(JSON.stringify({ url: mockUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };
}

export const supabaseMock = db; 
export default db;

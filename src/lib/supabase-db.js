import { supabase } from '../utils/supabase/client.js'

const entityTableMap = {
  TutoringInquiry: 'tutoring_inquiries',
  Resource: 'resources',
  Testimonial: 'testimonials'
}

const entities = new Proxy({}, {
  get: (target, prop) => {
    const table = entityTableMap[prop]
    if (!table) return { filter: async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }
    return {
      filter: async (query = {}, order, limit) => {
        let q = supabase.from(table).select()
        Object.keys(query).forEach(key => {
          q = q.eq(key, query[key])
        })
        if (order) {
          if (order.startsWith('-')) {
            q = q.order(order.slice(1), { ascending: false })
          } else {
            q = q.order(order)
          }
        }
        if (limit) q = q.limit(limit)
        const { data, error } = await q
        if (error) throw error
        return data || []
      },
      list: async (order, limit) => {
        return this.filter({}, order, limit)
      },
      get: async (id) => {
        const { data, error } = await supabase.from(table).select().eq('id', id).single()
        if (error) throw error
        return data
      },
      create: async (data) => {
        const { data: inserted, error } = await supabase.from(table).insert(data).select().single()
        if (error) throw error
        return inserted
      },
      update: async (id, data) => {
        const { data: updated, error } = await supabase.from(table).update(data).eq('id', id).select().single()
        if (error) throw error
        return updated
      },
      delete: async (id) => {
        const { data, error } = await supabase.from(table).delete().eq('id', id).select().single()
        if (error) throw error
        return data
      }
    }
  }
})

const auth = {
  isAuthenticated: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return !!session
  },
  me: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }
}

const integrations = {
  Core: {
    UploadFile: async (file) => {
      const { data, error } = await supabase.storage.from('uploads').upload(file.name, file)
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(data.path)
      return { file_url: publicUrl }
    }
  }
}

export const db = { auth, entities, integrations }
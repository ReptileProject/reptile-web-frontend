import axios from 'axios'

const api = axios.create({
  baseURL: '/reptile/species',
})

api.interceptors.request.use((config) => {
  console.log('[Species API Request', config)
  return config
})

api.interceptors.response.use(
  (response) => {
    console.log('[Species API Response', response)
    return response
  },
  (error) => {
    console.error('[Species API Error]', error)
    return Promise.reject(error)
  },
)

export const getCreatureDetail = (creatureId) => api.get(`/${creatureId}`)
export const getCreatureList = (searchCondition) => api.get('', searchCondition)
export const createCreature = (creature) => api.post('', creature)
export const updateCreature = (creature) => api.put('', creature)
export const deleteCreature = (creatureId) => api.delete(`/${creatureId}`)

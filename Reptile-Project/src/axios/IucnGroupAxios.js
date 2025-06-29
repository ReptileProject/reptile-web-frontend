import axios from 'axios'

const api = axios.create({
  baseURL: '/species/icun',
})

api.interceptors.request.use((config) => {
  console.log('[IucnGroup API Request', config)
  return config
})

api.interceptors.response.use(
  (response) => {
    console.log('[IucnGroup API Response', response)
    return response
  },
  (error) => {
    console.error('[IucnGroup APi Error', error)
    return Promise.reject(error)
  },
)

export const getIucnGroupDetail = (icunId) => api.get(`/${icunId}`)
export const getIucnGroupList = () => api.get()

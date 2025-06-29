import axios from 'axios'

const api = axios.create({
  baseURL: '/species/icun',
})

api.interceptors.request.use((config) => {
  console.log('[IcunGroup API Request', config)
  return config
})

api.interceptors.response.use(
  (response) => {
    console.log('[IcunGroup API Response', response)
    return response
  },
  (error) => {
    console.error('[IcunGroup APi Error', error)
    return Promise.reject(error)
  },
)

export const getIcunGroupDetail = (icunId) => api.get(`/${icunId}`)
export const getIcunGroupList = () => api.get()

import axios from 'axios'

const api = axios.create({
    baseURL: '/species/taxonomy'
})

api.interceptors.request.use((config) => {
    console.log('[Taxonomy API Request', config)
    return config
})

api.interceptors.response.use(
    (response) => {
        console.log('[Taxonomy API Response', response)
        return response
    },
    (error)=>{
        console.error('[Taxonomy API Error]', error)
        return Promise.reject(error)
    }
)

export const getChildGroups = (table, groupId) => api.get(`/${table}/children`, { groupId })
export const getGroupDetail = (table, groupId) => api.get(`/${table}/detail/${groupId}`)
export const getCreatureTaxonomy = (taxonomyId) => api.get(`/creature/${taxonomyId}`)
export const createGroup = (table, group) => api.post(`/${table}/group`, group)
export const createTaxonomy = (taxonomyGroup) => api.post(`/taxonomy`, taxonomyGroup)
export const deleteGroup = (table, groupId) => api.delete(`${table}/group/${groupId}`)
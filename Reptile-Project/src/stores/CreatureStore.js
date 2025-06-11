import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as api from '@/axios/CreatureAxios'

export const useCreatureStore = defineStore('creature', () => {
    const creatureList = ref([])
    const selectedCreature = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const fetchCreatureList = async (searchCondition = {})=> {
        loading.value = true
        try {
            const res = await api.getCreatureList(searchCondition)
            //creatureList.value = 
        } catch (e) {
            error.value = '생물 목록 조회 실패'
            console.error('[Creature List Fetch Error', e)
        } finally {
            loading.value = false
        }
    }

    const fetchCreatureDetail = async (creatureId) => {
        loading.value = true
        try {
            const res = await api.getCreatureDetail(creatureId)
            //selectedCreature.value = 
        } catch (e) {
            error.value = "생물 상세 조회 실패"
            console.error('[Creature Detail Fetch Error]', e)
        } finally {
            loading.value = false
        }
    }

    const createCreature = async (creature) => {
        try {
            const res = await api.createCreature(creature)
            return res.data.status === 'SUCCESS'
        } catch (e) {
            error.value = "생물 정보 등록 실패"
            console.error('[Create Creature Error', e)
        }
    }

    const updateCreature = async (creature) => {
        try {
            const res = await api.updateCreature(creature)
            return res.data.status === 'SUCCESS'
        } catch (e) {
            error.value = "생물 정보 수정 실패"
            console.error('[Update Creature Error', e)
        }
    }

    const deleteCreature = async (creatureId) => {
        try {
            const res = await api.deleteCreature(creatureId)
            return res.data.status === 'SUCCESS'
        } catch (e) {
            error.value = "생물 정보 삭제제 실패"
            console.error('[Delete Creature Error', e)
        }
    }

    return {
        creatureList,
        selectedCreature,
        loading,
        error,

        fetchCreatureList,
        fetchCreatureDetail,
        createCreature,
        updateCreature,
        deleteCreature
    }
})
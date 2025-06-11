import { defineStore } from 'pinia'
import * as api from '@/axios/CreatureAxios'

export const useCreatureStore = defineStore('creature', {
  state: () => ({
    creatureList: [],
    selectedCreature: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchCreatureList(searchCondition = {}) {
      this.loading = true
      this.error = null
      try {
        const res = await api.getCreatureList(searchCondition)
        this.creatureList = res.data 
      } catch (e) {
        this.error = '생물 목록 조회 실패'
        console.error('[Creature List Fetch Error]', e)
      } finally {
        this.loading = false
      }
    },

    async fetchCreatureDetail(creatureId) {
      this.loading = true
      this.error = null
      try {
        const res = await api.getCreatureDetail(creatureId)
        this.selectedCreature = res.data
      } catch (e) {
        this.error = '생물 상세 조회 실패'
        console.error('[Creature Detail Fetch Error]', e)
      } finally {
        this.loading = false
      }
    },

    async createCreature(creature) {
      this.error = null
      try {
        const res = await api.createCreature(creature)
        return res.data.status === 'SUCCESS'
      } catch (e) {
        this.error = '생물 정보 등록 실패'
        console.error('[Create Creature Error]', e)
        return false
      }
    },

    async updateCreature(creature) {
      this.error = null
      try {
        const res = await api.updateCreature(creature)
        return res.data.status === 'SUCCESS'
      } catch (e) {
        this.error = '생물 정보 수정 실패'
        console.error('[Update Creature Error]', e)
        return false
      }
    },

    async deleteCreature(creatureId) {
      this.error = null
      try {
        const res = await api.deleteCreature(creatureId)
        return res.data.status === 'SUCCESS'
      } catch (e) {
        this.error = '생물 정보 삭제 실패'
        console.error('[Delete Creature Error]', e)
        return false
      }
    }
  }
})

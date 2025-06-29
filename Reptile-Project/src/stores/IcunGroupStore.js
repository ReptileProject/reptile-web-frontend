import { defineStore } from 'pinia'
import * as api from '@/axios/IcunGroupAxios'

export const useIcunGroupStore = defineStore('icun', {
  state: () => ({
    groupList: [],
    selectedGroup: null,
    loading: false,
  }),

  actions: {
    async loadGroupList() {
      this.loading = true
      try {
        const res = await api.getIcunGroupList()
        this.groupList = res.data.data.icunGroupList
        return this.groupList
      } catch (e) {
        console.error('ICUN 그룹 로딩 실패:', e)
        return []
      } finally {
        this.loading = false
      }
    },
  },
})

import { defineStore } from 'pinia'
import * as api from '@/axios/TaxonomyAxios'

export const useTaxonomyStore = defineStore('taxonomy', {
  state: () => ({
    groupTree: [],         // 전체 분류군 트리
    selectedTaxonomy: null, // 생물 하나의 분류 전체 정보
    loading: false
  }),

  actions: {
    async loadGroupChildren(table, parentId) {
      this.loading = true
      try {
        const res = await api.getChildGroups(table, parentId ?? null)
        const children = res.data.data
    
        if (parentId === null) {
          this.groupTree = children
        } else {
          const parent = this.findGroupById(this.groupTree, parentId)
          if (parent) {
            parent.children = children
          }
        }
        return children
      } catch (e) {
        console.error('하위 그룹 로딩 실패:', e)
        return []
      } finally {
        this.loading = false
      }
    }
    ,

    async addTaxonomy(taxonomyGroup) {
        try {
          await api.createTaxonomy(taxonomyGroup)
        } catch (e) {
          console.error('Taxonomy 추가 실패:', e)
        }
      },
      
    async addGroup(table, group) {
      try {
        await api.createGroup(table, group)
        await this.loadGroupChildren(table, group.parentId)
      } catch (e) {
        console.error('그룹 추가 실패:', e)
      }
    },

    async removeGroup(table, groupId, parentId) {
      try {
        await api.deleteGroup(table, groupId)
        await this.loadGroupChildren(table, parentId)
      } catch (e) {
        console.error('그룹 삭제 실패:', e)
      }
    },

    async loadGroupDetail(table, groupId) {
      try {
        const res = await api.getGroupDetail(table, groupId)
        return res.data
      } catch (e) {
        console.error('그룹 상세 조회 실패:', e)
        return null
      }
    },

    async loadCreatureTaxonomy(taxonomyId) {
      try {
        const res = await api.getCreatureTaxonomy(taxonomyId)
        this.selectedTaxonomy = res.data
      } catch (e) {
        console.error('taxonomy 전체 조회 실패:', e)
        this.selectedTaxonomy = null
      }
    },

    findGroupById(groups, id) {
      for (const group of groups) {
        if (group.id === id) return group
        if (group.children) {
          const found = this.findGroupById(group.children, id)
          if (found) return found
        }
      }
      return null
    }
  }
})

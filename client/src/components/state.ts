import {ref, computed} from 'vue'

export const collapsed = ref(false)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)

export const SIDEBAR_WIDTH = 250
export const SIDEBAR_WIDTH_COLLAPSED = 68
export const sidebarWidth = computed(() => {
    return `${collapsed.value? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
})
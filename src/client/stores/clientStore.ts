import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { AppModes } from '../AppModes'

export const useClientStore = defineStore('client', () => {
    const _appMode = ref(AppModes.Welcome)
    const appMode = computed(() => _appMode.value)
    function changeAppMode(newAppMode: AppModes) {
        _appMode.value = newAppMode
    }
    return {
        appMode,
        changeAppMode
    }
})

import { defineStore } from 'pinia'

export const useDisneyStore = defineStore('disney', {
  state: () => ({
    loading: false,
    error: null,
    twin: null,
    villain: null,
    demiseScenario: '',
    parallelUniverse: ''
  }),

  actions: {
    async generateDestiny(userName, vibe) {
      this.loading = true
      this.error = null
      
      try {
        const randomPage = Math.floor(Math.random() * 50) + 1
        const response = await fetch(`https://api.disneyapi.dev/character?page=${randomPage}&pageSize=50`)
        const json = await response.json()
        
        if (!json.data || json.data.length < 2) {
          throw new Error("if at first you dont succeed, you brusgh it off and Try again!")
        }

        const characters = json.data.filter(c => c.imageUrl)

        const twinIndex = Math.floor(Math.random() * characters.length)
        this.twin = characters[twinIndex]

        let villainIndex = Math.floor(Math.random() * characters.length)
        if (villainIndex === twinIndex) {
          villainIndex = (villainIndex + 1) % characters.length
        }
        this.villain = characters[villainIndex]

        this.parallelUniverse = generateUniverse(vibe)
        this.demiseScenario = generateDemise(this.villain.name, this.twin.name, vibe)

      } catch (err) {
        this.error = "Failed to connect, just like always. Try again!"
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    reset() {
      this.twin = null
      this.villain = null
      this.demiseScenario = ''
      this.parallelUniverse = ''
    }
  }
})


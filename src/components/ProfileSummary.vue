<template>
  <div class="space-y-6 animate-fadeIn">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div class="bg-stone-950 border border-stone-800 p-6 rounded-xl flex flex-col items-center text-center">
        <span class="text-xs text-pink-500 font-bold tracking-widest uppercase mb-3">Your Disney Twin</span>
        <img 
          :src="twin.imageUrl" 
          :alt="twin.name" 
          class="w-36 h-36 object-cover rounded-full border-2 border-stone-700 shadow-md mb-4 grayscale hover:grayscale-0 transition-all duration-300" 
        />
        <h3 class="font-black text-xl text-stone-100">{{ twin.name }}</h3>
        <p class="text-xs text-stone-500 mt-2 max-w-[200px] truncate" v-if="twin.films?.length">
          Featured in: {{ twin.films[0] }}
        </p>
      </div>

      <div class="bg-stone-950 border border-red-950/60 p-6 rounded-xl flex flex-col items-center text-center shadow-[inset_0_0_20px_rgba(153,27,27,0.1)]">
        <span class="text-xs text-red-500 font-bold tracking-widest uppercase mb-3">Your Executioner</span>
        <img 
          :src="villain.imageUrl" 
          :alt="villain.name" 
          class="w-36 h-36 object-cover rounded-full border-2 border-red-900 shadow-md mb-4" 
        />
        <h3 class="font-black text-xl text-stone-100">{{ villain.name }}</h3>
        <p class="text-xs text-red-900/70 mt-2 max-w-[200px] truncate" v-if="villain.films?.length">
          Origin Movie: {{ villain.films[0] }}
        </p>
      </div>
    </div>

    <div class="bg-stone-950 border border-stone-800 rounded-xl p-6 space-y-4">
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-pink-500">Parallel Universe Blueprint</h4>
        <p class="text-stone-300 mt-1 text-base">{{ parallelUniverse }}</p>
      </div>
      <hr class="border-stone-900" />
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-red-500">Your Inevitable Demise</h4>
        <p class="text-stone-300 mt-1 text-base italic leading-relaxed">
          "{{ demiseScenario }}"
        </p>
      </div>
    </div>

    <button 
      @click="$emit('reset')"
      class="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium py-3 rounded-xl transition-all text-sm uppercase tracking-wider"
    >
      Change Your Fate (Try Again)
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProfileSummary',
  props: {
    twin: Object,
    villain: Object,
    parallelUniverse: String,
    demiseScenario: String
  }
}
</script>
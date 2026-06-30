<template>
  
  <main class="max-w-4xl mx-auto px-4 py-8">
    <nav class="sticky top-0 z-50 bg-stone-950/80 backdrop-blur-md border-b border-stone-800 px-6 py-4">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      
      <div class="flex items-center space-x-2 group cursor-pointer" @click="resetGame">
        <span class="text-xl font-black text-red-600 tracking-wider transition-colors group-hover:text-pink-500">
          DISNEY<span class="text-stone-200">DEMISE</span>
        </span>
        <span class="text-xs bg-red-950 border border-red-800 text-red-400 px-2 py-0.5 rounded-full font-mono uppercase tracking-widest animate-pulse">
          v1.0 the original
        </span>
      </div>

      <!-- Navigation Links -->
      <div class="flex items-center space-x-6 text-sm font-medium">
                <button @click="resetGame" class="bg-stone-900 hover:bg-red-950 text-stone-200 border border-stone-700 hover:border-red-700 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
          Refresh the page so you forget you died
        </button>
      </div>
    </div>
  </nav>
    <section
      id="about"
      class="scroll-mt-24 relative min-h-[400px] my-10 p-12 rounded-2xl overflow-hidden flex items-center border-2 border-stone-800 bg-stone-950 transition-all duration-500 hover:border-red-900 hover:shadow-[0_0_50px_rgba(153,27,27,0.3)] group"
    >
      <img
        src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTkf0CAVgT01qCwZEIyqbSQncYjYcgjx6tvpizM0w7wqp_VmL3jW7cXc8kimk-qApFgesItzx300PfbaU0"
        class="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-[2s] group-hover:scale-105"
        alt="Maleficent Dark Aesthetic background"
      />

      <div
        class="relative z-10 max-w-lg opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      >
        <span
          class="text-pink-500 font-bold tracking-[0.2em] uppercase text-sm mb-2 block italic"
          >This is your Disney Demise App. Do you want to know how will you
          Perish?</span
        >
        <h2 class="text-4xl font-black text-red-500 mb-4">
          Your Untastefull fate in a Nutshell, a meagre prediction
        </h2>
        <p class="text-stone-300 leading-relaxed text-lg">
          Dont be affraid to share information, a little weel of knowledge can
          return an Ocean of Tears.
        </p>
      </div>
    </section>

    <section
      class="w-full bg-stone-900 border border-stone-800 p-6 md:p-8 rounded-2xl shadow-xl mb-20"
    >
      <div v-if="!gameState.twin && !gameState.loading">
        <form @submit.prevent="generateDestiny" class="space-y-6">
          <div>
            <label
              class="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2"
              >So what did your parents name you when you saw light?</label
            >
            <input
              v-model="form.name"
              type="text"
              placeholder="a few strokes of your fingers will help me predict your name"
              required
              class="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-red-700 transition-all"
            />
          </div>

          <div>
            <label
              class="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2"
              >what does your Aura feel like today? choose it and we can make it
              darker and moore miserable</label
            >
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="v in [
                  'Chaos and Mayham',
                  'I feel Pretty',
                  'Hangry, for money and food',
                ]"
                :key="v"
                type="button"
                @click="form.vibe = v"
                :class="
                  form.vibe === v
                    ? 'bg-red-900 border-red-500 text-white shadow-lg shadow-red-900/50'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                "
                class="capitalize py-3 rounded-xl font-medium border text-sm transition-all"
              >
                {{ v }}
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-gradient-to-r from-red-900 to-stone-800 hover:from-red-800 hover:to-stone-700 active:scale-[0.99] font-bold text-white py-4 rounded-xl shadow-lg transition-all text-center tracking-wide uppercase text-sm"
          >
            click here so you know what the Eff we are atalking about
          </button>
        </form>
      </div>

      <div v-if="gameState.loading" class="text-center py-12 space-y-4">
        <div
          class="w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full animate-spin mx-auto"
        ></div>
        <p
          class="text-red-500 font-medium animate-pulse tracking-wide text-sm uppercase"
        >
          figuring out which dwarf is the evil one
        </p>
      </div>

      <div
        v-if="gameState.error"
        class="text-center py-6 text-red-400 space-y-4"
      >
        <p>{{ gameState.error }}</p>
        <button
          @click="resetGame"
          class="text-xs underline text-stone-400 hover:text-stone-200"
        >
          Try Again
        </button>
      </div>

      <ProfileSummary
        v-if="gameState.twin && !gameState.loading"
        :twin="gameState.twin"
        :villain="gameState.villain"
        :parallelUniverse="gameState.parallelUniverse"
        :demiseScenario="gameState.demiseScenario"
        @reset="resetGame"
      />
    </section>
  </main>
</template>

<script>
import { ref, reactive } from "vue";
import ProfileSummary from "../components/ProfileSummary.vue";

export default {
  name: "HomeView",
  components: {
    ProfileSummary,
  },
  setup() {
    const form = reactive({
      name: "",
      vibe: "Chaos and Mayham",
    });

    const gameState = reactive({
      loading: false,
      error: null,
      twin: null,
      villain: null,
      parallelUniverse: "",
      demiseScenario: "",
    });

    const generateDestiny = async () => {
      gameState.loading = true;
      gameState.error = null;

      try {
        const randomPage = Math.floor(Math.random() * 40) + 1;
        const response = await fetch(
          `https://api.disneyapi.dev/character?page=${randomPage}&pageSize=50`,
        );
        const json = await response.json();

        if (!json.data || json.data.length < 2) {
          throw new Error(
            "The portal to the Magic Kingdom is blocked. Try again!",
          );
        }

        const validCharacters = json.data.filter((c) => c.imageUrl);

        const twinIndex = Math.floor(Math.random() * validCharacters.length);
        gameState.twin = validCharacters[twinIndex];

        let villainIndex = Math.floor(Math.random() * validCharacters.length);
        if (villainIndex === twinIndex) {
          villainIndex = (villainIndex + 1) % validCharacters.length;
        }
        gameState.villain = validCharacters[villainIndex];

        gameState.parallelUniverse = getUniverseText(form.vibe);

        // FIX: Passed form.vibe as the third argument so getDemiseText can target the chosen key
        gameState.demiseScenario = getDemiseText(
          gameState.villain.name,
          gameState.twin.name,
          form.vibe,
        );
      } catch (err) {
        gameState.error = "Failed to channel the spirits. Click reload below.";
        console.error(err);
      } finally {
        gameState.loading = false;
      }
    };

    const resetGame = () => {
      gameState.twin = null;
      gameState.villain = null;
      gameState.parallelUniverse = "";
      gameState.demiseScenario = "";
      gameState.error = null;
    };

    function getUniverseText(vibe) {
      const options = {
        "Chaos and Mayham":
          "You have to work now to be able to breathe air, otherwise the NFC CHIp will block your blood cells from Oygen",
        "I feel Pretty":
          "you keep aging, but never die. well at least your soul doesnt, but, you mentally, did die a long time ago",
        "Hangry, for money and food":
          "you have 4 minutes to save the word and a bar of kit-kat. you dont save it and the bar of chocolate disappears everytime you try to take a bite",
      };
      return (
        options[vibe] ||
        "An alternate realm completely overrun by rogue, miserable shadows."
      );
    }

    function getDemiseText(villain, twin, vibe) {
      const scenarios = {
        "Chaos and Mayham": [
          `got caught up in a stampede of manic, enchanted broomsticks sent by ${villain} to aggressively sweep you out of reality.`,
          `was entirely obliterated when ${villain} mistook you for your twin, ${twin}, during a highly toxic, explosive magical rooftop brawl.`,
        ],
        "I feel Pretty": [
          `was handed an incredibly gorgeous, glossy ruby-red apple by ${villain}. You knew it was poisoned, but it matched your aesthetic so perfectly that you bit it anyway.`,
          `signed a 400-page magical scroll from ${villain} to fix a bad hair day, accidentally trading away your human vocal cords and your eternal freedom.`,
        ],
        "Hangry, for money and food": [
          `was lured into a dark dungeon by ${villain} promising an all-you-can-eat royal banquet, only to be locked away forever to wash dishes for eternity.`,
          `tried to steal gold from ${villain}'s private vault to buy a snack, resulting in you getting turned into a tiny, decorative clock on their mantelpiece.`,
        ],
      };

      const activeSet = scenarios[vibe];

      // Safety handling fallback if a weird vibe slips past
      if (!activeSet || activeSet.length === 0) {
        return `${villain} ensures that you was totally cornered by them and trapped forever inside a tiny, dusty magic lamp left behind by ${twin}.`;
      }

      const randomChoice =
        activeSet[Math.floor(Math.random() * activeSet.length)];
      return `${villain} ensures that you ${randomChoice}`;
    }

    return {
      form,
      gameState,
      generateDestiny,
      resetGame,
    };
  },
};
</script>

<template>
  <div class="w-full">
    <div class="w-11/12 mx-auto my-2 p-4 rounded-lg shadow-md bg-gray-200">
      <input
        type="text"
        class="border-2 border-gray-300 rounded-2xl bg-gray-100 h-8 w-full px-2 mx-auto focus:outline-none focus:ring focus:border-blue-300"
        placeholder="O que procuras?"
        v-model="textForSearch"
        @input="search"
      />
      <div class="w-full">
        <button class="text-purple-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="resetAll">
          <fa :icon="['fas', 'times']"/> Limpar filtros
        </button>
      </div>
    </div>
    <div
      :class="['w-full mt-10 mb-4 bg-gray-50 rounded-lg px-2', animes.length > 0 ? 'grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : '']"
    >
      <template v-if="animes.length > 0">
        <AnimeCard
          v-for="(a, i) in animes"
          :key="i"
          :link="a.link"
          :cover="a.cover"
          :name="a.name"
          class="hover:shadow-md hover:border-2 hover:border-gray-200"
        />
      </template>
      <div v-else class="h3 w-max my-4 mx-auto text-gray-400 underline">
        Pesquise algo tipo "Tate no Yuusha no Nariagari"
      </div>
    </div>
    <!-- <div v-else class="w-11/12">
      Pesquise algo
    </div> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    animes: [],
    textForSearch: '',
    pagination: null
  }),
  methods: {
    resetAll() {
      this.animes = []
      this.textForSearch = ''
      this.pagination = null
    },
    search() {
      if (this.textForSearch.length > 0) {    
        let url = `/pesquisar/${this.textForSearch}`

        this.$axios.$get(url).then(a => {
          this.animes = a.animes
          this.pagination = a.pagination || null
        })
      } else {
        this.resetAll()
      }
    },
  },
  created() {
    this.textForSearch = this.textForSearch || this.$route.query.s || '',
    this.search()
  },
}
</script>
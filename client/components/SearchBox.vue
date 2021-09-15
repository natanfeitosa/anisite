<template>
  <div>
    <div class="w-full relative">
      <input
        type="text"
        class="border-2 border-gray-300 rounded-2xl bg-gray-100 h-8 w-full pl-2 pr-7 mx-auto focus:outline-none focus:ring focus:border-blue-300"
        placeholder="O que procuras?"
        v-model="textForSearch"
      />
      <button class="absolute bottom-0 right-0 top-0 flex flex-col justify-center px-2.5 hover:text-gray-500 transform hover:scale-110" @click="goToSeachPage">
        <fa :icon="['fas', 'search']" />
      </button>
    </div>
    <!-- <ul class="flex flex-col"></ul> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    textForSearch: '',
  }),
  methods: {
    goToSeachPage() {
      this.$router.push({ path: 'pesquisar', query: { s: this.textForSearch } })
      this.$parent.showSearchBox = false
    }
  },
}
</script>

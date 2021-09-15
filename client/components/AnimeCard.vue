<template>
  <article class="bg-gray-100 rounded-lg" itemscope itemtype="https://schema.org/Series" :ref="'card_' + uuid">
    <div class="relative w-full rounded-t-lg overflow-hidden" >
      <img :src="cover" :alt="name" class="duration-700 h-full hover:rotate-3 hover:scale-125 object-cover transform transition-all w-full cursor-pointer" itemprop="image" @click="coverZoom" />
      <span class="absolute top-2 left-2 rounded-full py-1.5 px-3 font-medium bg-red-500 text-white h5">4.5</span>
    </div>
    <div class="px-2 py-2">
      <a itemprop="url" :href="link" class="block text-gray-600 hover:text-blue-500">
        <span class="h5" itemprop="name">
          <!-- <span class="absolute inset-0" /> -->
          {{ name }}
        </span>
      </a>
    </div>
  </article>
</template>

<script>
// const uuid = Date.now()

export default {
  data: () => ({
    uuid: 0,
  }),
  props: {
    link: String,
    name: String,
    cover: String
  },
  created(){
    this.uuid = Date.now()
  },
  mounted() {
    let elCard = this.$refs[`card_${this.uuid}`]

    this.resize(elCard)
    window.addEventListener('resize', () => {
      this.resize(elCard)
    })
  },
  methods: {
    resize(el) {
      el.querySelector('div').style.height = `${parseFloat(getComputedStyle(el).width) * 1.481}px`
    },
    coverZoom(e) {
      // console.log(e.target.src)
      this.$swal({
        imageUrl: e.target.src,
        showCloseButton: true,
        showConfirmButton: false,
      })
    }
  }
}
</script>

<style>
/* width: min(240px, 98%) */
</style>

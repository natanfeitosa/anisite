<template>
  <div>
    <section
      v-for="(value, section_name, si) in animes"
      :kei="si"
      class="w-full mt-10"
    >
      <h5 class="section-title text-gray-700 mb-2 pl-2"> {{ section_name }} </h5>
      <div class="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4 bg-gray-50 rounded-lg shadow-lg p-2">
        <AnimeCard
          v-for="(a, i) in value"
          :key="i"
          :link="a.link"
          :cover="a.cover"
          :name="a.name"
          class="hover:shadow-md hover:border-2 hover:border-gray-200"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { titleCase } from '../utils'

export default {
  async asyncData({ $axios }) {
    let animes = await $axios.$get('/')
    
    animes = Object.keys(animes).reduce((acc, cur) => {
      acc[titleCase(cur.replace('_', ' '))] = animes[cur].map(a => {
        a['name'] = a['name'].split('–').shift()

        return a
      })

      return acc
    }, {})

    return { animes }
  },
  // data: () => ({
  //   animes: [
  //     {
  //       link:'https://all-animes.herokuapp.com/v1/a/904822',
  //       name:'Tensei shitara Slime Datta Ken 2 Temporada',
  //       cover:'https://www.anitube.site/wp-content/uploads/Tensei-shitara-Slime-Datta-Ken-2-Parte-2-Todos-os-Episodios-AniTube-e1625592688397.jpg'
  //     },
  //   ],
  // }),
}
</script>

<style lang="scss">
$xs: 475px;
$md: 768px;
$lg: 1024px;

@media (max-width: 575px) {
  .cus-571-96 {
    width: 96%;
  }
}

@media (min-width: $lg) {
  .w-1\/4\.5 {
    width: 23.33%
  }
}

.section-title {
  position: relative;
  width: fit-content;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    background-color: orange;
    border-radius: 6px;
  }

  &::before {
    top: -1px;
    width: 4px;
  }

  &::after {
    right: -4px;
    height: 4px;
  }
}
</style>

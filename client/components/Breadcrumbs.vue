<template>
  <div class="container flex justify-center w-full">
    <div class="bg-gray-200 mx-1 my-3 px-3 py-0.5 rounded w-full">
      <ol class="flex items-center text-blue-800">

        <li
          v-for="(crumb, i) in crumbs"
          :class="['flex', 'items-center', i !== 0 && 'ml-2']"
        >
          <a
            :href="crumb.path"
            :class="{'font-bold': !crumb.disabled}"
            :disabled="crumb.disabled"
            class="hover:underline"
          >
            {{ crumb.title }}
          </a>
          <span v-if="!crumb.disabled" class="ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </li>
      </ol>
    </div>
  </div>
</template>

<style lang="scss" scoped>
li {
  display: inline-flex;
  align-items: center;
  /* margin: 0 2px;
  padding: 0 2px; */

  /* &::after {
    margin: 0 2px;
    padding: 0 2px;
  } */
}
</style>

<script>
import { titleCase } from '../utils'

const breadDefault = [
  {
    title: 'Home',
    path: '/',
    disabled: false,
  }
]

export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath

      if (fullPath == '/') {
        return [Object.assign(breadDefault[0], {disabled: true})]
      }

      const path = fullPath.startsWith('/') ? fullPath.substring(1) : fullPath
      const params = path.split('#').shift().split('?').shift().split('/')
      // const crumbs = []
      let newPath = ''

      return breadDefault.concat(params.reduce((acc, cur, idx) => {
        newPath = `${newPath}/${cur}`
        let item

        if (cur) {
          const match = this.$router.match(`${newPath}/`)
          if (match.name !== null) {
            item = {
              disabled: (idx == params.length - 1),
              title: titleCase(cur.replace('-', ' ')),
              ...match,
            }
          }
        }

        return acc.concat([item])
      }, []))
    },
  },
}
</script>

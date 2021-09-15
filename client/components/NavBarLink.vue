<template>
  <NuxtLink :to='link' :class='computedClass'>
    {{ content }}
  </NuxtLink>
</template>

<script>
const clsBas = ['px-3', 'py-2', 'rounded-md', 'font-medium']
const clsDef = ['text-gray-300', 'hover:bg-gray-700', 'hover:text-white']
const clsCur = ['text-white']

export default {
  name: 'NavBarLink',
  props: {
    link: {
      type: String,
      default: '/'
    },
    content: {
      type: String,
      default: 'Home'
    },
    mobile: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    currentPath: '',
    computedClass: clsBas,
  }),
  created() {
    this.currentPath = this.$route.path

    if (this.to === '' && this.to === ' ') {
      this.to = '/'
    }

    this.computedClass = [
      ...(
        this.link === this.currentPath ?
        this.mountClass(
          ['bg-gray-900', 'block', 'text-base'],
          ['bg-gray-600', 'text-sm'], clsCur
        ) :
        clsDef
      )
    ].concat(this.mountClass(['text-base', 'block'], 'text-sm', clsBas))
  },
  methods: {
    mountClass(a1, a2, pa=[]) {
      const arr = e => Array.isArray(e) ? e : [e]
      return this.mobile ? pa.concat(arr(a1)) : pa.concat(arr(a2))
    }
  },
}
</script>

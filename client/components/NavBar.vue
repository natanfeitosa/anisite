<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <nav class="bg-gray-800 relative">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" @click="handlerNavBar">
            <span class="sr-only">Abrir menu</span>
            <fa :icon="['fas', menuNavBar ? 'times' : 'bars']" class="fa-lg" />
          </button>
          <button type="button" class="bg-gray-800 m-1 rounded-full text-gray-400 hover:text-white focus:text-white mx-2" @click="handlerSearchBox">
            <span class="sr-only">Abrir caixa de pesquisa</span>
            <fa :icon="['fas', 'search']" />
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <img class="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
            <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow">
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              
              <NavBarLink v-for="(item, index) in menu" :key="index" :link="item.path" :content="item.name" />
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button type="button" class="hidden sm:block bg-gray-800 m-1 rounded-full text-gray-400 hover:text-white focus:text-white mx-2" @click="handlerSearchBox">
            <span class="sr-only">Abrir caixa de pesquisa</span>
            <fa :icon="['fas', 'search']" />
          </button>
          <div>
            <button type="button" class="bg-gray-800 m-1 rounded-full text-gray-400 hover:text-white focus:text-white" style="font-size: 20px" @click="handlerNotifications">
              <span class="sr-only">Ver notificações</span>
              <fa :icon="['far', 'bell']" />
            </button>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div v-if="openNotifications" class="shadow-2xl origin-top-right absolute right-2 sm:right-10 z-10 mt-3 w-72 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <div class="w-full">
                  <h6 class="text-center text-lg pb-1">Notificações</h6>
                  <div class="border-t-2 border-b-2 border-gray-300 flex p-2 flex justify-between items-center">
                    <h6>{{ mesnotifications }}</h6>
                    <a href="" class="text-green-500 hover:text-blue-500 font-medium hover:underline" @click.prevent="readAll">Marcar todas</a>
                  </div>
                </div>
                <div class="divide-y divide-gray-300 overflow-x-hidden overflow-y-auto" style="max-height: 250px;">
                  <a
                    v-for="(not, i) in notifications"
                    :key="i"
                    href="#"
                    :class="[!not.readed ? 'hover:text-gray-500 hover:bg-gray-50 hover:bg-opacity-100 bg-gray-200 bg-opacity-95' : 'hover:bg-gray-100', 'flex py-3 px-4']"
                  >
                    <span v-if="not.type == 'new_episode'">
                      Novo episódio de <span class="font-medium">{{ not.message }}</span>
                    </span>
                  </a>
                </div>
              </div>
            </transition>
          </div>

          <!-- Profile dropdown -->
          <div class="ml-3 relative">
            <div>
              <button id="user-menu-button" type="button" class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-expanded="false" aria-haspopup="true" @click="handlerUserDrop">
                <span class="sr-only">Abre menu do usuário</span>
                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
              </button>
            </div>

            <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div v-if="userDrop" class="origin-top-right absolute right-0 z-10 mt-3 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <!-- Active: "bg-gray-100", Not Active: "" -->
                <a id="user-menu-item-0" href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1">Perfil</a>
                <a id="user-menu-item-1" href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1">Configurações</a>
                <a id="user-menu-item-2" href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1">Sair</a>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-show="menuNavBar" id="mobile-menu" class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <NavBarLink v-for="(item, index) in menu" :key="index" :link="item.path" :content="item.name" mobile />
      </div>
    </div>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-to-class="transform opacity-100 scale-105"
      leave-active-class="transition ease-in duration-200"
      leave-to-class="transform opacity-0 scale-95"
    >
      <SearchBox v-if="showSearchBox" class="origin-top -bottom-9 absolute left-0 mx-auto right-0 w-11/12 sm:w-11/12 z-10" />
    </transition>
  </nav>

</template>

<script>
export default {
  name: 'NavBar',
  data: () => ({
    menuNavBar: false,
    showSearchBox: false,
    openNotifications: false,
    userDrop: false,
    menu: [
      { name: 'Home', path: '/' },
      { name: 'Categorias', path: '#' },
      { name: 'Legendados', path: '#' }
    ],
    notifications: [
      { type: 'new_episode', message: 'Black Clover', readed: false },
      { type: 'new_episode', message: 'Tate no Yuusha no Nariagari', readed: false },
      { type: 'new_episode', message: 'Tensei Shitara Slime', readed: true },
      { type: 'new_episode', message: 'Tensura Nikki', readed: true },
      { type: 'new_episode', message: 'Naruto Shippuden', readed: true },
    ],
  }),
  computed: {
    mesnotifications() {
      const nums = this.notifications.filter(i => !i.readed).length

      return nums > 1 ? `${nums} notificações` : `${nums} notificação`
    },
  },
  watch: {
    menuNavBar: {
      immediate: true,
      handler(menuNavBar) {
        if (process.client) {
          if (menuNavBar) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      }
    },
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (e.keyCode === 27 && this.menuNavBar) this.menuNavBar = false;
    });
  },
  methods: {
    handlerNavBar() {
      this.menuNavBar = !this.menuNavBar;
      this.showSearchBox = this.openNotifications = this.userDrop = false
    },
    handlerSearchBox() {
      this.showSearchBox = !this.showSearchBox
      this.menuNavBar = this.openNotifications = this.userDrop = false
    },
    handlerNotifications() {
      this.openNotifications = !this.openNotifications
      this.menuNavBar = this.showSearchBox = this.userDrop = false
    },
    handlerUserDrop() {
      this.userDrop = !this.userDrop;
      this.menuNavBar = this.showSearchBox = this.openNotifications = false
    },
    readAll() {
      this.notifications = this.notifications.map(i => {
        i.readed = true

        return i
      })
    }
  },
};
</script>


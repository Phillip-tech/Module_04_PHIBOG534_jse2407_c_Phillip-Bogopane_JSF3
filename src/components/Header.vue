<template>
    <header class="sticky z-50 top-0">
      <nav class="bg-gray-500 border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" class="flex items-center space-x-3">
            <img src="assets/online-shop.png" class="h-8" alt="SwiftCart Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">SwiftCart</span>
          </a>
          <button
            @click="navbarOpen = !navbarOpen"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div :class="navbarOpen ? 'block' : 'hidden'" class="w-full md:block md:w-auto">
            <ul
              class="flex flex-col top-10 font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-500 md:space-x-8 md:flex-row md:mt-0"
            >
              <li>
                <a href="#" class="block py-2 px-3 text-white rounded hover:bg-gray-100">Wishlist</a>
              </li>
              <li class="relative">
                <a href="#" class="block py-2 px-3 text-white rounded hover:bg-gray-100">Cart</a>
                <span
                  class="absolute top-0 left-3 -mt-2 -ml-2 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white"
                  >2</span
                >
              </li>
              <li>
                <a href="#" class="block py-2 px-3 text-white rounded hover:bg-gray-100">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const navbarOpen = ref(false);
  </script>
  
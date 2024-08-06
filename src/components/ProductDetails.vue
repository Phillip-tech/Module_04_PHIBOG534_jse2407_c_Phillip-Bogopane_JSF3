<template>
    <div v-if="product" class="flex flex-col md:flex-row mt-6">
      <img :src="product.image" :alt="product.title" class="w-full md:w-1/2 object-cover rounded-md" />
      <div class="md:ml-6 mt-4 md:mt-0">
        <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
        <p class="text-gray-600 mb-4">{{ product.category }}</p>
        <p class="mb-4">{{ product.description }}</p>
        <div class="font-bold text-xl mb-4">${{ product.price }}</div>
        <button
          @click="toggleFavorite(product.id)"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mr-2"
        >
          {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
        </button>
        <button
          @click="addToCart(product)"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  
  const store = useStore();
  const route = useRoute();
  
  const product = computed(() => store.state.selectedProduct);
  const isFavorite = computed(() => store.state.favorites.includes(product.value.id));
  
  onMounted(() => {
    const productId = route.params.id;
    const selectedProduct = store.state.products.find((p) => p.id === parseInt(productId));
    store.commit('setSelectedProduct', selectedProduct);
  });
  
  const toggleFavorite = (productId) => {
    store.commit('toggleFavorite', productId);
  };
  
  const addToCart = (product) => {
    store.commit('addToCart', product);
  };
  </script>
  
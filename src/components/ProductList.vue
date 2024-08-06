<template>
  <div>
    <div class="flex justify-between items-center mt-4">
      <!-- Search and Filter -->
      <form @submit.prevent="handleSearch" class="relative w-full max-w-sm flex items-center">
        <div class="relative flex w-full"> <!-- Added flex class here -->
          <input
            type="search"
            v-model="searchTerm"
            class="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search products..."
          />
          <div class="flex items-center"> <!-- Added flex and items-center classes here -->
            <button
              type="submit"
              class="p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m2-5a7 7 0 1 1-7-7 7 7 0 0 1 7 7Z"
                />
              </svg>
              <span class="sr-only">Search</span>
            </button>
            <button @click="resetFilters" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-2"> <!-- Added ml-2 class for margin -->
              Reset
            </button>
          </div>
        </div>
      </form>
    

      <!-- Filter and Sort -->
      <div class="flex space-x-3">
        <select v-model="filterItem" @change="handleFilterChange" class="border-gray-300 rounded-lg">
          <option value="All categories">All categories</option>
          <option value="electronics">Electronics</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>

        <select v-model="sortOrder" @change="handleSortOrderChange" class="border-gray-300 rounded-lg">
          <option value="default">Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>   
      </div>
    </div>

    <!-- Product List -->
    <div v-if="loading" class="flex justify-center mt-10">
      Loading...
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @toggleFavorite="toggleFavorite"
        @addToCart="addToCart"
        :isFavorite="favorites.includes(product.id)"
        class="flex flex-col justify-between" 
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ProductCard from './ProductCard.vue';

const store = useStore();

onMounted(() => {
  store.dispatch('fetchProducts');
});

const loading = computed(() => store.state.loading);
const categories = computed(() => store.state.categories);
const filterItem = computed({
  get: () => store.state.filterItem,
  set: (value) => store.commit('setFilterItem', value),
});
const sortOrder = computed({
  get: () => store.state.sortOrder,
  set: (value) => store.commit('setSortOrder', value),
});
const searchTerm = computed({
  get: () => store.state.searchTerm,
  set: (value) => store.commit('setSearchTerm', value),
});
const favorites = computed(() => store.state.favorites);
const filteredProducts = computed(() => store.getters.filteredProducts);

const handleFilterChange = () => {
  store.commit('setFilterItem', filterItem.value);
};

const handleSortOrderChange = () => {
  store.commit('setSortOrder', sortOrder.value);
};

const handleSearch = () => {
  store.commit('setSearchTerm', searchTerm.value);
};

const toggleFavorite = (productId) => {
  store.commit('toggleFavorite', productId);
};

const addToCart = (product) => {
  store.commit('addToCart', product);
};

const resetFilters = () => {
  store.commit('setFilterItem', 'All categories');
  store.commit('setSortOrder', 'default');
  store.commit('setSearchTerm', '');
};
</script>

<style scoped>
/* Ensure the ProductCard component has a consistent height */
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.product-card .add-to-cart-button {
  margin-top: auto; /* Push the button to the bottom */
}
</style>
<template>
  <div v-if="product" class="flex flex-col md:flex-row mt-6">
    <img :src="product.image" :alt="product.title" class="h-30 w-full md:w-30 object-contain rounded-md" />
    <div class="md:ml-6 mt-4 md:mt-0">
      <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
      <p class="text-gray-600 mb-4">{{ product.category }}</p>
      <p class="mb-4">{{ product.description }}</p>
      <div class="font-bold text-xl mb-4">${{ product.price }}</div>
      <!-- Display the fetched data -->
      <div class="flex items-center mb-4">
        <span v-for="star in fullStars" :key="star" class="fas fa-star text-yellow-500"></span>
        <span v-if="hasHalfStar" class="fas fa-star-half-alt text-yellow-500"></span>
        <span v-for="star in emptyStars" :key="star" class="far fa-star text-yellow-500"></span>
      </div>
      <p>Ratings: {{ stars }}</p> <!-- Display the rating number -->
      <p>Number of Reviews: {{ numReviews }}</p>
      <button @click="goBack" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mr-2">
        Back
      </button>
      <button @click="toggleFavorite(product.id)" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mr-2">
        {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
      </button>
      <button @click="addToCart(product)" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios'; // Import Axios

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const product = computed(() => store.state.selectedProduct);
    const isFavorite = computed(() => store.state.favorites.includes(product.value.id));

    const stars = ref(0);
    const numRatings = ref(0);
    const numReviews = ref(0);

    const fullStars = computed(() => Math.floor(stars.value));
    const hasHalfStar = computed(() => stars.value % 1 >= 0.5);
    const emptyStars = computed(() => 5 - fullStars.value - (hasHalfStar.value ? 1 : 0));

    const loading = ref(false); // Add loading state

    const toggleFavorite = (productId) => {
      store.commit('toggleFavorite', productId);
    };

    const addToCart = (product) => {
      store.commit('addToCart', product);
    };

    const goBack = () => {
      router.go(-1); // Navigate back to the previous page
    };

    onMounted(async () => {
      const productId = route.params.id;
      const selectedProduct = store.state.products.find((p) => p.id === parseInt(productId));
      store.commit('setSelectedProduct', selectedProduct);

      // Fetch additional data from API
      try {
        loading.value = true; // Set loading to true before API call
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        stars.value = response.data.rating.rate;
        numRatings.value = response.data.rating.count;
        numReviews.value = response.data.rating.count; // Assuming numReviews is the same as numRatings
      } catch (error) {
        console.error('Error fetching additional data:', error);
      } finally {
        loading.value = false; // Set loading to false after API call
      }
    });

    return { product, isFavorite, toggleFavorite, addToCart, stars, numRatings, numReviews, goBack, fullStars, hasHalfStar, emptyStars, loading };
  }
};
</script>
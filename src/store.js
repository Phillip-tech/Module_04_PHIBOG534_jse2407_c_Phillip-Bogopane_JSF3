import { createStore } from 'vuex';

export default createStore({
  state: {
    products: [],
    categories: ['All categories'],
    favorites: [],
    cart: [],
    searchTerm: '',
    filterItem: 'All categories',
    sortOrder: 'default',
    loading: false,
    selectedProduct: null,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setFilterItem(state, filter) {
      state.filterItem = filter;
    },
    setSortOrder(state, sortOrder) {
      state.sortOrder = sortOrder;
    },
    setSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    setSelectedProduct(state, product) {
      state.selectedProduct = product;
    },
    toggleFavorite(state, productId) {
      const index = state.favorites.indexOf(productId);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(productId);
      }
    },
    addToCart(state, product) {
      state.cart.push(product);
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('setLoading', true);
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      commit('setProducts', data);
      commit('setLoading', false);
    },
  },
  getters: {
    filteredProducts: (state) => {
      let filteredProducts = state.products;

      if (state.filterItem !== 'All categories') {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === state.filterItem
        );
      }

      if (state.searchTerm) {
        filteredProducts = filteredProducts.filter((product) =>
          product.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }

      if (state.sortOrder === 'low-to-high') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (state.sortOrder === 'high-to-low') {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else {
        filteredProducts.sort((a, b) => a.id - b.id);
      }

      return filteredProducts;
    },
  },
});

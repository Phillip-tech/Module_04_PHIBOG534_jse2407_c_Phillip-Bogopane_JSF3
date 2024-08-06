
  
  <template>
    <footer class="bg-gray-500 text-white p-4">
      <div class="container mx-auto text-center">
        &copy; 2024 SwiftCart. All rights reserved.
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      };
    },
    computed: {
      copyrightText() {
        return `&copy; ${this.year} SwiftCart. All rights reserved.`;
      }
    }
  };
  </script>
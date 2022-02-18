<template>
  <div class="currencies">
    <input
      v-model="searchText"
      @input="searchValute"
      class="search"
      type="text"
      placeholder="Search..."
    >
    <div
      class="currencies__items"
    >
      <p
        v-if="!currencies.length"
        class="not__found"
      >
        Ничего не найдено!
      </p>
      <Card
        v-for="item of currencies"
        :key="item.id"
        :valute="item"
      />

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Card from '../components/Card.vue';
export default {
  components: {
    Card,
  },

  data() {
    return {
      currencies: [],
      searchText: '',
    }
  },

  computed: {
    ...mapGetters({
      allCurrencies: 'getAllCurrency'
    }),
  },

  async created () {
    await this.fetchAllCurrency();
    this.currencies = this.allCurrencies;
  },

  methods: {
    ...mapActions({
      fetchAllCurrency: 'fetchAllCurrency',
    }),

    searchValute () {
      this.currencies = [];
      this.currencies = this.allCurrencies.filter(item => {
        if (
          item.CharCode.toLowerCase().includes(this.searchText.toLowerCase())
          || item.Name.toLowerCase().includes(this.searchText.toLowerCase())
        ) {
          return true
        }
      })
    }
  }
}
</script>

<style scoped>
.currencies {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.currencies__items {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.search {
  margin: 20px auto;
  padding: 5px;
  outline: none;
  width: 300px;
  font-size: 20px;
  border-radius: 5px;
}

.not__found {
  color: #fff;
  font-size: 35px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
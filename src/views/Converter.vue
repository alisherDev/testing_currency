<template>
  <div class="converter">
    <div class="block">
      <span class="title">{{ leftSelected.Name }}</span>
      <div>
        <select @change="selectValuteLeft" :value="leftSelected.CharCode">
          <option
            v-for="item of currencies"
            :key="item.id"
            :value="item.CharCode"
          >
            {{ item.CharCode }}
          </option>
        </select>
        <input type="text" v-model="convertingValue">
      </div>
    </div>
    <img
      class="arrow__twoway"
      src="../assets/arrows/arrowtwoway.png"
      alt=""
      @click="changeValues"
    >
    <div class="block">
      <span class="title">{{ rightSelected.Name }}</span>
      <div class="right__block">
        <select @change="selectValuteRight" :value="rightSelected.CharCode">
          <option
            v-for="item of currencies"
            :key="item.id"
            :value="item.CharCode"
          >
            {{ item.CharCode }}
          </option>
        </select>
        <div class="converted">{{ convertedVal }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      leftSelected: {},
      rightSelected: {},
      convertingValue: 1,
    }
  },

  computed: {
    ...mapGetters({
      currencies: 'getAllCurrency'
    }),

    convertedVal () {
      return ((this.leftSelected.Value * this.convertingValue) / this.rightSelected.Value).toFixed(4);
    }
  },

  async created () {
    await this.fetchAllCurrency();
    this.leftSelected = { ...this.currencies[0]}
    this.rightSelected = { ...this.currencies[0]}
  },

  methods: {
    ...mapActions({
      fetchAllCurrency: 'fetchAllCurrency',
    }),

    selectValuteLeft (event) {
      const item = this.currencies.find(item => item.CharCode == event.target.value)
      this.leftSelected = item;
    },

    selectValuteRight (event) {
      const item = this.currencies.find(item => item.CharCode == event.target.value)
      this.rightSelected = item;
    },

    changeValues () {
      const temp = { ...this.rightSelected };
      this.rightSelected = { ...this.leftSelected}
      this.leftSelected = temp;
      this.convertingValue = this.convertedVal;
    }
  },
}
</script>

<style scoped>
.converter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 50px;
}
.block {
  width: 300px;
  height: 60px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 15px;
}

select {
  width: 100px;
  padding: 5px;
}

.converted {
  padding: 5px;
}

input {
  width: 100px;
  padding: 5px;
  margin-left: 20px;
}

.right__block {
  display: flex;
  gap: 20px;
}

.arrow__twoway {
  height: 40px;
  cursor: pointer;
  background-color: #fff;
  margin: 10px;
  padding: 7px;
  border-radius: 5px;
}

.title {
  color: rgba(27, 26, 26, 0.438);
  margin-bottom: 10px;
}
</style>
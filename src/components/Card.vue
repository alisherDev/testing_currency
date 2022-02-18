<template>
  <div
    v-if="valute"
    class="cart"
  >
    <div class="name">{{ valute.Name }}</div>
    <div class="currency__block">
      <div class="rate">
        {{ text.convertingValue }} {{ text.convertingCurrency }}
        <img
          class="twoway__arrow"
          src="../assets/arrows/arrowtwoway.png"
          alt=""
          @click="changeValues"
        >
        {{ text.convertedValue }} {{ text.convertedCurrency }}
      </div>
      <div
        class="difference"
        :class="text.class"
      >
        <img class="arrow__up" :src="text.arrow" alt="">
        <div class="value">{{ text.difference }}</div>
      </div>
    </div>
  </div>
</template>

<script>
const arrowDown = require('../assets/arrows/arrowdown.svg');
const arrowUp = require('../assets/arrows/arrowup.svg');
export default {
  components: {
  },

  props: {
    valute: {
      type: Object,
      default: null,
    }
  },

  data() {
    return {
      defaultCurrency: 'RUB',
      changingValuteName: 'RUB',
      changingValue: 1,
      convertedValuteName: '',
      convertedValue: 0,
      reverse: false,
    };
  },

  computed: {
    text () {
      const diff =  this.reverse ?
          ((1 / this.valute.Value) - (1 / this.valute.Previous)).toFixed(4):
          (this.valute.Value - this.valute.Previous).toFixed(4)
      return {
        convertingValue: this.changingValue,
        convertingCurrency: this.reverse ? this.defaultCurrency :this.valute.CharCode,
        convertedValue: this.reverse ? this.convertedValue : this.valute.Value,
        convertedCurrency: this.reverse ? this.valute.CharCode : this.defaultCurrency,
        class: diff < 0 ? 'negative' : '',
        difference: diff,
        arrow: diff < 0 ? arrowDown : arrowUp
      }
    },
  },

  mounted () {
  },

  methods: {
    changeValues () {
      this.convertedValue = (this.changingValue / this.valute.Value).toFixed(6);
      this.reverse  = !this.reverse;
    },
  }
}
</script>

<style scoped>
.cart {
  width: 400px;
  height: 60px;
  background-color: #fff;
  border-radius: 5px;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.name {
  color: rgba(15, 15, 15, 0.486);
  font-size: 18px;
}

.currency__block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
}

.difference {
  color: green;
  display: flex;
}

.arrow__up {
  width: 20px;
  fill: green;
}

.negative {
  color: red;
}

.rate {
  display: flex;
  align-content: center;
  gap: 10px;
}

.twoway__arrow {
  width: 30px;
  cursor: pointer;
}
</style>
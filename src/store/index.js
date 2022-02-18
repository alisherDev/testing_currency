import { createStore } from 'vuex';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.cbr-xml-daily.ru/daily_json.js',
});

const store = createStore({
  state: {
    count: 10,
    currencies: {},
  },

  getters: {
    getAllCurrency (state) {
      return state.currencies;
    },
  },

  mutations: {
    setAllCurrency (state, data) {
      state.currencies = Object.values(data).map(item => {
        const Value = (item.Value / item.Nominal).toFixed(4);
        const Previous = item.Previous / item.Nominal.toFixed(4);
        return { ...item, Value, Previous };
      })
    }
  },

  actions: {
    async fetchAllCurrency ({ commit }) {
      const { data } = await api({
        method: 'GET'
      });
      commit('setAllCurrency', data.Valute);
      console.log('data', data);
    }
  }
})

export default store;
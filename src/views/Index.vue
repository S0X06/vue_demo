<template>
	<section v-if="errored">
    <p>错误</p>
  </section>

  <section v-else>
    <div v-if="loading">Loading...</div>
 <!--eslint-disable-next-line-->
    <div
      v-else
      v-for="currency in info"
      class="currency"
    >
      {{ currency.description }}:
      <span class="lighten">
       <!--eslint-disable-next-line-->
        <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
      </span>
    </div>

  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'index',
  data () {
    return {
      info: null,
      loading: true,
      errored: false
    }
  },
  filters: {
    currencydecimal (value) {
      return value.toFixed(2)
    }
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        this.info = response.data.bpi
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }


}
	
</script>

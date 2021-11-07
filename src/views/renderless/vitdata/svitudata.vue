<template>
  <div>
    <slot :valuedate="valuedate" />
    <div class="right">{{ errMsg }}</div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['value', 'rules'],
  data() {
    return {
      errMsg: ''
    }
  },
  methods: {
    valuedate() {
      const valuedate = this.rules.reduce((per, cur) => {
        const check = cur && cur.test && cur.test(this.value)
        this.errMsg = check ? '' : cur.message
        return check && per
      }, true)
      return valuedate
    }
  }
}
</script>
<style scoped>
.right{
  color: red;
}
</style>

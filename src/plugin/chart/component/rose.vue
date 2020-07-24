<template>
  <div id="rose"></div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { Rose } from '@antv/g2plot'

export default {
  name: 'Rose',
  data() {
    return {
      data: [
        {
          type: '初中',
          value: 2700,
        },
        {
          type: '高中',
          value: 2500,
        },
        {
          type: '本科',
          value: 1898,
        },
        {
          type: '硕士',
          value: 2376,
        },
        {
          type: '博士',
          value: 1760,
        },
        {
          type: '其他',
          value: 1500,
        },
      ],
    }
  },
  mounted() {
    new Rose('rose', {
      title: {
        text: '学历占比分析',
        visible: true,
      },
      data: this.data,
      radiusField: 'value',
      categoryField: 'type',
      colorField: 'type',
    }).render()
  },
}
</script>

<style scoped></style>

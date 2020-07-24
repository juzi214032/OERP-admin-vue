<template>
  <div id="Radar"></div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { Radar } from '@antv/g2plot'

export default {
  name: 'Radar',
  data() {
    return {
      data: [
        { type: '初中', mark: '男', value: 80 },
        { type: '高中', mark: '男', value: 20 },
        { type: '本科', mark: '男', value: 60 },
        { type: '硕士', mark: '男', value: 40 },
        { type: '博士', mark: '男', value: 70 },
        { type: '初中', mark: '女', value: 70 },
        { type: '高中', mark: '女', value: 50 },
        { type: '本科', mark: '女', value: 90 },
        { type: '硕士', mark: '女', value: 80 },
        { type: '博士', mark: '女', value: 20 },
      ],
    }
  },
  mounted() {
    new Radar('Radar', {
      title: {
        text: '性别、学历对比分析',
        visible: true,
      },
      data: this.data,
      radiusField: 'value',
      angleField: 'type',
      seriesField: 'mark',
      color: ['#4577FF', '#FEC108'],
      legend: {
        visible: true,
        position: 'top-right',
      },
    }).render()
  },
}
</script>

<style scoped></style>

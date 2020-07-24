<template>
  <div id="line"></div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { Line } from '@antv/g2plot'

export default {
  name: 'Line',
  data() {
    return {
      data: [
        { month: '1月', value: 100, type: '初中' },
        { month: '2月', value: 80, type: '初中' },
        { month: '3月', value: 100, type: '初中' },
        { month: '4月', value: 70, type: '初中' },
        { month: '5月', value: 120, type: '初中' },
        { month: '6月', value: 80, type: '初中' },
        { month: '7月', value: 60, type: '初中' },
        { month: '1月', value: 50, type: '高中' },
        { month: '2月', value: 186, type: '高中' },
        { month: '3月', value: 180, type: '高中' },
        { month: '4月', value: 160, type: '高中' },
        { month: '5月', value: 167, type: '高中' },
        { month: '6月', value: 90, type: '高中' },
        { month: '7月', value: 100, type: '高中' },
        { month: '1月', value: 90, type: '本科' },
        { month: '2月', value: 136, type: '本科' },
        { month: '3月', value: 140, type: '本科' },
        { month: '4月', value: 123, type: '本科' },
        { month: '5月', value: 87, type: '本科' },
        { month: '6月', value: 90, type: '本科' },
        { month: '7月', value: 112, type: '本科' },
        { month: '1月', value: 113, type: '硕士' },
        { month: '2月', value: 225, type: '硕士' },
        { month: '3月', value: 45, type: '硕士' },
        { month: '4月', value: 67, type: '硕士' },
        { month: '5月', value: 145, type: '硕士' },
        { month: '6月', value: 211, type: '硕士' },
        { month: '7月', value: 311, type: '硕士' },
        { month: '1月', value: 67, type: '博士' },
        { month: '2月', value: 345, type: '博士' },
        { month: '3月', value: 231, type: '博士' },
        { month: '4月', value: 245, type: '博士' },
        { month: '5月', value: 245, type: '博士' },
        { month: '6月', value: 456, type: '博士' },
        { month: '7月', value: 356, type: '博士' },
      ],
    }
  },
  mounted() {
    new Line('line', {
      title: {
        visible: true,
        text: '考生学历变化趋势图',
      },
      data: this.data,
      forceFit: true,
      seriesField: 'type',
      xField: 'month',
      yField: 'value',
      smooth: true,
      color: ['#4577FF', '#00C292', '#FEC108', '#eb7f65', '#7585a2'],
      legend: {
        visible: true,
        position: 'top-right',
      },
    }).render()
  },
}
</script>

<style scoped></style>

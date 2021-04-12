<template>
  <div class="example">
    <h4>Composition API Line chart</h4>
    <apexchart
      width="500"
      height="350"
      type="line"
      :options="chartOptions"
      :series="series"
    />
    <div>
      <button @click="updateChart">Update!</button>
      <button @click="addSeries">Push series!</button>
      <button @click="modifySeries">Update first value all series!</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LineExample-CompositionApi',
  setup() {
    const chartOptions = ref({
      xaxis: {
        type: 'datetime',
        categories: [
          '01/01/2003',
          '02/01/2003',
          '03/01/2003',
          '04/01/2003',
          '05/01/2003',
          '06/01/2003',
          '07/01/2003',
          '08/01/2003',
        ],
      },
    });

    function generateDayWiseTimeSeries(baseval, count, yrange) {
      let i = 0;
      const newSeries = [];
      while (i < count) {
        const x = baseval;
        const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        newSeries.push([x, y]);
        // eslint-disable-next-line no-param-reassign
        baseval += 86400000;
        // eslint-disable-next-line no-plusplus
        i++;
      }
      return newSeries;
    }
    const series = ref([
      {
        name: 'Series A',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
          min: 10,
          max: 15,
        }),
      },
      {
        name: 'Series B',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
          min: 10,
          max: 15,
        }),
      },
    ]);
    function updateChart() {
      console.debug('Update chart');
      const newSeries = [
        {
          name: 'South',
          data: generateDayWiseTimeSeries(
            new Date('11 Feb 2017').getTime(),
            20,
            {
              min: 10,
              max: 60,
            },
          ),
        },
        {
          name: 'North',
          data: generateDayWiseTimeSeries(
            new Date('11 Feb 2017').getTime(),
            20,
            {
              min: 10,
              max: 20,
            },
          ),
        },

        {
          name: 'Central',
          data: generateDayWiseTimeSeries(
            new Date('11 Feb 2017').getTime(),
            20,
            {
              min: 10,
              max: 15,
            },
          ),
        },
      ];

      series.value = newSeries;
    }

    function addSeries() {
      console.debug('Push new series');
      series.value.push({
        name: 'Central23',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
          min: 0,
          max: 20,
        }),
      });
    }

    function modifySeries() {
      console.debug('Modify series');
      series.value.forEach((serie) => {
        // eslint-disable-next-line no-param-reassign
        serie.data[0][1] = Math.floor(Math.random() * (40 - 0 + 1)) + 0;
      });
    }

    return { chartOptions, series, updateChart, addSeries, modifySeries };
  },
});
</script>

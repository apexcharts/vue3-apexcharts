<template>
  <div class="example">
    <h4>Options API Line chart</h4>
    <apexchart
      width="500"
      height="350"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <div>
      <button @click="updateChart">Update!</button>
      <button @click="addSeries">Push series!</button>
      <button @click="modifySeries">Update first value all series!</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "LineExample",
  data: function() {
    return {
      chartOptions: {
        xaxis: {
          type: "datetime",
          categories: [
            "01/01/2003",
            "02/01/2003",
            "03/01/2003",
            "04/01/2003",
            "05/01/2003",
            "06/01/2003",
            "07/01/2003",
            "08/01/2003"
          ]
        }
      },
      series: [
        {
          name: "Series A",
          data: this.generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 20, {
            min: 10,
            max: 20
          })
        },
        {
          name: "Series B",
          data: this.generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 20, {
            min: 10,
            max: 20
          })
        }
      ]
    };
  },
  methods: {
    generateDayWiseTimeSeries(baseval, count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push([x, y]);
        baseval += 86400000 * 7;
        i++;
      }
      return series;
    },
    updateChart() {
      console.debug("Update chart");
      let series = [
        {
          name: "South",
          data: this.generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 20, {
            min: 10,
            max: 60
          })
        },
        {
          name: "North",
          data: this.generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 20, {
            min: 10,
            max: 50
          })
        },

        {
          name: "Central",
          data: this.generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 20, {
            min: 10,
            max: 50
          })
        }
      ];

      this.series = series;
    },
    addSeries() {
      console.debug('Push new series');
      this.series.push({
        name: 'pushedDataSeries',
        data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
          min: 0,
          max: 100,
        }),
      });
    },
    modifySeries() {
      console.debug('Modify series');
      this.series.forEach((serie) => {
        // eslint-disable-next-line no-param-reassign
        serie.data[0][1] = Math.floor(Math.random() * (40 - 0 + 1)) + 0;
      });
    },
  }
};
</script>

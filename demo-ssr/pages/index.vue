<template>
  <div class="container">
    <div class="header">
      <h1>Vue3-ApexCharts SSR Demo</h1>
      <p>Demonstrating Server-Side Rendering capabilities with Nuxt 3</p>
    </div>

    <!-- SSR Rendering Section -->
    <div class="chart-section">
      <h2>1. Server-Side Rendering (SSR)</h2>
      <p>
        This chart is rendered on the server using <code>apexchart-server</code> component.
        The HTML is generated server-side and sent to the browser, providing better SEO and initial load performance.
      </p>

      <div class="chart-wrapper">
        <apexchart-server
          type="bar"
          :series="barSeries"
          :options="barOptions"
          :width="700"
          :height="350"
        />
      </div>

      <div class="note">
        <strong>Note:</strong> View the page source to see the chart HTML is already rendered!
      </div>
    </div>

    <!-- SSR + Hydration Section -->
    <div class="chart-section">
      <h2>2. SSR with Client-Side Hydration</h2>
      <p>
        This demonstrates combining server-side rendering with client-side hydration for full interactivity.
        The chart is rendered on the server, then hydrated on the client for animations and interactions.
      </p>

      <div class="chart-wrapper">
        <apexchart-server
          type="line"
          :series="lineSeries"
          :options="lineOptions"
          :width="700"
          :height="350"
        />
      </div>

      <div class="success">
        <strong>Interactive:</strong> Try hovering over the chart to see the hydration in action!
      </div>
    </div>

    <!-- Client-Only Section -->
    <div class="chart-section">
      <h2>3. Client-Only Rendering (Traditional)</h2>
      <p>
        This uses the traditional <code>ClientOnly</code> wrapper for comparison.
        The chart only renders on the client side, not included in SSR.
      </p>

      <div class="chart-wrapper">
        <ClientOnly>
          <apexchart
            type="area"
            :series="areaSeries"
            :options="areaOptions"
            width="700"
            height="350"
          />
          <template #fallback>
            <div style="height: 350px; display: flex; align-items: center; justify-content: center; background: #f0f0f0;">
              <p>Loading chart...</p>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>

    <!-- Hydrate all SSR charts with client-side interactivity -->
    <apexchart-hydrate :client-options="hydrateOptions" />

    <!-- Comparison Section -->
    <div class="chart-section">
      <h2>Rendering Method Comparison</h2>

      <div class="comparison-grid">
        <div class="comparison-card">
          <h4>SSR (apexchart-server)</h4>
          <ul class="feature-list">
            <li>Rendered on server</li>
            <li>Better SEO</li>
            <li>Faster initial paint</li>
            <li>No interactivity (static)</li>
          </ul>
        </div>

        <div class="comparison-card">
          <h4>SSR + Hydration</h4>
          <ul class="feature-list">
            <li>Rendered on server</li>
            <li>Better SEO</li>
            <li>Full interactivity</li>
            <li>Best of both worlds</li>
          </ul>
        </div>

        <div class="comparison-card">
          <h4>Client-Only</h4>
          <ul class="feature-list">
            <li>Rendered on client</li>
            <li>Fully interactive</li>
            <li>Not SEO friendly</li>
            <li>Slower initial paint</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Interactive Demo -->
    <div class="chart-section">
      <h2>4. Interactive SSR Chart</h2>
      <p>This chart is server-rendered and can be updated on the client side.</p>

      <div class="interactive-buttons">
        <button @click="updateData">Update Data</button>
        <button @click="changeChartType">Toggle Chart Type</button>
        <button @click="randomizeColors">Randomize Colors</button>
      </div>

      <div class="chart-wrapper">
        <apexchart-server
          :type="interactiveType"
          :series="interactiveSeries"
          :options="interactiveOptions"
          :width="700"
          :height="350"
        />
      </div>
    </div>

    <!-- Multiple Charts -->
    <div class="chart-section">
      <h2>5. Multiple SSR Charts</h2>
      <p>Demonstrating multiple charts rendered on the same page.</p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
        <div>
          <h3>Donut Chart</h3>
          <apexchart-server
            type="donut"
            :series="donutSeries"
            :options="donutOptions"
            :width="350"
            :height="300"
          />
        </div>

        <div>
          <h3>Radar Chart</h3>
          <apexchart-server
            type="radar"
            :series="radarSeries"
            :options="radarOptions"
            :width="350"
            :height="300"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Bar Chart Data
const barSeries = ref([
  {
    name: 'Sales',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
  },
])

const barOptions = ref({
  chart: {
    id: 'ssr-bar-chart',
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
  colors: ['#667eea'],
  title: {
    text: 'Monthly Sales Data (SSR)',
    align: 'center',
  },
})

// Line Chart Data
const lineSeries = ref([
  {
    name: 'Revenue',
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  },
  {
    name: 'Profit',
    data: [5, 20, 18, 25, 24, 31, 34, 45, 74],
  },
])

const lineOptions = ref({
  chart: {
    id: 'ssr-line-chart',
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
  colors: ['#008FFB', '#00E396'],
  stroke: {
    curve: 'smooth',
  },
  title: {
    text: 'Revenue & Profit Trends (SSR + Hydration)',
    align: 'center',
  },
})

const hydrateOptions = ref({
  chart: {
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
    toolbar: {
      show: true,
    },
  },
})

// Area Chart Data
const areaSeries = ref([
  {
    name: 'Users',
    data: [31, 40, 28, 51, 42, 109, 100],
  },
  {
    name: 'Sessions',
    data: [11, 32, 45, 32, 34, 52, 41],
  },
])

const areaOptions = ref({
  chart: {
    id: 'client-area-chart',
  },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  colors: ['#FEB019', '#FF4560'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
    },
  },
  title: {
    text: 'Weekly Analytics (Client-Only)',
    align: 'center',
  },
})

// Interactive Chart Data
const interactiveType = ref('bar')
const interactiveSeries = ref([
  {
    name: 'Data',
    data: [44, 55, 57, 56, 61, 58, 63],
  },
])

const interactiveOptions = ref({
  chart: {
    id: 'interactive-chart',
  },
  xaxis: {
    categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  },
  colors: ['#775DD0'],
  title: {
    text: 'Interactive Chart Demo',
    align: 'center',
  },
})

const updateData = () => {
  interactiveSeries.value = [
    {
      name: 'Data',
      data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 20),
    },
  ]
}

const changeChartType = () => {
  interactiveType.value = interactiveType.value === 'bar' ? 'line' : 'bar'
}

const randomizeColors = () => {
  const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a']
  interactiveOptions.value = {
    ...interactiveOptions.value,
    colors: [colors[Math.floor(Math.random() * colors.length)]],
  }
}

// Donut Chart Data
const donutSeries = ref([44, 55, 41, 17, 15])

const donutOptions = ref({
  chart: {
    id: 'ssr-donut-chart',
  },
  labels: ['Apple', 'Mango', 'Orange', 'Watermelon', 'Banana'],
  colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
  legend: {
    position: 'bottom',
  },
  title: {
    text: 'Fruit Distribution',
    align: 'center',
  },
})

// Radar Chart Data
const radarSeries = ref([
  {
    name: 'Series 1',
    data: [80, 50, 30, 40, 100, 20],
  },
  {
    name: 'Series 2',
    data: [20, 30, 40, 80, 20, 80],
  },
])

const radarOptions = ref({
  chart: {
    id: 'ssr-radar-chart',
  },
  xaxis: {
    categories: ['Speed', 'Power', 'Agility', 'Defense', 'Stamina', 'Intelligence'],
  },
  colors: ['#008FFB', '#FF4560'],
  title: {
    text: 'Character Stats',
    align: 'center',
  },
})
</script>

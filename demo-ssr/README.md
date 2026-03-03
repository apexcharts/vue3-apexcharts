# Vue3-ApexCharts SSR Demo

This is a comprehensive demonstration of vue3-apexcharts with Server-Side Rendering (SSR) support using Nuxt 3.

## Features Demonstrated

### 1. Server-Side Rendering (SSR)
- Charts rendered on the server using `apexchart-server` component
- Improved SEO and initial page load performance
- HTML content available in page source

### 2. SSR with Client-Side Hydration
- Combines server rendering with client-side interactivity
- Uses `apexchart-server` + `apexchart-hydrate` components
- Best of both worlds: SEO benefits + full interactivity

### 3. Client-Only Rendering
- Traditional client-side rendering with `ClientOnly` wrapper
- For comparison with SSR approaches

### 4. Interactive Charts
- Dynamic data updates
- Chart type switching
- Color customization

### 5. Multiple Chart Types
- Bar charts
- Line charts
- Area charts
- Donut charts
- Radar charts

## Installation

```bash
# Install dependencies
npm install

# OR
yarn install
```

## Development

```bash
# Start development server
npm run dev

# OR
yarn dev
```

The application will be available at `http://localhost:3000`

## Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
demo-ssr/
├── app.vue                 # Root component
├── nuxt.config.ts         # Nuxt configuration
├── package.json           # Dependencies
├── assets/
│   └── css/
│       └── main.css       # Global styles
├── pages/
│   └── index.vue          # Main demo page
├── plugins/
│   └── apexcharts.ts      # ApexCharts plugin
└── public/                # Static assets
```

## SSR Component Usage

### Basic SSR Chart

```vue
<template>
  <apexchart-server
    type="bar"
    :series="series"
    :options="options"
    :width="500"
    :height="300"
  />
</template>

<script setup>
const series = [{ data: [30, 40, 35, 50] }]
const options = {
  chart: { type: 'bar' },
  xaxis: { categories: ['A', 'B', 'C', 'D'] }
}
</script>
```

### SSR with Hydration

```vue
<template>
  <div>
    <apexchart-server
      type="line"
      :series="series"
      :options="options"
    />
    <apexchart-hydrate
      :client-options="{
        chart: {
          animations: { enabled: true },
          toolbar: { show: true }
        }
      }"
    />
  </div>
</template>
```

### Client-Only (Traditional)

```vue
<template>
  <ClientOnly>
    <apexchart
      type="area"
      :series="series"
      :options="options"
    />
  </ClientOnly>
</template>
```

## Benefits of SSR

1. **Better SEO**: Chart data is available in HTML source
2. **Faster Initial Load**: Chart renders immediately on server
3. **Progressive Enhancement**: Works even if JavaScript fails
4. **Improved Performance**: Reduces client-side rendering work

## Requirements

- Node.js 18+ or 20+
- ApexCharts 5.5.0+ (for SSR support)
- Vue 3.x
- Nuxt 3.x

## Learn More

- [Vue3-ApexCharts Documentation](https://github.com/apexcharts/vue3-apexcharts)
- [ApexCharts Documentation](https://apexcharts.com/docs/)
- [Nuxt 3 Documentation](https://nuxt.com/docs)

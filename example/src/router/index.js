import { createRouter, createWebHashHistory } from 'vue-router'

import AreaExample from '../charts/AreaExample.vue'
import BarExample from '../charts/BarExample.vue'
import ColumnExample from '../charts/ColumnExample.vue'
import ScatterExample from '../charts/ScatterExample.vue'
import MixedExample from '../charts/MixedExample.vue'
import DonutExample from '../charts/DonutExample.vue'
import RadialBarExample from '../charts/RadialBarExample.vue'
import BubbleExample from '../charts/BubbleExample.vue'
import HeatmapExample from '../charts/HeatmapExample.vue'
import LineExample from '../charts/LineExample.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: AreaExample },
    { path: '/area', component: AreaExample },
    { path: '/bar', component: BarExample },
    { path: '/column', component: ColumnExample },
    { path: '/mixed', component: MixedExample },
    { path: '/scatter', component: ScatterExample },
    { path: '/donut', component: DonutExample },
    { path: '/radialbar', component: RadialBarExample },
    { path: '/bubble', component: BubbleExample },
    { path: '/heatmap', component: HeatmapExample },
    { path: '/line', component: LineExample }
  ]
})

export default router
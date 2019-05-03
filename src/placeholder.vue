<template>
    <canvas ref="cnv" :width="width" :height="height"></canvas>
</template>

<script>
import { getAreas, drawVoronoi, drawCenters } from './Voronoi_ops.js'
import { stringToPoints } from './word_2_points.js';

export default {
  name: 'patternPlaceholder',
  props: {
    width: { type: Number, default: 250 },
    height: { type: Number, default: 250 },
    input: { type: String, default: 'Hi there! :-)' },
    label: { type: String, default: '' },
    label_style: { type: String, default: '20px Helvetica bold' },
    label_color: { type: String, default: '#777' },
    metric: { type: String, default: 'Manhattan' },
    debug: { type: Boolean, default: false },
    hue_range: { type: Array, default: () => {return [0, 359]} },
    lightness_range: { type: Array, default: () => {return [0, 100]} },
  },
  data() {
    return {
      placeholder: false
    }
  },
  mounted() {
    if (!this.placeholder) {
      this.initialize()
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.dispose()
    }
  },
  methods: {
    fillCanvas(ctx) {
      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, this.width, this.height)
    },
    initialize() {
      let cvs = this.$refs.cnv
      let ctx = cvs.getContext("2d")
      let points = stringToPoints(this.input, this.width, this.height)

      this.fillCanvas(ctx)

      let areas = getAreas(ctx, points, this.width, this.height, this.metric)

      drawVoronoi(
        ctx,
        points,
        this.width,
        this.height,
        this.metric,
        areas,
        this.hue_range,
        this.lightness_range
      )

      if (this.debug) drawCenters(ctx, points)

      if (this.label) {
        ctx.font = this.label_style
        ctx.fillStyle = this.label_color
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(this.label, this.width / 2, this.height / 2)
      }

      // TODO check if this validation is required
      this.placeholder = true
    },
  },
}
</script>

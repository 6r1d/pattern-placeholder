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
    if (this.placeholder) {
      this.clearCanvas()
    }
  },
  watch: {
      width()           { this.redrawOnNextTick() },
      height()          { this.redrawOnNextTick() },
      input()           { this.redraw() },
      label()           { this.redraw() },
      label_style()     { this.redraw() },
      label_color()     { this.redraw() },
      metric()          { this.redraw() },
      debug()           { this.redraw() },
      hue_range()       { this.redraw() },
      lightness_range() { this.redraw() },
  },
  methods: {
    clearCanvas(ctx) {
      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, this.width, this.height)
    },
    drawLabel(ctx) {
      ctx.fillStyle = this.label_color
      ctx.font = this.label_style
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(this.label, this.width / 2, this.height / 2)
    },
    // Vue’s DOM updates are asynchronous, with and height updates
    // are made on next tick
    redrawOnNextTick() {
      this.$nextTick(() => {
          this.redraw()
      })
    },
    redraw() {
      let cvs = this.$refs.cnv
      let ctx = cvs.getContext("2d")
      let points = stringToPoints(this.input, this.width, this.height)
      this.clearCanvas(ctx)
      let areas = getAreas(ctx, points, this.width, this.height, this.metric)
      drawVoronoi(
        ctx, points,
        this.width, this.height,
        this.metric,
        areas,
        this.hue_range, this.lightness_range
      )

      if (this.debug) drawCenters(ctx, points)

      if (this.label) this.drawLabel(ctx)
    },
    initialize() {
      this.redraw()

      this.placeholder = true
    },
  },
}
</script>

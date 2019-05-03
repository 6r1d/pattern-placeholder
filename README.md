# Vue-Pattern-Placeholder
This component helps with placeholders in Vue. It uses canvas to render
patterns from input string like URL. It is processing the string using a hash
function, extracts bytes, creates pairs of these and calculates HSV colors for
pattern elements using the area of these.

## Usage
To import a component, write:

    import { patternPlaceholder } from 'pattern-placeholder'

Add it to the `components` property

    components: {
        Whatever,
        patternPlaceholder
    },

Now you can use it in your template:

    <patternPlaceholder
      :width="150" :height="150"
      :input="''+item_data.media_id"
      label="150x150"
      label_style="900 30px Arial" label_color="#000"
      :hue_range="[70, 170]"
      :lightness_range="[0, 100]"
    />

I recommend to start playing with `hue_range` and `lightness_range`
properties to reach the best look.

### API

 - `width` (Number) - width of an image
 - `height` (Number) - height of an image
 - `input` (String) - this text will be converted to a pattern
 - `label` (String) - text label to show
 - `label_style` (String) - canvas font style. Example: `900 30px Arial`
 - `label_color` (String) - color of a label. Example: `#777`
 - `metric` (String) - metric, used to create a pattern. Examples: Euclidean, Manhattan, Minkovski
 - `debug` (Boolean) - allows to show center points for a Voronoi pattern
 - `hue_range` (Array) - sets a color range in degrees. Example: `[0, 359]`
 - `lightness_range` (Array) - lightness range for pattern pieces in percents. Example: `[0, 100]`

# Demos

<p float="left">
  <img width="100" height="100" src="./doc/images/a.png" />
  <img width="100" height="100" src="./doc/images/b.png" />
  <img width="100" height="100" src="./doc/images/c.png" />
</p>

# Warning
Please be aware that this project is still in a testing stage.
Use at your own risk. Ideas and bug reports are welcome.

# TODO
- Autoreload fix (probably needs a destructor)
- ~Overlay text~
- ~Fix wrong color representation in overlay text~

# Acknowledgements
Thanks to [AnatolV](https://rosettacode.org/wiki/User:AnatolV) from
[RosettaCode](https://rosettacode.org) for a nice
[Voronoi diagram](https://rosettacode.org/wiki/Voronoi_diagram) implementation.

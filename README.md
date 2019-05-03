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

Now you can use it:

    <patternPlaceholder
      :width="150" :height="150"
      :text="YOUR URL HERE"
      :hue_range="[70, 170]"
      :lightness_range="[0, 100]"
    />

I recommend to start playing with `hue_range` and `lightness_range`
properties to reach the best look.

# Demos

![](./doc/img/a.png)

![](./doc/img/b.png)

![](./doc/img/c.png)

# Acknowledgements
Thanks to [AnatolV](https://rosettacode.org/wiki/User:AnatolV) from
[RosettaCode](https://rosettacode.org) for a nice Voronoi implementation.

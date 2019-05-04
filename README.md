# Vue-pattern-placeholder
This plugin provides a placeholder component for [Vue.js](https://vuejs.org/).
It uses canvas to render patterns from input string like URL.

<span class="badge-npmversion"><a href="https://www.npmjs.com/package/vue-pattern-placeholder" title="View this project on NPM"><img src="https://img.shields.io/npm/v/badges.svg" alt="NPM version" /></a></span>
[![Dependencies](https://img.shields.io/librariesio/release/npm/vue-pattern-placeholder.svg)](https://libraries.io/npm/vue-pattern-placeholder)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/6r1d/pattern-placeholder/graphs/commit-activity)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

## Table of contents

 * [Sample images](#sample-images)
 * [Installation](#installation)
 * * [Usage](#usage)
 * * [API](#api)
 * [Inspiration](#inspiration)
 * [Warning](#warning)
 * [TODO](#todo)
 * [Acknowledgements](#acknowledgements)

# Sample images

![](https://github.com/6r1d/pattern-placeholder/raw/master/doc/images/l.png) ![](https://github.com/6r1d/pattern-placeholder/raw/master/doc/images/d.png) ![](https://github.com/6r1d/pattern-placeholder/raw/master/doc/images/a.png) ![](https://github.com/6r1d/pattern-placeholder/raw/master/doc/images/b.png) ![](https://github.com/6r1d/pattern-placeholder/raw/master/doc/images/c.png) ![](https://github.com/6r1d/pattern-placeholder/raw/master/doc/images/e.png) ![](https://github.com/6r1d/pattern-placeholder/raw/master/doc/images/f.png) ![](https://github.com/6r1d/pattern-placeholder/raw/master/doc/images/g.png) ![](https://github.com/6r1d/pattern-placeholder/raw/master/doc/images/h.png) ![](https://github.com/6r1d/pattern-placeholder/raw/master/doc/images/i.png) ![](https://github.com/6r1d/pattern-placeholder/raw/master/doc/images/j.png) ![](https://github.com/6r1d/pattern-placeholder/raw/master/doc/images/k.png)

# **Recent updates**
- **2019-05-04** Import format changed, refer to [usage](#usage) section.

# Installation
To install this plugin, open terminal in your Vue project directory and type:

    npm i --save-dev vue-pattern-placeholder

This command will install the plugin in your project `node_modules` dir and
add it as a project development dependency in project's `package.json` file.

If you need this plugin as a generic dependency, type this command instead:

    npm i --save-dev vue-pattern-placeholder

## Usage
To import a component, write:

    import patternPlaceholder from 'vue-pattern-placeholder'

Add it to the `components` property

    components: {
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

## API

 | Option          | Data-type(s) | description                                                                 |
 |-----------------|--------------|-----------------------------------------------------------------------------|
 | width           | Number       | width of an image                                                           |
 | height          | Number       | height of an image                                                          |
 | input           | String       | this text will be converted to a pattern                                    |
 | label           | String       | text label to show                                                          |
 | label_style     | String       | canvas font style. Example: `900 30px Arial`                                |
 | label_color     | String       | color of a label. Example: `#777`                                           |
 | metric          | String       | metric, used to create a pattern. Examples: Euclidean, Manhattan, Minkovski |
 | debug           | Boolean      | allows to show center points for a Voronoi pattern                          |
 | hue_range       | Array        | sets a color range in degrees. Example: `[0, 359]`                          |
 | lightness_range | Array        | lightness range for pattern pieces in percents. Example: `[0, 100]`         |

# Inspiration
I thought about converting text to an image and I remembered [Voronoi](https://en.wikipedia.org/wiki/Voronoi_diagram)
patterns: these are easy to implement and look very nice.

![Voronoi pattern animation](https://upload.wikimedia.org/wikipedia/commons/d/d9/Voronoi_growth_euclidean.gif)

Then I had an idea:
- take a string, process it using a [SHA-256](https://en.wikipedia.org/wiki/SHA-2) hash function
- extract hash bytes
- use pairs of bytes, converting each to a float value between 0 and 1 to place X and Y points
- count pattern segments, use numbers to set each one's hue in [HSV color palette](https://en.wikipedia.org/wiki/HSL_and_HSV)
- calculate pattern areas
- use areas to determine lightness of a pattern segment in HSV

# Warning
Please be aware that this project is still in a testing stage.
Use at your own risk. Ideas and bug reports are welcome.

# TODO
- [x] Overlay text
- [x] Fix wrong color representation in overlay text
- [x] Autoreload fix (probably needs a destructor)
- [ ] Consider integrating label style and color into one parameter
- [ ] Label style settings in key-value format

# Acknowledgements
Thanks to [AnatolV](https://rosettacode.org/wiki/User:AnatolV) from
[RosettaCode](https://rosettacode.org) for a nice
[Voronoi diagram](https://rosettacode.org/wiki/Voronoi_diagram) implementation.

Thanks to [emn178](https://github.com/emn178) for [js-sha256](https://github.com/emn178/js-sha256) library.
It is easy to use and helps a lot.

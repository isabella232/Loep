# LOEP

Simple javascript based presentation tool: 
* drop your images in the images directory
* add up to 6 images references per scene in scenes.js
* add some descriptions if you want to
* have some animated slide awesomeness

_Created for my graduation presentation as I was fed up with Keynote and wanted something a bit more dynamic_

## Usage

Add scene-objects to ./js/scenes.js, see the file for some detailed examples.

Main possibilities:

* Add scene-objects with 1 to 6 different elements containing title, image and/or description and let it render with the default scene template
* Add objects with a template attribute and let it render a custom template, play around with the classnames .fade and .animate-in-canvas in these templates for animations

Serve index.html, checkout ./js/hotkeys.js for the possible short-cuts and have fun!

## Project structure

    Loep/
    |-- external/
    |-- images/
    |-- js/
    | |-- app.js
    | |-- dust-helpers.js
    | |-- dust-onload.js
    | |-- hotkeys.js
    | `-- scenes.js 					# CHANGE ME:: THE ACTUAL SCENES
    |-- less/
    | |-- animations.less 
    | |-- bootstrap-imports.less
    | `-- main.less
    |--templates/
    | |-- custom-scenes/
    | | ` example-custom-template.html
    | |-- default-scene.html
    | |-- scene-items-only.html
    | |-- scene-picker.html
    | `-- timeline.html
    `-- index.html


## External dependencies

* Directly checked in into ./external
** [jquery](http://jquery.com/)
** [less](http://lesscss.org/)
* As git submodule
** [Bootstrap 3](http://getbootstrap.com/)
** [dustjs (linkedIn fork)](http://linkedin.github.io/dustjs/)
** [jquery.hotkeys](https://github.com/tzuryby/jquery.hotkeys)

### To install the git submodules

`git submodule init`
`git submodule update`

## Notes

* It's still a bit messy all around, but it was a quick coding job, some interesting tidbits:
** CSS trick to maintain aspect ratio of div's while staying scalable
** dust helper hack with setting variables before looping through a array of items, in order to set the slightly random positions
** Works on iOS :P

## Contributors

* Jasper Hartong

## License

(The MIT License)

Copyright (c) 2013 Calendar42 &lt;jasper@calendar42.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
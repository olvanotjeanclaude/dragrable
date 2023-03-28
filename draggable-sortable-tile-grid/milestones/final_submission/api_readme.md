# tiles.js

Final submission deployed at -> [https://tiles-js.herokuapp.com/](https://tiles-js.herokuapp.com/)


## Quick Navigation
- [Home](https://tiles-js.herokuapp.com/)
- [Getting started](#getting-started)
- [Constructors](#constructors)
- [API](#api-methods)
- [Examples](https://tiles-js.herokuapp.com/examples.html)


## Getting started
To get started with tiles.js, you'll need to include [jQuery](https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js) and [tiles.js](https://tiles-js.herokuapp.com/js/tiles.js) in your HTML source as shown below:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- first load jQuery -->
    <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- then load tiles.js -->
    <script defer type="text/javascript" src='https://tiles-js.herokuapp.com/js/tiles.js'></script>
    <!-- then load a script that depends on tiles.js -->
    <script defer type="text/javascript" src='js/examples.js'></script>
</head>
```
By default, tiles.js assigns itself to the global `Tiles` variable when loaded. If the `Tiles` variable is already in use, it will not be overwritten.  
Once loaded, you can get an instance of Tiles by calling its constructor:
```javascript
const tiles = new Tiles({container: 'id'})
```
Note that you **must** create a new instance of `Tiles` for each section of tiles that you want to create, or there could be unintended behavior.


## Constructors
There is only one constructor required to use tiles.js, and it has one required value, with a few other optional parameters. A constructor call with every possible option is shown below:
```javascript
new Tiles({
    container: 'demo1',
    width: 100,
    height: 100,
    animate: true,
    animate_factor: 5,
    color_cycle: true,
    nodrag: true,
    tile_gap: 30,
    num_horizontal: 2
})
```
The parameters are provided in the form of a javascript object, so optional parameters can be left out if desired.  
**Required parameters**
- **container**
    - `Type`: `string`
    - `Default value`: `none`
    - `Description`: In order to use tiles.js, you must provide it a `<div>` element with a unique `id` in which you want to display tiles. The value of the `id` goes into this parameter.  

**Optional parameters**
- **width**
    - `Type`: `number (integer)`
    - `Default value`: `100`
    - `Description`: The width you want the tiles in this section to be.
- **height**
    - `Type`: `number (integer)`
    - `Default value`: `100`
    - `Description`: The height you want the tiles in this section to be.
- **animate**
    - `Type`: `boolean`
    - `Default value`: `true`
    - `Description`: On hover, you can choose to allow the tiles to slightly expand in an animation. This gives the user a visual cue that the tile is being hovered across. The content in the tile will expand along with the tile.
- **animate_factor**
    - `Type`: `number (float)`
    - `Default value`: `1.05`
    - `Description`: If `animate` is set to `true`, then you can optionally specify how much you want your tiles to expand when they are being hovered over. The default value of 5% looks good in most situations, but you have the option of choosing your own expansion factor.
- **color_cycle**
    - `Type`: `boolean`
    - `Default value`: `false`
    - `Description`: This option enables the color gradient around each tile to constantly change color. The colors are generated randomly and slowly change randomly as well. It is useful for when the theme of the website is a little less serious!
- **nodrag**
    - `Type`: `boolean`
    - `Default value`: `false`
    - `Description`: By default, tiles in a section can be dragged around and the user can swap the positions of tiles by dragging and dropping. Setting this option to `true` will prevent tiles from being dragged, which is useful for when you have tiles that must display content in a certain order.
- **tile_gap**
    - `Type`: `number (integer)`
    - `Default value`: `30`
    - `Description`: This option adjusts the width of the gap between tiles.
- **num_horizontal**
    - `Type`: `number (integer)`
    - `Default value`: `Infinity`
    - `Description`: This option specifies the maximum number of horizontally adjacent tiles in the current section. Note that if the viewport width cannot accomodate so many tiles, then this value is automatically capped.


## API methods
Once you have created an instance of `Tiles`, these are the API methods that can be called and their available options:
- Tiles.`addTile({options})` returns `the ID of the added tile`.
    - `title`
        - `Type`: `string`
        - `Default value`: `''`
        - `Optional`: `yes`
        - `Description`: This specifies the title of the newly added tile, which is the text that appears on top of each tile. If this is not provided, no title will appear.
    - `img_src`
        - `Type`: `string`
        - `Default value`: `''`
        - `Optional`: `yes`
        - `Description`: This specifies the source of the image that will appear in the tile. Specifying an image is optional.
    - `hover_color`
        - `Type`: `string`
        - `Default value`: `cyan`
        - `Optional`: `yes`
        - `Description`: This specifies the color of the outline that will appear when the tile is hovered over.
    - `clickLink`
        - `Type`: `string`
        - `Default value`: `''`
        - `Optional`: `yes`
        - `Description`: This specifies an optional link that can be opened when the tile is clicked.
    - `alt_img`
        - `Type`: `string`
        - `Default value`: `''`
        - `Optional`: `yes`
        - `Description`: This specifies an alternative image that can be shown when the tile is clicked. This option cannot be used in conjuction with `clickLink`.
    - `click_callback`
        - `Type`: `function`
        - `Default value`: `null`
        - `Optional`: `yes`
        - `Description`: This specifies a function that should be called when the tile is clicked. The function must take 1 argument. Upon being clicked, the function will be called as `f(tile)`, where `tile` will represent the current state of the tile.
- Tiles.`sort()`
    - Sorts the tiles in the current section by order of their creation.
- Tiles.`shuffle()`
    - Shuffles the tiles in the current section randomly.
- Tiles.`flip(tileid)`
    - A tile may have a secondary image to show. The flip method swaps the current displayed image for the secondary image.
    - `tileid`
        - `Type`: `string or number (integer)`
        - `Optional`: `no`
        - `Description`: The ID of the tile to flip.
- Tiles.`disable(tileid)`
    - A tile can be disabled if the developer wants to limit user interaction with the tile. A disabled tile will not perform any onclick actions.
    - `tileid`
        - `Type`: `string or number (integer)`
        - `Optional`: `no`
        - `Description`: The ID of the tile to disable.
- Tiles.`disableAll()`
    - Disables all tiles in the section.
- Tiles.`enable(tileid)`
    - Reverses the effects of `disable()`. Note that if the section has been disabled by `disableAll()`, then simply calling enable will not work.
    - `tileid`
        - `Type`: `string or number (integer)`
        - `Optional`: `no`
        - `Description`: The ID of the tile to enable.
- Tiles.`enableAll(propagate)`
    - Enables all tiles in the section.
    - `propagate`
        - `Type`: `boolean`
        - `Optional`: `no`
        - `Default value`: `false`
        - `Description`: This parameter specifies whether to propagate the effects of the `enableAll()` call to all the tiles in this section. If a tile has been disabled by a call to `disable()`, calling `enableAll(false)` will not enable that tile, but calling `enableAll(true)` will.

[Back to top](#quick-navigation)
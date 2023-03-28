# tiles.js

Landing page -> [https://hhc97.github.io/tiles-js/pub/](https://hhc97.github.io/tiles-js/pub/index.html)


## Getting started
To get started with tiles.js, you'll need to include [jQuery](https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js) and [tiles.js](https://github.com/hhc97/tiles-js/blob/main/pub/js/tiles.js) in your HTML source as shown below:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- first load jQuery -->
    <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- then load tiles.js -->
    <script defer type="text/javascript" src='https://hhc97.github.io/tiles-js/pub/js/tiles.js'></script>
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

For more detailed information and usage examples, view the [documentation](https://hhc97.github.io/tiles-js/pub/api-v1.html) and [examples](https://hhc97.github.io/tiles-js/pub/examples.html).

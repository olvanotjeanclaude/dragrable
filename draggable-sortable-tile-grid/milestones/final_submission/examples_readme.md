# Usage examples

## Quick Navigation
- [Home](https://tiles-js.herokuapp.com/)
- [Documentation](https://tiles-js.herokuapp.com/api-v1.html)
- [Basic demo](#basic-functionality)
- [Online shop](#e-commerce)
- [Shuffle and sort tiles](#shuffle-and-sort)
- [Disabling and flipping tiles](#disabling-and-flipping-tiles)
- [Tiles as link icons](#tiles-as-link-icons)
- [Tiles as decorations](#tiles-as-decorations)
- [Displaying pictures](#displaying-pictures)
- [Future plans](#future-plans)


### Basic functionality
The simplest thing you can do with this library is just to create a bunch of tiles.  

Note that before you get started, you should have an empty `<div>` set up in your html file with a unique `id` that you can pass to the library. It can be as simple as this:
```html
<div id='demo'></div>
```
Once you have a div ready, you can write a few simple lines of code to make some tiles:
```javascript
// instantiate a new Tiles instance
const lib = new Tiles({
    container: 'demo1',
    animate_factor: 1.1,
    num_horizontal: 6  // caps the max number of horizontal tiles
})
lib.addTile({ title: 'Here' })
lib.addTile({ title: 'are' })
lib.addTile({ title: 'some' })
lib.addTile({ title: 'tiles.' })

// adds a listener to a button that allows more tiles to be added
const button = $('#add_demo1')
button[0].addEventListener("click", function () {
    lib.addTile({ title: 'new tile' })
})
```
Rendered output:  

### E-commerce
Perhaps you are selling items in an online store and would like a quick way to display the items you have for sale, you can quickly display your items with tiles and even customize their hover color:
```javascript
// instantiate a new Tiles instance
const lib2 = new Tiles({
    container: 'demo2',
    width: 150,
    height: 150
})
lib2.addTile({
    title: 'Orange',
    img_src: 'https://www.mz-store.com/blog/wp-content/uploads_en/2020/11/shutterstock_342874121.jpg',
    hover_color: 'orange',
    clickLink: ''  // remember to add links to each product page
})
lib2.addTile({
    title: 'Apple',
    img_src: 'https://i2.wp.com/ceklog.kindel.com/wp-content/uploads/2013/02/firefox_2018-07-10_07-50-11.png?w=641&ssl=1',
    hover_color: 'red'
})
lib2.addTile({
    title: 'Lychee',
    img_src: 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/lychees-1296x728-feature.jpg',
    hover_color: 'pink'
})
lib2.addTile({
    title: 'Avocado',
    img_src: 'https://www.tasteofhome.com/wp-content/uploads/2018/02/shutterstock_263066297.jpg',
    hover_color: 'limegreen'
})
lib2.addTile({
    title: 'Grapes!',
    img_src: 'https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/34/2019/07/marselan-wiki-min.jpg',
    hover_color: 'purple'
})
```
Rendered output:  

### Shuffle and sort
This library also comes with built-in shuffle and sorting functions. You can dynamically rearrange each tile easily with this function. Users can also drag and drop tiles to rearrange them as well. Here is a quick demo of this functionality with some playing cards:
```javascript
// some demo playing card pictures
const demoPics = ['https://upload.wikimedia.org/wikipedia/commons/2/25/Playing_card_spade_A.svg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d5/Playing_card_heart_2.svg',
    'https://upload.wikimedia.org/wikipedia/commons/6/6b/Playing_card_club_3.svg',
    'https://upload.wikimedia.org/wikipedia/commons/2/20/Playing_card_diamond_4.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/94/Playing_card_spade_5.svg',
    'https://upload.wikimedia.org/wikipedia/commons/c/cd/Playing_card_heart_6.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4b/Playing_card_club_7.svg',
    'https://upload.wikimedia.org/wikipedia/commons/7/78/Playing_card_diamond_8.svg',
    'https://upload.wikimedia.org/wikipedia/commons/e/e0/Playing_card_spade_9.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/98/Playing_card_heart_10.svg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b7/Playing_card_club_J.svg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0b/Playing_card_diamond_Q.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9f/Playing_card_spade_K.svg']

// instantiate a new Tiles instance
const lib3 = new Tiles({
    container: 'demo3',
    width: 90,
    height: 140,
    num_horizontal: 7
})
// add each card in a for loop
for (let i = 1; i < 14; i++) {
    lib3.addTile({
        title: i,
        img_src: demoPics[i - 1]
    })
}
// add listeners to buttons for shuffling and sorting
const shuffle = $('#shuffle')
shuffle[0].addEventListener("click", function () {
    lib3.shuffle()
})
const sort = $('#sort')
sort[0].addEventListener("click", function () {
    lib3.sort()
})
```
Rendered output:  

### Disabling and flipping tiles
If you are creating a game with tiles and there is a need to periodically disable and enable tiles based on the rules of the game, you can do that too. Here is a demonstration with a simple matching game, where the goal is to flip two tiles that have the same image. If the images are not the same, then both tiles flip back. We can see why we would need to disable some tiles to enable the correct operation of this game. `tiles.js` also allows you to pass in callback functions which are called when the tile is clicked. For this demonstration, a demo callback function is provided, but you'll have to customize your own for your specific use case.
```javascript
// helper for synchronous waiting
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let prev_tile = null

// function to pass in as a callback to the tile
async function demo(data) {
    // game logic
    lib4.disable(data.id)
    if (!prev_tile) {
        prev_tile = {
            id: data.id,
            img: data.curr_img
        }
        return
    }
    let score = document.getElementById('score')
    if (data.id !== prev_tile.id && data.curr_img === prev_tile.img) {
        score.innerText = parseInt(score.innerText) + 10
        prev_tile = null
    } else {
        lib4.disableAll()
        await sleep(800)
        lib4.enableAll()
        if (prev_tile && data) {
            lib4.flip(prev_tile.id)
            lib4.flip(data.id)
            lib4.enable(prev_tile.id)
            lib4.enable(data.id)
            score.innerText = parseInt(score.innerText) - 5
        }
        prev_tile = null
    }
}
// game images
const matchPics = ['static/cat_ball.jpg',
    'static/cat_walk.jpg',
    'static/cat_walk.jpg',
    'static/cat_lie.jpg',
    'static/cat_ball.jpg',
    'static/cat_lie.jpg']
// instantiate a new Tiles instance
const lib4 = new Tiles({
    container: 'demo4',
    width: 200,
    height: 200,
    num_horizontal: 3
})
for (let i = 0; i < matchPics.length; i++) {
    lib4.addTile({
        title: 'Click me!',
        img_src: 'static/question_mark.PNG',
        alt_img: matchPics[i],  // set the alt_image for when the tile is clicked
        click_callback: demo  // pass in the callback function
    })
}
```
Rendered output:  

### Tiles as link icons
You can use small tiles to act as links to your own social media pages or other services. A simple demo can be constructed as follows:
```javascript
// instantiate a new Tiles instance
const lib5 = new Tiles({
    container: 'demo5',
    height: 30,
    width: 30
})
// add all relevant links and their images
lib5.addTile({
    img_src: 'https://cdn.iconscout.com/icon/free/png-256/github-163-761603.png',
    clickLink: 'https://github.com/',
    hover_color: 'gray'
})

lib5.addTile({
    img_src: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png',
    clickLink: 'https://google.com/',
    hover_color: 'gray'
})

lib5.addTile({
    img_src: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Stack_Overflow_icon.svg',
    clickLink: 'https://stackoverflow.com/',
    hover_color: 'gray'
})
```
Rendered output:  

### Tiles as decorations
You can even use tiles as a background for your website or as little decorations. The options available in the constructor allow you to easily customize their size and positioning.
```javascript
// instantiate a new Tiles instance
const lib6 = new Tiles({
    container: 'demo6',
    color_cycle: true,  // turn on color cycling for a nice effect
    animate: false,
    tile_gap: 8,
    nodrag: true,
    height: 40,
    width: 40,
    num_horizontal: 18
})
// a simple for loop that adds decorative tiles
for (let i = 0; i < 90; i++) {
    lib6.addTile()
}
```
Rendered output:  

### Displaying pictures
You can also easily create tiles without text and have them just display vivid full-frame pictures. You can customize the size of each tile through the constructor and also customize how many of them to display in a row, as well as being able to customize their highlight color and hover animation.
```javascript
const vacationPics = ['https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg',
    'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-mont-st-michel.jpg',
    'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-versailles-gardens.jpg',
    'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-chateau-de-chenonceau.jpg',
    'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-calanques-national-park.jpg',
    'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-amiens-cathedral.jpg']

// instantiate a new Tiles instance
const lib7 = new Tiles({
    container: 'demo7',
    width: 300,
    height: 200,
    num_horizontal: 3,
    nodrag: true,
    animate_factor: 1.05  // customize how much each tile grows on hover
})
// add the pictures
for (let i = 1; i < 7; i++) {
    lib7.addTile({
        img_src: vacationPics[i - 1],
        hover_color: 'salmon'
    })
}
```
Rendered output:  

### Future plans
Tiles.js was made as the final project in an introductory web programming course at the University of Toronto. While there are no current future plans for development, you can already accomplish a lot with Tiles!  

[Back to top](#quick-navigation)
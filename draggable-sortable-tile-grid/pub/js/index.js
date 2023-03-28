"use strict"

const contact = new Tiles({
    container: 'contact',
    height: 30,
    width: 30,
    tile_gap: 15,
    nodrag: true
})
contact.addTile({
    img_src: 'https://cdn.iconscout.com/icon/free/png-256/github-163-761603.png',
    clickLink: 'https://github.com/hhc97/tiles-js',
    hover_color: 'gray'
})
contact.addTile({
    img_src: 'https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg',
    clickLink: 'https://www.linkedin.com/in/hhc97/',
    hover_color: 'gray'
})

// get the viewport height to support mobile content
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

const lib = new Tiles({
    container: 'demo1',
    width: Math.floor(vw * 0.25),
    height: Math.floor(vw * 0.125),
    color_cycle: true,
    tile_gap: Math.floor(vw * 0.06),
    animate_factor: 1.08,
    nodrag: true
})

lib.addTile({
    img_src: 'static/welcome_word.PNG'
})
lib.addTile({
    img_src: 'static/to_word.PNG'
})
lib.addTile({
    img_src: 'static/tiles_word.PNG'
})


const lib2 = new Tiles({
    container: 'demo2',
    width: Math.floor(vw * 0.16),
    height: Math.floor(vw * 0.08),
    nodrag: true
})

// if viewport is too narrow, don't display titles
const showTitle = vw >= 1000

lib2.addTile({
    title: showTitle ? 'API / Documentation' : '',
    img_src: 'static/documentation.PNG',
    clickLink: './api-v1.html'
})
lib2.addTile({
    title: showTitle ? 'Usage examples' : '',
    clickLink: './examples.html',
    img_src: 'static/examples.PNG'
})
lib2.addTile({
    title: showTitle ? 'Download source' : '',
    clickLink: './js/tiles.js',
    img_src: 'static/download.PNG'
})
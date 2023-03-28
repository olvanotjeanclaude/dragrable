/* tiles.js */
"use strict";

// library code
(function (global, document, $) {

    // this function is currently only in the scope of the anonymous function at the moment.
    function TileConstructor(options) {
        this.tiles = []

        // set options
        this.container = options.container
        if (this.container === undefined) {
            throw 'Container must be specified!'
        }
        this.width = options.width === undefined ? 100 : options.width
        this.height = options.height === undefined ? 100 : options.height
        this.animate = options.animate === undefined ? true : options.animate
        this.animate_factor = options.animate_factor === undefined ? 1.05 : options.animate_factor
        this.color_cycle = options.color_cycle === undefined ? false : options.color_cycle
        this.nodrag = options.nodrag === undefined ? false : true
        this.disabled = false

        const tileGap = options.tile_gap === undefined ? 30 : options.tile_gap
        const num_horizontal = options.num_horizontal === undefined ? Infinity : options.num_horizontal
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        const max_fit = Math.floor((vw - 20) / (this.width + tileGap))
        const repeat_no = Math.min(num_horizontal, max_fit)

        const canvas = $('#' + this.container)
        canvas.css('display', 'grid')
        canvas.css('grid-gap', `${tileGap}px`)
        canvas.css('padding', '10px')
        canvas.css('grid-template-columns', `${this.width}px `.repeat(repeat_no))
        canvas.css('grid-auto-rows', `${this.height}px`)
    }

    /* Start of private properties/functions */
    let _curr_tile = 0

    function _getTileID() {
        _curr_tile++
        return _curr_tile - 1
    }

    // a helper to shuffle arrays in place
    function _shuffleArrayInPlace(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]]
        }
        return a
    }

    // helper to animate tile size changes
    function _animateChange(id, startW, startH, endW, endH, obj) {
        let elem = document.getElementById(id);
        let w = startW
        let h = startH
        // clear any current animation before starting a new one
        clearInterval(obj.stopID)
        let animateID = setInterval(animate, 5);
        obj.stopID = animateID
        function animate() {
            if (w === endW && h === endH) {
                clearInterval(animateID);
            } else {
                w < endW ? w++ : w === endW || w--
                h < endH ? h++ : h === endH || h--
                elem.style.width = w + "px";
                elem.style.height = h + "px";
            }
        }
    }

    // helper to get a random int between -max and max
    function _getRandomInt(max) {
        const rnd = Math.floor(Math.random() * max)
        const sign = Math.random()
        return sign > 0.5 ? -rnd : rnd
    }

    // helper to animate tile colors
    function _animateColor(id) {
        let elem = document.getElementById(id);
        setInterval(animate, 200);
        function animate() {
            const currShadow = elem.style.boxShadow
            const components = [...currShadow.matchAll(/[\d]+[,)]/g)]
            if (components.length === 3) {
                const change = 20
                const newR = Math.abs((parseInt(components[0]) + _getRandomInt(change))) % 255
                const newG = Math.abs((parseInt(components[1]) + _getRandomInt(change))) % 255
                const newB = Math.abs((parseInt(components[2]) + _getRandomInt(change))) % 255
                elem.style.boxShadow = `0 0 3pt 2pt rgb(${newR} ${newG} ${newB})`
            } else {
                const r = Math.abs(_getRandomInt(255))
                const g = Math.abs(_getRandomInt(255))
                const b = Math.abs(_getRandomInt(255))
                elem.style.boxShadow = `0 0 3pt 2pt rgb(${r}, ${g}, ${b})`
            }
        }
    }

    // functions to help with drag and drop functionality
    function drag(ev) {
        ev.dataTransfer.setData("dragID", ev.target.id);
        ev.dataTransfer.setData("dragParent", ev.target.parentElement.id);
    }
    function drop(ev) {
        ev.preventDefault();
        const dragged = ev.dataTransfer.getData("dragID");
        const draggedParentID = ev.dataTransfer.getData("dragParent");
        let child = document.getElementById(ev.target.id)
        if (child && child.parentElement.id === draggedParentID) {
            const container = draggedParentID
            let toSort = document.getElementById(container).children
            toSort = Array.prototype.slice.call(toSort, 0)

            const first = toSort.findIndex((element) => element.id === dragged)
            const second = toSort.findIndex((element) => element.id === ev.target.id)

            if (first > -1 && second > -1) {
                [toSort[first], toSort[second]] = [toSort[second], toSort[first]]
            }

            let parent = document.getElementById(container)
            parent.innerHTML = ""

            for (let i = 0, l = toSort.length; i < l; i++) {
                parent.appendChild(toSort[i])
            }
        }
    }
    /* End of private properties/functions */

    TileConstructor.prototype = {
        // disables a certain tile
        disable: function (tileid) {
            const tile = this.tiles.find((element) => element.id === tileid)
            if (tile) {
                tile.disabled = true
                return true
            }
            return false
        },
        // disables all tiles
        disableAll: function () {
            this.disabled = true
        },
        // enables a certain tile
        enable: function (tileid) {
            const tile = this.tiles.find((element) => element.id === tileid)
            if (tile) {
                tile.disabled = false
                return true
            }
            return false
        },
        // enables all tiles, with an option to propagate
        enableAll: function (propagate = false) {
            this.disabled = false
            if (propagate) {
                for (let i = 0; i < this.tiles.length; i++) {
                    const tile = this.tiles[i];
                    tile.disabled = false
                }
            }
        },
        // sorts the tiles in the container by their ID
        sort: function () {
            const container = this.container
            let toSort = document.getElementById(container).children
            toSort = Array.prototype.slice.call(toSort, 0)

            toSort.sort(function (a, b) {
                let aord = parseInt(a.id)
                let bord = parseInt(b.id)
                return (aord > bord) ? 1 : -1
            })

            let parent = document.getElementById(container)
            parent.innerHTML = ""

            for (let i = 0, l = toSort.length; i < l; i++) {
                parent.appendChild(toSort[i])
            }
        },

        // shuffles the tiles in the container by their ID
        shuffle: function () {
            const container = this.container
            let toSort = document.getElementById(container).children
            toSort = Array.prototype.slice.call(toSort, 0)

            _shuffleArrayInPlace(toSort)

            let parent = document.getElementById(container)
            parent.innerHTML = ""

            for (let i = 0, l = toSort.length; i < l; i++) {
                parent.appendChild(toSort[i])
            }
        },

        // flips a tile to it's alt image
        flip: function (tileid) {
            const tile = this.tiles.find((element) => element.id === tileid)
            if (tile && tile.alt_img) {
                const target = document.getElementById(tileid)
                const tileImg = target.children[0]
                const prevImg = tile.curr_img
                const nextImg = tile.alt_img
                tile.alt_img = prevImg
                tile.curr_img = nextImg
                tileImg.src = nextImg
            }
        },

        // adds a tile to the canvas
        addTile: function (options = null) {
            if (options === null) { options = {} }
            const canvas = $('#' + this.container)
            const title = options.title === undefined ? '' : options.title
            const img_src = !options.img_src ? '' : options.img_src
            const hover_color = !options.hover_color ? 'cyan' : options.hover_color
            const clickLink = !options.clickLink ? '' : options.clickLink
            const alt_img = !options.alt_img ? '' : options.alt_img
            const click_callback = !options.click_callback ? null : options.click_callback

            const tile = document.createElement('div')
            tile.id = _getTileID()
            tile.innerText = title
            tile.style.width = this.width + 'px'
            tile.style.height = this.height + 'px'
            tile.style.backgroundColor = 'white'
            tile.style.borderRadius = '5px'
            tile.style.boxShadow = '0 0 3pt 2pt black'
            tile.style.textAlign = 'center'
            // add behavior for mouse hover events
            tile.onmouseenter = (event) => {
                const target = event.target
                if (!this.color_cycle) {
                    target.style.boxShadow = `0 0 3pt 2pt ${hover_color}`
                }
                target.style.zIndex = 2
                if (this.animate) {
                    const tile = this.tiles.find((element) => element.id === target.id)
                    const currW = parseInt(target.style.width)
                    const currH = parseInt(target.style.height)
                    _animateChange(target.id, currW, currH,
                        Math.ceil(this.animate_factor * this.width),
                        Math.ceil(this.animate_factor * this.height), tile)
                }
            }
            tile.onmouseleave = (event) => {
                const target = event.target
                if (!this.color_cycle) {
                    target.style.boxShadow = '0 0 3pt 2pt black'
                }
                target.style.zIndex = 1
                if (this.animate) {
                    const tile = this.tiles.find((element) => element.id === target.id)
                    const currW = parseInt(target.style.width)
                    const currH = parseInt(target.style.height)
                    _animateChange(target.id, currW, currH, this.width, this.height, tile)
                }
            }
            if (clickLink) {
                tile.onclick = (event) => {
                    const tile = this.tiles.find((element) => element.id === event.target.id)
                    if (!this.disabled && !tile.disabled) {
                        window.open(clickLink, '_self')
                    }
                }
            } else if (alt_img) {
                tile.onclick = (event) => {
                    const target = event.target
                    const tile = this.tiles.find((element) => element.id === target.id)
                    if (!this.disabled && !tile.disabled) {
                        this.flip(target.id)
                        if (tile.click_callback) {
                            tile.click_callback(tile)
                        }
                    }
                }
            }
            // add drag and drop functionality
            if (!this.nodrag) {
                tile.draggable = 'true'
                tile.ondrop = drop
                tile.ondragover = (ev) => { ev.preventDefault() }
                tile.ondragstart = drag
            }

            if (img_src !== '') {
                const img = document.createElement('img')
                img.src = img_src
                img.style.width = '100%'
                title ? img.style.height = '80%' : img.style.height = '100%'
                img.style.pointerEvents = 'none'
                tile.append(img)
            }
            canvas.append(tile)
            this.tiles.push({
                id: tile.id,
                stopID: -1,
                alt_img: alt_img,
                curr_img: img_src,
                click_callback: click_callback,
                disabled: false
            })
            if (this.color_cycle) {
                _animateColor(tile.id)
            }
            return tile.id
        }
    }
    global.Tiles = global.Tiles || TileConstructor

})(window, window.document, $);
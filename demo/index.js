
const vacationPics = [
    'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg',
    'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-mont-st-michel.jpg',
    'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-versailles-gardens.jpg',
    'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-chateau-de-chenonceau.jpg',
    'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-calanques-national-park.jpg',
    'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-amiens-cathedral.jpg'
]


const test = new Tiles({
    container: "test"
});


for (let i = 1; i < 7; i++) {
    test.addTile({
        img_src: vacationPics[i - 1],
        hover_color: 'salmon'
    })
}
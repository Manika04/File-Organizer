function helpfn(){
    console.log(`List of all the Commands: 
                    1. Tree Command - node Fo.js tree <dirname>
                    2. Organize Command - node Fo.js organize <dirname>
                    3. Help Command - node Fo.js help`);
}

module.exports = {
    helpKey : helpfn
}
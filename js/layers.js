addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        dilate: false,
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tabFormat: [
    'main-display',
    'resource-display',
    ["display-text", function() { 
        let dilated = ''
        if(!player[this.layer].dilate) dilated = 'not'
        return 'Your prestige is ' + dilated + ' currently dilated' }, 
    ],
    'blank',
    ['clickable', 11]
    ],
    clickables: {
    11: {
        display() { return "Dilate" },
        canClick() { return true },
        onClick() {
            player[this.layer].dilate = !player[this.layer].dilate
            doReset(this.layer) 
            if(!player[this.layer].dilate) { 
            } 
        }
    }
    },
})

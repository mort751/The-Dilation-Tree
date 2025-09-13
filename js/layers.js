addLayer("dp", {
    name: "dilation points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        dilate: false,
    }},
    color: "#bdd4f2ff",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "dilated points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(0)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},

    dilationGain() {
        let formula = tmp[this.layer].baseAmount.cbrt().div(100)
        if(hasUpgrade('dp', 13)) formula = formula.mul(3)
        return formula
    },

    update(diff) {
        if(player[this.layer].dilate) player[this.layer].points = player[this.layer].points.add((tmp[this.layer].dilationGain).mul(diff))
    },

    tabFormat: [
    'main-display',
    ["display-text", function() { 
        if(player[this.layer].dilate) return 'You are currently inside of a point dilation' }, 
    ],
    ["display-text", function() { 
        if(player[this.layer].dilate) return 'You are generating ' + format(tmp[this.layer].dilationGain) + ' dilation points/sec'}, 
    ],
    'blank',
    ['clickable', 11],
    'blank',
    'upgrades'
    ],
    clickables: {
    11: {
        display() { return "Dilate" },
        canClick() { return true },
        onClick() {
            doReset(this.layer)
            player[this.layer].dilate = !player[this.layer].dilate 
        }
    }
    },
    upgrades: {
    11: {
        title: "More Points",
        description: "Multiply point gain by 2.00x.",
        cost: new Decimal(1),
    },
    12: {
        title: "Weak Dilation",
        description: "Inside of point dilations, raise point generation to the power of ^1.10.",
        cost: new Decimal(2),
        unlocked() { return player.dp.upgrades.length>=1 }
    },
    13: {
        title: "More Dilation Points",
        description: "Multiply dilation point gain by 3.00x.",
        cost: new Decimal(3),
        unlocked() { return player.dp.upgrades.length>=2 }
    },
    }
})

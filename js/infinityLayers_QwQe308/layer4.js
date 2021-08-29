addLayer("p4", {
    name: "prestige layer 4", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P^4", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new ExpantaNum(0),
        bestP:n(0)
    }},
    color: "green",
    resource: "重置^4点", // Name of prestige currency
    baseResource: "点数",
    baseAmount() {return player.p3.points},
    requires(){return new ExpantaNum(3125).pow((Number(this.layer[1])-1)**0.33)},
    exponent: 1,
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
        if(hasUpgrade(this.layer,25)) mult = mult.mul(upgradeEffect(this.layer,25))
        //if(hasUpgrade("p",11)) mult = mult.mul(upgradeEffect("p",11))
        //if(hasMilestone("a",3)) mult = mult.mul(layers.a.effect4())
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        var exp = n(0.25)
        if(hasUpgrade(this.layer,22)) exp = exp.mul(upgradeEffect(this.layer,22))
        //if(hasMilestone("a",0)&&!hasUpgrade("a",15)) exp = exp.mul(0.5)
        //if(hasUpgrade("a",15)) exp = exp.mul(2)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown(){return hasUpgrade("p3",21)||player[this.layer].unlocked},
    //effect(){
    //    var eff = two.pow(player.t.points)
    //    eff = logsoftcap(eff,e("e10"),0.25)
    //    return eff
    //},
    //onPrestige(gain){
    //    gainToken(player.t.currentC,gain);doACreset(false)
    //},
    //effectDescription(){return `使pp*${format(this.effect(),0)}`},
    /*clickables: {
        11: {
            canClick(){return true},
            display() {var baseSTR = "C" + this.id;if(player.t.currentC == this.id) baseSTR += "<br>您在该挑战中!";baseSTR += `<br>您有${formatWhole(player.t.tokens[this.id])}个${this.id}代币(token)`;baseSTR += this.effDesp();return baseSTR},
            effect(){
                var eff = player.t.tokens[this.id].div(10).add(1).pow(0.75)
                eff = powsoftcap(eff,e(1.5),2)
                eff = logsoftcap(eff,e(20),0.33)
                return eff
            },
            effDesp(){
                return "使得点数获取和时间速率^"+format(this.effect(),2)
            },
            onClick(){doACreset(false,this.id);player.t.currentC = this.id}
        },
    },*/
    upgrades: {
        11: {
            title:"重置加成",
            description: "欢迎来到最后一层p转!\n本层重置点加成点数获取.该加成不会低于2.自动获取10%P2.",
            cost(){return n(1)},
            unlocked(){return true},
            effect(){
                var baseEff = player[this.layer].points.add(2).log10().add(1).pow(2**Number(this.layer[1])).pow(2).mul(2)
                if(hasUpgrade(this.layer,15)) baseEff = baseEff.pow(upgradeEffect(this.layer,15))
                return baseEff
            },
            effectDisplay(){return `x${format(upgradeEffect(this.layer,this.id),1)}`}
        },
        12: {
            title:"协同作用",
            description: "点数加成点数获取.",
            cost(){return n(5)},
            unlocked(){return hasUpgrade(this.layer,this.id-1)},
            effect(){
                var baseEff = player.points.add(10).log10().pow(2).pow(Number(this.layer[1])**0.75)
                if(hasUpgrade(this.layer,15)) baseEff = baseEff.pow(upgradeEffect(this.layer,15))
                return baseEff
            },
            effectDisplay(){return `x${format(upgradeEffect(this.layer,this.id),1)}`}
        }, 
        13: {
            title:"探索遗迹",
            description: "你的点数受到最佳点数的加成.",
            cost(){return n(25)},
            unlocked(){return hasUpgrade(this.layer,this.id-1)},
            effect(){
                var baseEff = player[this.layer].bestP.add(10).log10().pow(1.14514).pow(Number(this.layer[1]))
                if(hasUpgrade(this.layer,15)) baseEff = baseEff.pow(upgradeEffect(this.layer,15))
                return baseEff
            },
            effectDisplay(){return `x${format(upgradeEffect(this.layer,this.id),1)}`}
        }, 
        14: {
            title:"双子星系",
            description: "如果你的本层重置点的整数部分是偶数,点数x69^本层层级数.",
            cost(){return n(125)},
            unlocked(){return hasUpgrade(this.layer,this.id-1)},
            effect(){
                var p = player[this.layer].points.floor()
                if(p.div(2).floor().eq(p.div(2)) || hasUpgrade(this.layer,24)) var baseEff = n(69).pow(Number(this.layer[1]))
                else baseEff = n(1)
                if(hasUpgrade(this.layer,15)) baseEff = baseEff.pow(upgradeEffect(this.layer,15))
                return baseEff
            },
            effectDisplay(){return `x${format(upgradeEffect(this.layer,this.id),1)}`}
        }, 
        15: {
            title:"多重增益",
            description: "基于本层重置点指数增幅前四个升级.",
            cost(){return n(625)},
            unlocked(){return hasUpgrade(this.layer,this.id-1)},
            effect(){
                baseEff = player[this.layer].points.add(10).log10().pow(0.4)
                return baseEff
            },
            effectDisplay(){return `^${format(upgradeEffect(this.layer,this.id),3)}`}
        }, 
        21: {
            title:"探索高维",
            description: "大幅改善p1和p2的升级11.保留上一层级的升级.",
            unlocked(){return hasUpgrade(this.layer,15)},
            cost(){return n(3125).pow(Number(this.layer[1])**0.33)},
        },
        22: {
            title:"批量生产",
            description: "基于升级15的效果指数加成本层重置点获取，但不能超过^2.",
            cost(){return n(15625).pow(Number(this.layer[1])**0.33)},
            unlocked(){
                if(player[`p${Number(this.layer[1])+1}`]) return hasUpgrade(`p${Number(this.layer[1])+1}`,11) && hasUpgrade(this.layer,this.id-1)
                else return hasUpgrade(this.layer,this.id-1)
            },
            effect(){
                baseEff = upgradeEffect(this.layer,15).pow(0.5)
                return baseEff.min(2)
            },
            effectDisplay(){return `^${format(upgradeEffect(this.layer,this.id),3)}`}
        }, 
        23: {
            title:"工具升级",
            description: "基于升级15的效果再次指数加成升级13效果，但不能超过^3.",
            cost(){return n(65536).pow(Number(this.layer[1])**0.33)},
            unlocked(){return hasUpgrade(this.layer,this.id-1)},
            effect(){
                baseEff = upgradeEffect(this.layer,15).pow(0.75)
                baseEff = powsoftcap(baseEff,n(2),2)
                return baseEff.min(3)
            },
            effectDisplay(){return `^${format(upgradeEffect(this.layer,this.id),3)}`}
        }, 
        24: {
            title:"双子银河",
            description: "如果你的该层的重置点的指数的整数部分是偶数,点数x69420^本层层级数.升级14效果永久触发.低层的“双子银河”永久生效。",
            cost(){return n(1e7).pow(Number(this.layer[1])**0.5)},
            unlocked(){return hasUpgrade(this.layer,this.id-1)},
            effect(){
                var p = player[this.layer].points.max(1).log10().floor()
                if(p.div(2).floor().eq(p.div(2)) || hasUpgrade(this.layer,25)){
                    var baseEff = n(69420).pow(Number(this.layer[1]))
                } 
                else baseEff = n(1)
                return baseEff
            },
            effectDisplay(){return `x${format(upgradeEffect(this.layer,this.id),1)}`}
        }, 
        25: {
            title:"极限升维",
            description: `底层重置点加成本层重置点获取.自动获取10%p3重置点.升级24永远触发.QwQ部分完结~`,
            cost(){return n(1e7).pow(Number(this.layer[1])**0.65)},
            unlocked(){return hasUpgrade(this.layer,this.id-1)},
            effect(){
                var baseEff = player.p1.points.add(10).log10().pow(1.919810)
                return baseEff
            },
            effectDisplay(){return `x${format(upgradeEffect(this.layer,this.id),2)}`}
        }, 
    },
    /*buyables: {
        11: {
            cost(x) {
                var c = new OmegaNum(1.797e308).pow(x.add(1).root(125).sub(1))
                if(hasUpgrade("p",35)) c = c.root(1.25)
                return c
            },
            display() { return `倍增前10个升级效果.<br />x${format(buyableEffect(this.layer,this.id),2)}.<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}pp<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player[this.layer].points.gte(this.cost().add(1)) },
            buy() {
                if(hasUpgrade("p",34)){this.buyMax();return}
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax(){
                var p = hasUpgrade("p",35)? player.p.points.pow(1.25) : player.p.points
                var c = p.logBase(1.797e308).add(1).pow(125).sub(getBuyableAmount(this.layer, this.id)).min(upgradeEffect("p",34)).floor().max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(c))
            },
            effect(){
                var baseEff = getBuyableAmount(this.layer,this.id).add(1).pow(0.25)
                if(baseEff.gt(2)) baseEff = baseEff.pow(0.75).mul(2**0.25)
                if(hasMilestone("a",23)) baseEff = baseEff.mul(buyableEffect("a",12))
                return baseEff
            },
            unlocked(){return hasUpgrade("p",25)&&upgradeEffect("p",25).gte(1)},
            abtick:0,
            abdelay(){
                return upgradeEffect("p",35)
            }
        },
    },*/

    /*
    challenges: {
        11: {
            name: "AntiLooperrrr",
            challengeDescription: "因为挑战出了bug，devU13被禁用了。刷新后的第一帧时间计数x100。",
            canComplete(){return player.points.gte(1e10)},
            goalDescription(){return format(ExpantaNum(1e10))+"点数"},
            rewardDisplay(){return `你永远保留dev11的效果，同时“刷新后的第一帧时间计数x100。”被保留。`},
            unlocked(){return hasUpgrade("dev",15)}
        },
    },
    */
    /*milestones: {
        1: {
            requirementDescription: "1:1medal",
            effectDescription: "自动p升级.",
            done() { return player.t.points.gte(1) },
        },
    },*/
    //passiveGeneration(){
    //    if(hasMilestone("t",15)) return 0.1
    //    return 0
    //},
    //important!!!
    update(diff){
        player[this.layer].bestP = player[this.layer].bestP.max(player.points)
        //auto
        /*for(row=1;row<=2;row++){
            for(col=1;col<=3;col++){
                if(layers[this.layer].buyables[row*10+col]){
                layers[this.layer].buyables[row*10+col].abtick += diff
                if(layers[this.layer].buyables[row*10+col].abtick >= layers[this.layer].buyables[row*10+col].abdelay() && layers[this.layer].buyables[row*10+col].unlocked()){
                    layers[this.layer].buyables[row*10+col].buy()
                    layers[this.layer].buyables[row*10+col].abtick = 0
                }}
            }
        }*/
    },
    getResetGain(){
        var gain = new ExpantaNum(1)
        gain = gain.mul(this.baseAmount().div(this.requires()).pow(this.exponent)).pow(this.gainExp()).mul(this.gainMult())
        //if(player.a.points.add(gain).gt(getAPlimit())) return getAPlimit().sub(player.a.points).max(0)
        return gain.floor()
    },
    prestigeButtonText(){
        return "+ "+formatWhole(layers[this.layer].getResetGain()) + this.resource
    },
    hotkeys: [
        {key: "4", description: "4: PL4转", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    //passiveGeneration(){
    //    if(hasUpgrade("a",23)) return 10
    //    if(hasMilestone("a",5) || hasMilestone("a",26)) return 1
    //    if(hasMilestone("a",2)) return 0.1
    //    return 0
    //},
    doReset(layer){
        if(layers[layer].row>1){
            var kp = []
            layerDataReset(this.layer, kp)
            //if(hasUpgrade(this.layer,21)) player.p.upgrades = [21]
        }
    }
    /*tabFormat: {
        Token挑战表: {
            buttonStyle() {return  {'color': 'lightblue'}},
            content:
                ["main-display",
                //["display-text", function() {
                //    var basestr = "你的增益点为 "+HARDformat(player.v.buffp)+" / "+HARDformat(player.v.points)
                //    if(player.v.buffp.gt(player.v.points)) basestr+=` <warning style="color:red";>(WARNING:增益点大于上限!)</warning>`
                //    return basestr
                //}],
                //["display-text", function() {
                //    var basestr = "你的减益点为 "+HARDformat(player.v.nerfp)+" / "+HARDformat(player.v.points)
                //    if(player.v.nerfp.lt(player.v.points)) basestr+=` <warning style="color:red">(WARNING:减益点未达到目标!你的游戏暂停!)</warning>`
                //   return basestr
                //}],
                "prestige-button", "resource-display",
                "clickables",
                //["blank", "5px"], // Height
                //"h-line",
                //["display-text", function() {return "增益升级"}],
                //["blank", "5px"],
                //"buyables",
                //["blank", "5px"], // Height
                //"h-line",
                //["display-text", function() {return "减益升级"}],
                //"upgrades",
                ],},
    }*/
})
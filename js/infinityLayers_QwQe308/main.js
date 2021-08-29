var tmpLayerStat = {
    l1:{},
    l2:{},
    h2:{},
    h1:{},
}
function getNewLayerStat(layerNum){
    return {
        layer:layerNum,
        pointName:layerNum.eq(1)? `重置点`:`重置^${formatWhole(layerNum)}点`,
        baseRes:layerNum.eq(1)? `点数`:layerNum.eq(2)?`重置点`:`重置^${formatWhole(layerNum)}点`,
        baseAmount(){
            if(layerNum.eq(1)) return player.points
            if(layerNum.eq(2)) return layerStat[1].points
            if(layerNum.eq(3)) return layerStat[2].points
            return layerStat[3].points
        },
        points:n(0),
        total:n(0),
        best:n(0),
        upgrades:[],
        milestones:[],
        buyables:{}
    }
}
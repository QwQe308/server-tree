//更方便的expantanum定义
function e(num){
    return new ExpantaNum(num)
}
function n(num){
    return new ExpantaNum(num)
}
//较小数字直接调用(可能和上边需要的定义有重复)
var zero = new ExpantaNum(0)
var one = new ExpantaNum(1)
var two = new ExpantaNum(2)
var three = new ExpantaNum(3)
var four = new ExpantaNum(4)
var five = new ExpantaNum(5)
var six = new ExpantaNum(6)
var seven = new ExpantaNum(7)
var eight = new ExpantaNum(8)
var nine = new ExpantaNum(9)
var ten = new ExpantaNum(10)
function powsoftcap(num,start,power){
	if(num.gt(start)){
		num = num.root(power).mul(start.pow(one.sub(one.div(power))))
	}
    return num
}
function logsoftcap(num,start,power){
    if(num.gt(start)){
        num = ten.tetr(num.slog(10).sub(power)).pow(start.logBase(ten.tetr(start.slog(10).sub(power))))
    }
    return num
}

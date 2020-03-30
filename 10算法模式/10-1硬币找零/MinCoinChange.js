//传入面值数组coins和总金额amount
//传出 change对象，属性名称是面值，属性值是数量
function ChangeByRecursion(coins, totalAmount) {
    var coinGroup = [];
    for (var i = 0; i <= totalAmount; i++) {
        var tempf = new Map();
        for (var j = 0; j < coins.length; j++) {
            tempf.set(coins[j], 0);
        }
        coinGroup.push(tempf);
    }

    function change(amount) {
        if (amount == 0) return 0;
        else if (amount < 0) return -1;
        //else if (amount<0) {coinGroup.shortAmount=}
        else if (amount > 0) {
            var minAmount = Infinity;
            var mini = 0;
            for (var i = 0; i < coins.length; i++) {
                nextAmount = change(amount - coins[i]);
                if (nextAmount < minAmount && nextAmount >= 0) {
                    minAmount = nextAmount;
                    mini = i;
                } //end i
                //循环完毕，将硬币面值写入对象
            } //end for
            //   if ((amount - coins[mini]) > 0) {
            for (var [key, value] of coinGroup[amount - coins[mini]]) {
                coinGroup[amount].set(key, value);
            }
            coinGroup[amount].set(coins[mini], coinGroup[amount].get(coins[mini]) + 1);
            return minAmount + 1;
            //  } else {
            //   }
        } //end else if
    } //end change
    var minCoinNum = change(totalAmount);
    // console.log(coinGroup)
    // console.log(minCoinNum)
    return coinGroup, minCoinNum;
}
//ChangeByRecursion([1, 2, 3], 6)
//将中间变量存入字典
function ChangeByMap(coins, totalAmount) {
    var coinGroup = [];
    var coinMap = new Map();
    for (var i = 0; i <= totalAmount; i++) {
        var tempf = new Map();
        for (var j = 0; j < coins.length; j++) {
            tempf.set(coins[j], 0);
        }
        coinGroup.push(tempf);
    }

    function change(amount) {
        if (coinMap.has(amount)) return coinMap.get(amount);
        if (amount == 0) return 0;
        else if (amount < 0) return -1;
        else if (amount > 0) {
            var minAmount = Infinity;
            var mini = 0;
            for (var i = 0; i < coins.length; i++) {
                nextAmount = change(amount - coins[i]);
                if (nextAmount < minAmount && nextAmount >= 0) {
                    minAmount = nextAmount;
                    mini = i;
                } //end i
            } //end for
            for (var [key, value] of coinGroup[amount - coins[mini]]) {
                coinGroup[amount].set(key, value);
            }
            var tempAmount = coinGroup[amount].get(coins[mini]) + 1;
            coinGroup[amount].set(coins[mini], tempAmount);
            coinMap.set(amount, minAmount + 1);
            return minAmount + 1;
        } //end else if
    } //end change
    var minCoinNum = change(totalAmount);
    // console.log(coinGroup)
    // console.log(minCoinNum)
    return coinGroup, minCoinNum;
}

function ChangeByDp(coins, totalAmount) {
    var coinGroup = [];
    var coinDp = [];
    for (var i = 0; i <= totalAmount; i++) {
        coinDp.push(totalAmount + 1);
        var tempf = new Map();
        for (var j = 0; j < coins.length; j++) {
            tempf.set(coins[j], 0);
        }
        coinGroup.push(tempf);
    }
    coinDp[0] = 0;
    // for (var i = 0; i <= totalAmount; i++) {
    //     var tempf = new Map();
    //     for (var j = 0; j < coins.length; j++) {
    //         tempf.set(coins[j], 0);
    //     }
    //     coinGroup.push(tempf);
    // }
    var minCoinNum = change(totalAmount);
    console.log(minCoinNum);

    function change(amount) {
        for (var i = 1; i <= amount; i++) {
            tempAmount = Infinity;
            tempj = 0;
            for (var j = 0; j < coins.length; j++) {
                if ((i - coins[j]) >= 0) {
                    //  coinDp[i] = Math.min(coinDp[i], coinDp[i - coins[j]] + 1);
                    if (tempAmount > coinDp[i - coins[j]]) {
                        tempAmount = coinDp[i - coins[j]];
                        tempj = j;
                    }
                }
            }
            for (var [key, value] of coinGroup[i - coins[tempj]]) {
                coinGroup[i].set(key, value);
            }
            var tempNum = coinGroup[i].get(coins[tempj]) + 1;
            coinGroup[i].set(coins[tempj], tempNum);
            //coinMap.set(amount, minAmount + 1);
            coinDp[i] = tempAmount + 1;
        }
     
       return coinDp[amount], coinGroup[amount];
    } //end change
}
console.time('递归找零');
ChangeByRecursion([1, 2, 3], 100)
console.timeEnd('递归找零');
console.time('带字典的找零');
ChangeByMap([1, 2, 3], 100)
console.timeEnd('带字典的找零');
console.time('自下而上的找零');
ChangeByDp([1, 2, 3], 100)
console.timeEnd('自下而上的找零');

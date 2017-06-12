'use static';

//模板字符串
{
    let bao = '鲍',
        mian = '面';
    let to = kitcchen `今天的早餐是 ${bao} 和 ${mian} !`;

    // 分解模板字符串 kitcchen

    function kitcchen(strings, ...vals) {
        console.log(strings); //输出字符串
        console.log(vals); //输出模板里面的值
        // raw会把原始的字符串输出
    }
}

// 判断一个字符串里面是不是包含其他字符串
{
    console.log(
        // 1.以某个字符串开头的
        to.startsWith('今天'), //返回是 true
        // 2.某个结尾的
        to.endsWith('!'), //返回是 true 不是返回false
        // 3.是不是包含某个字符串
        to.includes('早餐'), //返回是 true
    )
}

// ... 语法 把东西展开
{
    let art = ['1', '2'],
        foods = ['3', ...art];
    console.log(...art);
    console.log(foods); //1,2,3
}

// ...剩余的还有 参数
{
    function ice(p1, p2, ...p3) {
        console.log(p1, p2, p3);
        // 想展开数组的话在前面输出的...
        console.log(p1, p2, ...p3);
    }
    ice('1', '2', '3', '4'); //后面输出的会是数组

    // 结构对象
    function obj(p1, p2, { p3, p4 } = {}) {
        console.log(p1, p2, p3, p4)
    }
    obj('1', '2', '3', '4')
}

// 函数name属性
{
    function breaks(params) {}
    console.log(breaks.name) //breaks

    // 匿名函数表达式 名字就是变量的名字
    let breaks2 = function(params) {}
    console.log(breaks2.name) //breaks

    //函数声明的名字
    let breaks3 = function cat(params) {}
    console.log(breaks3.name) //cat
}

// 箭头函数=>
{
    let backs = des => des;
    // 普通函数写法
    var backs2 = function backs2(des) {
        return des;
    }
    let backs3 = (des, des2) => des + des2;
    let backs5 = (des, des2) => {
        return des + des2;;
    };

    // 普通函数写法
    var backs4 = function backs4(des) {
        return des + des2;
    }
}

// 对象方法
{
    let dessert = 'cart',
        drink = 'hede';
    let food = {
        dessert,
        drink,
        backs() {} //等于 backs:function(){}
    }
    console, log(food)
}

//输出带空格的对象名字
{
    let food = {}

    foode.dessert = 'caki';
    foode['hot drink'] = 'cha';

    // 或者定义一个变量
    let drink = 'hot drink'
        // 输出同上
    foode[drink] = 'cha';
}


// 判断是不是一个东西Object.is(NaN, NaN) 
{
    // +0==-0// true
    // +0===-0//true
    // NaN==NaN//false
    // 用Object.is()判断两个东西相同
    Object.is(NaN, NaN) //true
    Object.is(-0, N + 0) //false
}

// 一个对象的属性赋值到另一个对象Object.assign(‘接收者，目标’，‘赋值的元素’)
{
    let backs = {}
    Object.assign(backs, {
        drink: 'cha'
    }, {
        drink: '会覆盖上面'
    })
}

// 创建对象以后去改变对象
{
    let backs = {
        getDrink() {
            return 'cha';
        }
    };
    let dinner = {
        getDrink() {
            return 'pijiu'
        }
    };
    // 创建一个对象 得到判断是不是这个对象里面的Object.getPrototypeOf()
    let sunday = Object.create(backs);
    console.log(sunday.getDrink()); //‘cha’
    console.log(Object.getPrototypeOf(sunday) == backs); //true
    // 再设置他的对象Object.setPrototypeOf('要设置的对象','要设置成这个对象')
    Object.setPrototypeOf(sunday, dinner);
    console.log(sunday.getDrink()); //pijiu
    console.log(Object.getPrototypeOf(sunday) == backs); //false
}


// __proto__ 可以设置对象里面的__proto__
{
    let backs = {
        getDrink() {
            return 'cha';
        }
    };
    let dinner = {
        getDrink() {
            return 'pijiu'
        }
    };
    let sunday = {
        __proto__: backs
    }
    console.log(sunday.getDrink()); //‘cha’
    console.log(Object.getPrototypeOf(sunday) == backs); //true
    sunday.__proto__ = dinner;
    console.log(sunday.getDrink()); //pijiu
    console.log(Object.getPrototypeOf(sunday) == backs); //false
}

// super执行以下那个对象返回的东西
{
    let backs = {
        getDrink() {
            return 'cha';
        }
    };
    let dinner = {
        getDrink() {
            return 'pijiu'
        }
    };
    let sunday = {
        __proto__: backs,
        getDrink() {
            //  super执行以下那个对象返回的东西
            return super.getDrink() + '茶';
        }
    }
    console.log(sunday.getDrink()); //‘cha茶’
}

/**
 * Iterators迭代器，轮流,交换，特点，每次执行会返回一个对象，
 * {value:xx,dome:ture/false}
 * 对象里面有两样东西，一个是返回来的值，一个是布尔值
 * 表示还有没有迭代的东西，没有就dome的值是ture意思就是完成迭代，
 * 还有next()对象，执行返回对象{value:xx,dome:ture/false}
 * 如果没有迭代东西执行的时候，value的值就变成undefined，dome会变成ture
 * 在ES6 有个Generators可以去生成迭代器
 * 
 */
{
    function chef(foods) {
        let i = 0;

        return {
            next() {
                let done = (i >= foods.length);
                let value = !done ? foodes[i++] : undefined;

                return {
                    value: value,
                    done: done
                }
            }
        }
    }
    let wg = chef(['xihongsi', 'chaojidan']);
    console.log(wg.next())
    console.log(wg.next())
    console.log(wg.next())
}

//Generators迭代器
{
    function* chef(params) {
        yield 'apple';
        yield 'apple';
    }
    let wh = chef();

    console.log(wg.next())
    console.log(wg.next())
    console.log(wg.next())
}
// const { log } = require("console")

// const { log } = require("console")




window.onload = function () {

    // 获取元素    获取元素    获取元素    获取元素    获取元素    获取元素    获取元素
    let none_1 = document.querySelector('.none_1')
    let first_zhu = none_1.querySelectorAll('.zhu')
    let none_first = document.querySelector('.none_first')
    let none_first_1 = none_first.querySelectorAll('.zhu')
    let content = document.querySelector('.content')
    let content_1 = document.querySelector('.content_1')
    let mps = document.querySelectorAll('.mps')                 //音频集合
    let there_none = document.querySelectorAll('.there_none')     //三阶段集合


    let xin_box = document.querySelector('.xin_box')  //大box（后面换背景图片）
    let goout = document.querySelectorAll('.gotoout')    //待消失 外围
    let outson = document.querySelectorAll('.outson')   //待消失  里边

    let yidong = document.querySelector('#yidong')
    let sanjiao = document.querySelector('.triangular_box')   //底部三角
    let anima_ones = document.querySelectorAll('.anima_one')//第一页面全部元素
    let nones = document.querySelectorAll('.none')
    let zhus = document.querySelectorAll('.zhu')
    let shipins = document.querySelectorAll('.shipin')
    let contents = document.querySelectorAll('.content_son')
    let new_none = document.querySelectorAll('.new_none')

    // 获取元素    白圈一家子
    let quans = document.querySelectorAll('.quan')
    let sons = document.querySelectorAll('.son')

    // 鸡仔/鸡脚帧
    let jizai = document.querySelector('#jizai')  //鸡仔的盒子      
    let jijiao = document.querySelector('#jijiao')//鸡仔的图片本身      鸡脚


    let time_arr = [0, 5394, 3441.1, 3667.5, 2421.5]  //音频延迟时间
    let num = 0;
    let g = 0;
    let z = 1;
    let ji_timer = null;
    let flag = true;
    let zeng = 0;
    let timer_zhu = 0;       //柱子升起过程时间
    let touh_flag = true;

    let zhu_num = -1;//动画柱子的下标
    let anima_num = -1;
    var i = 0;
    let quan_num = null
    let son = null
    let boy = null
    let gril = null
    let quan_index =                                                           null
    // 三个子元素

    // 文档后赋值事件  文档后赋值事件  文档后赋值事件  文档后赋值事件

    // 遍历赋值给  .son 的data自定义属性    ——iex
    for (let j = 0; j < sons.length; j++) {
        let son_num = j + 1
        sons[j].dataset.iex = son_num

        nones[j].dataset.next = j
    } 

    // 封装事件   
    // 鸡仔的动画帧数   封装版
    function zhenshu() {
        ji_timer = setInterval(() => {
            // console.log(g, 'g', z, 'z');
            if (z > 5) z = 1
            jijiao.setAttribute('src', `../images/gz${g}${z}.png`)
            z++

        }, 100)
    }

    // 介绍模板的  排他疯转函数
    function peita(ele, ind) {

        // console.log(ind,'sdadsad');
        for (var a = 0; a < ele.length; a++) {
            ele[a].style.display = 'none'
            ele[a].classList.add('animate__animated', 'animate__fadeIOut')
            ele[a].style.setProperty('--animate-duration', `.5s`);
        }

        ele[ind].style.display = 'block'
        ele[ind].classList.add('animate__animated', 'animate__fadeIn')
        ele[ind].style.setProperty('--animate-duration', `.5s`);

    }


    // 音频
    function Mp(mp, ms) {
        // console.log(mp,'获没获取到');

        mp.setAttribute('loop', 'true');
        mp.play();



        setTimeout(() => {
            mp.pause()
            console.log('已暂停');
        }, ms)
    }

    // 第二阶段消失动画    封装
    function out(eles) {

        for (var x = 0; x < eles.length; x++) {
            eles[x].classList.remove('animate__animated')
            eles[x].classList.add(`gotoout_${x + 1}`)

        }
    }

    // 柱子上下动画    封装
    function zhu_show(zhu) {

        // console.log(Mp(mps[1],timer_zhu));
        // 柱子动画
        zhu[0].classList.add('animate__animated', 'animate__bounceInUp',)
        zhu[0].style.setProperty('--animate-duration', `2.5s`);
        zhu_num++


        for (var k = 1; k < zhu.length; k++) {

            zhu[k].classList.add('animate__animated', 'animate__bounceInUp', 'animate__delay-2s')
            zhu[k].style.setProperty('--animate-duration', `${k * 0.85}s`);
            timer_zhu = (k * 0.85) + 2
            zhu_num++
            // console.log(zhu[k],'个数');
            // console.log(timer_zhu,'时间');
        }


        timer_zhu *= 1000
        Mp(mps[1], timer_zhu)

        timer_zhu = 0

        return zhu_num
    }

    // 第三阶段全部内容显示
    function end_animate() {
        setTimeout(() => {
            // xin_box.className='newxin_box'
            console.log(123)
            for (let y = 0; y < there_none.length; y++) {
                there_none[y].style.display = 'block'
                there_none[y].classList.add(`end_move_${y + 1}`)
            }
        }, 7000)
    }

    // 主线程柱子动画         动画结束开关变量开
    function zhuzi() {
        // 主线程路段

        // 下一段柱子动画出现（没有第一段）       如果下一个柱子的  编号（data属性）  在四个柱子内    
        if (nones[quan_num].dataset.next <= 3) {

            console.log('走123');
            console.log(nones[quan_num].dataset.next, 'next');

            // 显示下一 部分的柱子  动画
            nones[quan_num].style.display = 'block'
            let zhu = nones[quan_num].querySelectorAll('.zhu')
            let num = zhu_show(zhu)


            // 每段动画的   最后一个柱子动画结束后
            zhus[num].addEventListener('animationend', function () {


                if (quan_num <= 3) {
                    // 柱子动画结束时，对应的白圈显示
                    quans[quan_num].style.display = 'block'
                    quans[quan_num].classList.add('animate__animated', 'animate__fadeIn')
                    flag = true
                }


            })


            // 第四步操作   上天操作
        } else {

            console.log(nones[quan_num].dataset.next, 'next22');
            console.log('456');

            //清除最终点的延时
            yidong.removeAttribute('animate__delay-2s')
            yidong.style.setProperty('--animate-delay', `0`);
            // 新背景
            xin_box.className = 'newxin_box'


            //通关音频
            Mp(mps[2], 11000)
            console.log('上天咯');

            // 移动终点动画样式 鸡仔/柱子动画
            yidong.classList.add('goto')
            jizai.classList.add('jigoto')

            // 所有的建筑下移消失
            out(goout)

            // 介绍内容模块 消失动画
            content.classList.add('content_out')


            // 第三阶段的全部内容显示  动画过程
            end_animate()

        }
    }

    // 柱子动画    2.0
    function first_show(ele, anima) {

        // 云层外边遍历显示    淡入动画    
        for (let l = 0; l < ele.length; l++) {

            ele[l].style.display = "block"
            ele[l].classList.add('animate__animated', anima)
            ele[l].style.setProperty('--animate-duration', `${l * 0.7}s`);
            ele[l].style.setProperty('--animate-delay', `0.5s`);

            anima_num = l
        }

        return anima_num
    }


    // 第一部分    云层/大山显示
    first_show(anima_ones, 'animate__fadeIn')
    // 底部三角形  鸡仔浮现
    sanjiao.classList.add('animate__animated', 'animate__slideInUp')
    sanjiao.style.setProperty('--animate-duration', `1s`);
    jizai.classList.add('animate__animated', 'animate__slideInUp')
    jizai.style.setProperty('--animate-duration', `1s`);



    // 云层/大山/箭头动画执行完毕后
    // anima_ones[anima_num].addEventListener('animationend', function () {
    console.log('动画结束了');
    let box = document.querySelector('body') // 监听对象
    let startTime = ''      // 触摸开始时间
    let startDistanceX = '' // 触摸开始X轴位置
    let startDistanceY = '' // 触摸开始Y轴位置
    let endTime = ''        // 触摸结束时间
    let endDistanceX = ''   // 触摸结束X轴位置
    let endDistanceY = ''   // 触摸结束Y轴位置
    let moveTime = ''       // 触摸时间
    let moveDistanceX = ''  // 触摸移动X轴距离
    let moveDistanceY = ''  // 触摸移动Y轴距离

    // 移动端按下事件
    document.addEventListener("touchstart", (e) => {
        startTime = new Date().getTime()        // 触摸开始时间
        startDistanceX = e.touches[0].screenX   // 触摸开始X轴位置
        startDistanceY = e.touches[0].screenY   // 触摸开始Y轴位置
    })

    // 移动端抬起事件           包含动画/瞬移
    document.addEventListener("touchend", (e) => {
        endTime = new Date().getTime()              // 触摸结束时间
        endDistanceX = e.changedTouches[0].screenX  // 触摸结束X轴位置
        endDistanceY = e.changedTouches[0].screenY  // 触摸结束Y轴位置
        moveTime = endTime - startTime              // 触摸时间 =   触摸结束时间  -   触摸开始时间
        moveDistanceX = startDistanceX - endDistanceX   //触摸移动X轴距离 =触摸开始X轴位置 - 触摸结束X轴位置
        moveDistanceY = startDistanceY - endDistanceY   //触摸移动Y轴距离 =触摸开始Y轴位置 - 触摸结束Y轴位置







        // 判断滑动距离超过40 且 时间小于500毫秒
        if ((Math.abs(moveDistanceX) > 40 || Math.abs(moveDistanceY) > 40) && moveTime < 500) {
            // 判断X轴移动的距离是否大于Y轴移动的距离
            if (Math.abs(moveDistanceY) > Math.abs(moveDistanceX)) {    //Math.abs返回方法里绝对值
                // 上下
                if (moveDistanceY > 0) {


                    // 专属开关变量
                    if (touh_flag) {
                        touh_flag = false

                        // 自动播放柱子声音
                        // setTimeout(
                        //     Mp(mps[1],7100)
                        //     ,3000)
                        // document.onmouseenter = function () {
                        //     mps[1].setAttribute('loop', 'true');
                        //     mps[1].play()

                        //     console.log('播放');
                        //     setTimeout(() => {
                        //         mps[1].pause()
                        //         console.log('暂停');
                        //     }, 7100);
                        //   };

                        // 初始箭头上移动画消失
                        anima_ones[anima_num].classList.add('animate__animated', 'animate__fadeOutUp')
                        anima_ones[anima_num].style.setProperty('--animate-duration', `0.5s`);
                        anima_ones[anima_num].style.display = 'none'


                        // 四个高塔摩天轮动画显示
                        none_first.style.display = 'block'
                        num = first_show(shipins, 'animate__bounceInUp')
                        console.log(num, 'shipinnum');



                        // 年度账单消失
                        content_1.classList.add('animate__animated', 'animate__fadeOut')
                        content_1.style.display = 'none'


                        // 介绍模板     显示
                        peita(contents, zeng)


                        Mp(mps[1], 7100)

                        // 第一段路程de的显示   
                        none_1.style.display = 'block'
                        // 第一段路程的柱子动画
                        // Mp(mps[1], 7100)
                        num = zhu_show(first_zhu)
                        // 第一段的鸡脚声音
                        // Mp(mps[3], timer_zhu)
                        // console.log(timer_zhu,'时长789');


                        // 柱子动画结束完成    
                        zhus[num].addEventListener('animationend', function () {
                            // console.log('待操作 1   ');

                            // 第一个白圈显示出来
                            quans[0].style.display = 'block'
                            quans[0].classList.add('animate__animated', 'animate__fadeIn')


                            // // 第一个介绍模板显示
                            // contents[0].style.display = 'block'
                            // contents[0].classList.add('animate__animated', 'animate__fadeIn')


                            //白圈出现后    接着     点击事件 封装的点击事件
                            function ysw(i) {
                                // /点击事件       只判断走动画或者瞬移
                                quans[i].addEventListener('click', function () {

                                    // flag开关变量
                                    if (flag) {

                                        // 白圈消失动画
                                        this.classList.add('animate__animated', 'animate__fadeOut')



                                        // 赋值dom点击事件的本源   的data自定义属性
                                        quan_num = i + 1
                                        son = this.children[0].dataset.iex
                                        boy = this.children[1]
                                        gril = this.children[2]
                                        quan_index = this.dataset.index



                                        if (quan_index != undefined) {//如果走过了      瞬移

                                            if (flag) {

                                                flag = false;


                                                //瞬移
                                                jizai.className = ' indexx'
                                                switch (quan_index) {

                                                    case '1':
                                                        zeng = 1
                                                        peita(contents, zeng)
                                                        jizai.style.left = '1.5rem'
                                                        jizai.style.bottom = '3.9rem'
                                                        break;

                                                    case '2':
                                                        zeng = 2
                                                        peita(contents, zeng)
                                                        jizai.style.bottom = '6rem'
                                                        jizai.style.left = '3.95rem'
                                                        break;

                                                    case '3':
                                                        zeng = 3
                                                        peita(contents, zeng)
                                                        jizai.style.left = '5.4rem'
                                                        jizai.style.bottom = '3.5rem'
                                                        break;

                                                }

                                                flag = true

                                            }


                                        } else {                    //如果没走过      动画

                                            flag = false;
                                            // 执行对应的动画   动画1   动画2   动画3   动画4
                                            jizai.className = ` indexx animationer_${quan_num}`

                                            // 鸡脚走动声音 （不包含第一段）
                                            Mp(mps[3], time_arr[quan_num])

                                            // 动画执行完给终点标记 data自定义属性
                                            this.dataset.index = son
                                            // console.log(quan_index, 'else');

                                        }
                                    }

                                }
                                )
                            }

                            // 四次圈  点击事件（判断动画还是瞬移）
                            for (let z = 0; z < 4; z++) {
                                ysw(z)
                            }
                        })



                    }



                }
            } else {
                // 左右
                console.log(moveDistanceX > 0 ? '左' : '右')
            }
        }



    })


    // }
    // )









    // 第一段路的鸡仔走路帧数       开关变量->开
    quans[0].addEventListener('click', function ji_timeout_1() {

        if (this.dataset.index === undefined) {
            if (flag) {
                console.log('定时器1');
                //    疯转函数 鸡仔的帧数
                zhenshu();
                g = 0;
                setTimeout(() => { g = 1, console.log(11111) }, 1300);
                setTimeout(() => { g = 0, console.log(22222) }, 2186.1);
                setTimeout(() => { g = 1, console.log(33333) }, 4165.8);
                setTimeout(() => { g = 0, console.log(44444) }, 5393.9);
                setTimeout(() => {


                    // 清除帧数
                    clearInterval(ji_timer, 'setInterval')

                    // 柱子的动画
                    zhuzi()


                    // 文本介绍     瞬移/动画
                    peita(contents, son)


                }, 5394)
            }
        }
    })

    // 第二段路的鸡仔走路帧数       开关变量->开
    quans[1].addEventListener('click', function ji_timeout_2() {

        if (this.dataset.index === undefined) {
            if (flag) {
                console.log('定时器2');


                //    疯转函数 鸡仔的帧数
                zhenshu();
                g = 0
                setTimeout(() => { g = 1, console.log(55555) }, 519.8);

                setTimeout(() => {
                    // 清除鸡仔帧数
                    clearInterval(ji_timer, 'setInterval')

                    // 柱子动画
                    zhuzi()

                    // 头顶文字模板显示隐藏    排他
                    peita(contents, son)
                }, 3441.1)
            }
        }

    })

    // 第三段路的鸡仔走路帧数       开关变量->开
    quans[2].addEventListener('click', function ji_timeour_3() {

        if (this.dataset.index === undefined) {
            if (flag) {

                console.log('定时器3');

                //    疯转函数 鸡仔的帧数
                zhenshu();

                g = 2

                setTimeout(() => { g = 3, console.log(88888) }, 1206);
                setTimeout(() => { g = 2, console.log(99999) }, 2186.3);

                setTimeout(() => {

                    // 清除鸡仔帧数
                    clearInterval(ji_timer, 'setInterval')

                    // 柱子动画
                    zhuzi()

                    // 头顶文字模板显示隐藏    排他
                    peita(contents, son)
                }, 3667.5)
            }
        }
    })

    // 第四段路的鸡仔走路帧数       开关变量->开
    quans[3].addEventListener('click', function ji_timeour_4() {

        if (this.dataset.index === undefined) {
            if (flag) {

                console.log('定时器4');

                //    疯转函数 鸡仔的帧数
                zhenshu();

                g = 3

                setTimeout(() => { g = 0, console.log('aaaaa') }, 1576.2);


                setTimeout(() => {

                    clearInterval(ji_timer, 'setInterval')
                    jijiao.setAttribute('src', `../images/gz31.png`)
                    zhuzi()

                }, 2421.5)
            }
        }
    })




}
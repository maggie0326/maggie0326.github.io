window.onload = function() {

    imgLocation("container", "box")

    //拿到最后一张图片距离顶部的高度 
    //与当前滚动距离顶部的值作比较
    /**
    	模拟json 假数据
    */
    var imageUrl = { "data": [{ "src": "image/1.png" }, { "src": "image/2.png" }, { "src": "image/3.png" }, { "src": "image/4.png" }, { "src": "image/5.png" }, { "src": "image/6.png" }, { "src": "image/7.png" }, { "src": "image/8.png" }, { "src": "image/9.png" }] };
    window.onscroll = function() {
        var flag = checkScrollFlag();
        if (flag) {

            var cparent = document.getElementById("container");
            for (var i = 0; i < imageUrl.data.length; i++) {
                /**
    			<div class="box">
            		<div class="box-img">
                		<img src="image/1.png" alt="">
            		</div>
        		</div>
    			**/
                //创建标签 class 加入父容器
                var ccontent = document.createElement("div");
                ccontent.className="box";
                cparent.appendChild(ccontent);

                var boximg = document.createElement("div");
                boximg.className="box-img";
                ccontent.appendChild(boximg);

                var image = document.createElement("img");
                image.src=imageUrl.data[i].src;
                boximg.appendChild(image);	
            }

            //重新走 瀑布流的逻辑
            imgLocation("container", "box")

        }
    }


}
//判断是否加载
function checkScrollFlag() {
    var cparent = document.getElementById("container");
    //得到所有子控件
    var ccontent = getChildElement(cparent, "box");
    // 得到最后一张图片距离顶部的高度
    var lastContenHeight = ccontent[ccontent.length - 1].offsetTop;
    // 得到滚动距离顶部的高度  浏览器兼容
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //浏览器的高度
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // console.log(lastContenHeight+"-------"+scrollTop+"----"+clientHeight);
    if (lastContenHeight < scrollTop + clientHeight) {
        return true;
    }
}

function imgLocation(parent, content) {
    //获取 当前的 父容器
    var cparents = document.getElementById(parent);
    var ccontent = getChildElement(cparents, content);

    //获取每个图片的宽度 
    var imageWith = ccontent[0].offsetWidth;
    //一行放多少
    var num = Math.floor(document.documentElement.clientWidth / imageWith);

    //固定 父容器的宽度
    cparents.style.cssText = "width:" + imageWith * num + "px;margin:0 auto";

    //存放高度的数组

    var boxHeightArry = [];

    for (var i = 0; i < ccontent.length; i++) {
        //第一行的最小数组
        if (i < num) {
            boxHeightArry[i] = ccontent[i].offsetHeight;
        } else {
            //找到数组中的最小高度
            var minHeight = Math.min.apply(null, boxHeightArry);
            var minIndex = getMinImageHeightLocation(boxHeightArry, minHeight);
            console.log(minHeight + "   " + minIndex);

            //设置图片位置
            ccontent[i].style.position = "absolute";
            //设置距离上面的高度
            ccontent[i].style.top = minHeight + "px";
            //距离左边的left
            ccontent[i].style.left = ccontent[minIndex].offsetLeft + "px";

            //最小的高度加上i 的高度

            boxHeightArry[minIndex] = boxHeightArry[minIndex] + ccontent[i].offsetHeight;

        }

    }

}

function getMinImageHeightLocation(boxHeightArry, minHeight) {
    for (var i in boxHeightArry) {
        if (boxHeightArry[i] == minHeight) {
            return i;
        }
    }
}

function getChildElement(parents, content) {
    var contentArry = [];
    var allcontent = parents.getElementsByTagName("*");
    for (var i = 0; i < allcontent.length; i++) {
        if (allcontent[i].className == content) {
            contentArry.push(allcontent[i]);
        }
    }
    return contentArry;
}
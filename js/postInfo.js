var isShow = false; // 物流信息是否已经展示
var needShow;       // 是否有物流号码
var postID = 0;     // 物流号码

function changePage(data) { // 信息格式化，创建网页格式
    var jsonobj = data;
    var str = "";
    if (jsonobj.status === 200) {
        //获取到信息
        switch (jsonobj.state) {
            case '0':
                // 在途中
                $("#postStatus").html("状态：在途中");
                break;
            case '1':
                // 已揽收
                $("#postStatus").html("状态：已揽收");
                break;
            case '2':
                // 疑难
                $("#postStatus").html("状态：疑难件");
                break;
            case '3':
                // 已签收
                $("#postStatus").html("状态：已签收");
                break;
            default:
                // 其余
                $("#postStatus").html("状态：未知或错误");
        }
        for (var i = 0; i < jsonobj.data.length; i++) {
            if (i == 0) {
                //列表第一项
                switch (jsonobj.state) {
                    case '0':
                        // 在途中
                        str += "<tr><td class=\"postIco active\"><i class=\"fa fa-truck\" aria-hidden=\"true\"></i></td>";
                        break;
                    case '1':
                        // 已揽收
                        str += "<tr><td class=\"postIco active\"><i class=\"fa fa-archive\" aria-hidden=\"true\"></i></td>";
                        break;
                    case '2':
                        // 疑难
                        str += "<tr><td class=\"postIco active\"><i class=\"fa fa-hourglass-end\" aria-hidden=\"true\"></i></td>";
                        break;
                    case '3':
                        // 已签收
                        str += "<tr><td class=\"postIco active\"><i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i></td>";
                        break;
                    default:
                        // 其余
                        str = "<tr><td class=\"postIco active\"><i class=\"fa fa-question-circle\" aria-hidden=\"true\"></i></td>";
                }
                str += "<td><p class=\"postMsg active\">" + jsonobj.data[i].context +
                    "</p><p class=\"postTime active\">" + jsonobj.data[i].ftime + "</p></td></tr>";
            } else {
                if (i == jsonobj.data.length - 1) {
                    //揽件
                    str += "<tr><td class=\"postIco\"><i class=\"fa fa-archive\" aria-hidden=\"true\"></i></td>";
                } else {
                    // 普通运输过程
                    str += "<tr><td class=\"postIco\"><i class=\"fa fa-chevron-circle-up\" aria-hidden=\"true\"></i></td>";
                }
                str += "<td><p class=\"postMsg\">" + jsonobj.data[i].context +
                    "</p><p class=\"postTime\">" + jsonobj.data[i].ftime + "</p></td></tr>";
            }
        }
    } else {
        // 没有运单
        str = "<tr><td class=\"postIco active\"><i class=\"fa fa-question-circle\" aria-hidden=\"true\"></i></td>" +
            "<td><p class=\"postMsg active\">未获取到信息，可能是还没有运送或者运单号有误，请耐心等待。</p></td></tr>";
        $("#postStatus").html("状态：未获取到信息");
    }
    $("#postBody").html(str);
    //更改按钮信息
    $("#postBtn").html("收回通知书物流信息 <i class=\"fa fa-angle-double-up\" aria-hidden=\"true\"></i>");
}

function queryAjax(ID) { // 发送请求，请求业务信息
    var postID = ID;
    $("#postStatus").html("状态：信息获取中");
    $("#postBody").html("");
    $("#postBtn").html("获取通知书物流信息 <i class=\"fa fa-cog fa-spin\" aria-hidden=\"true\"></i>");
    $.ajax({
        async: true,
        cache: false,
        type: "GET",
        dataType: "jsonp",
        url: "ajax/postInfoAjax.php?postid=" + postID,

        success: function (data) {
            changePage(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // 状态码
            console.log("status:" + XMLHttpRequest.status + "\n");
            // 状态
            console.log("readyState:" + XMLHttpRequest.readyState + "\n");
            // 错误信息   
            console.log("textStatus:" + textStatus + "\n");
            console.log("errorInfo:" + errorThrown + "\n");
            //更改标题
            str = "<tr><td class=\"postIco active\"><i class=\"fa fa-question-circle\" aria-hidden=\"true\"></i></td>" +
                "<td><p class=\"postMsg active\">获取信息错误，错误代码：" + XMLHttpRequest.status + "。</p></td></tr>";
            $("#postBody").html(str);
            $("#postStatus").html("状态：信息获取错误");
        }
    });
}

function postBtnClicked() { // 按钮按下，切换网页信息和按钮提示
    if (isShow) {
        //已经展开
        $("#postInfo").hide();
        $("#postBtn").html("展开通知书物流信息 <i class=\"fa fa-angle-double-down\" aria-hidden=\"true\"></i>");
        isShow = !isShow
    } else {
        //未展开
        $("#postInfo").show();
        queryAjax(postID);
        isShow = !isShow
    }
}

function ableCheck(flag, number = 0) { // 是否显示物流内容
    needShow = flag;
    postID = number;
    if (needShow) {
        // 有物流信息
        $("#postBtn").attr("disabled", false);
        $("#postBtn").show();
    } else {
        // 没有物流信息
        $("#postBtn").attr("disabled", true);
        $("#postBtn").show();
    }
}

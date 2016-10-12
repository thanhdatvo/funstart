/*
    Create
*/
function drawChart() {
    // currentTotalPoint = 0;
    var i;
    var arr = [];
    arr.push(['Câu hỏi', 'Bạn', 'Trung bình']);
    var max  = 90,
        min  = 50,
        sumx = 0,
        sumy = 0;
    var quickerAnswerNumber
             = 0;
    for (i = 1; i < maxQuestionNumber + 1; i++) {
        // var x = Math.random() * (max - min + 1) + min;
        var x = timesGiveAnswer[i - 1];
        var y = Math.random() * (max - min + 1) + min;
        arr.push([i + '', x, y]);
        sumx += x;
        sumy += y;
        if (x < y) quickerAnswerNumber++;
    }

    var averagex   = parseFloat(sumx / maxQuestionNumber)
        .toFixed(2);
    var averagey   = parseFloat(sumy / maxQuestionNumber)
        .toFixed(2);
    var compare    = (sumx > sumy)
        ? "chậm"
        : "nhanh";
    document
        .getElementById("iqTest_ResultDetail")
        .innerHTML =
        "<div>Trả lời đúng:" + currentTotalPoint + "/" + maxQuestionNumber + "</div>";
    // document
    //     .getElementById("iqTest_ResultRightAnswerNumber")
    //     .innerHTML =
    //     "Số câu trả lời đúng " + currentTotalPoint + "/" + maxQuestionNumber + "</span>";
    var IQ = (quickerAnswerNumber / maxQuestionNumber) * 50
        + (currentTotalPoint / maxQuestionNumber) * 100;
    var IQType;
    var IQPercent;
    var IQChartColumn;
    if (IQ <= 55) {
        IQChartColumn = 1;
        IQPercent     = "0.1%";
        IQType        = "người KÉM CỎI.";
    }
    else if (IQ <= 70) {
        IQChartColumn = 2;
        IQPercent     = "2%";
        IQType        = "người TỐI DẠ.";
    } else if (IQ <= 85) {
        IQChartColumn = 3;
        IQPercent     = "14%";
        IQType        = "người BÌNH THƯỜNG.";
    } else if (IQ <= 100) {
        IQChartColumn = 4;
        IQPercent     = "34%";
        IQType        = "người BÌNH THƯỜNG.";
    } else if (IQ <= 115) {
        IQChartColumn = 5;
        IQPercent     = "34%";
        IQType        = "người BÌNH THƯỜNG.";
    }
    else if (IQ <= 130) {
        IQChartColumn = 6;
        IQPercent     = "14%";
        IQType        = "người THÔNG MINH.";
    }
    else if (IQ <= 145) {
        IQChartColumn = 7;
        IQPercent     = "2%";
        IQType        = "người THÔNG MINH VƯỢT TRỘI.";
    }
    else {
        IQChartColumn = 8;
        IQPercent     = "0.1%";
        IQType        = "người THIÊN TÀI.";
    }

    document
        .getElementById("iqResultIQNumber")
        .innerHTML =
        "   IQ " + Math.round(IQ) + "  - TOP " + IQPercent + "";

    // var data = google.visualization.arrayToDataTable(arr);
    var data = google.visualization.arrayToDataTable([
        ['IQ', '% người được'],
        ['', 0.5],
        ['IQ55', 1],
        ['IQ70', 4],
        ['IQ85', 14],
        ['IQ100', 34],
        ['IQ115', 14],
        ['IQ130', 4],
        ['IQ145', 1],
        ['', 0.5]
    ]);

    //old
    // var options = {
    //     title: 'Thời gian đưa ra đáp án (giây)',
    //     legend: {
    //         position: 'bottom', alignment: 'center', maxLines: 2,
    //         textStyle: {fontSize: 14, color: '#201F56'}
    //     },
    //     titleTextStyle: {fontSize: 16, color: '#201F56'},
    //     hAxis: {textStyle: {fontSize: 13, color: '#201F56'}},
    //     vAxis: {textPosition: 'in', textStyle: {fontSize: 13, color: '#201F56'}},
    //     // width: 500,
    //     backgroundColor: '#EFEFEF'
    // };

    //new
    var options = {
        series: {
            0: {pointShape: {type: 'star', sides: 5, dent: 0}, lineDashStyle: [4, 1]},
            // 1: { pointShape: { type: 'star', sides: 5, dent: 0.5 } },
        },
        colors: ['#e2431e', '#201F56'],
        lineWidth: 4,
        pointSize: 30,
        curveType: 'function',
        vAxis: {format: '#\'%\'', textPosition: 'in'},
        // title: 'Company Performance',
        legend: {position: 'none'},
        // height: 340,
        height: 440,
        width: 700,
        chartArea:{width:'95%',height:'75%', bottom: 30}
        // legend: {position: 'in'},
        // titlePosition: 'in', axisTitlesPosition: 'in',
        // hAxis: {textPosition: 'in'}, vAxis: {textPosition: 'in'}
    };
    console.log($('.share').width());
    function placeMarker(dataTable) {
        var cli       = this.getChartLayoutInterface();
        var chartArea = cli.getChartAreaBoundingBox();

        // "Zombies" is element #5.
        if ($(window).width() >= 700) {
            var viewPercentage = 0.7;
            document.querySelector('.overlay-marker').style.top  = Math.round((Math.round(cli.getYLocation(dataTable.getValue(IQChartColumn, 1))) - 25) * viewPercentage) + "px";
            document.querySelector('.overlay-marker').style.left = Math.round((Math.round(cli.getXLocation(IQChartColumn)) - 50) * viewPercentage) + "px";
        } else {
            document.querySelector('.overlay-marker').style.top  = Math.round(cli.getYLocation(dataTable.getValue(IQChartColumn, 1)) * ($(window).width() - 32) / 700) - 10 + "px";
            document.querySelector('.overlay-marker').style.left = Math.round(cli.getXLocation(IQChartColumn) * ($(window).width() - 32) / 700) - 20 + "px";
        }
        document.getElementById('iqTest_UserImage').src = fsGame.user.avatar;
    };

    var chart_div = document.getElementById('linechart_material');
    var chart     = new google.visualization.LineChart(chart_div);

    google.visualization.events.addListener(chart, 'ready', function () {
        chart_div.innerHTML = '<img id=iqTest_chartImg src="' + chart.getImageURI() + '">';
        console.log('1');
    });

    google.visualization.events.addListener(chart, 'ready',
        placeMarker.bind(chart, data));
    chart.draw(data, options);

    // var chart = new google
    //     .charts
    //     .Line(document.getElementById('linechart_material'));
    // chart
    //     .draw(data, options);
    // alert($('.share').html());
    setTimeout(function () {
        fsGame.setResultHtml($('.share').html());

        fsGame.gameOver(IQ * 200);
        fsGame.createShare({
            share: false,
            htmlTag: "#canvan",
            name: fsGame.user.displayName + " có IQ:" + Math.round(IQ) + " thuộc Top " + IQPercent + " " + IQType,
            des: "Test IQ miễn phí cùng Funstart"
        }, function (res) {
            console.log('res:', res);
        });
        // setTimeout(function () {
        //     $("#iqResultTable").css("margin-top", $("#overlay-text").height());
        //     // alert($("#overlay-text").height());
        //     // alert($("#iqResultTable").css("margin-top"));
        //     // alert($('#overlay-text').css("height");
        //     // alert(document.getElementById('overlay-text').style.position);
        // }, 1000);
    }, 1000);

    // alert(JSON.stringify(resultArray));
    for(i = 0; i < resultArray.length; i++){
        if(resultArray[i]){
            document.getElementById("rs" + (i + 1)).innerHTML = "<img class=iqTestResultImage src='/sources/game/10/images/result-thumb/tick.png'/>";
        } else {
            document.getElementById("rs" + (i + 1)).innerHTML = "<img class=iqTestResultImage src='/sources/game/10/images/result-thumb/cross.png'/>";
        }
    }

    //
    // var canvas = document.getElementById('canvas');
    // var ctx = canvas.getContext('2d');
    //
    // var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
    //     '<foreignObject width="100%" height="100%">' +
    //     '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
    //     '<em>I</em> like ' +
    //     '<span style="color:white; text-shadow:0 0 2px blue;">' +
    //     'cheese</span>' +
    //     '</div>' +
    //     '</foreignObject>' +
    //     '</svg>';
    //
    // var DOMURL = window.URL || window.webkitURL || window;
    //
    // var img = new Image();
    // var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    // var url = DOMURL.createObjectURL(svg);
    //
    // img.onload = function () {
    //     ctx.drawImage(img, 0, 0);
    //     DOMURL.revokeObjectURL(url);
    // }
    //
    // img.src = url;


}
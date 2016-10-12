/**
 * Created by dat on 19/09/2016.
 */
var checkHTMLObjectAlreadyLoaded = function(HTMLObject){
    // During the onload event, IE correctly identifies any images that
    // weren’t downloaded as not complete. Others should too. Gecko-based
    // browsers act like NS4 in that they report this incorrectly.
    if(!HTMLObject.complete){
        return false;
    }
    // However, they do have two very useful properties: naturalWidth and
    // naturalHeight. These give the true size of the image. If it failed
    // to load, either of these should be zero.
    if(typeof HTMLObject.naturalWidth !== "undefined" && HTMLObject.naturalWidth === 0 ){
        return false;
    }
    return true;
};
var doSomethingWhenHTMLObjectAlreadyLoaded = function (HTMLObject, doSomething) {
    var k = true;
    while(k){
        if(!checkHTMLObjectAlreadyLoaded(HTMLObject)){
            doSomething();
            k = false;
        }
        if(k==false) break;
    }
};

function multiplyPixelWithNumber(pixel, number) {
    return ((pixel.substr(0, pixel.length - 2)) * number) + "px";
}

var getCurrentImageHeight = function (ImageHTMLObject) {
    return ImageHTMLObject.clientWidth / ImageHTMLObject.naturalWidth * ImageHTMLObject.naturalHeight;
};
// var setChildDivFontSizeScalesLinearWithFatherDivMaxWidth = function (fatherHTLMObject, childHTMLObject, maxFontSize) {
//     doSomethingWhenHTMLObjectAlreadyLoaded(childHTMLObject, function () {
//         alert("123" + fatherHTLMObject.getStyle().width);
//         childHTMLObject.getStyle().fontSize = fatherHTLMObject.getStyle().clientWidth / childHTMLObject.getStyle().clientWidth * maxFontSize + "px";
//         alert(childHTMLObject.getStyle().fontSize);
//     });
// };

// continue later
// function devideStyleContentToStyleObject(styleContent){
//     var styleObject = {}
//     styleContent.split(";").forEach(function (item) {
//         if(item != "" && item !== undefined){
//             var css = item.split(":");
//             var styleName = css[0];
//             var value = css[1];
//             styleObject[styleName] = value;
//         }
//     });
//     return styleObject;
// }
// function changeHTMLObjectCssAttribute(HTMLObject, styleName, newValue) {
//
// }
// var changeDomArrCssWithPercent = function (domId, arrCssNames, percent) {
//     arrCssNames.forEach(function (cssName) {
//         var oldCssValue = $('#' + domId).css(cssName);
//         var newCssValue = (parseFloat(oldCssValue.substr(0, oldCssValue.length - 2)) * percent) + "px";
//         $('#' + domId).css(cssName, newCssValue);
//     });
// };

// function getAttributeStyleObjectFromAttributeStyle(DOM) {
//     var attributeStyleObject = {};
//     var styleArray = DOM.getAttribute('style').split(';');
//     styleArray.forEach(function (styleString) {
//         var styleName = styleString.split(':')[0];
//         var styleValue = styleString.split(':')[1];
//         attributeStyleObject[styleName] = styleValue;
//     });
//     console.log();
//     return attributeStyleObject;
// }
// function updateStyleAttributeObject(attributeStyleObject, attributeName, newValue) {
//     attributeStyleObject[attributeName,newValue];
//     return attributeStyleObject;
// }
// function setAttributeStyleObjectToAttibuteStyleValueString(attributeStyleObject) {
//     var styleString = ""
//     Object.keys(attributeStyleObject).forEach(function (styleName) {
//         styleString += styleName + ":" + attributeStyleObject[styleName] + ";";
//     });
// }

//Returns true if it is a DOM element
function isDom(o){
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
}
// StyleObject
var StyleObject = function () {
};
    // StyleObject methods
    StyleObject.prototype.setStyleNamesToManage = function (styleNames) {
        this.styleNames = styleNames;
    };
    StyleObject.prototype.setStyleValuesFromDOM = function(DOM, pseudoElement){
        var StyleObjectPointer = this;
        this.styleObject = {};
        this.styleNames.forEach(function (styleName) {
            StyleObjectPointer.styleObject[styleName] = window.getComputedStyle(DOM, pseudoElement)[styleName];
        });
    };
    StyleObject.prototype.setStyleValue = function (obj) {
        var StyleObjectPointer = this;
        Object.keys(obj).forEach(function (styleName) {
            StyleObjectPointer.styleObject[styleName] = obj[styleName];
        });
    };
        StyleObject.prototype.getStyleValue = function () {
        return this.styleObject;
    };
    StyleObject.prototype.setStyleValuesToDOM = function (DOM) {
        var StyleObjectPointer = this;
        var styleValuesString = "";
        Object.keys(this.styleObject).forEach(function (styleName) {
            styleValuesString += styleName + ":" + StyleObjectPointer.styleObject[styleName] + ";";
        });
        // console.log(styleValuesString);
        DOM.setAttribute('style', styleValuesString);
    };
    // End StyleObject methods
// End StyleObject
// HTMLObject
var HTMLObject = function (obj) {
    if(isDom(obj)){
        this.dOM = obj;
    } else {
        this.dOM = document.getElementById(obj);
    }
};
    // HTMLObject methods
    HTMLObject.prototype.setDom = function (DOM) {
        this.dOM = DOM;
    };
    HTMLObject.prototype.getDOM = function () {
        return this.dOM;
    };
    HTMLObject.prototype.getStyle = function () {
        return this.dOM.style;
    };
    HTMLObject.prototype.setInnerHTML = function (value) {
        return this.dOM.innerHTML = value;
    };
    HTMLObject.prototype.removeAllChild = function () {
        while(this.dOM.firstChild){
            this.dOM.removeChild(this.dOM.firstChild);
        }
    };
    HTMLObject.prototype.setAttribute = function (attributeName, value) {
          this.dOM.setAttribute(attributeName, value);
    };
    HTMLObject.prototype.getAttribute = function (attributeName) {
        return this.dOM.getAttribute(attributeName);
    };
    // HTMLObject.prototype.getStyle = function (styleName) {
    //     return window.getComputedStyle(styleName);
    // };
    HTMLObject.prototype.setStyleObject = function () {
        this.styleObject = new StyleObject();
    };
    HTMLObject.prototype.getStyleObject = function () {
        return this.styleObject;
    };
    // Style Here
    // HTMLObject.prototype.setStyle = function (styleName, value) {
    //     var attributeStyleObject = getAttributeStyleObjectFromAttributeStyle(this.dOM);
    //     attributeStyleObject = updateStyleAttributeObject(attributeStyleObject);
    //     var attributeStyleValueString = setAttributeStyleObjectToAttibuteStyleValueString(attributeStyleObject);
    //     this.dOM.setAttribute(styleName, attributeStyleValueString);
    // };
    // HTMLObject.prototype.getAttributeStyleObjectFromComputedStyle = function(styleNamesArray){
    //     var HTMLObjectPointer = this;
    //     HTMLObjectPointer.attributeStyleObject  = {};
    //     // var styleArray = this.dOM.getAttribute('style').split(';');
    //     // styleArray.forEach(function (styleString) {
    //     //     var styleName = styleString.split(':')[0];
    //     //     var styleValue = styleString.split(':')[1];
    //     //     alert(styleName);
    //     //     HTMLObjectPointer.attributeStyleObject[styleName] = styleValue;
    //     // });
    //     styleNamesArray.forEach(function(styleName){
    //         HTMLObjectPointer.attributeStyleObject[styleName] = window.getComputedStyle(HTMLObjectPointer.dOM, null)[styleName];
    //     });
    // };
    // HTMLObject.prototype.updateStyleAttributeObject = function (attributeName, newValue) {
    //     this.attributeStyleObject[attributeName] = newValue;
    // };
    // HTMLObject.prototype.setAttributeStyleObjectToAttibuteStyleValueString = function () {
    //     var HTMLObjectPointer = this;
    //     var attributeStyleValueString = "";
    //     Object.keys(this.attributeStyleObject).forEach(function (styleName) {
    //         attributeStyleValueString += styleName + ":" + HTMLObjectPointer.attributeStyleObject[styleName] + ";";
    //     });
    //     this.dOM.setAttribute('style', attributeStyleValueString);
    // };
    HTMLObject.prototype.setSrc = function (url) {
        this.dOM.src = url;
    };
    HTMLObject.prototype.appendChild = function (obj) {
        if(isDom(obj)){
            this.dOM.appendChild(obj);
        } else if(obj.nodeType == 3) {
            this.dOM.appendChild(obj);
        } else {
            this.dOM.appendChild(obj.getDOM());
        }
    };
    HTMLObject.prototype.hide = function () {
        this.dOM.style.display = "none";
    };
    HTMLObject.prototype.unvisible = function () {
        this.dOM.style.visibility = "hidden";
    };
    HTMLObject.prototype.show = function () {
        if(this.dOM.style.display == "none"){
            this.dOM.style.display = "block";
        }
    };
    HTMLObject.prototype.setOnclick = function (callback) {
        this.dOM.onclick = callback;
    };
    HTMLObject.prototype.setClassName = function (name) {
        this.dOM.className = name;
    };
    // End HTMLObject methods
// End HTMLObject
// // Actor
// var Actor =  function () {
// };
//     // Actor methods
//     Actor.prototype.appear = function () {
//         hideHTMLObject(this.HTMLOject);
//     };
//     Actor.prototype.hide = function () {
//         showHTMLObject(this.HTMLObject);
//     };
//     // Actor methods
// // End Actor

var GameManager = (function () {
    var gameManagerInstance;
    function create() {
        function setImageUrlRootPath(url){
            this.imageUrlRootPath = url;
        }
        function getImageUrlRootPath(){
            return this.imageUrlRootPath;
        }
        function setIntroducer() {
            // this.introducer = new Introducer();
        }
        function getIntroducer() {
            // return this.introducer;
        }
        function setGameOperator() {
            this.gameOperator = new GameOperator();
            // this.gameOperator = GameOperator.getInstance();
        }
        function getGameOperator() {
            return this.gameOperator;
        }
        function setFinisher() {
            this.finisher = new Finisher();
        }
        function getFinisher() {
            return this.finisher;
        }
        function setPercentThroughWidth(init_width) {
            var style =  window.getComputedStyle(document.getElementById("gameManager"),"style");
            var current_width = style['width'];
            this.percent = current_width.substr(0, current_width.length - 2) / init_width;
        }
        function getPercent() {
            return this.percent;
        }
        return {
            setImageUrlRootPath: setImageUrlRootPath,
            getImageUrlRootPath: getImageUrlRootPath,
            setIntroducer: setIntroducer,
            getIntroducer: getIntroducer,
            setGameOperator: setGameOperator,
            getGameOperator: getGameOperator,
            setFinisher: setFinisher,
            getFinisher: getFinisher,
            setPercentThroughWidth: setPercentThroughWidth,
            getPercent: getPercent
        }
    }
    return {
        getInstance: function () {
            if(!gameManagerInstance){
                gameManagerInstance = create();
            }
            return gameManagerInstance;
        }
    };
})();

    // var GameOperator = (function () {
    //     var gameOperatorInstance;
    //     function create() {
    //         function hide() {
    //             hideHTMLObject(this.HTMLObject);
    //         }
    //         function show() {
    //             showHTMLObject(this.HTMLObject);
    //         }
    //         function setTableOfObjects(obj) {
    //             this.tableOfObjects = new TableOfObjects(obj);
    //         }
    //         function getTableOfObjects() {
    //             return this.tableOfObjects;
    //         }
    //         function setLevel(){
    //             this.level = new Level();
    //         }
    //         function getLevel() {
    //             return this.level;
    //         }
    //         function setHP(){
    //             this.hP = new HP();
    //         }
    //         function getHP() {
    //             return this.hP;
    //         }
    //         function setTimer(){
    //             this.timer = new Timer();
    //         }
    //         function getTimer() {
    //             return this.timer;
    //         }
    //         function setSizeFitScreen(){
    //             var gameFrameHTMLObject = HTMLObjects("main-panel");
    //             var gameContentHTMLObject = new HTMLObject("gameOperator");
    //             var height = gameFrameHTMLObject[0].clientHeight;
    //             var width = gameFrameHTMLObject[0].clientWidth;
    //             if(screen.width < 480) {} else {height-=90; width-=90};
    //             if(height < width) {
    //                 gameContentHTMLObject.getStyle().width = height + "px";
    //                 gameContentHTMLObject.getStyle().height = height + "px";
    //             } else {
    //                 gameContentHTMLObject.getStyle().width = width + "px";
    //                 gameContentHTMLObject.getStyle().height = width + "px";
    //             }
    //         }
    //         return{
    //             hide: hide,
    //             show: show,
    //             setTableOfObjects: setTableOfObjects,
    //             getTableOfObjects: getTableOfObjects,
    //             setLevel: setLevel,
    //             getLevel: getLevel,
    //             setHP: setHP,
    //             getHP: getHP,
    //             setTimer: setTimer,
    //             getTimer: getTimer,
    //             setSizeFitScreen: setSizeFitScreen
    //         }
    //     }
    //     return {
    //         getInstance: function () {
    //             if(!gameOperatorInstance){
    //                 gameOperatorInstance = create();
    //             }
    //             return gameOperatorInstance;
    //         }
    //     }
    // })();
// GameOperator
var GameOperator = function () {
    this.HTMLObject = new HTMLObject("gameOperator");
};
    // GameOperator methods
    GameOperator.prototype.hide = function () {
        this.HTMLObject.hide();
    };
    GameOperator.prototype.show = function () {
        this.HTMLObject.show();
    };
    GameOperator.prototype.setTableOfObjects = function (obj) {
        this.tableOfObjects = new TableOfObjects(obj);
    };
    GameOperator.prototype.getTableOfObjects = function () {
        return this.tableOfObjects;
    };
    GameOperator.prototype.setLevel = function(){
        this.level = new Level();
    };
    GameOperator.prototype.getLevel = function () {
        return this.level;
    };
    GameOperator.prototype.setScore = function(){
        this.score = new Score();
    };
    GameOperator.prototype.getScore = function () {
        return this.score;
    };
    GameOperator.prototype.setProgressBar= function(){
        this.progressBar = new ProgressBar();
    };
    GameOperator.prototype.getProgressBar = function () {
        return this.progressBar;
    };
    // End GameOperator methods
// End GameOperator

// NumberArrayObject
var NumbersObject = function () {

};
    // NumbersObjects methods
    NumbersObject.prototype.getNumbersObject = function () {
        return this.numbersObject;
    };
    NumbersObject.prototype.setNumbersRange = function(numbersRange) {
        this.numbersRange = numbersRange;
    };
    NumbersObject.prototype.getNumberRange = function () {
        return this.numbersRange;
    };
    NumbersObject.prototype.setNumbersAmount = function (numbersAmount) {
        this.numbersAmount = numbersAmount;
    };
    NumbersObject.prototype.getNumbersAmount = function () {
        return this.numbersAmount;
    };
    NumbersObject.prototype.createNumbersObject = function () {
        var nO = this;
        nO.numbersObject = {};
        while(Object.keys(nO.numbersObject).length < nO.numbersAmount){
            var randomNumber = Math.floor(Math.random() * (nO.numbersRange.max - nO.numbersRange.min)) + nO.numbersRange.min;
            nO.numbersObject[randomNumber] = true;
        }
        Object.keys(nO.numbersObject).forEach(function (number, index) {
            if(index < Object.keys(nO.numbersObject).length - 1){
                var nextNearestBigger = Object.keys(nO.numbersObject)[index + 1];
                nO.numbersObject[number] = nextNearestBigger;
            }
        });
        this.smallestNumber = Object.keys(this.numbersObject)[0];
    };
    NumbersObject.prototype.getNumbersObject = function () {
        return this.numbersObject;
    };
    NumbersObject.prototype.setSmallestNumber = function (smallestNumber) {
        this.smallestNumber = smallestNumber;
    };
    NumbersObject.prototype.getSmallestNumber = function () {
        // return Object.keys(this.numbersObject)[0];
        return this.smallestNumber;
    };
    // End NumbersObject methods
// End NumbersObject

// TableOfObjects
var TableOfObjects = function (obj) {
    this.objectsArray =  {} || obj.objectsArray;
    this.numbersRange = {} || obj.numbersRange;
    this.size = {} || obj.size;
    this.tableOfObjectsHTMLObject = new HTMLObject("tableOfObjects");
};
    // TableOfObjects methods
    TableOfObjects.prototype.setSize = function (size) {
        this.size = size;
    };
    TableOfObjects.prototype.getSize= function(){
        return this.size;
    };
    TableOfObjects.prototype.setObjectsArray = function(objectsArray) {
        this.objectsArray = objectsArray;
    };
    TableOfObjects.prototype.getObjectsArray = function() {
        return this.objectsArray;
    };
    TableOfObjects.prototype.createTableOfObjects = function () {
        // delete old
        this.tableOfObjectsHTMLObject.removeAllChild();
        // create new
        var x, y;
        // Create table
        var value = "";
        for (x = 0; x < this.size.rowsNum; x++) {
            value += "<tr>";
            for (y = 0; y < this.size.colsNum; y++) {
                value += "<td id='tbNumbers[" + x + "][" + y + "]'></td>";
            }
            value += "</tr>";
        }
        this.tableOfObjectsHTMLObject.setInnerHTML(value);
    };
    TableOfObjects.prototype.addObjectsToEachCellOfTable = function(numbersObject){
        var tOO2 = this;
        var objectsArray = [];
        // random array
        var temp = Object.keys(numbersObject).shuffle();
        // put location value to each object
        var x = 0, y = 0;
        temp.forEach(function (number) {
            if(x == tOO2.size.colsNum){
                x = 0;
                y++;
            }
            var roundButtonSpan = new HTMLObject(document.createElement("SPAN"));
            roundButtonSpan.setClassName("roundButton");
            roundButtonSpan.getDOM().innerHTML = number;

            var roundButtonCircle = new HTMLObject(document.createElement("DIV"));
            roundButtonCircle.setClassName("roundButtonCircle");
            roundButtonCircle.getDOM().appendChild(roundButtonSpan.getDOM());

            var roundButton = new HTMLObject(document.createElement("DIV"));
            roundButton.setClassName("roundButton");
            roundButton.getDOM().appendChild(roundButtonCircle.getDOM());

            var numberObj = new HTMLObject("tbNumbers[" + x + "][" + y + "]");
            numberObj.getDOM().appendChild(roundButton.getDOM());

            numberObj.setClassName("number");
            numberObj.value = number;
            objectsArray.push(numberObj);
            x++;
        });
        this.setObjectsArray(objectsArray);
    };

    // TableOfObjects.prototype.setImageOnclick = function () {
    //     this.tableOfObjectsHTMLObject.getDOM().addEventListener('click', function (e) {
    //        if (e.target && e.target.matches('td.similarImages')) {
    //           console.log('similarImage Click');
    //        } else if(e.target && e.target.matches('td.differencesImage')){
    //            console.log('differencesImages Click');
    //        }
    //     });
    // };
    TableOfObjects.prototype.showContent = function () {
        var _self = this;
        var x, y;
        for(x = 0; x < _self.size.rowsNum; x++) {
            for(y = 0; y < _self.size.colsNum; y++) {
                document.getElementById("tbNumbers[" + x + "][" + y + "]").className = "animated bounceInLeft";
            }
        }
    };
    TableOfObjects.prototype.getTableOfObjectsHTMLObject = function () {
        return this.tableOfObjectsHTMLObject;
    }
    TableOfObjects.prototype.setObjectsOnclick = function (event) {
        var tOO3 = this;
        tOO3.objectsArray.forEach(function(object){
            object.setOnclick(function(){
                event(object);
            });
        });
    };

    TableOfObjects.prototype.setObjectsOnclickDisable = function () {
        this.objectsArray.forEach(function(object){
            object.setOnclick(null);
        });
    };
    // End TableOfObjects methods
// End TableOfObjects

// Level
var Level = function () {
    this.levelNumber = 1;
    this.levelHTMLObject = new HTMLObject("level");
};
    // Level methods
    Level.prototype.showContent = function () {
        this.levelHTMLObject.setInnerHTML("Level " + this.levelNumber);
    };
    Level.prototype.increaseLevel = function(num) {
        this.levelNumber += num;
    };
    Level.prototype.getLevelNumber = function () {
        return this.levelNumber;
    };
    // End Level methods
// End Level

// Score
var Score = function () {
    this.scoreNumber = 0;
    this.scoreHTMLObject = new HTMLObject("score");
};
    // Score methods
    Score.prototype.showContent = function () {
        this.scoreHTMLObject.setInnerHTML("Score " + this.scoreNumber);
    };
    Score.prototype.increaseScore = function(num) {
        this.scoreNumber += parseInt(num);
    };
    Score.prototype.getScoreNumber = function () {
        return this.scoreNumber;
    };
    // End Score methods
// End Score

// Timer
var Timer = function () {
};
    //Timer methods
    Timer.prototype.getTimeNumberCurrent = function () {
        return this.timerNumber;
    };
    Timer.prototype.setTimeNumberCurrent = function (timeNumber) {
        this.timerNumber = timeNumber;
    };
    Timer.prototype.setTimerNumberStart = function (timerNumberStart) {
        this.timerNumberStart = timerNumberStart;
    };
    Timer.prototype.getTimerNumberStart = function () {
        return this.timerNumberStart;
    };
    Timer.prototype.setTimerNumberEnd = function (timerNumberEnd) {
        this.timerNumberEnd = timerNumberEnd;
    };
    Timer.prototype.getTimerNumberEnd = function () {
        return this.timerNumberEnd;
    };
    Timer.prototype.setIntervalAction = function (intervalAction) {
        this.intervalAction = intervalAction;
    };
    Timer.prototype.setIntervalRange = function (intervalRange) {
        this.intervalRange = intervalRange;
    };
    Timer.prototype.countTime = function () {
        var self = this;
        // remove old
        clearInterval(self.timeInterval);
        // create new
        self.timeInterval = setInterval(function () {
            self.intervalAction();
        }, self.intervalRange);
    };
    Timer.prototype.clearCountdown = function(){
        clearInterval(this.timeInterval);
    };
    //End Timer methods
// End Timer
// Progress bar
var ProgressBar = function () {
    this.progressBarHTMLObject = new HTMLObject("timerProgressBar");
};
    // Progress bar methods
    ProgressBar.prototype.hide = function () {
        this.progressBarHTMLObject.hide();
    };
    ProgressBar.prototype.show = function () {
        this.progressBarHTMLObject.show();
    };
    ProgressBar.prototype.setProgressBarPercent = function (percent) {
        this.progressBarHTMLObject.getDOM().setAttribute("style", "width:" + percent + "%");
    };
    ProgressBar.prototype.getProgressBarHTMLObject = function () {
        return this.progressBarHTMLObject;
    };
    // EndProgress bar methods
// End progress bar
// Finisher
var Finisher = function () {
    this.finisherText = new FinisherText();
    this.finisherBackground = new FinisherBackground();
    this.HTMLObject = new HTMLObject("finisher");
};
    // Finisher methods
    Finisher.prototype.getFinisherText = function () {
        return this.finisherText;
    };
    Finisher.prototype.getFinisherBackground = function () {
        return this.finisherBackground;
    };
    Finisher.prototype.getFinisherHTMLObject = function () {
        return this.HTMLObject;
    };
    // End finisher methods
// End finisher

// FinisherText
var FinisherText = function () {
    this.finisherLevel= new FinisherLevel();
    this.finisherRemark = new FinisherRemark();
    this.finisherSuggestion = new FinisherSuggestion();
    this.finisherImage= new FinisherImage();
    this.finisherTextHTMLObject = new HTMLObject("finisherText");
};
// FinisherText methods
    FinisherText.prototype.getFinisherLevel = function () {
        return this.finisherLevel;
    };
    FinisherText.prototype.getFinisherRemark = function () {
        return this.finisherRemark;
    };
    FinisherText.prototype.getFinisherSuggestion = function () {
        return this.finisherSuggestion;
    };
    FinisherText.prototype.getFinisherImage = function () {
        return this.finisherImage;
    };
    FinisherText.prototype.getFinisherTextHTMLObject = function () {
        return this.finisherTextHTMLObject;
    };
// End FinisherText methods
// End FinisherText

// FinisherLevel
var FinisherLevel =  function () {
    this.finisherLevelHTMLObject = new HTMLObject("finisherLevel");
};
    // FinisherLevel methods
    FinisherLevel.prototype.setContent = function(content){
        this.finisherLevel = content;
    };
    FinisherLevel.prototype.showContent = function (percent) {
        this.finisherLevelHTMLObject.setInnerHTML(this.finisherLevel);
        // changeDomArrCssWithPercent('finisherLevel',['font-size', 'margin-top'], percent)
        // alert(devideStyleContentToStyleObject(this.finisherLevelHTMLObject.getAttribute('style')));
    };
    FinisherLevel.prototype.getFinisherLevelHTMLObject = function () {
        return this.finisherLevelHTMLObject;
    };
    // End FinisherLevel methods
// End FinisherLevel

// FinisherRemark
var FinisherRemark =  function () {
    this.finisherRemarkHTMLObject = new HTMLObject("finisherRemark")
};
    // FinisherRemark methods
    FinisherRemark.prototype.setContent = function(remark){
        this.finisherRemark = remark;
    };
    FinisherRemark.prototype.showContent = function () {
        this.finisherRemarkHTMLObject.setInnerHTML(this.finisherRemark);
    };
    FinisherRemark.prototype.getFinisherRemarkHTMLObject = function () {
        return this.finisherRemarkHTMLObject;
    };
    // End FinisherRemark methods
// End FinisherRemark

// FinisherBackground
var FinisherBackground =  function () {
    this.finisherBackgroundHTMLObject = new HTMLObject("finisherBackground");
};
    // FinisherBackground methods
    FinisherBackground.prototype.setImageUrlPath = function(src){
        this.finisherBackgroundSrc = src;
    };
    FinisherBackground.prototype.showContent = function () {
        this.finisherBackgroundHTMLObject.setSrc(this.finisherBackgroundSrc);
    };
    FinisherBackground.prototype.getFinisherBackgroundHTMLObject = function () {
        return this.finisherBackgroundHTMLObject;
    };
    FinisherBackground.prototype.getPercentChange = function () {
        return (this.finisherBackgroundHTMLObject.clientWidth / 755).toFixed(2);
    };
    // End FinisherBackground methods
// End FinisherBackground

// FinisherImage
var FinisherImage =  function () {
    this.finisherImageHTMLObject = new HTMLObject("finisherImage");
};
    // FinisherImage methods
    FinisherImage.prototype.setImageUrlPath = function(src){
        this.finisherImageSrc = src;
    };
    FinisherImage.prototype.setWidth = function (percent) {
        // var width = this.finisherImageHTMLObject.getAttribute("style");
        // alert(width);
        this.finisherImageHTMLObject.setAttribute("style", "width:100px;")
    };
    FinisherImage.prototype.showContent = function () {
        this.finisherImageHTMLObject.setSrc(this.finisherImageSrc) ;
    };
    FinisherImage.prototype.getFinisherImageHTMLObject = function () {
        return this.finisherImageHTMLObject;
    };
    // End FinisherImage methods
// End FinisherImage

// FinisherSuggestion
var FinisherSuggestion =  function () {
    this.finisherSuggestionHTMLObject = new HTMLObject("finisherSuggestion")
};
    // FinisherSuggestion methods
    FinisherSuggestion.prototype.setContent = function(suggestion){
        this.finisherSuggestion = suggestion;
    };
    FinisherSuggestion.prototype.showContent = function () {
        this.finisherSuggestionHTMLObject.setInnerHTML(this.finisherSuggestion);
    };
    FinisherSuggestion.prototype.getFinisherSuggestionHTMLObject = function () {
        return this.finisherSuggestionHTMLObject;
    };
    // End FinisherSuggestion methods
// End FinisherSuggestion


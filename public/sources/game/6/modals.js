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
};

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
        } else {
            this.dOM.appendChild(obj.getDOM());
        }
    };
    HTMLObject.prototype.hide = function () {
        this.dOM.style.display = "none";
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
        function setImageUrlRootPath(url, arrObj){
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
    //         function setTableOfImages(obj) {
    //             this.tableOfImages = new TableOfImages(obj);
    //         }
    //         function getTableOfImages() {
    //             return this.tableOfImages;
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
    //             setTableOfImages: setTableOfImages,
    //             getTableOfImages: getTableOfImages,
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
    GameOperator.prototype.setTableOfImages = function (obj) {
        this.tableOfImages = new TableOfImages(obj);
    };
    GameOperator.prototype.getTableOfImages = function () {
        return this.tableOfImages;
    };
    GameOperator.prototype.setLevel = function(){
        this.level = new Level();
    };
    GameOperator.prototype.getLevel = function () {
        return this.level;
    }
    GameOperator.prototype.setHP= function(){
        this.hP = new HP();
    };
    GameOperator.prototype.getHP = function () {
        return this.hP;
    };
    GameOperator.prototype.setTimer= function(){
        this.timer = new Timer();
    };
    GameOperator.prototype.getTimer = function () {
        return this.timer;
    };
    GameOperator.prototype.setSizeFitScreen = function(){
        var gameFrameHTMLObject = HTMLObjects("main-panel");
        var gameContentHTMLObject = new HTMLObject("gameOperator");
        var height = gameFrameHTMLObject[0].clientHeight;
        var width = gameFrameHTMLObject[0].clientWidth;
        // if(screen.width < 480) {} else {height-=90; width-=90};
        if(height < width) {
            // gameContentHTMLObject.setStyle("width",height + "px");
            // gameContentHTMLObject.setStyle("height", height + "px");
            gameContentHTMLObject.getStyle().width = height + "px";
            gameContentHTMLObject.getStyle().height = height + "px";
        } else {
            // gameContentHTMLObject.setStyle("width", width + "px");
            // gameContentHTMLObject.setStyle("height", width + "px");
            gameContentHTMLObject.getStyle().width = width + "px";
            gameContentHTMLObject.getStyle().height = width + "px";
        }
    };
    // End GameOperator methods
// End GameOperator

// TableOfImages
    var TableOfImages = function (obj) {
        this.similarImages =  [] || obj.similarImages;
        this.differentImage = {} || obj.differentImage;
        this.differentImagePosition = {} || obj.differentImagePosition;
        this.size = {} || obj.size;
        this.tableOfImagesHTMLObject = new HTMLObject("tableOfImages");
    };
    // TableOfImages methods
    TableOfImages.prototype.setSimilarImages = function (similarImages) {
        this.similarImages = similarImages;
    };
    TableOfImages.prototype.setDifferentImage= function(differentImage){
        this.differentImage = differentImage;
    };
    TableOfImages.prototype.setDifferentImagePosition = function(differentImagePosition) {
        this.differentImagePosition = differentImagePosition;
    };
    TableOfImages.prototype.setSize = function(size){
        this.size = size;
    };
    TableOfImages.prototype.createArrayOfImageSrcs = function () {
        this.arrImageSrcs = [];
        var i;
        for(i = 1; i <= 14; i++){
            this.arrImageSrcs.push(i);
        }
        this.arrImageSrcs = this.arrImageSrcs.shuffle();
    };
    TableOfImages.prototype.createTableImages = function () {
        // delete old
        this.tableOfImagesHTMLObject.removeAllChild();
        // create new
        var x, y;
        // Create table
        var value = "";
        for (x = 0; x < this.size.rowsNum; x++) {
            value += "<tr>";
            for (y = 0; y < this.size.colsNum; y++) {
                value += "<td id='tbImages[" + x + "][" + y + "]'></td>";
            }
            value += "</tr>";
        }
        this.tableOfImagesHTMLObject.setInnerHTML(value);
    };
    TableOfImages.prototype.addImageToEachCellOfTable = function(level){
        level %= 14;
        var similarImages = [];
        var x, y;
        // pick random image for roles
        var differentImageFileExtension = ".png";
        var similarFileExtension = "_2.png";
        if(Math.random() < 0.5){
            differentImageFileExtension = "_2.png";
            similarFileExtension = ".png";
        }

        for(x = 0; x < this.size.rowsNum; x++) {
            for(y = 0; y < this.size.colsNum; y++) {
                var image =  new HTMLObject(document.createElement("IMG"));
                if(x == this.differentImagePosition.rowNum
                    && y == this.differentImagePosition.colNum){
                    image.setSrc(this.imageUrlPath + this.arrImageSrcs[level] + differentImageFileExtension);
                    image.className = "differencesImage";
                    this.setDifferentImage(image);
                } else {
                    image.setSrc(this.imageUrlPath + this.arrImageSrcs[level] + similarFileExtension);
                    image.id = "similarImages";
                    similarImages.push(image);
                }
                (new HTMLObject("tbImages[" + x + "][" + y + "]")).appendChild(image);
            }
        }
        this.setSimilarImages(similarImages);
    };
    TableOfImages.prototype.setImageOnclick = function () {
        this.tableOfImagesHTMLObject.getDOM().addEventListener('click', function (e) {
           if (e.target && e.target.matches('td.similarImages')) {
              console.log('similarImage Click');
           } else if(e.target && e.target.matches('td.differencesImage')){
               console.log('differencesImages Click');
           }
        });
    };
    TableOfImages.prototype.setDifferentImageOnclick = function(callback){
        this.differentImage.setOnclick(callback)
    };
    TableOfImages.prototype.setSimilarImagesOnclick = function (callback) {
        this.similarImages.forEach(function (similarImage) {
            similarImage.setOnclick(callback);
        });
    };
    TableOfImages.prototype.displayImages = function () {
        // thís.differentImagePosition often load final so check it first
        var _self = this;
        var x, y;
        // doSomethingWhenHTMLObjectAlreadyLoaded(_self.differentImage.getDOM(), function () {
        // this.differentImage.getDOM().load(function () {
            for(x = 0; x < _self.size.rowsNum; x++) {
                for(y = 0; y < _self.size.colsNum; y++) {
                    document.getElementById("tbImages[" + x + "][" + y + "]").className = "animated bounceInLeft";
                }
            }
        // });
        // });
    };
    TableOfImages.prototype.shakeDifferentImage = function(){
        this.differentImage.getDOM().className  = "shakeAnimation";
    };
    TableOfImages.prototype.setImageUrlPath = function (url) {
        this.imageUrlPath = url;
    };
    TableOfImages.prototype.setAllImagesDisableOnclick = function () {
        this.similarImages.forEach(function (similarImage) {
            similarImage.setOnclick(null);
        });
        this.differentImage.setOnclick(null);
    };
    // End TableOfImages methods
// End TableOfImages

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

// HP
var HP = function (hPNumber) {
    this.HP_HTMLObject = new HTMLObject("HP");
    this.hPNumber = hPNumber || 3;
};
    // HP methods
    HP.prototype.showContent = function () {
        // delete old
        this.HP_HTMLObject.removeAllChild();
        // add new elements
        var value = "";
        var i;
        for(i = 0; i < this.hPNumber; i++){
            var img = document.createElement("IMG");
            img.src = this.imageUrlPath + "heart.png";
            img.className = "heartImage";
            this.HP_HTMLObject.appendChild(img);
        }
    };
    HP.prototype.reduceHP = function (num) {
        this.hPNumber -= num;
    };
    HP.prototype.setImageUrlPath = function (url) {
        this.imageUrlPath = url;
    };
    // End HP methods
// End HP

// Timer
var Timer = function (timerNumber) {
    this.timerHTMLObject = new HTMLObject("timer");
    this.timerNumberHTMLObject = new HTMLObject("timerNumber");
    this.timerCircleHTMLObject = new HTMLObject("timerCircle");
    this.timerNumber = 10;
};
    //Timer methods
    Timer.prototype.showContentAndRun = function (timeout) {
        var self = this;
        var initialOffset = '314';

        if(screen.width < 480){
            initialOffset = '177';
            self.timerCircleHTMLObject.setAttribute("r","28");
            self.timerCircleHTMLObject.setAttribute("cx","41");
            self.timerCircleHTMLObject.setAttribute("cy","41");
        }
        // delete old
        clearInterval(self.timeInterval);
        self.timerNumberHTMLObject.setInnerHTML("");
        self.timerCircleHTMLObject.getStyle().strokeDashoffset = 0;
        // create new
        var i = 0;
        self.timeInterval = setInterval(function () {
            self.showTimerCircleHTMLObject();
            if(i <= self.timerNumber){
                self.timerNumberHTMLObject.setInnerHTML(i + "");
                self.timerCircleHTMLObject.getStyle().strokeDashoffset = initialOffset - ((i) * (initialOffset / self.timerNumber)) + 'px' ;
            }
            if(i == self.timerNumber + 1){
                clearInterval(self.timeInterval);
                var x = setTimeout(function () {
                    clearTimeout(x);
                    timeout();
                }, 500);
            }
            i++;
        }, 1000);
    };
    Timer.prototype.hideTimerCircleHTMLObject = function () {
        this.timerCircleHTMLObject.hide();
    };
    Timer.prototype.showTimerCircleHTMLObject = function () {
        this.timerCircleHTMLObject.show();
    };
    Timer.prototype.clearCountdown = function(){
        clearInterval(this.timeInterval);
    };
    //End Timer methods
// End Timer

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


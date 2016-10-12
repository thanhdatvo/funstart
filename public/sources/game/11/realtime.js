var Realtime = function (object) {
    var gameId = object.gameId,
        userId = object.userId,
        domMessage = object.domMessage;

    var roomID;
    //var competitorId;
    var gameRoomRef = firebase.database().ref('gameRealtime/' + gameId);
    var roomRef = firebase.database().ref('gameRealtime/' + gameId + '/room');
    var userRef = firebase.database().ref('gameRealtime/' + gameId + '/' + userId);

    checkIsConnection();

    this.replay = function () {

    };

    this.searchCompetitor = function (callback) {
        createRoom(callback);
        //if(callback) callback()
    };

    this.updateData = function (obj) {
        fbGameData.child(roomID).child(userId).update(obj);
        fbGameData.child(roomID).child(this.competitorId).update({
            isTurn: true
        });
    };

    this.setCompetitorId = function (id) {
        this.competitorId = id
    };


    function createRoom(callback) {
        roomRef.once('value', function(snapshot) {
            console.log(snapshot);
            var room = snapshot.val().value;
            if (room == "") {
                //create new room
                var newPostKey = firebase.database().ref().child(gameId).push().key;
                console.log(newPostKey);
                roomID = newPostKey;
                firebase.database().ref('gameRealtime/' + gameId + '/' + newPostKey + '/' + userIdNow).update({
                    "value": JSON.stringify({ array: [] }),
                    "isTurn": true,
                    "symbol": "x"
                });
                roomRef.update({
                    value: newPostKey
                });

                userRef.update({
                    "room": newPostKey
                });
                domMessage.html("Đang tìm kiếm đối thủ ...")
            } else {
                //go to room
                roomID = room;
                console.log(roomID);

                firebase.database().ref('gameRealtime/' + gameId + '/' + roomID + '/' + userIdNow).update({
                    "value": JSON.stringify({ array: [] }),
                    "isTurn": false,
                    "symbol": "o"
                });

                roomRef.update({
                    value: ""
                });

                userRef.update({
                    "room": roomID
                });

                domMessage.html("Đang ghép phòng với đối thủ...")
            }
            listenValueChange(roomID, callback);
        })
    }

    function listenValueChange(roomId, callback) {
        var starCountRef = gameRoomRef.child(roomId);
        starCountRef.on('value', function(data) {
            console.log('data' + data);
            if(callback) callback(data)
        })
    }

    function checkIsConnection() {
        //check user connect
        var connectedRef = firebase.database().ref('.info/connected');
        connectedRef.on('value', function(snap) {
            if (snap.val() === true) {
                //var con = myConnectionsRef.push(true);
                var con = userRef.update({
                    "connections": true
                });

                //con.onDisconnect().remove();
                userRef.onDisconnect().update({
                    "connections": false
                })
            }
        });
    }
}
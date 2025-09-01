class Codec {
    constructor() {
        this.encoder = new TextEncoder();
        this.decoder = new TextDecoder();
    }

    encodePacket(string) {
        return this.encoder.encode(string);
    }

    decodePacket(bytes) {
        return this.decoder.decode(bytes);
    }

    decompressMessage(message) {
        const decoded = this.decoder.decode(message);
        const chunks = decoded.split('|');
        const output = [];

        for (const chunk of chunks) {
            if (!chunk) continue;
            const parts = chunk.split(',');
            output.push({ code: parts[0], parts });
        }

        return output;
    }

    formatPacket(parts) {
        switch(parts[0]) {
            case 'a':
                return {
                    'code': parts[0],
                    'id': parts[1],
                    'class': (parts[2]),
                    'color': (parts[3]),
                    'x': parts[4],
                    'y': parts[5],
                    'radius': parts[6],
                    'playerAngle': parts[7],
                    'armorAmount': parts[8],
                    'currentBullets': parts[9],
                    'maxBullets': parts[10],
                    'armor': parts[11],
                    'hp': parts[12],
                    'camera': {
                        'width': parts[13],
                        'height': parts[14]
                    },
                    'hpMax': parts[15],
                    'mapWidth': parts[16],
                    'mapHeight': parts[17],
                    'username': parts[18],
                    'invincible': parts[19],
                    'isLeader': parts[20],
                    'isPremiumMember': parseInt(parts[21]),
                    'teamCode': parseInt(parts[22]),
                    'isolatedUsername': parts[23]
                };
            case 'b':
                return {
                    'code': parts[0],
                    'id': parts[1],
                    'x': parts[2],
                    'y': parts[3],
                    'spdX': parts[4],
                    'spdY': parts[5],
                    'playerAngle': parts[6]
                };
            case 'c':
                return {
                    'code': parts[0],
                    'id': parts[1],
                    'currentBullets': parts[2],
                    'shooting': parts[3],
                    'reloading': parts[4],
                    'hp': parts[5],
                    'beingHit': parts[6],
                    'armorAmount': parts[7],
                    'radius': parts[8],
                    'ghillie': parts[9],
                    'maxBullets': parts[10],
                    'invincible': parts[11],
                    'dashing': parts[12],
                    'chatBoxOpen': parts[13],
                    'isLeader': parts[14],
                    'color': (parts[15]),
                    'chatMessage': parts[16]
                };
            case 'd':
                return {
                    'code': parts[0],
                    'id': parts[1],
                    'class': (parts[2]),
                    'color': (parts[3]),
                    'x': parts[4],
                    'y': parts[5],
                    'radius': parts[6],
                    'playerAngle': parts[7],
                    'armorAmount': parts[8],
                    'hp': parts[9],
                    'maxBullets': parts[10],
                    'username': parts[11],
                    'ghillie': parts[12],
                    'invincible': parts[13],
                    'isLeader': parts[14],
                    'isPremiumMember': parts[15],
                    'teamCode': parts[16],
                    'chatBoxOpen': parseInt(parts[17])
                };
            case 'e':
                return {
                    'code': parts[0],
                    'id': parts[1]
                };
            case 'f':
                return {
                    'code': parts[0],
                    'currentBullets': parts[1],
                    'score': parts[2],
                    'kills': parts[3],
                    'rechargeTimer': parts[4],
                    'maxBullets': parts[5],
                    'camera': parts[6],
                    'thermal': parts[7],
                    'numExplosivesLeft': parts[8]
                };
            case 'g':
                return {
                    'code': parts[0],
                    'id': parts[1],
                    'x': parts[2],
                    'y': parts[3],
                    'length': parts[4],
                    'width': parts[5],
                    'angle': parts[6],
                    'spdX': parts[7],
                    'spdY': parts[8],
                    'silenced': parts[9],
                    'isKnife': parts[10],
                    'isShrapnel': parts[11],
                    'ownerId': parts[12],
                    'teamCode': parts[13]
                };
            case 'h':
                return {
                    'code': parts[0],
                    'id': parts[1],
                    'x': parts[2],
                    'y': parts[3]
                };
            case 'i':
                return {
                    'code': parts[0],
                    'id': parts[1]
                };
            case 'j':
                return {
                    'code': parts[0],
                    'id': parts[1],
                    'type': parts[2],
                    'x': parts[3],
                    'y': parts[4],
                    'angle': parts[5],
                    'parentId': parts[6],
                    'hp': parts[7],
                    'maxHp': parts[8],
                    'isPremium': parts[9]
                };
            case 'k':
                return {
                    'code': parts[0],
                    'id': parts[1],
                    'x': parts[2],
                    'y': parts[3],
                    'angle': parts[4],
                    'hp': parts[5]
                };
            case 'l':
                return {
                    'code': parts[0],
                    'id': parts[1]
                };
            case 'm':
                return {
                    'code': parts[0],
                    'id': parts[1],
                    'type': parts[2],
                    'x': parts[3],
                    'y': parts[4],
                    'spdX': parts[5],
                    'spdY': parts[6],
                    'travelTime': parts[7],
                    'emitting': parts[8],
                    'emissionRadius': parts[9],
                    'ownerId': parts[10],
                    'teamCode': parts[11]
                };
            case 'n':
                return {
                    'code': parts[0],
                    'id': parts[1],
                    'x': parts[2],
                    'y': parts[3],
                    'exploding': parts[4],
                    'emitting': parts[5],
                    'emissionRadius': parts[6]
                };
            case 'o':
                return {
                    'code': parts[0],
                    'id': parts[1]
                };
            case 'p':
                return {
                    'code': parts[0],
                    'level': parts[1]
                };
            case 'q':
                return {
                    'code': parts[0],
                    'x': parts[1],
                    'y': parts[2]
                };
            case 'r':
                return {
                    'code': parts[0],
                    'type': parts[1],
                    'content': parts[2]
                };
            case 's':
                return {
                    'code': parts[0]
                };
            case 't':
                return {
                    'code': parts[0]
                };
            case 'u':
                return {
                    'code': parts[0]
                };
            case 'sq':
                return {
                    'code': parts[0],
                    'squareOneTeam': parts[1],
                    'squareTwoTeam': parts[2],
                    'squareThreeTeam': parts[3],
                    'squareFourTeam': parts[4]
                };
            case 'v':
                let leaderboardObject = {
                    'code': parts[0],
                    'currentPlayers': parts[1],
                    'leaderboard': []
                };
                for (let i = 2; i < parts.length; i++) {
                    let splitData = parts[i].split(".");
                    leaderboardObject.leaderboard.push({
                        'userId':(splitData[0]),
                        'isMember': parseInt(splitData[1]),
                        'score': splitData[2],
                        'kills': splitData[3],
                        'teamCode': splitData[4]
                    });
                }
                return leaderboardObject;
            case 'w':
                return {
                    'code': parts[0],
                    'username': parts[1],
                    'rememberCookie': parts[2],
                    'isPremiumMember': parseInt(parts[3]),
                    'isolatedUsername': parts[4]
                };
            case 'x':
                return {
                    'code': parts[0],
                    'error': parts[1]
                };
            case 'y':
                return {
                    'code': parts[0],
                    'username': parts[1],
                    'email': parts[2],
                    'password': parts[3]
                };
            case 'z':
                return {
                    'code': parts[0],
                    'status': parts[1]
                };
            case 'sz':
                return {
                    'code': parts[0],
                    'newSize': parts[1]
                };
            case 'sta':
                return {
                    'code': parts[0],
                    'score': parseInt(parts[1]),
                    'kills': parseInt(parts[2]),
                    'time': parseInt(parts[3]),
                    'shotsFired': parseInt(parts[4]),
                    'shotsHit': parseInt(parts[5]),
                    'damageDealt': parseInt(parts[6]),
                    'damageReceived': parseInt(parts[7]),
                    'distanceCovered': parseInt(parts[8]),
                    'shooterUsername': parts[9],
                    'shooterIsPremiumMember': parseInt(parts[10]),
                    'shooterClass': parts[11],
                    'shooterArmor': parts[12],
                    'shooterColor': parts[13],
                    'shooterKills': parseInt(parts[14]),
                    'shooterScore': parseInt(parts[15]),
                    'shooterHp': parseInt(parts[16]),
                    'shooterArmorAmount': parseInt(parts[17]),
                    'shooterLevel1Powerup': parts[18],
                    'shooterLevel2Powerup': parts[19],
                    'shooterLevel3Powerup': parts[20]
                };
            case 're':
                return {
                    'code': parts[0]
                };
            case 'version':
                return {
                    'code': parts[0],
                    'version': parts[1]
                };
            case 'highScores':
                return {
                    'code': parts[0],
                    'c39': parts[1]
                };
            case 'c22':
                return {
                    'code': parts[0],
                    'j50': parts[1]
                };
            case 'full':
                return {
                    'code': parts[0]
                };
            default:
                return {
                    'code': parts[0],
                    'rawParts': parts.slice(1)
                };
            }
    }

    buildPingPacket() {
        return this.encodePacket('.');
    }

    buildCaptchaPacket(token, timestamp) {
        return this.encodePacket(`q,${token},${timestamp}`);
    }

    buildJoinPacket(gun, armor, color) {
        return this.encodePacket(`0,${gun},${armor},${color}`);
    }

    buildChatPacket(message) {
        return this.encodePacket(`c,${message}`);
    }

    buildMouseMovedPacket(mx, my, mangle) {
        return this.encodePacket(`m,${mx},${my},${mangle}`);
    }

    buildInputPacket(type, state) {
        return this.encodePacket(`k,${type},${state}`);
    }

    buildUpgradePacket(type, index) {
        return this.encodePacket(`u,${type},${index}`);
    }
}

module.exports = { Codec };
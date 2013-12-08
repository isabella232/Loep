dust._randomCssPositionsDefaults = [
    // 0 randomPositions
    [],
    // 1 randomPositions
    ['top:50%;left:50%;'],
    // 2 randomPositions
    ['top:40%;left:40%;','top:55%;left:65%;'],
    // 3 randomPositions
    ['top:30%;left:40%;','top:45%;left:70%;','top:70%;left:45%;'],
    // 4 randomPositions
    ['top:30%;left:25%;','top:40%;left:65%;','top:80%;left:55%;','top:60%;left:30%;'],
    // 5 randomPositions
    ['top:25%;left:25%;','top:35%;left:60%;','top:65%;left:20%;','top:70%;left:50%;', 'top:70%;left:80%;'],
    // 6 randomPositions
    ['top:25%;left:15%;','top:35%;left:45%;','top:65%;left:20%;','top:70%;left:50%;', 'top:70%;left:80%;', 'top:40%;left:85%;'],
];
dust._randomCssPositions = null;
dust._currentRandomCssPosition = null;

// Expects a param amount
dust.helpers['setRandomPositionAmount'] = function(chunk, context, bodies, params) {
    var me = 'dust.helpers.setRandomPositionAmount';
    dust._currentRandomCssPosition = 0;

    if (params && params.amount) {
        var amount = context.stack.head[params.amount] ? context.stack.head[params.amount].length : 0;
        if (amount <= dust._randomCssPositionsDefaults.length) {
            dust._randomCssPositions = dust._randomCssPositionsDefaults[ amount ];
            return chunk;
        }
    }

    console.warn(me + ':: no amount or to big of an amount given');
    setRandomPositionAmount = dust._randomCssPositionsDefaults[dust._randomCssPositionsDefaults.length-1];
    return chunk;
};

dust.helpers['randomCssPosition'] = function (chunk, context, bodies, params) {
    var me = 'dust.helpers._randomCssPosition';
    if (!dust._randomCssPositions) {
        console.warn(me + ':: no dust._randomCssPositions set, so falling back to largest default set of points');
        dust._randomCssPositions = dust._randomCssPositionsDefaults[dust._randomCssPositionsDefaults.length-1];
    }
    if (!dust._currentRandomCssPosition && dust._currentRandomCssPosition !== 0) {
        console.info(me + ':: no dust._currentRandomCssPosition set, so falling back to the first position');
        dust._currentRandomCssPosition = 0;
    }

    var position = dust._randomCssPositions[ dust._currentRandomCssPosition ];
    dust._currentRandomCssPosition++;

    // Some code to also allow for randomized size of the elements, probably broken.
    // var radius = 170 + (Math.round(Math.random()*10)*6); // magic!
    // var layout = position + 'width:'+(radius*2)+'px;height:'+(radius*2)+'px;margin-left:-'+ radius +'px;margin-top:-'+radius+'px;';
    return chunk.write(position);
};
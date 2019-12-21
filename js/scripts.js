var counter;
var success;

function init() {
    counter = 0;
    success = 0;
    document.querySelector('.results').innerHTML = '';
    document.querySelector('.game').classList.remove('welcome','gameover');
    document.querySelector('.answer').onkeypress = function(e){
        if (e.keyCode == '13') {
            test(e);
        }
    }
}

function randArray(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}

function reduceFraction(fraction) { // accepts a fraction as a string in the format 'a/b'
    const [numerator,denominator] = fraction.split('/');
    var gcd = function gcd(a,b){
        return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(numerator,denominator);

    return `${numerator/gcd}/${denominator/gcd}`;
}

function showgood() {
    document.querySelector('.prize').className = 'prize is-good';

    request = new XMLHttpRequest;
    request.open('GET', 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=funny+cat', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400){
            data = JSON.parse(request.responseText).data.image_url;
            document.querySelector('.catgif').src = data;
        } else {
            console.log('reached giphy, but API returned an error');
        }
    };

    request.onerror = function() {
        console.log('connection error');
    };

    request.send();
}

function showbad() {
    document.querySelector('.prize').className = 'prize is-bad';
}

function next() {
    window.setTimeout(function() {
        if(counter==11) {
            if(success>=10) {
                showgood();
            } else {
                showbad();
            }
            document.querySelector('.game').classList.add('gameover');
        } else {
            question();
        }
    }, pass ? 500 : 5000);
}

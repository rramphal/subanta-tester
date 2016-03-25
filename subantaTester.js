'use strict';

/* ========================== INIT ========================== */

// Putting this first works because of variable hoisting

function ready (fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(main);

/* ========================================================== */

function main () {
    var options = [
        'su',    'au',    'jas',
        'am',    'auT',   'shas',
        'TA',    'bhyAm', 'bhis',
        '~Ne',            'bhyas',
        '~Nasi',
        '~Nas',  'os',    'Am',
        '~Ni',            'sup'
    ];

    var length = options.length;

    var button = document.getElementById('submit');
    var output = document.getElementById('output');

    function getRandomIndex (length) {
        return Math.floor(Math.random() * length);
    }

    function randomize () {
        var index = getRandomIndex(length);

        output.innerHTML = options[index];
    }

    button.addEventListener('click', randomize, false);
}

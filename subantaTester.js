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
    var NUMBER = {
        1 : {
            sanskrit : 'ekavachanam',
            itrans   : 'ekavachanam',
            english  : 'singular',
        },
        2 : {
            sanskrit : 'dvivachanam',
            itrans   : 'dvivachanam',
            english  : 'dual',
        },
        3 : {
            sanskrit : 'bahuvachanam',
            itrans   : 'bahuvachanam',
            english  : 'plural',
        }
    };

    var VIBHAKTI = {
        1 : {
            sanskrit : 'prathamā',
            itrans   : 'prathamA',
            english  : 'nominative',
            meaning  : '[subject]',
            karaka   : 'kartA'
        },
        2 : {
            sanskrit : 'dvitīyā',
            itrans   : 'dvitIyA',
            english  : 'accusative',
            meaning  : '[direct object]',
            karaka   : 'karman'
        },
        3 : {
            sanskrit : 'tṛtīyā',
            itrans   : 'tRRitIyA',
            english  : 'instrumental',
            meaning  : 'with/by',
            karaka   : 'karaNa'
        },
        4 : {
            sanskrit : 'caturthī',
            itrans   : 'chaturthI',
            english  : 'dative',
            meaning  : '[indirect object]/to/for',
            karaka   : 'sampradAna'
        },
        5 : {
            sanskrit : 'pañcamī',
            itrans   : 'pa~nchamI',
            english  : 'ablative',
            meaning  : 'from, out of, owing to',
            karaka   : 'apAdAna'
        },
        6 : {
            sanskrit : 'ṣaṣṭhī',
            itrans   : 'ShaShThI',
            english  : 'genitive',
            meaning  : 'of',
            karaka   : 'sambandha'
        },
        7 : {
            sanskrit : 'saptamī',
            itrans   : 'saptamI',
            english  : 'locative',
            meaning  : 'at/in',
            karaka   : 'adhikaraNa'
        }
    };

    var SUP = [
        {
            sanskrit : 'sU',
            itrans   : 'su',
            number   : 1,
            case     : [1]
        },
        {
            sanskrit : 'au',
            itrans   : 'au',
            number   : 2,
            case     : [1]
        },
        {
            sanskrit : 'Jas',
            itrans   : 'jas',
            number   : 3,
            case     : [1]
        },
        {
            sanskrit : 'am',
            itrans   : 'am',
            number   : 1,
            case     : [2]
        },
        {
            sanskrit : 'auṬ',
            itrans   : 'auT',
            number   : 2,
            case     : [2]
        },
        {
            sanskrit : 'Śas',
            itrans   : 'shas',
            number   : 3,
            case     : [2]
        },
        {
            sanskrit : 'Ṭā',
            itrans   : 'TA',
            number   : 1,
            case     : [3]
        },
        {
            sanskrit : 'bhyām',
            itrans   : 'bhyAm',
            number   : 2,
            case     : [3, 4, 5]
        },
        {
            sanskrit : 'bhis',
            itrans   : 'bhis',
            number   : 3,
            case     : [3]
        },
        {
            sanskrit : 'Ṅe',
            itrans   : '~Ne',
            number   : 1,
            case     : [4]
        },
        {
            sanskrit : 'bhyas',
            itrans   : 'bhyas',
            number   : 3,
            case     : [4, 5]
        },
        {
            sanskrit : 'ṄasI',
            itrans   : '~Nasi',
            number   : 1,
            case     : [5]
        },
        {
            sanskrit : 'Ṅas',
            itrans   : '~Nas',
            number   : 1,
            case     : [6]
        },
        {
            sanskrit : 'os',
            itrans   : 'os',
            number   : 2,
            case     : [6, 7]
        },
        {
            sanskrit : 'ām',
            itrans   : 'Am',
            number   : 3,
            case     : [6]
        },
        {
            sanskrit : 'Ṅi',
            itrans   : '~Ni',
            number   : 1,
            case     : [7]
        },
        {
            sanskrit : 'suP',
            itrans   : 'sup',
            number   : 3,
            case     : [7]
        }
    ];

    var length = SUP.length;

    function getRandomIndex (length) {
        return Math.floor(Math.random() * length);
    }

    function generateTest () {
        var index = getRandomIndex(length);

        output.innerHTML = SUP[index].sanskrit;
    }

    function showAnswer () {
        var answer = 'testAnswer';

        output.innerHTML = answer;
    }

    var test   = document.getElementById('test');
    var answer = document.getElementById('answer');
    var output = document.getElementById('output');

    test.addEventListener('click', generateTest, false);
    answer.addEventListener('click', showAnswer, false);
}

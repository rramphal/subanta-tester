'use strict';

(function (fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
})(function () {
    /* ==================== CONSTANTS ==================== */
    const NUMBER = {
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

    const CASE = {
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
            meaning  : 'from/out of/owing to',
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

    const SUP_MAPPING = [
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

    const FORMS = {
        sup  : SUP_MAPPING.map(sup => sup.sanskrit)
    };

    const OPTIONS = {
        case_s   : 'Sanskrit: Case',
        number_s : 'Sanskrit: Number',
        case_e   : 'English: Case',
        number_e : 'English: Number',
        case_m   : 'English: Meaning'
    };

    const LENGTH = SUP_MAPPING.length;

    /* ==================== GLOBALS ==================== */

    var test        = document.getElementById('test');
    var answer      = document.getElementById('answer');
    var output      = document.getElementById('output');
    var optionsList = document.getElementById('options');
    var formsList   = document.config.forms;

    var currentIndex;

    /* ==================== HELPERS ==================== */

    function getRandomIndex (length) {
        return Math.floor(Math.random() * length);
    }

    /* ==================== TEST LOGIC ==================== */

    function generateTest () {
        var currentForm  = formsList.options[formsList.selectedIndex].value;

        currentIndex = getRandomIndex(LENGTH);

        return FORMS[currentForm][currentIndex];
    }

    function showTest () {
        output.innerHTML = generateTest();

        answer.disabled = false;
    }

    /* ==================== ANSWER LOGIC ==================== */

    function optionChecked (option) {
        return document.config[option].checked;
    }

    function getNumber (variant) {
        return NUMBER[SUP_MAPPING[currentIndex].number][variant];
    }

    function getCases (variant) {
        return SUP_MAPPING[currentIndex].case.map(caseNumber => CASE[caseNumber][variant]).join(', ');
    }

    function generateAnswer () {
        var answerOutput = [];

        if (optionChecked('case_s'))   { answerOutput.push(getCases('sanskrit'));  }
        if (optionChecked('number_s')) { answerOutput.push(getNumber('sanskrit')); }
        if (optionChecked('case_e'))   { answerOutput.push(getCases('english'));   }
        if (optionChecked('number_e')) { answerOutput.push(getNumber('english'));  }
        if (optionChecked('case_m'))   { answerOutput.push(getCases('meaning'));   }

        return answerOutput.join(' | ');
    }

    function showAnswer () {
        output.innerHTML = output.innerHTML + ' (' +generateAnswer(currentIndex) + ')';

        answer.disabled = true;
    }

    /* ==================== POPULATE VIEW ==================== */

    function populateForms () {
        var forms = Object.keys(FORMS);

        forms.forEach( form => formsList.add(new Option(form, form)));
    }

    function populateOptions () {
        var options = Object.keys(OPTIONS);

        options.forEach( optionName => {
            let listItem = document.createElement('li');
            let label    = document.createElement('label');
            let checkbox = document.createElement('input');
            let text     = document.createTextNode(OPTIONS[optionName]);

            checkbox.type = 'checkbox';
            checkbox.name = optionName;

            label.appendChild(checkbox);
            label.appendChild(text);
            listItem.appendChild(label);

            optionsList.appendChild(listItem);
        });
    }

    function selectOption (option) {
        document.config[option].checked = true;
    }

    function selectDefaultOptions () {
        ['case_s', 'number_s', 'case_m'].forEach(selectOption);
    }

    populateForms();
    populateOptions();
    selectDefaultOptions();

    /* ==================== EVENTS ==================== */

    test.addEventListener('click', showTest, false);
    answer.addEventListener('click', showAnswer, false);
});

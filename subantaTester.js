'use strict';

/* global console */

(function (fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
})(function () {
    /* ==================== CONSTANTS ==================== */
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

    var CASE = {
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

    var SUP_MAPPING = [
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

    var LENGTH = SUP_MAPPING.length;

    var FORMS = {
        sup  : _getSup(),
        rāma : _splitForms('rāmaḥ rāmau* rāmāḥ rāmam rāmau* rāmān rāmeṇa rāmābhyāṃ rāmaiḥ rāmāya rāmebhyaḥ rāmāt rāmasya rāmayoḥ rāmāṇām rāme rāmeṣu'),
        hari : _splitForms('hariḥ harī* harayaḥ harim harī* harīn hariṇā haribhyāṃ haribhiḥ haraye haribhyaḥ hareḥ* hareḥ* haryoḥ harīṇām harau hariṣu'),
        pati : _splitForms('patiḥ patī* patayaḥ patim patī* patīn patyā patibhyāṃ patibhiḥ patye patibhyaḥ patyuḥ* patyuḥ* patyoḥ patīnām patyau patiṣu')
    };

    var OPTIONS = {
        case_s   : 'Sanskrit: Case',
        number_s : 'Sanskrit: Number',
        case_e   : 'English: Case',
        number_e : 'English: Number',
        case_m   : 'English: Meaning'
    };

    /* ==================== GLOBALS ==================== */

    var testButton   = document.getElementById('test');
    var answerButton = document.getElementById('answer');
    var output       = document.getElementById('output');
    var optionsList  = document.getElementById('options');
    var formsList    = document.config.forms;

    var currentIndex;

    /* ==================== HELPERS ==================== */

    function _getRandomIndex (length) {
        return Math.floor(Math.random() * length);
    }

    /* ==================== TEST LOGIC ==================== */

    function _getSup () {
        return SUP_MAPPING.map(function (sup) {
            return sup.sanskrit;
        });
    }

    function _splitForms (forms) {
        var splitForms = forms.split(' ');
        var splitLength = splitForms.length;

        if (splitLength !== LENGTH) {
            console.warn('MISSING FORMS\n\nONLY',
                         splitLength,
                         'OF',
                         LENGTH,
                         'FORMS ENTERED:',
                         forms,
                         '\n\nFALLING BACK TO SUP'
            );
            return _getSup();
        } else {
            return splitForms;
        }
    }

    function _generateTest () {
        var currentForm = formsList.options[formsList.selectedIndex].value;

        currentIndex = _getRandomIndex(LENGTH);

        return '<span class="form">' +
               FORMS[currentForm][currentIndex] +
               '</span>'
        ;
    }

    function showTest () {
        output.innerHTML = _generateTest();

        answerButton.disabled = false;
    }

    /* ==================== ANSWER LOGIC ==================== */

    function _optionChecked (option) {
        return document.config[option].checked;
    }

    function _getNumber (variant) {
        return '<span class="number">' +
               NUMBER[SUP_MAPPING[currentIndex].number][variant] +
               '</span>'
        ;
    }

    function _getCases (variant) {
        return '<span class="case">' +
               SUP_MAPPING[currentIndex].case.map(function (caseNumber) {
                   return CASE[caseNumber][variant];
               }).join(', ') +
               '</span>'
        ;
    }

    function _generateAnswer () {
        var answerOutput = [];

        if (_optionChecked('case_s'))   { answerOutput.push(_getCases('sanskrit'));  }
        if (_optionChecked('number_s')) { answerOutput.push(_getNumber('sanskrit')); }
        if (_optionChecked('case_e'))   { answerOutput.push(_getCases('english'));   }
        if (_optionChecked('number_e')) { answerOutput.push(_getNumber('english'));  }
        if (_optionChecked('case_m'))   { answerOutput.push(_getCases('meaning'));   }

        return answerOutput.join(' | ');
    }

    function showAnswer () {
        output.innerHTML = output.innerHTML + ' (' + _generateAnswer(currentIndex) + ')';

        answerButton.disabled = true;
    }

    /* ==================== POPULATE VIEW ==================== */

    function _populateForms () {
        var forms = Object.keys(FORMS);

        forms.forEach(function (form) {
            formsList.add(new Option(form, form));
        });
    }

    function _populateOptions () {
        var options = Object.keys(OPTIONS);

        var listItem;
        var label;
        var checkbox;
        var text;

        options.forEach( function (optionName) {
            listItem = document.createElement('li');
            label    = document.createElement('label');
            checkbox = document.createElement('input');
            text     = document.createTextNode(OPTIONS[optionName]);

            checkbox.type = 'checkbox';
            checkbox.name = optionName;

            label.appendChild(checkbox);
            label.appendChild(text);
            listItem.appendChild(label);

            optionsList.appendChild(listItem);
        });
    }

    function _selectOption (option) {
        document.config[option].checked = true;
    }

    function _selectDefaultOptions () {
        ['case_s', 'number_s', 'case_m'].forEach(_selectOption);
    }

    function populateView () {
        _populateForms();
        _populateOptions();
        _selectDefaultOptions();
    }

    /* ==================== MAIN ==================== */

    populateView();
    testButton.addEventListener('click', showTest, false);
    answerButton.addEventListener('click', showAnswer, false);
});

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
        sUP : _getSup(),
        rāma : _splitForms('rāmaḥ rāmau* rāmāḥ rāmam rāmau* rāmān rāmeṇa rāmābhyāṃ rāmaiḥ rāmāya rāmebhyaḥ rāmāt rāmasya rāmayoḥ rāmāṇām rāme rāmeṣu'),
        hari : _splitForms('hariḥ harī* harayaḥ harim harī* harīn hariṇā haribhyāṃ haribhiḥ haraye haribhyaḥ hareḥ* hareḥ* haryoḥ harīṇām harau hariṣu'),
        pati : _splitForms('patiḥ patī* patayaḥ patim patī* patīn patyā patibhyāṃ patibhiḥ patye patibhyaḥ patyuḥ* patyuḥ* patyoḥ patīnām patyau patiṣu'),
        sakhi : _splitForms('sakhā sakhāyau* sakhāyaḥ sakhāyam sakhāyau* sakhīn sakhyā sakhibhyāṃ sakhibhiḥ sakhye sakhibhyaḥ sakhyuḥ* sakhyuḥ* sakhyoḥ sakhīnām sakhyau sakhiṣu'),
        guru : _splitForms('guruḥ gurū* guruvaḥ gurum gurū* gurūn guruṇā gurubhyāṃ gurubhiḥ gurave gurubhyaḥ guroḥ* guroḥ* gurvoḥ gurūṇām gurau guruṣu')
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
    var table        = document.getElementById('table');
    var optionsList  = document.getElementById('options');
    var formsList    = document.config.forms;

    var currentIndex;
    var currentForm;

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
                         '\n\nFALLING BACK TO sUP'
            );
            return _getSup();
        } else {
            return splitForms;
        }
    }

    function _generateTest () {
        currentForm  = formsList.options[formsList.selectedIndex].value;
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

    /* ==================== TABLE LOGIC ==================== */
    function _generateTable () {
        var tableHTML =
            '<table>' +
                '<tbody>' +
                    '<tr>' +
                        '<td>&nbsp;</th>' +
                        '<td class="number">ekavachanam</td>' +
                        '<td class="number">dvivachanam</td>' +
                        '<td class="number">bahuvachanam</td>' +
                        '<td>&nbsp;</th>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="right case">prathamā</th>' +
                        '<td>' + FORMS[currentForm][0] + '</td>' +
                        '<td>' + FORMS[currentForm][1] + '</td>' +
                        '<td>' + FORMS[currentForm][2] + '</td>' +
                        '<td class="left case">nominative <span class="alt">([subject])</span></th>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="right case">dvitīyā</th>' +
                        '<td>' + FORMS[currentForm][3] + '</td>' +
                        '<td>' + FORMS[currentForm][4] + '</td>' +
                        '<td>' + FORMS[currentForm][5] + '</td>' +
                        '<td class="left case">accusative <span class="alt">([direct object])</span></th>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="right case">tṛtīyā</th>' +
                        '<td>' + FORMS[currentForm][6] + '</td>' +
                        '<td>' + FORMS[currentForm][7] + '</td>' +
                        '<td>' + FORMS[currentForm][8] + '</td>' +
                        '<td class="left case">instrumental <span class="alt">(with/by)</span></th>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="right case">caturthī</th>' +
                        '<td>' + FORMS[currentForm][9] + '</td>' +
                        '<td>' + FORMS[currentForm][7] + '</td>' +
                        '<td>' + FORMS[currentForm][10] + '</td>' +
                        '<td class="left case">dative <span class="alt">([indirect object]/to/for)</span></th>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="right case">pañcamī</th>' +
                        '<td>' + FORMS[currentForm][11] + '</td>' +
                        '<td>' + FORMS[currentForm][7] + '</td>' +
                        '<td>' + FORMS[currentForm][10] + '</td>' +
                        '<td class="left case">ablative <span class="alt">(from/out of/owing to)</span></th>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="right case">ṣaṣṭhī</th>' +
                        '<td>' + FORMS[currentForm][12] + '</td>' +
                        '<td>' + FORMS[currentForm][13] + '</td>' +
                        '<td>' + FORMS[currentForm][14] + '</td>' +
                        '<td class="left case">genitive <span class="alt">(of)</span></th>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="right case">saptamī</th>' +
                        '<td>' + FORMS[currentForm][15] + '</td>' +
                        '<td>' + FORMS[currentForm][13] + '</td>' +
                        '<td>' + FORMS[currentForm][16] + '</td>' +
                        '<td class="left case">locative <span class="alt">(at/in)</span></th>' +
                    '</tr>' +
                    '<tr>' +
                        '<td>&nbsp;</th>' +
                        '<td class="number">singular</td>' +
                        '<td class="number">dual</td>' +
                        '<td class="number">plural</td>' +
                        '<td>&nbsp;</th>' +
                    '</tr>' +
                '</tbody>' +
            '</table>'
        ;

        return tableHTML;
    }

    function clearTable () {
        table.innerHTML = '';
    }

    function showTable () {
        table.innerHTML = _generateTable();
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
    // testButton.addEventListener('click', clearTable, false);
    // answerButton.addEventListener('click', showTable, false);
});

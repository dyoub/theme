// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function locale($provide) {
        var PLURAL_CATEGORY = { ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other" };

        $provide.value("$locale", {
            id: "pt-br",
            DATETIME_FORMATS: {
                AMPMS: ["AM", "PM"],
                DAY: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
                MONTH: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                SHORTDAY: ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"],
                SHORTMONTH: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
                fullDate: "EEEE, d 'de' MMMM 'de' y",
                longDate: "d 'de' MMMM 'de' y",
                medium: "d 'de' MMM 'de' y HH:mm:ss",
                mediumDate: "d 'de' MMM 'de' y",
                mediumTime: "HH:mm:ss",
                short: "DD/MM/YYYY HH:mm",
                shortDate: "DD/MM/YYYY",
                shortTime: "HH:mm"
            },
            NUMBER_FORMATS: {
                CURRENCY_SYM: "R$",
                DECIMAL_SEP: ",",
                GROUP_SEP: ".",
                PATTERNS: [
                  { gSize: 3, lgSize: 3, maxFrac: 3, minFrac: 0, minInt: 1, negPre: "-", negSuf: "", posPre: "", posSuf: "" },
                  { gSize: 3, lgSize: 3, maxFrac: 2, minFrac: 2, minInt: 1, negPre: "\u00a4-", negSuf: "", posPre: "\u00a4", posSuf: "" }
                ]
            },
            pluralCat: function (n, opt_precision) {
                return (n >= 0 && n <= 2 && n != 2) ? PLURAL_CATEGORY.ONE : PLURAL_CATEGORY.OTHER;
            },
            translation: {
                'true': 'Sim',
                'false': 'Não',
                '0': 'Por favor verifique a conexão com a internet e tente novamente.',
                '-1': 'Por favor verifique a conexão com a internet e tente novamente.',
                '401': 'Usuário e/ou senha inválidos.',
                '403': 'Acesso negado.',
                '404': 'Não foi possível estabelecer uma comunicação com o servidor.',
                '500': 'Ocorreu um problema. Por favor tente novamente.',
                'Documentation': 'Documentação',
                'ErrorPage': 'Página de erro',
                'LoginPage': 'Página de login',
                'MenuHeader': 'Título do menu',
                'NoRecordsFound': 'Nenhum registro encontrado',
                'NotFound': 'Não encontrado',
                'Samples': 'Exemplos',
                'Select': 'Selecionar',
                'SearchFruit': 'Pesquisar fruta',
                'SomeMessage': 'Alguma mensagem para o usuário.',
                'TypeSomething': 'Escreva alguma coisa para limpar o erro.',
                'Welcome': 'Boas vindas'
            }
        });
    }

    angular.module("ngLocale", [], [
        "$provide",
        locale
    ]);

})();

// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    window.Calendar = function (year, month) {
        var today = new Date();

        year = parseInt(year);
        month = parseInt(month);

        if (isNaN(year)) {
            year = today.getFullYear();
        }

        if (isNaN(month)) {
            month = today.getMonth();
        }

        var daysInMonth = new Date(year, month + 1, 0).getDate(),
            calendar = [],
            week = [];

        calendar.push(week);

        for (var day = 1; day <= daysInMonth; day++) {
            var date = new Date(year, month, day),
                dayWeek = 0;

            // Find day of week to start
            while (day === 1 && date.getDay() !== dayWeek && dayWeek < 7) {
                week[dayWeek] = null;
                dayWeek++;
            }

            week.push(date);

            if (week.length === 7 && day < daysInMonth) {
                calendar.push(week = []);
            }

            // Complete last week if necessary
            while (day === daysInMonth && week.length < 7) {
                week[week.length] = null;
            }
        }

        return calendar;
    };

})();

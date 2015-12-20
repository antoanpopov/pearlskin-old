/**
 * Created by Antoan on 22.10.2015 г..
 */
'use strict'

app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});
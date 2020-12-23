/**
 * @auther Dibyaranjan Pradhan<dibyachintu6@gmail.com>
 * @since 19-Jul-2020
 * @description Promise function to execute
 */

'use strict';

module.exports = function to(promise) {
    return promise
        .then(data => [null, data])
        .catch(err => [err]);
}
/**
 * Функция генерации случайного числа от min до max
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 * randomInteger(1,3) return 3
 */

export function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export const noop = () => {
    // do nothing
};

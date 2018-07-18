function isDate(str) {
    var result = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (result == null) return false;
    var d = new Date(result[1], result[3] - 1, result[4]);
    return (
        d.getFullYear() == result[1] &&
        d.getMonth() + 1 == result[3] &&
        d.getDate() == result[4]
    );
}

function isDateTime(str) {
    var result = str.match(
        /^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/
    );
    if (result == null) return false;
    var d = new Date(
        result[1],
        result[3] - 1,
        result[4],
        result[5],
        result[6],
        result[7]
    );
    return (
        d.getFullYear() == result[1] &&
        d.getMonth() + 1 == result[3] &&
        d.getDate() == result[4] &&
        d.getHours() == result[5] &&
        d.getMinutes() == result[6] &&
        d.getSeconds() == result[7]
    );
}

//returns a string "type" of input object
export function toType(obj) {
    let type = getType(obj);
    // some extra disambiguation for numbers
    if (type === 'number') {
        if (isNaN(obj)) {
            type = 'nan';
        } else if ((obj | 0) != obj) {
            //bitwise OR produces integers
            type = 'float';
        } else {
            type = 'integer';
        }
    }else if(type === 'string') {
        if(isDate(obj) || isDateTime(obj)){
            return 'date';
        }
    }
    return type;
}

//source: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612#7390612
function getType(obj) {
    return {}.toString
        .call(obj)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
}

//validation for base-16 themes
export function isTheme(theme) {
    const theme_keys = [
        'base00',
        'base01',
        'base02',
        'base03',
        'base04',
        'base05',
        'base06',
        'base07',
        'base08',
        'base09',
        'base0A',
        'base0B',
        'base0C',
        'base0D',
        'base0E',
        'base0F'
    ];
    if (toType(theme) === 'object') {
        for (var i = 0; i < theme_keys.length; i++) {
            if (!(theme_keys[i] in theme)) {
                return false;
            }
        }
        return true;
    }
    return false;
}

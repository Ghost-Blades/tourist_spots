export const isNull = (text) => {
    return text.length == 0 ? [true, "Поле не должно быть пустым"] : false;
}

export const isMaxLength = (text) => {
    return text.length >= 10 ? [true, "Слишком длинно"] : false;
}

export const isMinLength = (text) => {
    return text.length < 10 ? [true, "Слишком коротко"] : false;
}

export const MinLength = (text, length) => {
    return text.length >= length ? true : false;
}

export const Valide = (text, forma) => {
    return forma.test(text);
}
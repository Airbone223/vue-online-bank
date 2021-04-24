const ERRORS_CODES = {
    EMAIL_NOT_FOUND: 'Пользватель с таким email не найден',
    INVALID_PASSWORD: 'Пароль не верный',
    auth: 'Вы не авторизованы! Пожалуйста войдите в систему'
}

export function error(code) {
    return ERRORS_CODES[code] ? ERRORS_CODES[code] : 'Что-то пошло не так'
}

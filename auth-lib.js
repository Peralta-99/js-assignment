let allUsers = [],
    allRights = [],
    allGroups = {};
// Возвращает массив всех пользователей.
function users() {
    return allUsers;
}
//Создает нового пользователя с указанным логином username и паролем password, возвращает созданного пользователя.
function createUser (name, password) {
    if (typeof(name) !=='string' || typeof(password) !=='string') {
        throw Error('Введите корректное значение')
    }
for(let i=0; i < allUsers.length; i++)
    if (allUsers[i].nickname.includes(name.toUpperCase())) {
        throw Error('Пользователь с таким именем уже существует');
    }
nickname = name.toUpperCase();
groups = [];
sessionState = 0;
allUsers.push({nickname, password, sessionState, groups});
return allUsers[allUsers.length - 1];
}
// Удаляет пользователя user
function deleteUser(user) {
    if (typeof(user) !== 'string') {
        throw Error('Введите корректное значение')
    }
    for (i=0;i < allUsers.length; i++) {
        if (allUsers[i].nickname === user.toUpperCase()) {
            allUsers.splice(allUsers.indexOf(allUsers[i]), 1);
            return ('Пользователь ' + user + ' удалён')
        }
    }
throw Error("Пользователь не существует");
}
// Возвращает массив групп, к которым принадлежит пользователь user
function userGroups(user) {
    if (typeof(user) !=='string') {
        throw Error('Введите корректное значение')
    }
    for(let i=0; i < allUsers.length; i++)
        if (allUsers[i].nickname === user.toUpperCase()) {
            return Object.values(allUsers[i].groups);
        }
    throw Error("Пользователь не существует");
}
// Добавляет пользователя user в группу group
function addUserToGroup(user, group) {
    if (typeof(user) !=='string' || typeof(group) !=='string') {
        throw Error('Введите корректное значение')
    }
    for(let i=0; i < allUsers.length; i++)
        if (allUsers[i].nickname === user.toUpperCase()) {
            if (Object.keys(allGroups).includes(group))
            {allUsers[i].groups.push(group);
            return ('Пользователь ' + user + ' добавлен в группу ' + group)}
            throw Error ('Группы ' + group + ' не существует')
        }
throw Error("Пользователь не существует");
}
// Удаляет пользователя user из группы group. Должна бросить исключение, если пользователя user нет в группе group
function removeUserFromGroup(user, group) {
    if (typeof(user) !=='string' || typeof(group) !=='string') {
        throw Error('Введите корректное значение')
    }
    for (i=0;i < allUsers.length; i++) {
        if (allUsers[i].nickname !== user.toUpperCase()) {
            throw Error("Пользователь не существует");
        }
        if (allUsers[i].groups.indexOf(group) === -1) {
            throw Error('Пользователь ' + user + ' не состоит в группе ' + group)
        }
        if (allUsers[i].nickname === user.toUpperCase()) {
            if (allUsers[i].groups.includes(group)) {
                allUsers[i].groups.splice(allUsers[i].groups.indexOf(group), 1)
            }
            return ('Готово! Пользователь ' + user + ' удалён из группы ' + group)
        }
    }
    throw Error("Пользователь не существует");
}
// Возвращает массив прав
function rights() {
    return allRights
}
// Создает новое право с именем name и возвращает его
function createRight(name) {
    if (typeof(name) !=='string') {
        throw Error('Введите корректное значение')
    }
    if (allRights.includes(name)) {
        throw Error('Такое право уже существует');
    }
    allRights.push(name);
    return name;
}
// Удаляет право right
function deleteRight(right) {
        if (typeof(right) !== 'string') {
        throw Error('Введите корректное значение')}
        if (allRights.includes(right)) {
            allRights.splice(allRights.indexOf(right), 1);
            return ('Право ' + right + ' удалено')
        }
    throw Error("Право не существует");
}
// Возвращает массив групп
function groups() {
    return Object.keys(allGroups)
}
// Создает новую группу и возвращает её.
function createGroup(name) {
    if (typeof(name) !=='string') {
        throw Error('Введите корректное значение')
    }
    if (Object.keys(allGroups).includes(name)) {
            throw Error('Такая группа уже существует');
        }
    allGroups[name] = name = [];
    return [Object.keys(allGroups)[Object.keys(allGroups).length - 1]];
}
// Удаляет группу group
function deleteGroup(group) {
    if (typeof(group) !== 'string') {
        throw Error('Введите корректное значение')
    }
    if (Object.keys(allGroups).includes(group)) {
        delete allGroups[group];
        return ('Группа ' + group + ' удалена')
        }
    throw Error("Такой группы не существует");
}
// Возвращает массив прав, которые принадлежат группе group
function groupRights(group) {
    return allGroups[group]
}
// Добавляет право right к группе group
function addRightToGroup(right, group) {
    if (typeof(right) !=='string' || typeof(group) !=='string') {
        throw Error('Введите корректное значение')
    }
    if (Object.keys(allGroups).indexOf(group) === -1) {
        throw Error ('Группа ' + group + ' не существует')
    }
    if (allRights.includes(right)) {
            if (allGroups[group].includes(right)) {
                throw Error ('Данное право уже есть у этой группы')
            }
            if (Object.keys(allGroups).includes(group)) {
                allGroups[group].push(right);
                return ('Право ' + right + ' добавлено в группу ' + group)
            }
    }
    throw Error ('права ' + right + ' не существует')
}
// Удаляет право right из группы group. Должна бросить исключение, если права right нет в группе group
function removeRightFromGroup(right, group) {
    if (typeof(right) !=='string' || typeof(group) !=='string') {
        throw Error('Введите корректное значение')
    }
    if (Object.keys(allGroups).indexOf(group) === -1) {
        throw Error("Такой группы не существует");
    }
    if (allRights.includes(right)) {
        if (allGroups[group].includes(right)) {
            allGroups[group].splice(allGroups[group].indexOf(right), 1);
            return ('Право ' + right + ' удалено из группы ' + group)
        }
        throw Error ('У группы ' + group + ' нет права ' + right)
    }
throw Error ('Такого права не существует')
}
function login(username, password) {
    if (typeof(username) !=='string' || typeof(password) !=='string') {
        throw Error('Введите корректное значение')
    }
    for (i=0;i < allUsers.length; i++) {
        if (allUsers[i].nickname === username.toUpperCase() && allUsers[i].password === password) {
            if (allUsers[i].sessionState===1) {
                return ('Пользователь ' + username + ' уже авторизован')
            }
            allUsers[i].sessionState = 1;
            return true;
        }
        else {
            if (allUsers[i].nickname.includes(username.toUpperCase())) {
                if (allUsers[i].password !== password && allUsers[i].sessionState===1) {
                    return ('Пользователь ' + username + ' уже авторизован')
                }
                throw Error ('Неверный логин и/или пароль')
            }
        }
    }
        throw Error ('Пользователь не существует')
}
function currentUser(user) {
    if (typeof(user) !=='string') {
        throw Error('Введите корректное значение')
    }
    for (i=0;i < allUsers.length; i++) {
        if (allUsers[i].nickname.includes(user.toUpperCase())) {
            if (allUsers[i].sessionState===1) {
                return user
            }
            return undefined;
        }
    }
    throw Error ('Пользователь не существует')
}
function logout(user) {
    if (typeof(user) !=='string') {
        throw Error('Введите корректное значение')
    }
    for (i=0;i < allUsers.length; i++) {
        if (allUsers[i].nickname.includes(user.toUpperCase())) {
            if (allUsers[i].sessionState === 1) {
                allUsers[i].sessionState = 0;
                return ('Пользователь ' + user + ' вышел из системы')
            }
            return ('Пользователь ' + user + ' не авторизован в системе');
        }
    }
    throw Error ('Пользователь не существует')
}
function isAuthorized(user, right) {
if (typeof(user) !=='string' || typeof(right) !=='string') {
    throw Error('Введите корректное значение')
}
for (i=0;i < allUsers.length; i++) {
    if (allUsers[i].nickname.includes(user.toUpperCase())) {
        if ((Object.values(allGroups).flat()).includes(right)) {
            for (j = 0; j < Object.keys(allGroups).length; j++) {
                if (allUsers[i].groups.includes(Object.keys(allGroups)[j])) {
                    if (Object.values(allGroups)[j].includes(right)) {
                        return true
                    }
                }
            }
            return Error('У пользователя ' + user + ' нет права ' + right)
        }
        throw Error ('Такого права нет ни у одной группы')
        }
    }
    throw Error ('Пользователь не существует')
}
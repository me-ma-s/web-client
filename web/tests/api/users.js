const { createPostFunc, get } = require('./functions');

const postUser = createPostFunc('postUser');

const users = [
  { email: 'ivan@mail.ru', name: 'Иван', surname: 'Иванов' },
  { email: 'alex@mail.ru', name: 'Алексей', surname: 'Алексеев' },
  { email: 'peter@mail.ru', name: 'Петр', surname: 'Петров' },
];

const runTests = async () => {
  console.log('Создаем пользователей:');
  for (let usr of users) {
    await postUser(usr).then(({ data }) => { console.log(data) });
  }

  console.log('Запрашиваем всех пользователей:')
  await get('getAllUsers').then(({ data }) => console.log(data))

  console.log('Запрашиваем пользователя с id=1')
  await get('getUser?user_id=1').then(({ data }) => console.log(data))
}

runTests();

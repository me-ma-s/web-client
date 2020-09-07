const { createPostFunc, get } = require('./functions');

const postUserInChannel = createPostFunc('postUserInChannel');

const users_in_channels = [
  { channel_id: 1, user_id: 1, preferences: { theme: 'dark' } },
  { channel_id: 2, user_id: 1, preferences: { theme: 'dark' } },
  { channel_id: 1, user_id: 2, preferences: { theme: 'dark' } },
  { channel_id: 2, user_id: 2, preferences: { theme: 'dark' } },
];

const runTests = async () => {
  console.log('Добавляем пользователя с id=1 в каналы с id=1 и id=2:');
  for (let uic of users_in_channels) {
    await postUserInChannel(uic).then(({ data }) => { console.log(data) });
  }

  console.log('Запрашиваем всех пользователей канала с id=1')
  await get('getUsersOfChannel?channel_id=1').then(({ data }) => console.log(data))

  console.log('Запрашиваем все каналы пользователя с id=1')
  await get('getChannelsOfUser?user_id=1').then(({ data }) => console.log(data))
}

runTests();

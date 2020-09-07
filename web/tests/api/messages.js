const { createPostFunc, get } = require('./functions');

const postMessage = createPostFunc('postMessage');

const messages = [
  {user_id: 123, channel_id: 1, _text: 'hello 1'},
  {user_id: 123, channel_id: 2, _text: 'hello 2'},
];

const runTests = async () => {
  console.log('Добавляем сообщения в каналы');
  for (let msg of messages) {
    await postMessage(msg).then(({ data }) => { console.log(data) });
  }

  console.log('Запрашиваем сообщения из канала с id=1:')
  await get('getMessages?channel_id=1').then(({ data }) => console.log(data))
}

runTests();

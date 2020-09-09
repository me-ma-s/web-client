const { createPostFunc, get } = require('./functions');

const postMessage = createPostFunc('postMessage');

const messages = [
  { user_id: 1, channel_id: 1, _text: 'Hello! My id is 1! This channels id is 1', date_time: new Date() },
  { user_id: 2, channel_id: 1, _text: 'Hello! My id is 2! This channels id is 1', date_time: new Date() },
  { user_id: 3, channel_id: 1, _text: 'Hello! My id is 3! This channels id is 1', date_time: new Date() },
  { user_id: 1, channel_id: 1, _text: 'Hello! My id is 1! This channels id is 1', date_time: new Date() },
  { user_id: 2, channel_id: 1, _text: 'Hello! My id is 2! This channels id is 1', date_time: new Date() },
  { user_id: 3, channel_id: 1, _text: 'Hello! My id is 3! This channels id is 1', date_time: new Date() },
  { user_id: 2, channel_id: 1, _text: 'Hello! My id is 2! This channels id is 1', date_time: new Date() },
  { user_id: 1, channel_id: 1, _text: 'Hello! My id is 1! This channels id is 1', date_time: new Date() },
  { user_id: 2, channel_id: 1, _text: 'Hello! My id is 2! This channels id is 1', date_time: new Date() },
  { user_id: 3, channel_id: 1, _text: 'Hello! My id is 3! This channels id is 1', date_time: new Date() },
  { user_id: 1, channel_id: 1, _text: 'Hello! My id is 1! This channels id is 1', date_time: new Date() },
  { user_id: 2, channel_id: 1, _text: 'Hello! My id is 2! This channels id is 1', date_time: new Date() },
  { user_id: 3, channel_id: 1, _text: 'Hello! My id is 3! This channels id is 1', date_time: new Date() }, 

  { user_id: 2, channel_id: 2, _text: 'Hello! My id is 2! This channels id is 2', date_time: new Date() },
  { user_id: 3, channel_id: 2, _text: 'Hello! My id is 3! This channels id is 2', date_time: new Date() },
  { user_id: 1, channel_id: 2, _text: 'Hello! My id is 1! This channels id is 2', date_time: new Date() },
  { user_id: 2, channel_id: 2, _text: 'Hello! My id is 2! This channels id is 2', date_time: new Date() },
  { user_id: 3, channel_id: 2, _text: 'Hello! My id is 3! This channels id is 2', date_time: new Date() },
  { user_id: 2, channel_id: 2, _text: 'Hello! My id is 2! This channels id is 2', date_time: new Date() },
  { user_id: 1, channel_id: 2, _text: 'Hello! My id is 1! This channels id is 2', date_time: new Date() },
  { user_id: 2, channel_id: 2, _text: 'Hello! My id is 2! This channels id is 2', date_time: new Date() },
  { user_id: 3, channel_id: 2, _text: 'Hello! My id is 3! This channels id is 2', date_time: new Date() },
  { user_id: 1, channel_id: 2, _text: 'Hello! My id is 1! This channels id is 2', date_time: new Date() },
  { user_id: 2, channel_id: 2, _text: 'Hello! My id is 2! This channels id is 2', date_time: new Date() },
  { user_id: 3, channel_id: 2, _text: 'Hello! My id is 3! This channels id is 2', date_time: new Date() },
  { user_id: 2, channel_id: 2, _text: 'Hello! My id is 2! This channels id is 2', date_time: new Date() },
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

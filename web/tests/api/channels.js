const { generateChannelKey } = require('../../src/client/services/encryption/lowLevelEncryption');
const { createPostFunc, get } = require('./functions');

const postChannel = createPostFunc('postChannel');
const postKey = createPostFunc('postKey');

const channel_key = generateChannelKey();

const channels = [
  { name: 'Канал 1', reload_interval: 5000 },
  { name: 'Канал 2' },
  { name: 'Канал 3' },
];

const runTests = async () => {
  console.log('Создаем каналы:');
  for (let ch of channels) {
    await postChannel(ch).then(({ data }) => { console.log(data) });
  }

  console.log('Запрашиваем все каналы:')
  await get('getAllChannels').then(({ data }) => console.log(data))

  console.log('Запрашиваем канал с id=2:')
  await get('getChannel?channel_id=2').then(({ data }) => console.log(data))
}

runTests();

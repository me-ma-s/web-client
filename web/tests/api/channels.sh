PORT=$1

echo Создаем 3 канала
curl -X POST -H "Content-Type: application/json" -d '{"name": "Канал 1"}' "http://localhost:${PORT}/api/postChannel"
echo
curl -X POST -H "Content-Type: application/json" -d '{"name": "Канал 2", "parent_id": 1, "_enckey_parent": {"key": "value"}}' "http://localhost:${PORT}/api/postChannel"
echo
curl -X POST -H "Content-Type: application/json" -d '{"name": "Канал 3", "parent_id": 1}' "http://localhost:${PORT}/api/postChannel"
echo

echo Запрашиваем все каналы
curl "http://localhost:${PORT}/api/getAllChannels"
echo

echo Запрашиваем канал с id=2
curl "http://localhost:${PORT}/api/getChannel?channel_id=2"
echo

PORT=$1

echo Создаем пользователя
curl -X POST -H "Content-Type: application/json" -d '{"email": "mail@mail.ru", "name": "Иван", "surname": "Иванов", "avatar_url": "https://someUrl"}' "http://localhost:${PORT}/api/postUser"
echo

echo Запрашиваем всех пользователей
curl "http://localhost:${PORT}/api/getAllUsers"
echo

echo Запрашиваем пользователя с id=1
curl "http://localhost:${PORT}/api/getUser?user_id=1"
echo

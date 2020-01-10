# goit-project-javascript

## Как создать свою ветку, в которой вы будете работать?

Скачайте проект себе на компьютер, для этого в терминале введите:
```
git clone https://github.com/iMykhailychenko/goit-project-javascript.git
```

После того как все скачалось, откройте папку с проектом и в терминале введите:
```
git checkout -b название вашей ветки
```

Таким образом вы создадите свою локальную ветку. GitHub пока ещё не знает о ней, поэтому перед первым пушем выведет ошибку и попросит вас вести:
```
git push --set-upstream origin название вашей ветки
```

Просто скопируйте такой текст с терминала и введите его

## Как запустить `webpack` сборку?

Для первого запуска после скачивания с `GitHub` введите:
```
npm install
```

После того как установяться все плагины, для запуска версии для разработки с `webpack-dev-server` введите:
```
npm start
```

Для билда production версии проекта введите:
```
npm run build
```

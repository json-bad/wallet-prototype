# LuneX Wallet

Демонстрационный веб-кошелёк. Данные вымышленные. Реальных операций нет.

Стиль: печатный двор — кость, медь, бетон. 3D-серп на главной. Кабинет с кривыми капитала.

## Стек

Next.js 16 · React 19 · next-intl (RU/EN) · Three.js · свой SVG-график слой.

## Структура

```
app/[locale]/          маршруты и SEO
components/
  landing/             главная по секциям
  cabinet/             кабинет
  charts/              area / bar / donut / spark
  three/               сцена героя
  layout/ auth/ brand/ i18n/ seo/
lib/api/               WalletApi + mock (подмена бэка)
messages/              ru.json / en.json
public/visuals/        фотосерия ателье
```

## Запуск

```bash
npm install
npm run dev
```

`/ru` · `/en` · вход-заглушка · `/cabinet`

## API

Контракт `lib/api/types.ts`. Сейчас `mockApi` в `client.ts`. Скелет HTTP — `http.example.ts`.
`NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_SITE_URL`.

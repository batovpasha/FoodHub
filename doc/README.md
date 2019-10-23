# FoodHub

  1. [Description](#description)
  2. [Use case](#use-case)
  3. [BPMN](#bpmn)
  4. [Database](#database)
  5. [Architecture](#architecture)
     * [Client](#client)
     * [Server [WIP]](#server-wip)



## Description

  __FoodHub__ – свободная площадка – агрегатор для помощи в реализации оформления онлайн заказов для малых и средних бизнесов. Нет никаких требований на вход как для новых пользователей так и владельцев бизнесов. Логика работы проста и прозрачна, никаких промежуточных комиссий и навязчивой оплаты курьеру за доставку.

  __FoodHub__ НЕ предоставляет курьерские услуги, это просто удобная площадка для планирования заказов онлайн для самовывоза (по пути с работы, учёбы и т.д). Это приносит огромное увеличение дохода предприятия фактически без инвестиций в доставку, логистику и прочее. С помощью специального приложения будет четко показано на сколько и что именно должно быть готово, а обязательная предоплата предотвратит заведение от мошенников и несчастных случаев.

## Use case 

![use case](https://github.com/batovpasha/FoodHub/blob/master/doc/diagrams/use-case/use-case.png)

## BPMN

![bpmn](https://github.com/batovpasha/FoodHub/blob/master/doc/diagrams/bpmn/bpmn.png)

## Database

![db](https://github.com/batovpasha/FoodHub/blob/master/doc/diagrams/db/db.png)

## Architecture

![architecture](https://github.com/batovpasha/FoodHub/blob/master/doc/diagrams/architecture/architecture.png)

### Client

1. View - React
2. State - Redux
3. Network layer
   * WebSocket - browser WebSocket API
   * HTTP - browser fetch + custom abstraction 

### Server [WIP]
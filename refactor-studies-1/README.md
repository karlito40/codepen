# C'est quoi ce bordel ?

Ce projet est une étude de refactor. Je dois donc composer avec un existant, garder nos techos (node, bdd, graph, vue & co) et éviter les breaking change trop lourd. La majorité du code a été rush (notamment le front, oh god le front).

Certaines de ces idées ont été intégré au projet originel après simplification et amélioration (j'ai codé ces pistes à l'arrache, l'implementation n'avait pas d'intéret pour mes besoins). 

## "Simple, Basique" - Le maitre mot.

Notre rpc utilise maintenant une api simple. On passe d'un `rpc.call('monService', 'maMethode', { data, meta })` à un `$monService.maMethode(data)` ou `$monService.opts(mesOptions).maMethode(data)`. Ce qui permet de faciliter grandement l'implementation de notre graph et la clarté du code en général. 

Le bootstrap d'un service passe maintenant par un systeme modulaire. Fini les copy/pasta de lib entre services...

J'intégre également de l'event driven modéré (avec Pulsar). Les avantages qui en découlent sont:
- fonctions plus courtes et plus simples
- les tests n'ont plus besoin de mocker l'univers 
- les services s'occupent seulement de leurs métiers 
- l'ajouts de feature est simplifié 
- l'asynchrone est désormais possible !

On retire le faux systeme de middleware utilisé dans les méthodes des services.

On remplace rabbitmq par nats dans la gestion du pubsub et du rpc.

On utilise moleculer pour le circuit breaker et la decouverte des services.

Coté front, on utilise les providers pour controller les appelles aux graphs et les subscriptions récurrentes. 

On montre également ce que devrait être un véritable design system à l'aide de Vuetify.


## Fun stuff... parce qu'il faut bien se faire plaisir


Le front dispose de @vue/composition-api pour tester Vue-3 en early access. Vous avez aussi accès à @babel/plugin-proposal-optional-chaining même si j'en ai pas eu besoin :/


## Présent

Ma copie a été revu et simplifié. L'api ressemble dorénavant à quelque chose du genre:

``` javascript
// bootstrap.js
const { Mongo, Event, Ignite } = require('micro')

const micro = Ignite()

micro
  .add('mongo', new Mongo(someConf))
  .add('event', new Event(stuff))

micro.start()

// imports.js
const { mongo, event } = require('micro/mods') // no proxy 
mongo.doStuff()
```



# Comment démarrer le bordel ?

_Les commandes sont à lancer dans l'ordre_

``` bash
# Création de l'image docker de dev (necessaire qu'une fois)
yarn beepoc:build

yarn install

# Install les packages de toutes les apps
yarn bootstrap

# Lancement du backend
yarn up
### yarn up equivaut à un docker-compose up. Vous pouvez utiliser toutes les fonctionnalites de docker-compose normalement. (docker-compose logs, docker-compose stop, docker-compose restart, ...)

# Lancement du front (à effectuer toujours après le yarn up)
yarn serve
```


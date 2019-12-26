# C'est quoi ce projet ?

Ce projet était pour moi un moyen d'expression. Il m'a servi de champ d'étude et d'experimentation pour proposer des pistes d'évolutions à mon equipe/job du moment.

Le but était d'engager plusieurs chantiers afin d'améliorer notre quotidien et rendre faisable l'infaisable avec notre code actuel.

Je dois donc composer avec un existant, garder nos techos (node, bdd, graph, vue & co) et éviter les breaking change trop lourd. La majorité du code a été rush (notamment le front, oh god le front).

Helas, le projet n'a pas recu l'accueil que j'esperais. Aucune discussion n'a été ouverte, aucune idée n'a été débattu et aucune autre solution n'a été proposé. Bref, tout le monde s'en bat les couilles. Les gaulois refractaires aux changements préféront continuer à chercher des excuses plutot que des solutions. Au final, j'aurais préféré continuer mes projets perso (speech flutter, sko, démineur battle royale) plutôt que de dev des trucs qui m'apportent rien.

Je mets tout le bordel en open source puisque de toute facon il y'a tellement mieux à faire si vous partez de zéro.

## "Simple, Basique" - Le maitre mot.

Notre rpc utilise maintenant une api simple. On passe d'un `rpc.call('monService', 'maMethode', { data, meta })` à un `$monService.maMethode(data)` ou `$monService.opts(mesOptions).maMethode(data)`. Ce qui permet de faciliter grandement l'implementation de notre graph et la clarté du code en général. 

Le bootstrap d'un service ne passe plus par des copy/pasta de l'enfer mais par un systeme modulable qui permet à la fois d'utiliser seulement ce dont on a besoin ainsi qu'une meilleure maintenabilité (puisque plus de copy/pasta).

J'intégre également de l'event driven modéré (avec Pulsar). Les avantages qui en découlent sont évident:
- fonctions plus courtes et plus simples
- les tests n'ont plus besoin de mocker l'univers 
- les services s'occupent seulement de leurs métiers 
- l'ajouts de feature est simplifié 
- l'asynchrone est désormais possible !

Je retire le faux systeme de middleware utilisé dans la création de nos services. Pour vous donner un ordre d'idée le code actuel peut ressembler à ca:

```
function middleware1 (req, res) {
  req.myThing = calculStuff()
}

async function middleware2 (req, res) {
  res.data = req.myThing + await otherStuff() // res.data sera notre réponse
}

module.exports = methodFactory('monService', 'myLoggerMethodeName', {
  statsd: require('../lib/statsd'),
  log: require('../../../lib/log'),
  permissions: ['things'],
  inputSchema
})
  .use(middleware1)
  .use(middleware2);

// Evidemment le truc peut vite devenir incomprehensible quand on cumule des dizaines de middleware et que tout le monde mute req et res
```


On remplace rabbitmq par nats dans la gestion du pubsub et du rpc.

On utilise moleculer pour le circuit breaker et la decouverte des services.

Coté front, on utilise les providers pour controller les appelles aux graphs et les subscriptions récurrentes. 

On montre également ce que devrait être un véritable design system à l'aide de Vuetify.


## Fun stuff... parce qu'il faut bien se faire plaisir


Le front dispose de @vue/composition-api pour tester Vue-3 en early access. Vous avez aussi accès à @babel/plugin-proposal-optional-chaining même si j'en ai pas eu besoin :/


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


Attention early adopters ! Pensez à supprimer vos node_modules pour supprimer toutes vos refs chiantes subsceptibles d'ecraser celles du docker-compose (link + pulsar-client)
``` bash
cd beepoc/
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
```


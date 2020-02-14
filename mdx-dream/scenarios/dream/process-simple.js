/*
// exemple:

agenceState.update({
  ongoingWar: true,
  accidents: {
    $push: random(agenceState.employees)
  }
})

//

agenceState.update({
  name: 'toto',
  accidents: {
    $push: someEmployeeId
  }
})

// puis..
agenceState.flush()

// produit l'execution de process avec le parametre "operation" égale à
{
  name: 'toto'
  ongoingWar: true,
  accidents: {
    $push: [056212, 4232423]
  }
}
*/

const Store = (socket, state = {}) => ({
  socket,
  state: clone(state),
  
  _operations: [],

  link (snapshot) {
    Object.assign(this.state, snapshot.state)
    snapshot.onUpdate(() => Object.assign(this.state, snapshot.state))
  },

  update (operation) {
    this._operations.push(operation);
  },

  flush () {
    // combine all operations into one
    const combineOperation = combine(this._operations);
    $db.addOperation(operation);

    // Socket Here or maybe after all requestIds ack ?
    // anyway combine operation need be to processed by the listening client 
    // with the corresponding driver
    this.socket.emit('game.update', combineOperation);
    // And maybe rollback on requestIds error ?

    // flush 
    this._operations = [];
  }
});

export default Store;

export default async function Snapshot (collection, where, initialState) {
  const event = new EventEmitter()

  const snapshot = await $db.snapshot(collection, where, initialState);
  snapshot.onUpdate = (cb) => event.on('updated', cb);

  // where filter on listener 
  Pubsub.on(`${collection}.snapshot.updated`, FilterBy(where), ({ changes }) => {
    snapshot.state = deepAssign(snapshot.state, changes);
    event.emit('updated', changes);
  });

  return snapshot;
}

// todo gestion des id
// + relational refs
// ---------- pb
// not working for user (les snapshots doivent etre crée en fonction du where)...
// mongo memory limit...
const $db = {
  addOperation (operation) {
    return mongodb.__operations.insert({ operation });
  },

  async addSnapshot (collection) {
    const lastSnapshot = await mongodb[collection].find({}).sort({ _id: -1 }).limit(1);
    const events = mongodb.__operations.find({ createdAt: { $lt: lastSnapshot?.createdAt } });
    
    if(!events) return;

    let state = lastSnapshot ? lastSnapshot.state : events[0].state;
    events.forEach((event) => {
      // get operation that only affect this collection
      const operation = getOperationFromCollection(collection, event.operation);
      // parse operations and resolve a new state from them
      state = driver(state, operation);
    });
  
    await mongodb[collection].insert({ state });

    if (lastSnapshot) {
      // TODO: handle where filter without sending all snapshot
      Pubsub.emit(`${collection}.snapshot.updated`, {
        where: associate(Object.keys(await mongodb[collection].getIndexes(), state)), // well just to show the logic behind...
        changes: diff(lastSnapshot.state, state)
      });
    }
  },

  snapshot (collection, where, initialState) {
    const hasCollection = (await mongodb.collectionNames(collection)).length > 0;
    if (!hasCollection) {
      await this.addOperation(initialState);
      await this.createIndex(collection, 'compound', Object.keys(where)); // MEH (just to remember to handle index)
      await this.addSnapshot(collection);
    }

    return mongodb[collection].findOne(where);
  },

  tick () {
    const collectionNames = await mongodb.getCollectionNames();
    collectionNames.forEach((collection) => {
      this.addSnapshot(collection);
    });
  }
}


// Sans event sourcing
// TODO: HANDLE "WHERE" SNAPSHOT
const $db2 = {
  update (operation) {
    const actionByCollection = groupByCollection(operation);
    
    actionByCollection.forEach(async (action) => {
      const lastSnapshot = await mongodb[action.collection].findOne(action.snapshotId);
      const state = driver(lastSnapshot.state, action);
      await mongodb[action.collection].insert({ state });

      Pubsub.emit(`${action.collection}.snapshot.updated`, {
        where: associate(Object.keys(await mongodb[action.collection].getIndexes(), state)), // well just to show the logic behind...
        changes: diff(lastSnapshot.state, state)
      });
    });
  },

  create (collection, where, initialState) {
    await this.createIndex(collection, 'compound', Object.keys(where)); // MEH (just to remember to handle index)
    await mongodb[action.collection].insert({ state: initialState });
  },

  snapshot (collection, where, initialState) {
    const hasCollection = (await mongodb.collectionNames(collection)).length > 0;
    if (!hasCollection) {
      this.create(collection, where, initialState);
    }

    return mongodb[collection].findOne(where);
  },
};
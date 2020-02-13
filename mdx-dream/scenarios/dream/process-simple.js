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

const State = (socket, state = {}) => ({
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

export default State;

export default async function Snapshot (collection, where, initialState) {
  const event = new EventEmitter()

  const state = await $db.snapshot(collection, where, initialState);
  const snapshot = {
    state,
    onUpdate: (cb) => event.on('updated', cb)
  }

  Pubsub.on(`${collection}.snapshot.updated`, where, (changes) => {
    snapshot.state = deepAssign(snapshot.state, changes);
    event.emit('updated', changes);
  });

  return snapshot;
}

// todo gestion des id
// + relational refs
const $db = {
  addOperation (operation) {
    return mongodb.__operations.insert({ operation });
  },

  addSnapshot (collection, initialState) {
    const lastSnapshot = await mongodb[collection].find({}).sort({ _id: -1 }).limit(1);
    const events = mongodb.__operations.find({ createdAt: { $lt: lastSnapshot?.createdAt } });
    
    if(!events) return;

    let state = lastSnapshot ? lastSnapshot.state : initialState;
    events.forEach((event) => {
      // parse operations and resolve a new state from them
      state = driver(state, event.operation);
    });
  
    await mongodb[collection].insert(state);

    if (lastSnapshot) {
      Pubsub.emit(`${collection}.snapshot.updated`, diff(lastSnapshot.state, state));
    }
  },

  snapshot (collection, where, initialState) {
    const hasCollection = (await mongodb.collectionNames(collection)).length > 0;
    if (!hasCollection) {
      await this.addOperation(operation);
      await this.addSnapshot(collection, initialState);
    }

    return mongodb[collection].findOne(where);
  },

  tick () {
    this.addSnapshot();
  }
}
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

export default function process (operation) {
  return mongodb.operations.insert({ operation });
}

// Exemple à l'arrache pour montrer la logique derriere la creation d'un snapshot...
export default function createSnapshot (initialState) {
  const lastSnapshot = await mongodb.snapshots.find({}).sort({ _id: -1 }).limit(1);
  const events = mongodb.operations.find({ createdAt: { $lt: lastSnapshot?.createdAt } });

  let state = lastSnapshot.state || initialState;
  events.forEach((event) => {
    // parse operations and resolve a new state from them
    state = driver(state, event.operation);
  });

  await mongodb.snapshots.insert({ state });
}

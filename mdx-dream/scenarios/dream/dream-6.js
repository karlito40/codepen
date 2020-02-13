io.on('connnection', async (socket) => {
  const agenceState = State(socket);
  const userState = State(socket);
  const appState = AppState({ agenceState, userState });

  const userSnapshot = await Snapshot('user', { token: socket.token }, initialUserState);
  userState.link(userSnapshot);

  socket.on('agence.join', async ({ agenceId }) => {
    // i'm pretty sure initialAgenceState may be duplicate though :(
    const agenceSnapeshot = await Snapshot('agence', { agenceId }, initialAgenceState);
    agenceState.link(agenceSnapeshot);

    const selectedChiotte = socket.user.canChier && !agenceState.ongoingWar && state.availableChiottes?.[0];
    userState.update({ selectedChiotte });
  });

  socket.on('agence.duplicate', () => {
    if (!agenceState.__isAlive) return;

    const newAgence = omit(agenceState.clone(), ['id', 'employees.id']);
    userState.update({ agences: { $push: newAgence } });
  });

  socket.on('agence.leave', () => agenceState.destroy());

  socket.on('war.declare', () => {
    if (!agenceState.__isAlive) return;

    agenceState.update({
      ongoingWar: true,
      accidents: {
        $push: random(agenceState.employees)
      }
    });
  });

  // flush processer must await or use a stream service
  // to be able to create an optimistic reponse
  // and then rollback to the last snapshot if anything happens
  Game.tick(() => appState.flush());
});
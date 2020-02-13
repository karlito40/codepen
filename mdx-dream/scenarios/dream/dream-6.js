io.on('connnection', async (socket) => {
  const agenceStore = Store(socket);
  const userStore = Store(socket);
  const appStore = AppStore(socket, { agenceStore, userStore });

  const userSnapshot = await Snapshot('user', { token: socket.token }, initialUserState);
  userStore.link(userSnapshot);

  socket.on('agence.join', async ({ agenceId }) => {
    // i'm pretty sure initialAgenceState may be duplicate though :(
    const agenceSnapeshot = await Snapshot('agence', { agenceId }, initialAgenceSate);
    agenceStore.link(agenceSnapeshot);

    const selectedChiotte = socket.user.canChier && !agenceStore.ongoingWar && state.availableChiottes?.[0];
    userStore.update({ selectedChiotte });
  });

  socket.on('agence.duplicate', () => {
    if (!agenceStore.__isAlive) return;

    const newAgence = omit(agenceStore.clone(), ['id', 'employees.id']);
    userStore.update({ agences: { $push: newAgence } });
  });

  socket.on('agence.leave', () => agenceStore.destroy());

  socket.on('war.declare', () => {
    if (!agenceStore.__isAlive) return;

    agenceStore.update({
      ongoingWar: true,
      accidents: {
        $push: random(agenceStore.employees)
      }
    });
  });

  // flush processer must await or use a stream service
  // to be able to create an optimistic reponse
  // and then rollback to the last snapshot if anything happens
  Game.tick(() => appStore.flush());
});
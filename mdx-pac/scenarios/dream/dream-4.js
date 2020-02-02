io.on('connnection', (socket) => {
  const state = State(socket);
  state.update({ me: $user.me() }).flush();

  socket.on('agence.join', async ({ agenceId }) => {
    state
      .merge(await $agence.getSnapshot({ agenceId }))
      .compute('selectedChiotte', () => state.socket.user.canChier && !state.ongoingWar && state.availableChiottes?.[0])
      .flush();

    Micro.on('agence.snapshot.updated', agenceId, (changes) => {
      state.merge(changes).flush();
    });
  });

  socket.on('war.declared', () => {
    if (!state.agenceId) return;

    const collateralDamage = random(state.agence.employees);
    
    state.update({
      ongoingWar: true,
      accidents: {
        $push: collateralDamage
      }
    }).flush();
  });
});
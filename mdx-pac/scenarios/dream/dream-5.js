io.on('connnection', async (socket) => {
  const state = State(socket);

  state.update({ me: await $user.me() });

  socket.on('agence.join', async ({ agenceId }) => {
    state
      .merge(await $agence.getSnapshot({ agenceId }))
      .compute('selectedChiotte', () => state.socket.user.canChier && !state.ongoingWar && state.availableChiottes?.[0]);

    Micro.on('agence.snapshot.updated', agenceId, state.bind(state));
  });

  socket.on('war.declared', () => {
    if (!state.agenceId) return;

    const collateralDamage = random(state.agence.employees);
    
    state.update({
      ongoingWar: true,
      accidents: {
        $push: collateralDamage
      }
    });
  });

  Game.tick(() => state.flush());
});
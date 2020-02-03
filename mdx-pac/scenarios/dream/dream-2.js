io.on('connnection', async (socket) => {
  const state = State(socket);
  state.update({ me: await $user.me() }).flush();

  socket.on('agence.join', async ({ agenceId }) => {
    state
      .update({
        agence: await $agence.findOne({ agenceId }, 'id accidents'),
        availableChiottes: await $chiotte.find({ agenceId, available: true }),
        ongoingWar: false
      })
      .compute('selectedChiotte', () => socket.user.canChier && !state.ongoingWar && state.availableChiottes?.[0])
      .flush();
  
    const employees = await $agence.getEmployees({ agenceId });
    state.update({ $merge: { agence: { employees } } }).flush();

    Micro.on('ludo.clock', (ludo, clock) => {
      if (clock.time !== '3pm') return;

      state.update({
        availableChiottes: {
          $pull: { participantId: ludo.id }
        }
      }).flush();
    });

    Micro.on('war.started', agenceId, () => {
      state.update({ ongoingWar: true }).flush();

      const collateralDamage = await $user.fireRocket({ 
        from: state.user.id, 
        to: random(state.agence.employees),
      });

      state.update({ 
        accidents: {
          $push: collateralDamage
        }
      }).flush();
    });
  });
});
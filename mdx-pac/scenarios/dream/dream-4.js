io.on('connnection', (socket) => {
  const state = State(socket);
  state.update({ me: $user.me() }).flush();

  socket.on('agence.join', async ({ agenceId }) => {
    state.update(await $agence.getSnapshot({ agenceId })).flush();

    Micro.on('ludo.clock', (ludo, clock) => {
      if (clock.time !== '3pm') return;

      state.update({
        availableChiottes: {
          $pull: { participantId: ludo.id }
        }
      }).flush();
    });

    Micro.on('war.started', agenceId, () => {
      // DB DRIVER FOR THE WIN !
      const collateralDamage = random(state.agence.employees);

      state.update({
        ongoingWar: true,
        accidents: {
          $push: collateralDamage
        }
      }).flush();
    });
  });
});
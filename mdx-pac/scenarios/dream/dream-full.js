// On supprime les intermediaires

// parce que tout le monde connait socketio
io.on('connnection', (socket) => {
  const state = socket.state = {};

  socket.on('agence.join', async ({ agenceId }) => {
    state.me = await $user.me();
    state.agence = await $agence.findOne({ agenceId }, 'id poles ludo');
    state.availableChiottes = await $chiotte.find({ agenceId, available: true });
  
    socket.emit('state.update', state);
  
    $agence.getEmployees({ agenceId }).then((employees) => {
      state.agence.employees = employees;
      socket.emit('state.update', { employees });
    });
  });
});


// parce que tout le monde connait socketio
io.on('connnection', (socket) => {
  const state = State(socket);
  state.set({ me: $user.me() }).flush();

  socket.on('agence.join', async ({ agenceId }) => {
    state.set({
      agence: await $agence.findOne({ agenceId }, 'id accidents'),
      availableChiottes: await $chiotte.find({ agenceId, available: true })
    }).flush();
  
    const employees = await $agence.getEmployees({ agenceId });
    state.merge({ agence: { employees } }).flush();

    $agence.on('ludo.clock', (ludo, clock) => {
      if (clock.time !== '3pm') return;

      state.exec({
        availableChiottes: {
          $pull: { participantId: ludo.id }
        }
      }).flush();
    });

    $agence.on('war.started', agenceId, () => {
      const collateralDamage = await $user.fireRocket({ 
        from: state.user.id, 
        to: random(state.agence.employees)
      });

      state.exec({ 
        availableChiottes: [],
        accidents: {
          $push: collateralDamage
        }
      }).flush();
    });
  });
});

// It's just about replication (master/slave)
// On est deja dans le passe
// Driver
io.on('connnection', (socket) => {
  const state = State(socket);
  state.set({ me: $user.me() }).flush();

  socket.on('agence.join', async ({ agenceId }) => {
    state.set({
      agence: await $agence.findOne({ agenceId }, 'id accidents'),
      availableChiottes: await $chiotte.find({ agenceId, available: true })
    }).flush();
  
    const employees = await $agence.getEmployees({ agenceId });
    state.merge({ agence: { employees } }).flush();

    Micro.on('ludo.clock', (ludo, clock) => {
      if (clock.time !== '3pm') return;

      state.exec({
        availableChiottes: {
          $pull: { participantId: ludo.id }
        }
      }).flush();
    });

    // DB DRIVER !
    Micro.on('war.started', agenceId, () => {
      const collateralDamage = random(state.agence.employees);

      state.exec({ 
        availableChiottes: [],
        accidents: {
          $push: collateralDamage
        }
      }).flush();
    });
  });
})


// L'etat est partage !
io.on('connnection', (socket) => {
  const state = State(socket);
  state.set({ me: $user.me() }).flush();

  socket.on('agence.join', async ({ agenceId }) => {
    state.set(await $agence.getSnapshot({ agenceId })).flush();

    Micro.on('ludo.clock', (ludo, clock) => {
      if (clock.time !== '3pm') return;

      state.exec({
        availableChiottes: {
          $pull: { participantId: ludo.id }
        }
      }).flush();
    });

    // DB DRIVER !
    Micro.on('war.started', agenceId, () => {
      const collateralDamage = random(state.agence.employees);

      state.exec({ 
        availableChiottes: [],
        accidents: {
          $push: collateralDamage
        }
      }).flush();
    });
  });
})
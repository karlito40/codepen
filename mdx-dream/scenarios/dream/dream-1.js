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
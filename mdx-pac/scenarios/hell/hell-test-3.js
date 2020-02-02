test('What the fuck am i testing', () => {
  mock('@/has-permission', () => true);

  const wrapper = shallowMount(Hell, {
    propsData: { ludoId: Id() },
    computed: {
      chiotteToUse: () => chiotteMock
    }
  });

  wrapper.setData({ ongoingWar: true });
  expect(wrapper.vm.myChiotte).toBe(false);
});

// ... une journée plus tard
// ... mon appli est testé aux petits oignons
// ... j'ai les 27 combinaisons, je doute de rien  :thumbsup:

// ... 
// ... 
// ... 
// ...  Wait ? What sorcery is this ?
// ...  Dude ! 
// ... (╯°□°）╯︵ ┻━┻ 


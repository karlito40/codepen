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
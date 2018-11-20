import { shallowMount } from '@vue/test-utils'
import Popup from '@/components/Popup'

describe('Popup', () => {
  it('should exist', () => {
    const wrapper = shallowMount(Popup, {
      propsData: { value: false }
    })
    expect(wrapper.element).toBeTruthy()
    wrapper.vm.close()
    expect(wrapper.vm.show).toBeFalsy()
  })
})




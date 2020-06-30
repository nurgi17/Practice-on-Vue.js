import { shallowMount } from '@vue/test-utils'
import UserView from '@/views/UserView'
import VUserSearchForm from '@/components/VUserSearchForm.vue'
import VUserProfile from '@/components/VUserProfile.vue'

describe('UserView', () => {
  const build = () => {
    const wrapper = shallowMount(UserView, {
      data: () => ({
        user: {}
      })
    })

    return {
      wrapper,
      userSearchForm: () => wrapper.findComponent(VUserSearchForm),
      userProfile: () => wrapper.findComponent(VUserProfile)
    }
  }

  it('renders the component', () => {
    //arrange
    const { wrapper } = build()
    //assert
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders main child components', () => {
    //arrange
    const { userSearchForm, userProfile } = build()
    //assert
    expect(userSearchForm().exists()).toBe(true)
    expect(userProfile().exists()).toBe(true)
  })

  it('passes a binded user prop to user profile component', () => {
    //arrange
    const { wrapper, userProfile } = build()
    wrapper.setData({
      user: {
        name: 'Arman'
      }
    })

    //assert
    expect(userProfile().vm.user).toBe(wrapper.vm.user)
  })
})
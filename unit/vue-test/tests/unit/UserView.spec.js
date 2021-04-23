jest.mock('@/store/actions')
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import UserView from '@/views/UserView'
import VUserProfile from '@/components/VUserProfile.vue'
import VUserSearchForm from '@/components/VUserSearchForm.vue'
import initialState from '@/store/state'
import actions from '@/store/actions'
import userFixture from './fixtures/user'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('UserView', () => {
  let state
  const build = () => {
    const wrapper = shallowMount(UserView, {
      localVue,
      store: new Vuex.Store({ 
        state,
        actions,
      })
      // data () {
      //   return {
      //     user: {}
      //   }
      // },
    })

    return {
      wrapper,
      userSearchForm: () => wrapper.findComponent(VUserSearchForm),
      userProfile: () => wrapper.findComponent(VUserProfile)
    }
  }

  beforeEach(() => {
    jest.resetAllMocks()
    state = { ...initialState }
  })

  it('renders component', () => {
    // arrange
    const { wrapper } = build()

    // assert
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('renders main child components', () => {
    // arrange
    const { userSearchForm, userProfile } = build()

    // assert
    expect(userSearchForm().exists()).toBe(true)
    expect(userProfile().exists()).toBe(true)
  })
  it('passes binded user prop to user profile component', () => {
    // arrange
    // const { wrapper, userProfile } = build()
    // wrapper.setData({
    //   user: {
    //     name: 'Nurgissa'
    //   }
    // })
    state.user = userFixture
    const { userProfile } = build()

    // assert
    expect(userProfile().vm.user).toBe(state.user)
  })
  it('searches for a user when received "submitted"', () => {
    // arrange
    const expectedUser = 'nurgi17'
    const { userSearchForm } = build()

    // act
    userSearchForm().vm.$emit('submitted', expectedUser)

    // assert
    expect(actions.SEARCH_USER).toHaveBeenCalled()
    expect(actions.SEARCH_USER.mock.calls[0][1]).toEqual({ username: expectedUser })
  })
})
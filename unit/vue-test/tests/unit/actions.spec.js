jest.mock('@/api')
import flushPromise from 'flush-promises'
import actions from '@/store/actions'
import api from '@/api'
import userFixture from './fixtures/user'

describe('store actions', () => {
  let commit
  beforeEach(() => {
    commit = jest.fn()
  })

  it('searches for user', async () => {
    // arrange
    const expectedUser = 'nurgi17'

    // act
    await actions.SEARCH_USER({ commit }, { username: expectedUser })
    await flushPromise()

    // assert
    expect(api.searchUser).toHaveBeenCalledWith(expectedUser)
    expect(commit).toHaveBeenCalledWith('SET_USER', userFixture)
  })
})
import user from '../../tests/unit/fixtures/user'
import userFixture from '../../tests/unit/fixtures/user'

export default {
  searchUser: jest.fn().mockResolvedValue(userFixture)
}
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class User {
  async getUserList(pageOn, keyword) {
    const data = { pageOn, keyword }
    const result = await get('/admin/user', data)
    return result.data
  }

  async deleteUser(userId) {
    const result = await _delete(`/admin/user/${userId}`)
    return result
  }
}

export default new User()

import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class User {
  async getUserList(pageOn) {
    const data = { pageOn }
    const result = await get('/admin/user', data)
    return result.data
  }
}

export default new User()

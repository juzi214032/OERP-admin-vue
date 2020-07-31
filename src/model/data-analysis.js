import {get} from '@/lin/plugin/axios'

class DataAnalysis {
  async getGenderGistogram(){
    const result = await get('/admin/data/user/histogram')

  }
}

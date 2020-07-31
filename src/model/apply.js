import { get, post, _delete } from '@/lin/plugin/axios'

class ApplyModel {
  /**
   * 获取报名列表
   * @param pageOn
   * @param pageSize
   * @param keyword
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getApplyList(pageOn, pageSize, keyword) {
    const data = { pageOn, pageSize, keyword }
    const result = await get('/admin/apply', data)
    return result
  }

  /**
   * 删除报名信息
   * @param applyId 报名id
   * @returns {Promise<void>}
   */
  async deleteApplyList(applyId) {
    const result = await _delete(`/admin/apply/${applyId}`)
    return result
  }

  async auditApply(applyId, status) {
    const data = { applyId, status }
    const result = await post('/admin/apply/audit', data)
    return result
  }
}

export default new ApplyModel()

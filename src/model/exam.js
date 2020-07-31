import { _delete, get } from '@/lin/plugin/axios'

class ExamModel {
  async getExamList(pageOn, pageSize, keyword) {
    const data = {
      pageOn,
      pageSize,
      keyword,
    }
    const result = await get('/admin/exam', data)
    return result
  }

  async deleteExam(examId) {
    await _delete(`/admin/exam/${examId}`)
  }
}

export default new ExamModel()

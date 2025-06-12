'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { DownloadIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ResponsesPage({ quiz }: { quiz: any }) {
  // Prepare data for charts
  const questionStats = quiz.questions.map((question: any) => {
    if (question.type === 'single_choice') {
      const optionCounts: Record<number, number> = {}
      
      question.answers.forEach((answer: any) => {
        if (answer.optionIndex !== null) {
          optionCounts[answer.optionIndex] = (optionCounts[answer.optionIndex] || 0) + 1
        }
      })
      
      const data = question.options.map((option: string, index: number) => ({
        option: option,
        count: optionCounts[index] || 0
      }))
      
      return {
        questionId: question.id,
        questionText: question.text,
        type: 'single_choice',
        data
      }
    } else {
      const answers = question.answers
        .filter((a: any) => a.textAnswer)
        .map((a: any) => a.textAnswer!)
        .slice(0, 20) // Show only top 20 answers
      
      return {
        questionId: question.id,
        questionText: question.text,
        type: 'short_answer',
        answers
      }
    }
  })

  // Prepare CSV data
  const csvData = [
    ['Response ID', 'Date', ...quiz.questions.map((q: any) => q.text)],
    ...quiz.responses.map((response: any) => [
      response.id,
      response.createdAt.toISOString(),
      ...quiz.questions.map((q: any) => {
        const answer = response.answers.find((a: any) => a.questionId === q.id)
        if (!answer) return ''
        if (q.type === 'single_choice') {
          return q.options[answer.optionIndex!] || ''
        }
        return answer.textAnswer || ''
      })
    ])
  ].map(row => row.join(',')).join('\n')

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">{quiz.title} Responses</h1>
          <p className="text-gray-600">{quiz.responses.length} responses</p>
        </div>
        <a 
          href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
          download={`${quiz.title.replace(/\s+/g, '_')}_responses.csv`}
        >
          <Button>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {questionStats.map((stat: any) => (
          <div key={stat.questionId} className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">{stat.questionText}</h3>
            
            {stat.type === 'single_choice' ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stat.data}>
                    <XAxis dataKey="option" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="space-y-2">
                {stat.answers.map((answer: string, i: number) => (
                  <div key={i} className="p-2 bg-gray-50 rounded-md">
                    {answer}
                  </div>
                ))}
                {stat.answers.length === 0 && (
                  <p className="text-gray-500">No responses yet</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
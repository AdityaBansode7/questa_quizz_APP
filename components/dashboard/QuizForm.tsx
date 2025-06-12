'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'

export default function QuizForm({ quizData }: { quizData?: any }) {
  const isEdit = !!quizData
  const router = useRouter()
  
  const [title, setTitle] = useState(quizData?.title || '')
  const [description, setDescription] = useState(quizData?.description || '')
  const [questions, setQuestions] = useState(quizData?.questions || [
    { id: 1, text: '', type: 'single_choice', options: ['', ''] }
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length + 1, text: '', type: 'single_choice', options: ['', ''] }
    ])
  }

  const addOption = (questionId: number) => {
    const newQuestions = questions.map(q => 
      q.id === questionId ? { ...q, options: [...q.options, ''] } : q
    )
    setQuestions(newQuestions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const formattedQuestions = questions.map(q => ({
      text: q.text,
      type: q.type,
      options: q.type === 'single_choice' ? q.options : [],
      order: q.id
    }))
    
    try {
      const url = isEdit ? `/api/quiz/${quizData.id}` : '/api/quiz'
      const method = isEdit ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, questions: formattedQuestions })
      })
      
      if (response.ok) {
        const { quizId } = await response.json()
        router.push(`/dashboard/quizzes/${quizId}`)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'An error occurred')
      }
    } catch (err) {
      setError('Failed to save quiz')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <div className="text-red-500">{error}</div>}
      
      <div>
        <Label htmlFor="title">Quiz Title *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={100}
        />
        <p className="text-sm text-gray-500 mt-1">Max 100 characters</p>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
        />
        <p className="text-sm text-gray-500 mt-1">Max 200 characters</p>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Questions</h2>
        {questions.map((question) => (
          <div key={question.id} className="border p-4 rounded-md mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Question {question.id}</h3>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setQuestions(questions.filter(q => q.id !== question.id))}
                disabled={questions.length <= 1}
              >
                Remove
              </Button>
            </div>
            
            <div className="mb-4">
              <Label htmlFor={`question-${question.id}`}>Question Text *</Label>
              <Input
                id={`question-${question.id}`}
                value={question.text}
                onChange={(e) => {
                  const newQuestions = questions.map(q => 
                    q.id === question.id ? { ...q, text: e.target.value } : q
                  )
                  setQuestions(newQuestions)
                }}
                required
                maxLength={200}
              />
              <p className="text-sm text-gray-500 mt-1">Max 200 characters</p>
            </div>
            
            <div className="mb-4">
              <Label>Question Type *</Label>
              <Select
                value={question.type}
                onValueChange={(value) => {
                  const newQuestions = questions.map(q => 
                    q.id === question.id ? { ...q, type: value } : q
                  )
                  setQuestions(newQuestions)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single_choice">Single Choice</SelectItem>
                  <SelectItem value="short_answer">Short Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {question.type === 'single_choice' && (
              <div>
                <Label>Options *</Label>
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...question.options]
                        newOptions[index] = e.target.value
                        const newQuestions = questions.map(q => 
                          q.id === question.id ? { ...q, options: newOptions } : q
                        )
                        setQuestions(newQuestions)
                      }}
                      required
                      maxLength={100}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="ml-2"
                      onClick={() => {
                        const newOptions = question.options.filter((_, i) => i !== index)
                        const newQuestions = questions.map(q => 
                          q.id === question.id ? { ...q, options: newOptions } : q
                        )
                        setQuestions(newQuestions)
                      }}
                      disabled={question.options.length <= 2}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addOption(question.id)}
                >
                  Add Option
                </Button>
              </div>
            )}
          </div>
        ))}
        
        <Button
          type="button"
          variant="secondary"
          onClick={addQuestion}
          disabled={questions.length >= 20}
        >
          Add Question
        </Button>
        <p className="text-sm text-gray-500 mt-2">Max 20 questions per quiz</p>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : isEdit ? 'Update Quiz' : 'Create Quiz'}
        </Button>
      </div>
    </form>
  )
}
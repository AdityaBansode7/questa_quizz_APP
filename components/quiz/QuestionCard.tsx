import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function QuestionCard({ 
  question, 
  index,
  onAnswerChange 
}: { 
  question: any, 
  index: number,
  onAnswerChange: (questionId: string, value: string | number) => void 
}) {
  return (
    <div className="border p-4 rounded-md mb-4">
      <h3 className="font-medium mb-3">
        {index + 1}. {question.text}
      </h3>
      
      {question.type === 'single_choice' ? (
        <RadioGroup onValueChange={(value) => onAnswerChange(question.id, parseInt(value))}>
          {question.options.map((option: string, i: number) => (
            <div key={i} className="flex items-center space-x-2">
              <RadioGroupItem value={i.toString()} id={`option-${i}`} />
              <Label htmlFor={`option-${i}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <Input 
          type="text" 
          placeholder="Your answer" 
          onChange={(e) => onAnswerChange(question.id, e.target.value)}
        />
      )}
    </div>
  )
}
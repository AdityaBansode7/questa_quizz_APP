export default function ThankYouPage({
  searchParams
}: {
  searchParams: { responseId: string }
}) {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
      <p className="text-xl mb-6">Your responses have been recorded.</p>
      <p className="text-gray-600">
        Response ID: {searchParams.responseId}
      </p>
    </div>
  )
}
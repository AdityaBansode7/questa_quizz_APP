// components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 2023 Questa Quiz Platform. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a 
              href="https://github.com/yourusername" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/yourprofile" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
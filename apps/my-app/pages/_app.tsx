import "@/styles/globals.css";
import '../public/tailwind.css';
import Link from "next/link";

export default function App() {
  return (<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
    <h1 className="text-4xl font-bold text-blue-500 mb-4">
      Welcome to Microfrontend 1
    </h1>
    <p className="text-lg text-gray-700 mb-8">
      This is a simple microfrontend built with Next.js and Tailwind CSS.
    </p>
    <Link href="/microfrontend2">
      <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go to Microfrontend 2
      </a>
    </Link>
  </div>)
}

import { CssBaseline, GeistProvider, Text, Toggle } from '@geist-ui/core'
import '../base.css'
import logo from '../logo.png'
import { getExtensionVersion } from '../utils'
import ProviderSelect from './ProviderSelect'

function OptionsPage() {
  return (
    <div className="container mx-auto">
      <nav className="flex flex-row justify-between items-center mt-5 px-2">
        <div className="flex flex-row items-center gap-2">
          <img src={logo} className="w-10 h-10 rounded-lg" />
          <span className="font-semibold">One Line Gmail (v{getExtensionVersion()})</span>
        </div>
        <div className="flex flex-row gap-3">
          <a
            href="https://github.com/jt-wang/one-line-gmail"
            target="_blank"
            rel="noreferrer"
          >
            Source code
          </a>
        </div>
      </nav>
      <main className="w-[500px] mx-auto mt-14">
        <Text h2>Options</Text>
        <Text h3 className="mt-5 mb-0">
          AI Provider
        </Text>
        <ProviderSelect />
      </main>
    </div>
  )
}

function App() {
  return (
    <GeistProvider>
      <CssBaseline/>
      <OptionsPage/>
    </GeistProvider>
  )
}

export default App

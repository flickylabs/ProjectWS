import { Component, type ReactNode, type ErrorInfo } from 'react'
import Emoji from '../common/Emoji'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen bg-gray-950 text-gray-100 flex items-center justify-center px-4">
          <div className="text-center space-y-4 max-w-sm">
            <div className="text-4xl"><Emoji char="⚠️" size={36} /></div>
            <h1 className="text-lg font-bold text-red-400">오류가 발생했습니다</h1>
            <p className="text-xs text-gray-500">
              {this.state.error?.message ?? '알 수 없는 오류'}
            </p>
            <button
              onClick={this.handleReset}
              className="bg-amber-600 hover:bg-amber-500 text-gray-950 font-semibold px-6 py-2 rounded-lg text-sm"
            >
              다시 시작
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

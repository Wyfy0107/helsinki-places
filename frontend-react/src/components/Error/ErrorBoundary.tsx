import { Component } from 'react'
import ErrorPage from '.'

class ErrorBoundary extends Component<{}, { error: null | Error }> {
  public state = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return <ErrorPage />
    }

    return this.props.children
  }
}

export default ErrorBoundary

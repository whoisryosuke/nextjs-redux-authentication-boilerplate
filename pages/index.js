import React from 'react'
import Link from 'next/link'
import {connect} from 'react-redux'

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req
    // reduxStore.dispatch(serverRenderClock(isServer))

    return {}
  }

  componentDidMount () {
    const {dispatch} = this.props
    // this.timer = startClock(dispatch)
  }

  render () {
    return (
      <div>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/dashboard">
          <a>Private Dashboard</a>
        </Link>
      </div>
    )
  }
}

export default connect()(Index)

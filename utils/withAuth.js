import React, {Component} from 'react'
import Router from 'next/router'
import AuthService from './AuthService'

export default function withAuth(AuthComponent) {
    const Auth = new AuthService('http://localhost')
    return class Authenticated extends Component {

      static async getInitialProps(ctx) {
        // Ensures material-ui renders the correct css prefixes server-side
        let userAgent
        if (process.browser) {
          userAgent = navigator.userAgent
        } else {
          userAgent = ctx.req.headers['user-agent']
        }

        // Check if Page has a `getInitialProps`; if so, call it.
        const pageProps = AuthComponent.getInitialProps && await AuthComponent.getInitialProps(ctx);
        // Return props.
        return { ...pageProps, userAgent }
      }

      constructor(props) {
        super(props)
        this.state = {
          isLoading: true
        };
      }

      componentDidMount () {
        if (!Auth.loggedIn()) {
          Router.push('/')
        }
        this.setState({ isLoading: false })
      }

      render() {
        return (
          <div>
          {this.state.isLoading ? (
              <div>LOADING....</div>
            ) : (
              <AuthComponent {...this.props}  auth={Auth} />
            )}
          </div>
        )
      }
    }
}

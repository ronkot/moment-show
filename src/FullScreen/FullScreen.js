import React from 'react'
import screenfull from 'screenfull'

import './FullScreen.css'

class FullScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFullscreen: false
    }
    this.requestFullScreen = this.requestFullScreen.bind(this)
  }

  componentDidMount() {
    screenfull.onchange((...args) => {
      console.log('FULL', screenfull.isFullscreen, args)
      this.setState({isFullscreen: screenfull.isFullscreen})
    })
  }

  requestFullScreen() {
    if (this.state.isFullscreen) {
      screenfull.exit()
    } else {
      screenfull.request()
    }
  }

  render() {
    return (
      <div className="FullScreen" onClick={this.requestFullScreen}>
        {this.state.isFullscreen ? 'Exit full screen' : 'Go to full screen'}
      </div>
    )
  }
}

export default FullScreen
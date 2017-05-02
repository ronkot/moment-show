import React from 'react'
import * as screenfull from 'screenfull'

import './FullScreen.css'

class FullScreen extends React.Component {
  requestFullScreen() {
    if (screenfull.enabled) {
      screenfull.request()
    }
  }

  render() {
    return (
      <div className="FullScreen" onClick={this.requestFullScreen}>
        Go to full screen
      </div>
    )
  }
}

export default FullScreen
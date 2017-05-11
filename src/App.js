import React, { Component } from 'react'
import * as contentful from 'contentful'

import './App.css';
import Moment from './Moment'
import FullScreen from './FullScreen'

const client = contentful.createClient({
  space: 'oz8k3o360ryy',
  accessToken: 'c60deb5a853cd1cdb02061b7d4f07700be6534c2e504034a251e15fa0510ed68'
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moments: [],
      currentIndex: 0
    }
    this.nextMoment = this.nextMoment.bind(this)
  }

  async componentDidMount() {
    const moments = await this.getMoments()
    this.setState({ moments })
  }

  async getMoments() {
    const moments = (await client.getEntries()).items
    moments.sort((a, b) => {
      const aOrder = a.fields.order || Number.MAX_SAFE_INTEGER
      const bOrder = b.fields.order || Number.MAX_SAFE_INTEGER
      return aOrder < bOrder ? -1 : 1
    })
    return moments
  }

  nextMoment() {
    const nextIndex = (this.state.currentIndex + 1) % this.state.moments.length
    this.setState({ currentIndex: nextIndex })
  }

  render() {
    const moment = this.state.moments[this.state.currentIndex]
    return (
      <div>
        <FullScreen />
        {moment && <Moment moment={moment} onNext={this.nextMoment} moments={this.state.moments} />}
      </div>
    )
  }
}

export default App

import React, { Component } from 'react';
import './App.css';
import Moment from './Moment'
import * as contentful from 'contentful'

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
    const moments = await client.getEntries()
    this.setState({ moments: moments.items })
  }

  nextMoment() {
    const nextIndex = (this.state.currentIndex + 1) % this.state.moments.length
    this.setState({ currentIndex: nextIndex })
  }

  render() {
    const moment = this.state.moments[this.state.currentIndex]
    const locations = this.state.moments.map(moment => moment.fields.location)
    return (
      <div>
        {moment && <Moment moment={moment} onNext={this.nextMoment} locations={locations} />}
      </div>
    )
  }
}

export default App

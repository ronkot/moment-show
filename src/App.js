import React, { Component } from 'react';
import './App.css';
import Moment from './Moment/Moment'
import * as contentful from 'contentful'

const client = contentful.createClient({
  space: 'oz8k3o360ryy',
  accessToken: 'c60deb5a853cd1cdb02061b7d4f07700be6534c2e504034a251e15fa0510ed68'
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moments: []
    }
  }

  async componentDidMount() {
    const moments = await client.getEntries()
    console.log(moments)
    this.setState({ moments: moments.items })
  }

  render() {
    const renderMoments = () => {
      return this.state.moments.map(moment => <Moment key={moment.sys.id} moment={moment} />)
    }
    return (
      <div>
        {renderMoments()}
      </div>
    )
  }
}

export default App

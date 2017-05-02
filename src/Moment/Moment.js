import React from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Map from '../Map/Map'
import './Moment.css'

class Moment extends React.Component {
  static propTypes = {
    moment: PropTypes.object.isRequired,
    onNext: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      mapVisible: true
    }
    this.timer = null
    this.hideMap = this.hideMap.bind(this)
    this.handleEnd = this.handleEnd.bind(this)
    console.log('constructor')
  }

  componentDidMount() {
    console.log('didmount', this.refs)
    this.refs.audio.addEventListener('ended', this.handleEnd)
    this.timer = setTimeout(this.hideMap, 6000)
  }

  componentWillUnmount() {
    this.refs.audio.removeEventListener('ended', this.handleEnd)
  }

  handleEnd() {
    this.timer && clearInterval(this.timer)
    this.props.onNext()
  }

  componentWillReceiveProps(nextProps) {
    console.log('willreceive')
    if (nextProps.moment !== this.props.moment) {
      this.setState({ mapVisible: true })
      this.timer && clearInterval(this.timer)
      this.timer = setTimeout(this.hideMap, 6000)
    }
  }

  hideMap() {
    console.log('hideMap()')
    this.setState({ mapVisible: false })
  }

  render() {
    const { fields } = this.props.moment

    const renderImage = () => {
      const image = fields.images[0]
      if (!image) return null

      return <div key='image' className="Moment--image" style={{backgroundImage: `url(${image.fields.file.url})`}} />
    }

    const renderAudio = () => {
      const audio = fields.sounds[0]
      if (!audio) return null
      return (
        <audio ref="audio" src={audio.fields.file.url} autoPlay>
          Your browser doesn't support HTML5 audio
        </audio>
      )
    }

    const renderMap = () => {
      if (!fields.location) return null
      return <Map key='map' lat={fields.location.lat} lng={fields.location.lon} visible={this.state.mapVisible} />
    }

    return (
      <div className="Moment" onClick={this.handleEnd}>
        {renderAudio()}
        <CSSTransitionGroup
          transitionName="Moment--item"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          <h1 key='title' className="Moment--title">{fields.name}</h1>
          {this.state.mapVisible ? renderMap() : renderImage()}
        </CSSTransitionGroup>
      </div>
    )
  }
}


export default Moment
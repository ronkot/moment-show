import React from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Map from '../Map'
import Audio from '../Audio'
import './Moment.css'


class Moment extends React.Component {
  static propTypes = {
    moment: PropTypes.object.isRequired,
    locations: PropTypes.array.isRequired,
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
    this.startMoment = this.startMoment.bind(this)
  }

  componentDidMount() {
    this.startMoment()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.moment !== this.props.moment) {
      this.setState({ mapVisible: true })
      this.startMoment()
    }
  }

  startMoment() {
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(this.hideMap, 6000)
  }

  handleEnd() {
    this.timer && clearInterval(this.timer)
    this.props.onNext()
  }

  hideMap() {
    this.setState({ mapVisible: false })
  }

  render() {
    const { fields } = this.props.moment

    const renderImage = () => {
      if (this.state.mapVisible) return null
      const image = fields.images[0]
      if (!image) return null
      return <div key='image' className="Moment--image" style={{backgroundImage: `url(${image.fields.file.url})`}} />
    }

    const renderAudio = () => {
      if (this.state.mapVisible) return null
      const audio = fields.sounds[0]
      if (!audio) return null
      return <Audio src={audio.fields.file.url} onEnd={this.props.onNext} />
    }

    const renderMap = () => {
      if (!this.state.mapVisible) return null
      if (!fields.location) return null
      return <Map key='map' current={fields.location} all={this.props.locations}  visible={this.state.mapVisible} />
    }

    return (
      <div className="Moment" onClick={this.handleEnd}>
        <CSSTransitionGroup
          transitionName="Moment--item"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          <h1 key='title' className="Moment--title">{fields.name}</h1>
          {renderMap()}
          {renderImage()}
          {renderAudio()}
        </CSSTransitionGroup>
      </div>
    )
  }
}


export default Moment
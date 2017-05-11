import React from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Map from '../Map'
import Audio from '../Audio'
import './Moment.css'


class Moment extends React.Component {
  static propTypes = {
    moment: PropTypes.object.isRequired,
    moments: PropTypes.array.isRequired,
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

    const renderTitle = () => {
      if (!this.state.mapVisible) return null
      return <h1 key='title' className="Moment--title">{fields.name}</h1>
    }

    const renderMap = () => {
      if (!this.state.mapVisible) return null
      if (!fields.location) return null
      return <Map key='map' moment={this.props.moment} moments={this.props.moments}  visible={this.state.mapVisible} />
    }

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


    return (
      <div className="Moment" onClick={this.handleEnd}>
        <CSSTransitionGroup
          transitionName="Moment--item"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={2000}>
          {renderTitle()}
          {renderMap()}
          {renderImage()}
          {renderAudio()}
        </CSSTransitionGroup>
      </div>
    )
  }
}


export default Moment
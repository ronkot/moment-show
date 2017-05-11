import React from 'react'
import PropTypes from 'prop-types'

const FADE_DURATION = 5

class Audio extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onEnd: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.fadeInAndOut = this.fadeInAndOut.bind(this)
  }

  componentDidMount() {
    this.refs.audio.volume = 0
    this.refs.audio.addEventListener('ended', this.props.onEnd)
    this.refs.audio.addEventListener('timeupdate', this.fadeInAndOut)
  }

  componentWillUnmount() {
    this.refs.audio.removeEventListener('ended', this.props.onEnd)
    this.refs.audio.removeEventListener('timeupdate', this.fadeInAndOut)
  }

  fadeInAndOut() {
    const {currentTime, duration} = this.refs.audio
    const volume = currentTime < (duration - FADE_DURATION)
      ? Math.min(currentTime / FADE_DURATION, 1)
      : (duration - currentTime) / FADE_DURATION
    this.refs.audio.volume = volume
  }

  render() {
    return (
      <audio ref="audio" src={this.props.src} autoPlay>
        Your browser doesn't support HTML5 audio
      </audio>
    )
  }
}

export default Audio
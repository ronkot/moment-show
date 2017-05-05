import React from 'react'
import PropTypes from 'prop-types'

class Audio extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onEnd: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.increaseVolume = this.increaseVolume.bind(this)
  }

  componentDidMount() {
    this.refs.audio.volume = 0
    this.refs.audio.addEventListener('ended', this.props.onEnd)
    this.fadeInTimer = setInterval(this.increaseVolume, 100)
  }

  componentWillUnmount() {
    this.refs.audio.removeEventListener('ended', this.props.onEnd)
    if (this.fadeInTimer) {
      clearInterval(this.fadeInTimer)
    }
  }

  increaseVolume() {
    if (!this.refs.audio) return
    const volume = this.refs.audio.volume
    if (volume < 0.99) {
      this.refs.audio.volume = volume + 0.02
    } else {
      clearInterval(this.fadeInTimer)
    }
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
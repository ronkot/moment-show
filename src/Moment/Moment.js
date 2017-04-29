import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react';

import './Moment.css'

const MapMarker = () => <div className="Moment--map-marker" />

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
    this.hideMap = this.hideMap.bind(this)
    console.log('constructor')
  }

  componentDidMount() {
    console.log('didmount', this.refs)
    this.refs.audio.addEventListener('ended', this.props.onNext)
    setTimeout(this.hideMap, 4000)
  }

  componentWillUnmount() {
    this.refs.audio.removeEventListener('ended', this.props.onNext)
  }

  componentWillReceiveProps(nextProps) {
    console.log('willreceive')
    if (nextProps.moment !== this.props.moment) {
      this.setState({ mapVisible: true })
      setTimeout(this.hideMap, 4000)
    }
  }

  hideMap() {
    console.log('hideMap()')
    this.setState({ mapVisible: false })
  }

  render() {
    const { fields } = this.props.moment

    const renderImages = () => {
      const image = fields.images[0]
      if (!image) return null
      return <div className="Moment--image" style={{backgroundImage: `url(${image.fields.file.url})`}} />
    }

    const renderAudio = () => {
      const audio = fields.sounds[0]
      if (!audio) return null
      return <audio ref="audio" src={audio.fields.file.url} autoPlay>Your browser doesn't support HTML5 audio</audio>
    }

    const renderMap = () => {
      if (!fields.location) return null
      const pos = {
        lat: fields.location.lat,
        lng: fields.location.lon
      }
      return <GoogleMapReact
        defaultCenter={pos}
        defaultZoom={14}
      >
        <MapMarker {...pos} />
      </GoogleMapReact>
    }

    return (
      <div className="Moment" onClick={this.props.onNext}>
        <h1 className="Moment--title">{fields.name}</h1>
        {renderAudio()}
        {!this.state.mapVisible && renderImages()}
        {this.state.mapVisible && renderMap()}
      </div>
    )
  }
}


export default Moment
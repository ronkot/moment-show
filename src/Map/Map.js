import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'

import theme from './theme.json'
import './Map.css'


const MapMarker = () => <div className="Map--marker" />

const Helsinki = {
  lat: 60.17020786,
  lng: 24.93518829
}

class Map extends React.Component {
  static propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    visible: PropTypes.bool
  }

  render() {
    const pos = {lat: this.props.lat, lng: this.props.lng}
    return (
      <span className={'Map' + (!this.props.visible ? ' Map__is-hidden' : '')}>
        <GoogleMapReact
          defaultCenter={Helsinki}
          defaultZoom={12}
          options={{
            styles: theme,
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
          }}>
          <MapMarker {...pos} />
        </GoogleMapReact>
      </span>
    )
  }
}

export default Map
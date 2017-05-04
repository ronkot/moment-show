import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'

import theme from './theme.json'
import './Map.css'


const MapMarker = ({ active }) => <div className={"Map--marker" + (active ? ' Map--marker__isActive' : '')} />

const Helsinki = {
  lat: 60.17020786,
  lng: 24.93518829
}

class Map extends React.Component {
  static propTypes = {
    current: PropTypes.object.isRequired,
    all: PropTypes.array.isRequired,
    visible: PropTypes.bool
  }

  render() {
    const markers = this.props.all.map((location, i) =>
      <MapMarker key={i} lat={location.lat} lng={location.lon} active={location === this.props.current} />
    )

    return (
      <span className='Map'>
        <GoogleMapReact
          bootstrapURLKeys={{key: 'AIzaSyArUj_iNob6KHUOrlrgTz_9FpVvODSA5JA'}}
          defaultCenter={Helsinki}
          defaultZoom={12}
          options={{
            styles: theme,
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
          }}>
          {markers}
        </GoogleMapReact>
      </span>
    )
  }
}

export default Map
import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'

import theme from './theme.json'
import './Map.css'


const MapMarker = ({ order='', active, showOrder=false }) => <div className={"Map--marker" + (active ? ' Map--marker__isActive' : '')}>{showOrder && order}</div>

const Helsinki = {
  lat: 60.18523283150753,
  lng: 24.944801330566406
}

class Map extends React.Component {
  static propTypes = {
    moment: PropTypes.object.isRequired,
    moments: PropTypes.array.isRequired,
    visible: PropTypes.bool
  }

  render() {
    const markers = this.props.moments.map((moment, i) => {
       const {location, order} = moment.fields
       return <MapMarker key={i} lat={location.lat} lng={location.lon} order={order} active={moment === this.props.moment}/>
      }
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
import React from 'react'
import PropTypes from 'prop-types'
import Measure from 'react-measure'
import GoogleMapReact from 'google-map-react'
import { fitBounds } from 'google-map-react/utils'

import theme from './theme.json'
import './Map.css'


const MapMarker = ({ order='', active, showOrder=false }) => <div className={"Map--marker" + (active ? ' Map--marker__isActive' : '')}>{showOrder && order}</div>

class Map extends React.Component {
  static propTypes = {
    moment: PropTypes.object.isRequired,
    moments: PropTypes.array.isRequired,
    visible: PropTypes.bool
  }

  state = {
    dimensions: {
      width: -1,
      height: -1
    }
  }

  setDimensions({width, height}) {
    this.setState({dimensions: {width, height}})
  }

  render() {
    const calculateBounds = (moments) => {  // TODO: Prettier implementation
      const minMax = moments.reduce((bounds, moment) => {
          const {lat, lon: lng} = moment.fields.location
          return {
            maxLat: lat > bounds.maxLat ? lat : bounds.maxLat,
            maxLng: lng > bounds.maxLng ? lng : bounds.maxLng,
            minLat: lat < bounds.minLat ? lat : bounds.minLat,
            minLng: lng < bounds.minLng ? lng : bounds.minLng
          }
        }, {maxLat: Number.MIN_VALUE, maxLng: Number.MIN_VALUE, minLat: Number.MAX_VALUE, minLng: Number.MAX_VALUE}
      )
      return {
        nw: {
          lat: minMax.maxLat,
          lng: minMax.minLng
        },
        se: {
          lat: minMax.minLat,
          lng: minMax.maxLng
        }
      }
    }

    const markers = this.props.moments.map((moment, i) => {
       const {location, order} = moment.fields
       return <MapMarker key={i} lat={location.lat} lng={location.lon} order={order} active={moment === this.props.moment}/>
      }
    )

    const bounds = calculateBounds(this.props.moments)
    const {center, zoom} = fitBounds(bounds, this.state.dimensions)

    return (
      <Measure onMeasure={this.setDimensions.bind(this)}>
        <span className='Map'>
          <GoogleMapReact
            bootstrapURLKeys={{key: 'AIzaSyArUj_iNob6KHUOrlrgTz_9FpVvODSA5JA'}}
            center={center}
            zoom={zoom || 12}
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
      </Measure>
    )
  }
}

export default Map
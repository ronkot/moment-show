import React from 'react'
import PropTypes from 'prop-types'

import './Moment.css'

class Moment extends React.Component {
  static propTypes = {
    moment: PropTypes.object.isRequired
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
      return <audio src={audio.fields.file.url}>Your browser doesn't support HTML5 audio</audio>
    }

    return (
      <div className="Moment">
        <h1 className="Moment--title">{fields.name}</h1>
        {renderAudio()}
        {renderImages()}
      </div>
    )
  }
}


export default Moment
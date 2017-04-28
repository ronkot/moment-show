import React from 'react'
import PropTypes from 'prop-types'

class Moment extends React.Component {
  static propTypes = {
    moment: PropTypes.object.isRequired
  }

  render() {``
    const { fields } = this.props.moment

    const renderImages = () => {
      const image = fields.images[0]
      if (!image) return null
      return <img src={image.fields.file.url}></img>
    }

    return (
      <div>
        <h1>fields.name</h1>
        {renderImages()}
      </div>
    )
  }
}


export default Moment
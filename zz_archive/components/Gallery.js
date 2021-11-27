import React from 'react'
import ImageGallery from 'react-image-gallery'

class Gallery extends React.Component {

  render () {
    const images = this.props.images.map(imageURL => ({
      original: imageURL,
      thumbnail: imageURL
    }))

    return (
      <ImageGallery
        items={images}
        slideInterval={2000}
      />
    )
  }
}

export default Gallery

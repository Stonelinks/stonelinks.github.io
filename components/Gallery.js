import React from 'react';
import ImageGallery from 'react-image-gallery';

class Gallery extends React.Component {

  render () {

    const images = this.props.images.map((imageURL) => {
      return {
        original: imageURL,
        thumbnail: imageURL,
      };
    });

    return (
      <ImageGallery
        ref={i => this._imageGallery = i}
        items={images}
        slideInterval={2000}
      />
    );
  }
}

export default Gallery;

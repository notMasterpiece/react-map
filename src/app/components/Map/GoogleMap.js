import React from 'react';
import PropTypes from 'prop-types';


class GoogleMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      markers: []
    }

  }


  componentWillReceiveProps(nextProps) {

    const {activeProperties} = nextProps;

    const { index } = activeProperties;

    const {markers} = this.state;

    markers.forEach( item => {
      item.iw.close();
    });

    markers[index] && markers[index].iw.open(this.map, markers[index]);

  }


  componentDidMount() {

    const {prop, activeProp} = this.props;


    this.map = new google.maps.Map(this.map, {
      center: {lat: activeProp.latitude, lng: activeProp.longitude},
      mapTypeControl: false,
      zoom: 15,
      styles: [{'featureType':'all','elementType':'labels.text.fill','stylers':[{'saturation':36},{'color':'#000000'},{'lightness':40}]},{'featureType':'all','elementType':'labels.text.stroke','stylers':[{'visibility':'on'},{'color':'#000000'},{'lightness':16}]},{'featureType':'all','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#000000'},{'lightness':20}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#000000'},{'lightness':17},{'weight':1.2}]},{'featureType':'landscape','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':20}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':21}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#000000'},{'lightness':17}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#000000'},{'lightness':29},{'weight':0.2}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':18}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':16}]},{'featureType':'transit','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':19}]},{'featureType':'water','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':17}]}]
    });

    this.createMarkers(prop);

  }


  createMarkers = prop => {

    const {setActiveProperty, activeProperties} = this.props;
    const activeIndex = activeProperties.index;
    const {markers} = this.state;

    prop.map( item => {
      // console.log(item);
      const {latitude, longitude, index} = item;

        this.marker = new google.maps.Marker({
        map: this.map,
        position: {lat: latitude, lng: longitude},
        title: 'Hello World!',
        label: {
          color: '#333',
          text: `${index + 1}`
        },
        item,
        icon: {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(20, 32),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, -5),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(10, 32)
        },


      });

      const iw = new google.maps.InfoWindow({
        content: `<div><h5>${item.address}</h5><p>${item.city}</p></div>`
      });

      this.marker.iw = iw;

      this.marker.addListener('click', () => {

          markers.forEach( item => {
            item.iw.close();
          });

          setActiveProperty(item, true);

      });

      markers.push(this.marker);

      markers[activeIndex] && markers[activeIndex].iw.open(this.map, markers[activeIndex]);

    });



  };

  componentDidUpdate() {
    const {prop} = this.props;
    const {markers} =  this.state;

    markers.forEach(marker => {
      const {item} = marker;

      if( prop.includes(item) ) {
        markers[item.index].setVisible(true);
      } else {
        marker.iw.close();
        markers[item.index].setVisible(false);
      }


    });

  }


  render() {





    return (
      <div className='mapContainer'>
        <div
          id='map'
          ref={(el) => { this.map = el; }}
        >

        </div>
      </div>
    )
  }
}

GoogleMap.propTypes = {
  prop: PropTypes.array.isRequired,
  setActiveProperty: PropTypes.func.isRequired
};

export default GoogleMap;
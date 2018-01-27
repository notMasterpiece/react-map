import React, { Component } from 'react';
import './map.scss';

import data from  './data';
import Cart from './Cart';
import Header from './Header';
import GoogleMap from './GoogleMap';
import image from '../../assets/images/location-map.svg';


import jump from 'jump.js'



export default class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      properties: data.properties,
      activeProperties: data.properties[0],
      filterBedrooms : 'any',
      filterBathrooms : 'any',
      filterCars : 'any',
      filterSort : 'any',
      priceFrom : 0,
      priceTo : 1000001,
      filterProperties : [],
      isFiltering : false,
      newProprties : [],
      newActiveProperties : [],
      clearFilter : false

    }


  }

  setActiveProperty = (property, scroll) => {
    // console.log(property);

    if( scroll ) {

      const elem = document.body.querySelector(`#card-${property._id}`);
      jump(elem, {
        duration: 700,
        offset: 0
      });

    }

    this.setState({
      activeProperties: property
    })
  };


  handleFilter = e => {
    console.log(1);
    const target = e.target;
    const {value, name} = target;

    this.setState({
      [name]: value,
      isFiltering: true
    }, () => {

      const {properties, filterBedrooms, filterBathrooms, filterCars, priceFrom, priceTo} = this.state;

      console.log(filterBedrooms);
      console.log(filterBathrooms);

      const newProprties = properties.filter(item => {

        return (
          (item.carSpaces == filterCars || filterCars === 'any') &&
          (item.bedrooms == filterBedrooms || filterBedrooms === 'any') &&
          (item.bathrooms == filterBathrooms || filterBathrooms === 'any') &&
          (item.price >= priceFrom && item.price <= priceTo )
        )
      });

      // console.log(newProprties);

      this.setState({
        newProprties: newProprties,
        newActiveProperties : newProprties[0]

      })


    });



  };



  clearFilter = (e, form) => {
    e.preventDefault();
    // console.log(form);

    this.setState({
      activeProperties: data.properties[0],
      filterBedrooms : 'any',
      filterBathrooms : 'any',
      filterCars : 'any',
      filterSort: 'any',
      priceFrom : 0,
      priceTo : 1000001,
      newProprties : [],
      isFiltering: false
    });

    form.reset();

  };



  render() {
    const { properties, activeProperties, newProprties, isFiltering, filterSort, clearFilter } = this.state;

    const propertiesList = isFiltering ? newProprties : properties;

    ( parseInt(filterSort) === 0 ) && propertiesList.sort((a, b) => a.price - b.price);
    ( parseInt(filterSort) === 1 ) && propertiesList.sort((a, b) => b.price = a.price);


    console.log(clearFilter);

    return (

      <div>
        {/* listings - Start */}
        <div className="listings">

          {/* Header - Start - add .filter-is-visible to show filter*/}

          <Header handleFilter={this.handleFilter} clearFilter={this.clearFilter} />
          {/* Header - End */}

          <div className="cards container">
            <div className={`cards-list row ${(newProprties.length === 0 && isFiltering) ? 'is-empty' : ''}`}>



              {/* Property card - Start */}

              {
                newProprties.length === 0 && isFiltering &&
                <p className='warning'><img src={image} alt=""/>Nothing were found</p>
              }

              {
                propertiesList &&
                  propertiesList.map( item => {
                  return <Cart
                    prop={item}
                    activeProperties={activeProperties}
                    key={item._id}
                    setActiveProperty={this.setActiveProperty}
                  />
                })
              }


              {/*<Test />*/}


              {/* Property card - End */}

            </div>
          </div>
        </div>
        {/* listings - End */}

        {/* mapContainer - Start */}
        <GoogleMap
          prop={propertiesList}
          activeProp={activeProperties}
          setActiveProperty={this.setActiveProperty}
          activeProperties={activeProperties}

        />
        {/* mapContainer - End */}
      </div>
    );
  }
}
import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter'


import image from '../../assets/images/house-location-pin.svg';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filterIsVisible: false
    }

  }



  toggleFilter = (e) => {
    e.preventDefault();
    this.setState({
      filterIsVisible: !this.state.filterIsVisible
    })
  };

  render() {

    const {filterIsVisible} = this.state;
    const {handleFilter, clearFilter} = this.props;

    return (
      <header className={`${filterIsVisible ? 'filter-is-visible' : ''}`}>

        {/* Filter - Start */}
        <Filter
          toggleFilter={this.toggleFilter}
          handleFilter={handleFilter}
          clearFilter={clearFilter}
        />
        {/* Filter - End */}

        <img src={image} />
        <h1>Property Listings</h1>
        <button onClick={this.toggleFilter} className="btn-filter">Filter</button>
      </header>
    )
  }
}

Header.propTypes = {
  // setActiveProperty: PropTypes.func.isRequired
};

export default Header;
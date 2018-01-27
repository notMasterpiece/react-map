import React from 'react';
import PropTypes from 'prop-types';
import accounting from 'accounting';

const formatPrice = price => {
  return accounting.formatMoney(price, {precision: 0, symbol: 'грн', format: '%v %s'})
};


class Cart extends React.Component {
  render() {

    const {prop, activeProperties, setActiveProperty} = this.props;







    return (
      <div onClick={() => setActiveProperty(prop, false)} id={`card-${prop._id}`} className={`card col-sm-12 col-md-6 col-lg-4 ${prop === activeProperties ? 'is-active' : ''}`}>
        <img src={prop.picture} alt={prop.sity} />
        <p className="price">{formatPrice(prop.price)}</p>
        <div className="details">
          <span className="index">{prop.index + 1}</span>
          <p className="location">
            {prop.city}<br />{prop.address}
          </p>
          <ul className="features">
            <li className="icon-bed">{prop.bedrooms}<span>bedrooms</span></li>
            <li className="icon-bath">{prop.bathrooms}<span>bathrooms</span></li>
            <li className="icon-car">{prop.carSpaces}<span>parking spots</span></li>
          </ul>
        </div>
      </div>
    )
  }
}

Cart.propTypes = {
  prop: PropTypes.object.isRequired,
  activeProperties: PropTypes.object.isRequired,
  setActiveProperty: PropTypes.func.isRequired

};

export default Cart;
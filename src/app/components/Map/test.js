import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import 'moment/locale/ru'


class Test extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      date: moment()
    }

  }

  prevDay = () => {
    this.setState({
      date: this.state.date.subtract(1, 'day')
  })

  };

  nextDay = () => {
    this.setState({
      date: this.state.date.add(1, 'day')
    })
  };


  render() {

    console.log(this.state.date);

    return (
      <div className="test">
        <p>{this.state.date.format('DD.MM.YYYY')}</p>
        <button onClick={this.nextDay}>+</button>
        <button onClick={this.prevDay}>-</button>
      </div>
    )
  }
}

Test.propTypes = {
  // prop: PropTypes.object.isRequired
};

export default Test;
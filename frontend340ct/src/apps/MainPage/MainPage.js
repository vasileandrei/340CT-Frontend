import React, { Component } from 'react';

import DropZone from './../../components/DropZone/DropZone';

import './MainPage.css';

class MainPage extends Component {

  constructor(props){
    super(props);

    this.state = {
    };

  }

  render = () => {
    return (
      <div>
        <DropZone />
      </div>
    );
  }
}

export default MainPage;

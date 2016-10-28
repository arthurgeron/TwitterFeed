import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import FeedScreen from './FeedScreen';
import * as firebase from 'firebase';

class AwesomeProject extends Component {



    render() {

        return (
          <FeedScreen/>

        );


    }

}


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

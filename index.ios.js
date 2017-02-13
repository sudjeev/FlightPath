
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var ReactNative = require('react-native');
var Home = require('./app/Home');

var styles = ReactNative.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});


const Realm = require('realm');

class Path {}

Path.schema = {
    name: 'Path',
    primaryKey: 'name',
    properties: {
        name: 'string',
        points: {type: 'list', objectType: 'Point'}
    }
};

class Point {}

Point.schema = {
  name: 'Point',
  properties: {
    latitude: 'double',
    longitude: 'double'
  }
}

const realm = new Realm({schema: [Path, Point]});


class FlightPath extends React.Component {
  render () {
    return (
      <ReactNative.NavigatorIOS 
      style={styles.container}
      initialRoute={{
        title: 'FlightPath',
        component: Home,
        passProps: {realm: realm}
      }}/>
      );
  }
}


AppRegistry.registerComponent('FlightPath', () => FlightPath);

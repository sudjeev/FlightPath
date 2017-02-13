import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

var ReactNative = require('react-native');
var MapView = require('react-native-maps');


class ViewPath extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			pathPoints: []
		}

		for (var i in this.props.pathPoints) {
		  if(this.props.pathPoints.hasOwnProperty(i)) {
		    this.state.pathPoints.push(this.props.pathPoints[i]);
		  }
		}
	}

	render(){

		return (
	      <View style={styles.container}>
	          <MapView
	          	onPress={this.mapClick}
	            style={styles.map}
	            initialRegion={{
	              latitude: 37.78825,
	              longitude: -122.4324,
	              latitudeDelta: 0.0922,
	              longitudeDelta: 0.0421,
	            }}>

	            {this.state.pathPoints.length > 0 ? 

		            <MapView.Marker
					 coordinate={this.state.pathPoints[0]}/>

	            	:
	            	null
	            }

	            <MapView.Polyline
				 strokeColor={'red'}
				 strokeWidth={3}
				 coordinates={this.state.pathPoints}/>

	            </MapView>
	      </View>
		);
	}

}

const styles = StyleSheet.create({
   container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});

module.exports = ViewPath;
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  AlertIOS,
  Modal
} from 'react-native';

var ReactNative = require('react-native');
var MapView = require('react-native-maps');

class NewMap extends Component {

	constructor(props){
		super(props);

		this.state = {
			name: "",
			pathPoints: [],
			modalVisible: false
		};

		this.mapClick = this.mapClick.bind(this);
	}

	componentWillMount(){
		this.props.navigator.replace({
		  title: 'New Path',
		  component: NewMap,
		  rightButtonTitle: "Save",
		  onRightButtonPress: () => this.onSave(),
		  passProps: {realm: this.props.realm}
		});
	}

	mapClick(e){

		this.setState({pathPoints:[
				...this.state.pathPoints,
				{latitude:e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude}
			]}); 

	}

	onWriteName(event){
		this.setState({ name: event.nativeEvent.text });
	}

	onSave(){
		if(this.state.name == ""){
			AlertIOS.alert(
			 'You forgot to name this FlightPath!',
			 '',
			 [
			   {text: 'Got it', onPress: () => console.log('Name got it pressed'), style: 'cancel'},
			 ],
			);	
		} else if(this.state.pathPoints.length == 0){
			AlertIOS.alert(
			 'You haven\'t created a path just yet',
			 "Tap anywhere on the map to start creating your path, every subsequent tap will extend the FlightPath your drone will fly!",
			 [
			   {text: 'Got it', onPress: () => console.log('No point got it pressed'), style: 'cancel'},
			 ],
			);	
		} else if(this.state.pathPoints.length == 1){
			AlertIOS.alert(
			 "Your path isn\'t finished just yet",
			 "Looks like your only tapped the map once, tap at least once more to create a valid FlightPath for your drone to fly!",
			 [
			   {text: 'Got it', onPress: () => console.log('One point got it pressed'), style: 'cancel'},
			 ],
			);				
		} else {

			this.props.realm.write(() => {
			    let savedPath = this.props.realm.create('Path', {
			        name: this.state.name,
			        points: this.state.pathPoints
			    }, true);
			});
			
			this.props.navigator.pop();
		}

	}

	render(){

		return (
	      <View style={styles.container}>
	            
			  	<View style={styles.buttonView}>
					<TextInput
						style={styles.searchInput}
						value={this.state.name}
						onChange={this.onWriteName.bind(this)}
						placeholder='Name this path'/>
			  	</View>

			  	<View style={styles.mapContainer}>
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
					 strokeWidth={5}
					 coordinates={this.state.pathPoints}/>

		            </MapView>
		        </View>

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
	    flex: 1,
	    flexDirection: 'column',
	    padding: 0
  	},
	buttonView: {
		marginTop: 65,
		alignSelf: 'stretch',
		justifyContent: 'center',
		flexDirection: 'row',
		flex: 1,
		height: 35
	},
    mapContainer: {
	    position: 'absolute',
	    flexDirection:'row',
	    flex: 1,
	    top: 100,
	    left: 0,
	    right: 0,
	    bottom: 0,
	},
	map: {
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    right: 0,
	    bottom: 0,
	},
	buttonText: {
	  fontSize: 18,
	  color: 'white',
	  alignSelf: 'center'
	},
	button: {
	  height: 35,
	  flex: 0.2,
	  flexDirection: 'row',
	  backgroundColor: '#48BBEC',
	  borderColor: '#48BBEC',
	  borderWidth: 1,
	  marginBottom: 10,
	  alignSelf: 'stretch',
	  justifyContent: 'center'
	},
  	searchInput: {
	  height: 35,
	  padding: 4,
	  marginRight: 5,
	  flex: 0.8,
	  flexDirection: 'row',
	  fontSize: 18,
	  borderWidth: 1,
	  borderColor: 'white',
	  color: '#48BBEC',
	}
});

module.exports = NewMap;

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ListView
} from 'react-native';

var ReactNative = require('react-native');
var NewMap = require('./NewMap');
var ViewPath = require('./ViewPath');


class Home extends React.Component {

	constructor(props){
		super(props);

		var paths = this.props.realm.objects('Path');

		var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.name !== r2.name});
		this.state = {
				      dataSource: dataSource.cloneWithRows(paths)
				     };
	}

	componentWillReceiveProps(nextProps){

		var paths = nextProps.realm.objects('Path');
		var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.name !== r2.name});
		var state = {
			dataSource: dataSource.cloneWithRows(paths)
		};
		this.setState(state);
	}

	onButtonPressed(){
		this.props.navigator.push({
		  title: 'New Path',
		  component: NewMap,
		  passProps: {realm: this.props.realm}
		});
	}

	renderRow(rowData, sectionID, rowID){
		return (
	      <TouchableHighlight
	      	  onPress={() => this.rowPressed(rowData.name)}
	          underlayColor='#dddddd'>
	        <View>
		      <View style={styles.rowContainer}>
		        <View style={styles.textContainer}>
		         <Text style={styles.nameText}>{rowData.name}</Text>
		        </View>
		      </View>
		      <View style={styles.separator}/>
	        </View>
	      </TouchableHighlight>
	    );
	}

	renderSectionHeader(sectionData, sectionID){
		var sectionText = "";

		if(sectionData.length == 0){
			sectionText = "You currently have no paths";
		} else if(sectionData.length == 1) {
			sectionText = "1 path";
		} else {
			sectionText = sectionData.length + " paths"
		}
		return(
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionText}>{sectionText}</Text>
			</View>
		);
	}

	rowPressed(rowName){
		var thisPath = this.props.realm.objects('Path').filtered('name = $0', rowName)[0];
		var pathPoints = thisPath.points;


		this.props.navigator.push({
		  title: thisPath.name,
		  component: ViewPath,
		  passProps: {pathPoints: pathPoints}
		});
	}

	render(){

		var r = this.props.realm.objects('Path');

		return (
			<View style={styles.homeContainer}>
				<TouchableHighlight style={styles.button} 
				underlayColor='#99d9f4'
				onPress={this.onButtonPressed.bind(this)}>
					<Text style={styles.buttonText}>Create a New Flight Path <Image source={require('../images/plane.png')} /></Text>
				</TouchableHighlight>
				<ListView
					style={styles.listContainer}
			        dataSource={this.state.dataSource}
			        renderRow={this.renderRow.bind(this)}
			        renderSectionHeader={this.renderSectionHeader.bind(this)}
			        automaticallyAdjustContentInsets={false}/>
			</View>
			);
	}
}

var styles = StyleSheet.create({
	homeContainer: {
		marginTop: 65,
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	},
	sectionHeader:{
		height: 50,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#ecf0f1',
		justifyContent: 'center'
	},
	listContainer: {
		alignSelf: 'stretch',
		flex: 0.9,
		flexDirection: 'column'
	},
	button: {
		height: 36,
		backgroundColor: '#48BBEC',
		borderColor: '#48BBEC',
		borderWidth: 1,
	    alignSelf: 'stretch',
	    flexDirection: 'column',
	    flex: 0.1,
	    justifyContent: 'center'
	},
	buttonText: {
		fontSize: 20,
		color: 'white',
		fontWeight: '500',
		alignSelf: 'center',
	},
	sectionText: {
		fontSize: 22,
		color: '#7f8c8d',
		alignSelf: 'center',		
	},
	rowContainer: {
	    flexDirection: 'row',
	   	alignSelf:'center',
	    padding: 10
	}, 
	textContainer: {
    	flex: 1,
    	flexDirection: 'row',
    	alignSelf:'center'
  	},
  	nameText: {
	    fontSize: 20,
	    color: '#656565',
	    justifyContent: 'center',
	    alignSelf:'center'
  	},
  	separator: {
	    height: 1,
	    backgroundColor: '#dddddd'
	}
});

module.exports = Home;
# FlightPath 
### A sample project built using React Native, Realm and React-Native-Maps.

FlightPath simply lets a user create a new path by drawing a poly-line on a map, and then persistently 
saves this path(a name and a list of points) to Realm. The user can also see all the previously created
paths which are displayed inside a ListView in the Home Component.

The major code for this project is contained within index.ios.js and the ./app folder which contains the following components:
Home.js
NewMap.js
ViewPath.js

###Dependency Issues
If you are having issues downloading the dependencies for this project (react-native-maps or RTC files) 
it is likely due to a linking bug in the newest version of React-Native. Try the following steps:

- unlink react-native-maps: <b> react-native unlink react-native-maps </b>
- uninstall react-native-maps: <b>npm uninstall react-native-maps --save</b>
- install a previous version of react-native: <b>npm install react-native@0.39 --save</b>
- install react-native-maps: <b>npm install react-native-maps --save</b>
- link react-native-maps: <b>react-native link react-native-maps</b>

## Here are some screenshots of the app:

Home 
![alt text](https://github.com/sudjeev/FlightPath/blob/master/images/home.png "Home")

Creating a new path
![alt text](https://github.com/sudjeev/FlightPath/blob/master/images/path.png "Path Creation")

Home after creation 
![alt text](https://github.com/sudjeev/FlightPath/blob/master/images/homeWithPath.png "Home with path")

Viewing created path 
![alt text](https://github.com/sudjeev/FlightPath/blob/master/images/viewPath.png "View path")

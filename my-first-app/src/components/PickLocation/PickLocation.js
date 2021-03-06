import React, {Component} from 'react';
import { View, Image, Button, Text, Dimensions, StyleSheet } from 'react-native';
import MapView from "react-native-maps";
class PickLocation extends Component {

    componentWillMount() {
        this.reset();
    }

      reset = () => {
          this.setState({
            focusedLocation: {
                latitude: 48.856614,
                longitude: 2.3522219000000177,
                latitudeDelta: 0.0122,
                longitudeDelta:
                  Dimensions.get("window").width /
                  Dimensions.get("window").height *
                  0.0122
              },
              locationChosen: false
          });
      }

      pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            };
        });
        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        });
      };

      getLocationHandler = () => {
          navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
          }, 
        err => {
            console.log(err);
            alert('Fetching Position Failed, please pick one manually!');
        })
      }

    render() {
        let marker = null;

        if(this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation}/>
        }

        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    region={!this.state.locationChosen ? this.state.focusedLocation : null}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}
                >
                    {marker}
                </MapView>
                <View style={styles.button}>
                <Button title="Me Localiser" onPress={this.getLocationHandler}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    map: {
        width: "100%",
        height: 250,
      },
    button: {
        margin: 8
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
});

export default PickLocation;
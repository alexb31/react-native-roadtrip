import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import MapView from "react-native-maps";

import Icon from "react-native-vector-icons/Ionicons";
// import { deletePlace } from "../../store/actions/index";

class RoadTripDetail extends Component {
  state = {
    viewMode: "portrait"
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  renderStop(stops) {
    return (
      this.props.selectedRoadTrip.stops.map((stops) => {
        return (
          <Text style={styles.placeName}>
            <Text style={{ color: '#bb4467' }}> + </Text>
            {stops['address']}
          </Text>
        );
      })
  );
}

renderList() {
  const stops_list = this.props.selectedRoadTrip;
  // if (this.state.showIngredients) {
    return (this.renderStop(stops_list));
  // }
  // return (this.renderDirectionList(directions));
}

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          this.state.viewMode === "portrait"
            ? styles.portraitContainer
            : styles.landscapeContainer
        ]}
      >
        {/* <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <Image
              source={this.props.selectedPlace.image}
              style={styles.placeImage}
            />
          </View>
          <View style={styles.subContainer}>
            <MapView
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta:
                  Dimensions.get("window").width /
                  Dimensions.get("window").height *
                  0.0122
              }}
              style={styles.map}
            >
              <MapView.Marker coordinate={this.props.selectedPlace.location} />
            </MapView>
          </View>
        </View> */}
        <View>
          <Text>Description: </Text> 
          <Text style={styles.placeName}>
          {this.props.selectedRoadTrip.description}
        </Text>
        </View>

        <View>
          <Text>Etapes: </Text> 
          <Text style={styles.placeName}>
          { this.renderList() }
          {this.props.selectedRoadTrip.stops.map(function(stops) {
            return stops['address'];
          })
        }
        </Text>
        </View>

        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>
              {/* {this.props.selectedRoadTrip.owned.map(function(owned) {
                return owned['title'];
              })} */}
            </Text>
          </View>
          {/* <View>
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                  color="red"
                />
              </View>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  portraitContainer: {
    flexDirection: "column"
  },
  landscapeContainer: {
    flexDirection: "row"
  },
  placeDetailContainer: {
    flex: 2
  },
  placeImage: {
    width: "100%",
    height: "100%"
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  deleteButton: {
    alignItems: "center"
  },
  subContainer: {
    flex: 1
  }
});

// const mapDispatchToProps = dispatch => {
//   return {
//     onDeletePlace: key => dispatch(deletePlace(key))
//   };
// };

export default connect(null, null)(RoadTripDetail);
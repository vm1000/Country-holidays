import React, { Component } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Image
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import Geolocation from '@react-native-community/geolocation';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import AutoSuggest from 'react-native-autosuggest'
import countries from '../countries.json'
import styles from './styles'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      locationData: [],
      staticData: [],
      location: '',
      item: '',
      text: "",
      query: '',
      countryCode: 'LV',
      errorState: false,
      country: countries,
      ready: false,
      where: { lat: null, lng: null },
      error: null,
    }
    this.fetchData = this.fetchData.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    //this.fetchData();

    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24
    };
    // this.setState({ ready: false, error: null });
    // navigator.geolocation.getCurrentPosition(this.geoSuccess,
    //   this.geoFailure,
    //   geoOptions);
    Geolocation.getCurrentPosition(info => this.setState({ where: { lng: info.coords.longitude, lat: info.coords.latitude } }));
    this.getData()
  }

  onFocus() {
    this.setState({
      backgroundColor: '#ededed', borderWidth: 3, borderColor: 'white'
    })
  }

  onBlur() {
    this.setState({
      borderWidth: 0, borderColor: 'white', backgroundColor: 'rgba(200,200,200, 0.9)'
    })
  }

  geoSuccess = (position) => {
    console.log(position.coords.latitude);
    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude }
    })
  }

  geoFailure = (err) => {
    this.setState({ error: err.message });
  }

  handleChangeText = (typedText) => {
    this.setState({ text: typedText });

  }

  async getData() {
    try {
      let latitude = this.state.where.lat
      let longitude = this.state.where.lng
      const locationResponse = await fetch('https://api.opencagedata.com/geocode/v1/json?q=' + latitude + '+' + longitude + '&key=31fd50403748461cb82ea6658222248f')
      const json = await locationResponse.json();
      this.setState({ locationData: json })
      //Alert.alert('Location is being fetched ' + JSON.stringify(json.results[0].components.country))
      this.setState({ location: json.results[0].components.country })
    } catch (error) {
      Alert.alert('Location not found...')
    }
  }

  handleChangeYear = (typedYear) => {
    this.setState({ yearInput: typedYear });
  }

  async fetchData() {
    try {
      let year = this.state.yearInput
      //let countryCode = this.state.countryCode
      // let country = this.state.country
      let countryCode = this.state.query

      if (countryCode.length > 2) {
        countryCode = countries.find(country => country.name.toLowerCase() === this.state.query.toLowerCase()).code
      }

      const currentYear = new Date().toISOString().substring(0, 4)
      const response = await fetch('https://date.nager.at/api/v2/publicholidays/' + currentYear + '/' + countryCode);
      const json = await response.json();
      this.setState({ data: json });
    } catch (error) {
      this.errorState = true
      Alert.alert('Data not found...')
    }
  };

  render() {
    const { query } = this.state;
    const { data, locationData } = this.state;
    const currentDate = new Date().toISOString().substring(0, 10)
    const filteredCounties = countries.filter((country) => country.name.toLocaleLowerCase().startsWith(query.toLocaleLowerCase()))
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.countryInputView}>
            <Text style={{ color: 'grey', margin: 10, fontSize: 20, }}>
              Enter country name
            </Text>
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 80,
              borderWidth: 0.2,
              borderColor: 'grey',
              borderRadius: 20,
              margin: 5,
              backgroundColor: 'lightgrey'
            }}>
              <TextInput style={[styles.countryTextInput, {
                backgroundColor: this.state.backgroundColor,
                color: this.state.color,
                borderWidth: this.state.borderWidth,
                borderColor: this.state.borderColor
              }]}
                autoCapitalize="none"
                autoCorrect={false}
                Autocomplete={countries.map(country => { return { id: country.code, name: country.name } })}
                placeholder="Enter here..."
                placeholderTextColor="grey"
                onChangeText={text => this.setState({ query: text })}
                //onChangeText={this.handleChangeText}
                value={this.state.query}
                onFocus={() => this.onFocus()}
                onBlur={() => this.onBlur()}

              />
              {/* <Autocomplete
                listContainerStyle={{
                  paddingLeft: 20, width: 160, opacity: 0.4, borderRadius: 20
                }}
                inputContainerStyle={{
                  opacity: 0.8, borderTopLeftRadius: 40, borderTopEndRadius: 40, overflow: 'hidden'
                }}
                listStyle={{ opacity: 0.8, borderBottomEndRadius: 20, borderBottomStartRadius: 20, overflow: 'hidden' }}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => this.setState({ query: id })}>
                    <Text>
                      {item.name} ({item.code})
                  </Text>
                  </TouchableOpacity>
                )}
                renderTextInput={() => <TextInput onChange={this.handleChangeText} />}
                placeholder="Type here..." */}
              {/* //onChangeText={text => this.setState({ query: text })}
                //onChangeText={this.handleChangeText}
                data={filteredCounties}
              //.map(country => { return { id: country.code, name: country.name } })}
              /> */}
              {/* <ScrollView>
                <Text>
                </Text>
              </ScrollView> */}

              <View style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                flexDirection: 'column',
              }}>
                <FlatList
                  data={filteredCounties}
                  extraData={this.state.query}
                  keyExtractor={(x, i) => i}
                  renderItem={({ item }) =>
                    <ScrollView>
                      <View style={{ paddingRight: 30 }}>
                        <Text style={{ paddingBottom: 5, marginLeft: 10, fontSize: 13, color: 'grey' }} onChangeText={text => this.setState({ query: text })}>
                          {item.code} ({item.name})
                      </Text>
                      </View>
                    </ScrollView>}
                />
              </View>

            </View>
            <View style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              flexDirection: 'column',
            }}>
              <TouchableOpacity style={styles.checkForHolidaysButton}
                onPress={() => this.fetchData()}>
                <Text style={{ color: 'white', margin: 10 }}>
                  Check for holidays
            </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.holidaysDataView}>
            <View style={{
              margin: 5,
            }}>
              {/* <FlatList
                data={data}
                keyExtractor={(x, i) => i}
                renderItem={({ loc }) =>
                  <View>
                    <Text style={{ paddingBottom: 10, marginLeft: 10, fontSize: 15, }}>
                      Name: {loc.country}
                    </Text>
                  </View>}

              <Image source={{ uri: 'http://cdn.onlinewebfonts.com/svg/img_134220.png' }} style={{ width: 20, height: 20, tintColor: 'grey', padding: 10, opacity: 0.2, flex: 1, alignContent: "center", alignItems: 'center' }} />
              /> */}

              <Text style={{ fontSize: 15, color: 'grey' }}>
                {`Current location: ${this.state.location}`}
              </Text>
              <Text style={{ fontSize: 15, color: 'grey' }}>
                Total holidays found : {data.length}
              </Text>
            </View>

            <View style={this.errorState === true ? styles.noDataMessageIsActive : styles.noDataMessageIsHidden}>
              <Text style={{
                fontSize: 20, fontWeight: 'bold', color: 'grey', flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                marginTop: 100
              }}>
                No data... {"\n"}
                Please check your input {"\n"}
                CountryCode: {this.state.text} {"\n"}
              </Text>
            </View>

            <FlatList
              data={data}
              keyExtractor={(x, i) => i}
              renderItem={({ item }) =>
                <ScrollView>
                  <View style={currentDate > (item.date) ? styles.passedDueHolidayCardView : styles.holidayCardView} >
                    {/* <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                      <Image style={{ width: 50, height: 50, flex: 1, alignContent: 'center', alignItems: 'center' }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Info_Simple_bw.svg/1024px-Info_Simple_bw.svg.png' }} />
                    </View> */}
                    <Text style={{ paddingTop: 5, marginLeft: 10, fontSize: 10, }}>
                      {currentDate > (item.date) ? 'Passed due' : 'Will happen'}
                    </Text>
                    <Text style={{ paddingTop: 10, marginLeft: 10, fontSize: 15, }}>
                      Date: {new Date(item.date).toLocaleDateString()}
                    </Text>
                    <Text style={{ marginLeft: 10, fontSize: 15, marginRight: 10 }}>
                      Local name: {item.localName}
                    </Text>
                    <Text style={{ paddingBottom: 10, marginLeft: 10, fontSize: 15, }}>
                      Name: {item.name}
                    </Text>
                  </View>
                </ScrollView>}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
export default App;

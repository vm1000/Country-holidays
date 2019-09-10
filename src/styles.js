import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  countryInputView: {
    backgroundColor: 'gainsboro',
    margin: 20,
    marginBottom: -10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'silver',
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  countryTextInput: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: 40,
    width: 200,
    //width: '100%',
    backgroundColor: 'rgba(200,200,200, 0.9)',
    borderColor: '#DDDDDD',
    color: 'dodgerblue',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    marginTop: 5,
  },
  checkForHolidaysButton: {
    backgroundColor: 'dodgerblue',
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column'
  },
  holidaysDataView: {
    backgroundColor: 'gainsboro',
    height: 500,
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'silver',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  holidayCardView: {
    backgroundColor: 'dodgerblue',
    // margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 10,
    marginHorizontal: 5
  },
  passedDueHolidayCardView: {
    backgroundColor: 'silver',
    // margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 10,
    marginHorizontal: 5
  },
  noDataMessageIsActive: {
    backgroundColor: 'gainsboro',
    // margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 10,
    marginHorizontal: 5,
  },
  noDataMessageIsHidden: {
    backgroundColor: 'gainsboro',
    // margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 10,
    marginHorizontal: 5,
    width: 0, height: 0
  }


});

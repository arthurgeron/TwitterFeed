import React, { Component, PropTypes } from 'react';
import { AppRegistry,  View, Text, BackAndroid, Alert, StyleSheet, Navigator, ListView, TouchableOpacity, TouchableHighlight } from 'react-native';

import firebaseConfig from './Credentials';
import * as firebase from 'firebase';
//Load credentials

const firebaseApp = firebase.initializeApp(firebaseConfig);
//var provider = new firebase.auth.TwitterAuthProvider();

export default class FeedScreen extends Component {
  constructor(props){
    super(props)
    //Declaring our variables to read our sample JSON variable
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {dataSource: ds.cloneWithRows(exampleJson)};
    console.log('construct ran OK')
    //firebase.initializeApp(firebaseConfig);
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    var token = result.credential.accessToken;
    var secret = result.credential.secret;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }

  _renderRow(_rowData, _navigator, _route){

    return (
      //Touch detection
      <TouchableOpacity
        // Function to call to open tweet
        onPress= { () => {

          _navigator.push({
            text: _rowData.text,
            created_at: _rowData.created_at,
            title: _rowData.id_str,
          });
          console.log('changed page successfully');

          //Detecting back button
          BackAndroid.addEventListener('hardwareBackPress', function() {
            if (_route.title !== 'Twitter Feed') {
               _navigator.pop();
            }
          });
          console.log('added event handler to back button successfully');
        }}>
        <View style={styles.row}


          // Function to call to go back to the previous screen
          onBack={() => {
            _navigator.pop();

          }}>



          <Text>{_rowData.text}</Text>


        </View>
      </TouchableOpacity>
    );
  }

  render() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
  // You can use these server side with your app's credentials to access the Twitter API.
  var token = 	61519961-bRhAKaebSY6VroIB2dYRSYXk7ffDX5Bz4UAf7T2v9;
  var secret = ygsMHgAYo2iFdM6UXvN5YGgoq42CZwYFmSEJmug9QjNAu;
  // The signed-in user info.
  var user = 61519961;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
    return (
      //Our navigator
      <Navigator
        style={{backgroundColor: 'gray'}}
        initialRoute={{ title: 'Twitter Feed'}}
        renderScene={(route, navigator) =>{
          // Check to see if the navigator is in a sub-screen or on the main one i. e. 'Twitter Feed'
          if(route.title !== 'Twitter Feed'){
            return(
              <View style={styles.container}>
                <Text style={{textAlign:'justify',fontSize: 20, fontWeight : 'bold' }}>{ route.text }</Text>
                <Text style={{textAlign:'justify',fontSize: 20, fontWeight : 'bold'}}>{"\n"}Created: {route.created_at.split('+')[0]}</Text>
              </View>);
          }
          //Else the navigator will loud our sub-screen
          else{
            return(
          <View  style={styles.container}>
            <ListView
              dataSource={this.state.dataSource}


              renderRow = {(rowData) =>
                this._renderRow(rowData, navigator, route)
              } >

            </ListView>
          </View>);}}
        }
        //Custom navigator animation
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        //Configuring the navigator content
        navigationBar={
           <Navigator.NavigationBar style={{alignItems:'center'}}
             routeMapper={{
               LeftButton: (route, navigator, index, navState) =>
               //Disables back button on main screen
                { if(route.title === 'Twitter Feed'){
                  return null;
                }
                //Enables back button
                else{
                  return (
                     <TouchableOpacity onPress={() => navigator.pop()}>
                       <Text style={{color:'white',textAlign :'left', fontSize:20}}>Back</Text>
                    </TouchableOpacity>
                  );
                }
                },
                //We don't need a RightBUtton for this app
               RightButton: (route, navigator, index, navState) =>
                 { return (null); },
                //Our title
               Title: (route, navigator, index, navState) =>
                 { return (<Text style={{color:'white',textAlign :'right', fontSize:35}}>{route.title}</Text>); },
             }}
             style={{backgroundColor: 'gray'}}
           />
        }
        />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    marginTop: 50
  },
  row: {
    flex: 1,
    paddingVertical: 8,
    paddingLeft: 16
  }
});

AppRegistry.registerComponent('FeedScreen', () => FeedScreen);

const exampleJson = [  {    "coordinates": null,    "favorited": false,    "truncated": false,    "created_at": "Wed Aug 29 17:12:58 +0000 2012",    "id_str": "240859602684612608",    "entities": {      "urls": [        {          "expanded_url": "https://dev.twitter.com/blog/twitter-certified-products",          "url": "https://t.co/MjJ8xAnT",          "indices": [            52,            73          ],          "display_url": "dev.twitter.com/blog/twitter-c\u2026"        }      ],      "hashtags": [      ],      "user_mentions": [      ]    },    "in_reply_to_user_id_str": null,    "contributors": null,    "text": "Introducing the Twitter Certified Products Program: https://t.co/MjJ8xAnT",    "retweet_count": 121,    "in_reply_to_status_id_str": null,    "id": 240859602684612608,    "geo": null,    "retweeted": false,    "possibly_sensitive": false,    "in_reply_to_user_id": null,    "place": null,    "user": {      "profile_sidebar_fill_color": "DDEEF6",      "profile_sidebar_border_color": "C0DEED",      "profile_background_tile": false,      "name": "Twitter API",      "profile_image_url": "http://a0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",      "created_at": "Wed May 23 06:01:13 +0000 2007",      "location": "San Francisco, CA",      "follow_request_sent": false,      "profile_link_color": "0084B4",      "is_translator": false,      "id_str": "6253282",      "entities": {        "url": {          "urls": [            {              "expanded_url": null,              "url": "http://dev.twitter.com",              "indices": [                0,                22              ]            }          ]        },        "description": {          "urls": [          ]        }      },      "default_profile": true,      "contributors_enabled": true,      "favourites_count": 24,      "url": "http://dev.twitter.com",      "profile_image_url_https": "https://si0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",      "utc_offset": -28800,      "id": 6253282,      "profile_use_background_image": true,      "listed_count": 10775,      "profile_text_color": "333333",      "lang": "en",      "followers_count": 1212864,      "protected": false,      "notifications": null,      "profile_background_image_url_https": "https://si0.twimg.com/images/themes/theme1/bg.png",      "profile_background_color": "C0DEED",      "verified": true,      "geo_enabled": true,      "time_zone": "Pacific Time (US & Canada)",      "description": "The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Don't get an answer? It's on my website.",      "default_profile_image": false,      "profile_background_image_url": "http://a0.twimg.com/images/themes/theme1/bg.png",      "statuses_count": 3333,      "friends_count": 31,      "following": null,      "show_all_inline_media": false,      "screen_name": "twitterapi"    },    "in_reply_to_screen_name": null,    "in_reply_to_status_id": null  },  {    "coordinates": null,    "favorited": false,    "truncated": false,    "created_at": "Sat Aug 25 17:26:51 +0000 2012",    "id_str": "239413543487819778",    "entities": {      "urls": [        {          "expanded_url": "https://dev.twitter.com/issues/485",          "url": "https://t.co/p5bOzH0k",          "indices": [            97,            118          ],          "display_url": "dev.twitter.com/issues/485"        }      ],      "hashtags": [      ],      "user_mentions": [      ]    },    "in_reply_to_user_id_str": null,    "contributors": null,    "text": "We are working to resolve issues with application management & logging in to the dev portal: https://t.co/p5bOzH0k ^TS",    "retweet_count": 105,    "in_reply_to_status_id_str": null,    "id": 239413543487819778,    "geo": null,    "retweeted": false,    "possibly_sensitive": false,    "in_reply_to_user_id": null,    "place": null,    "user": {      "profile_sidebar_fill_color": "DDEEF6",      "profile_sidebar_border_color": "C0DEED",      "profile_background_tile": false,      "name": "Twitter API",      "profile_image_url": "http://a0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",      "created_at": "Wed May 23 06:01:13 +0000 2007",      "location": "San Francisco, CA",      "follow_request_sent": false,      "profile_link_color": "0084B4",      "is_translator": false,      "id_str": "6253282",      "entities": {        "url": {          "urls": [            {              "expanded_url": null,              "url": "http://dev.twitter.com",              "indices": [                0,                22              ]            }          ]        },        "description": {          "urls": [          ]        }      },      "default_profile": true,      "contributors_enabled": true,      "favourites_count": 24,      "url": "http://dev.twitter.com",      "profile_image_url_https": "https://si0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",      "utc_offset": -28800,      "id": 6253282,      "profile_use_background_image": true,      "listed_count": 10775,      "profile_text_color": "333333",      "lang": "en",      "followers_count": 1212864,      "protected": false,      "notifications": null,      "profile_background_image_url_https": "https://si0.twimg.com/images/themes/theme1/bg.png",      "profile_background_color": "C0DEED",      "verified": true,      "geo_enabled": true,      "time_zone": "Pacific Time (US & Canada)",      "description": "The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Don't get an answer? It's on my website.",      "default_profile_image": false,      "profile_background_image_url": "http://a0.twimg.com/images/themes/theme1/bg.png",      "statuses_count": 3333,      "friends_count": 31,      "following": null,      "show_all_inline_media": false,      "screen_name": "twitterapi"    },    "in_reply_to_screen_name": null,    "in_reply_to_status_id": null  }, {    "coordinates": null,    "favorited": false,    "truncated": false,    "created_at": "Wed Aug 29 17:12:58 +0000 2012",    "id_str": "240859602684612608",    "entities": {      "urls": [        {          "expanded_url": "https://dev.twitter.com/blog/twitter-certified-products",          "url": "https://t.co/MjJ8xAnT",          "indices": [            52,            73          ],          "display_url": "dev.twitter.com/blog/twitter-c\u2026"        }      ],      "hashtags": [      ],      "user_mentions": [      ]    },    "in_reply_to_user_id_str": null,    "contributors": null,    "text": "This is what a tweet retrieved from a JSON GET response would look like in my app ",    "retweet_count": 121,    "in_reply_to_status_id_str": null,    "id": 240859602684612608,    "geo": null,    "retweeted": false,    "possibly_sensitive": false,    "in_reply_to_user_id": null,    "place": null,    "user": {      "profile_sidebar_fill_color": "DDEEF6",      "profile_sidebar_border_color": "C0DEED",      "profile_background_tile": false,      "name": "Twitter API",      "profile_image_url": "http://a0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",      "created_at": "Wed May 23 06:01:13 +0000 2007",      "location": "San Francisco, CA",      "follow_request_sent": false,      "profile_link_color": "0084B4",      "is_translator": false,      "id_str": "6253282",      "entities": {        "url": {          "urls": [            {              "expanded_url": null,              "url": "http://dev.twitter.com",              "indices": [                0,                22              ]            }          ]        },        "description": {          "urls": [          ]        }      },      "default_profile": true,      "contributors_enabled": true,      "favourites_count": 24,      "url": "http://dev.twitter.com",      "profile_image_url_https": "https://si0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",      "utc_offset": -28800,      "id": 6253282,      "profile_use_background_image": true,      "listed_count": 10775,      "profile_text_color": "333333",      "lang": "en",      "followers_count": 1212864,      "protected": false,      "notifications": null,      "profile_background_image_url_https": "https://si0.twimg.com/images/themes/theme1/bg.png",      "profile_background_color": "C0DEED",      "verified": true,      "geo_enabled": true,      "time_zone": "Pacific Time (US & Canada)",      "description": "The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Don't get an answer? It's on my website.",      "default_profile_image": false,      "profile_background_image_url": "http://a0.twimg.com/images/themes/theme1/bg.png",      "statuses_count": 3333,      "friends_count": 31,      "following": null,      "show_all_inline_media": false,      "screen_name": "twitterapi"    },    "in_reply_to_screen_name": null,    "in_reply_to_status_id": null  },  {    "coordinates": null,    "favorited": false,    "truncated": false,    "created_at": "Wed Aug 29 17:12:58 +0000 2012",    "id_str": "240859602684612608",    "entities": {      "urls": [        {          "expanded_url": "https://dev.twitter.com/blog/twitter-certified-products",          "url": "https://t.co/MjJ8xAnT",          "indices": [            52,            73          ],          "display_url": "dev.twitter.com/blog/twitter-c\u2026"        }      ],      "hashtags": [      ],      "user_mentions": [      ]    },    "in_reply_to_user_id_str": null,    "contributors": null,    "text": "Introducing the Twitter Certified Products Program: https://t.co/MjJ8xAnT",    "retweet_count": 121,    "in_reply_to_status_id_str": null,    "id": 240859602684612608,    "geo": null,    "retweeted": false,    "possibly_sensitive": false,    "in_reply_to_user_id": null,    "place": null,    "user": {      "profile_sidebar_fill_color": "DDEEF6",      "profile_sidebar_border_color": "C0DEED",      "profile_background_tile": false,      "name": "Twitter API",      "profile_image_url": "http://a0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",      "created_at": "Wed May 23 06:01:13 +0000 2007",      "location": "San Francisco, CA",      "follow_request_sent": false,      "profile_link_color": "0084B4",      "is_translator": false,      "id_str": "6253282",      "entities": {        "url": {          "urls": [            {              "expanded_url": null,              "url": "http://dev.twitter.com",              "indices": [                0,                22              ]            }          ]        },        "description": {          "urls": [          ]        }      },      "default_profile": true,      "contributors_enabled": true,      "favourites_count": 24,      "url": "http://dev.twitter.com",      "profile_image_url_https": "https://si0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",      "utc_offset": -28800,      "id": 6253282,      "profile_use_background_image": true,      "listed_count": 10775,      "profile_text_color": "333333",      "lang": "en",      "followers_count": 1212864,      "protected": false,      "notifications": null,      "profile_background_image_url_https": "https://si0.twimg.com/images/themes/theme1/bg.png",      "profile_background_color": "C0DEED",      "verified": true,      "geo_enabled": true,      "time_zone": "Pacific Time (US & Canada)",      "description": "The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Don't get an answer? It's on my website.",      "default_profile_image": false,      "profile_background_image_url": "http://a0.twimg.com/images/themes/theme1/bg.png",      "statuses_count": 3333,      "friends_count": 31,      "following": null,      "show_all_inline_media": false,      "screen_name": "twitterapi"    },    "in_reply_to_screen_name": null,    "in_reply_to_status_id": null  },  {    "coordinates": null,    "favorited": false,    "truncated": false,    "created_at": "Wed Aug 29 17:12:58 +0000 2012",    "id_str": "240859602684612608",    "entities": {      "urls": [        {          "expanded_url": "https://dev.twitter.com/blog/twitter-certified-products",          "url": "https://t.co/MjJ8xAnT",          "indices": [            52,            73          ],          "display_url": "dev.twitter.com/blog/twitter-c\u2026"        }      ],      "hashtags": [      ],      "user_mentions": [      ]    },    "in_reply_to_user_id_str": null,    "contributors": null,    "text": "Introducing the Twitter Certified Products Program: https://t.co/MjJ8xAnT",    "retweet_count": 121,    "in_reply_to_status_id_str": null,    "id": 240859602684612608,    "geo": null,    "retweeted": false,    "possibly_sensitive": false,    "in_reply_to_user_id": null,    "place": null,    "user": {      "profile_sidebar_fill_color": "DDEEF6",      "profile_sidebar_border_color": "C0DEED",      "profile_background_tile": false,      "name": "Twitter API",      "profile_image_url": "http://a0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",      "created_at": "Wed May 23 06:01:13 +0000 2007",      "location": "San Francisco, CA",      "follow_request_sent": false,      "profile_link_color": "0084B4",      "is_translator": false,      "id_str": "6253282",      "entities": {        "url": {          "urls": [            {              "expanded_url": null,              "url": "http://dev.twitter.com",              "indices": [                0,                22              ]            }          ]        },        "description": {          "urls": [          ]        }      },      "default_profile": true,      "contributors_enabled": true,      "favourites_count": 24,      "url": "http://dev.twitter.com",      "profile_image_url_https": "https://si0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",      "utc_offset": -28800,      "id": 6253282,      "profile_use_background_image": true,      "listed_count": 10775,      "profile_text_color": "333333",      "lang": "en",      "followers_count": 1212864,      "protected": false,      "notifications": null,      "profile_background_image_url_https": "https://si0.twimg.com/images/themes/theme1/bg.png",      "profile_background_color": "C0DEED",      "verified": true,      "geo_enabled": true,      "time_zone": "Pacific Time (US & Canada)",      "description": "The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Don't get an answer? It's on my website.",      "default_profile_image": false,      "profile_background_image_url": "http://a0.twimg.com/images/themes/theme1/bg.png",      "statuses_count": 3333,      "friends_count": 31,      "following": null,      "show_all_inline_media": false,      "screen_name": "twitterapi"    },    "in_reply_to_screen_name": null,    "in_reply_to_status_id": null  },  {    "coordinates": null,    "favorited": false,    "truncated": false,    "created_at": "Wed Aug 29 17:12:58 +0000 2012",    "id_str": "240859602684612608",    "entities": {      "urls": [        {          "expanded_url": "https://dev.twitter.com/blog/twitter-certified-products",          "url": "https://t.co/MjJ8xAnT",          "indices": [            52,            73          ],          "display_url": "dev.twitter.com/blog/twitter-c\u2026"        }      ],      "hashtags": [      ],      "user_mentions": [      ]    },    "in_reply_to_user_id_str": null,    "contributors": null,    "text": "Introducing the Twitter Certified Products Program: https://t.co/MjJ8xAnT",    "retweet_count": 121,    "in_reply_to_status_id_str": null,    "id": 240859602684612608,    "geo": null,    "retweeted": false,    "possibly_sensitive": false,    "in_reply_to_user_id": null,    "place": null,    "user": {      "profile_sidebar_fill_color": "DDEEF6",      "profile_sidebar_border_color": "C0DEED",      "profile_background_tile": false,      "name": "Twitter API",      "profile_image_url": "http://a0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",      "created_at": "Wed May 23 06:01:13 +0000 2007",      "location": "San Francisco, CA",      "follow_request_sent": false,      "profile_link_color": "0084B4",      "is_translator": false,      "id_str": "6253282",      "entities": {        "url": {          "urls": [            {              "expanded_url": null,              "url": "http://dev.twitter.com",              "indices": [                0,                22              ]            }          ]        },        "description": {          "urls": [          ]        }      },      "default_profile": true,      "contributors_enabled": true,      "favourites_count": 24,      "url": "http://dev.twitter.com",      "profile_image_url_https": "https://si0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",      "utc_offset": -28800,      "id": 6253282,      "profile_use_background_image": true,      "listed_count": 10775,      "profile_text_color": "333333",      "lang": "en",      "followers_count": 1212864,      "protected": false,      "notifications": null,      "profile_background_image_url_https": "https://si0.twimg.com/images/themes/theme1/bg.png",      "profile_background_color": "C0DEED",      "verified": true,      "geo_enabled": true,      "time_zone": "Pacific Time (US & Canada)",      "description": "The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Don't get an answer? It's on my website.",      "default_profile_image": false,      "profile_background_image_url": "http://a0.twimg.com/images/themes/theme1/bg.png",      "statuses_count": 3333,      "friends_count": 31,      "following": null,      "show_all_inline_media": false,      "screen_name": "twitterapi"    },    "in_reply_to_screen_name": null,    "in_reply_to_status_id": null  }, ]

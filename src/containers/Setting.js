import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
  
} from 'react-native';

import { Constants } from 'expo';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions } from 'react-native-router-flux';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
var userId="";
export default class Setting extends Component<{}> {
  
    constructor(props) {
      super(props);
        this.state = {
          list:'',
          name:'',
          mobileNumber:'',
          birthday:'',
          email:'',
          loading:false
          
        }
         AsyncStorage.getItem('settingScreen',
      (err,value) => {
        if(value != "")
        {
          this.setState({'list':JSON.parse(value)});
          // console.log("-------------");
          // console.log(this.state.list);
          // console.log(this.state.list.screenName);
          // console.log(this.state.list.items);
        }
        
      }); 

       AsyncStorage.getItem('name',
      (err,value) => {
        if(value != "")
        {
          // console.log("name "+value);
          this.setState({'name':value})
        }
        
      });

       AsyncStorage.getItem('birthDay',
      (err,value) => {
        if(value != "")
        {
          // console.log("birthday "+value);
          this.setState({'birthday':value})
        }
        
      });
       AsyncStorage.getItem('mobileNumber',
      (err,value) => {
        if(value != "")
        {
          // console.log("mobileNumber "+value);
          this.setState({'mobileNumber':value})
        }
        
      });
       AsyncStorage.getItem('email',
      (err,value) => {
        if(value != "")
        {
          // console.log("email "+value);
          this.setState({'email':value})
        }
        
      });
        
    }

    async componentWillMount() {
      
      
     await AsyncStorage.getItem('settingScreen',
      (err,value) => {
        if(value != "")
        {
          this.setState({'list':JSON.parse(value)});
          // console.log("-------------");
          // console.log(this.state.list);
          // console.log(this.state.list.screenName);
          // console.log(this.state.list.items);
        }
        
      }); 

      await AsyncStorage.getItem('name',
      (err,value) => {
        if(value != "")
        {
          // console.log("name "+value);
          this.setState({'name':value})
        }
        
      });

      await AsyncStorage.getItem('birthDay',
      (err,value) => {
        if(value != "")
        {
          // console.log("birthday "+value);
          this.setState({'birthday':value})
        }
        
      });
      await AsyncStorage.getItem('mobileNumber',
      (err,value) => {
        if(value != "")
        {
          // console.log("mobileNumber "+value);
          this.setState({'mobileNumber':value})
        }
        
      });
      await AsyncStorage.getItem('email',
      (err,value) => {
        if(value != "")
        {
          // console.log("email "+value);
          this.setState({'email':value})
        }
        
      });

    } 

    goBack() {
      Actions.pop();
    }
    

    refreshStateData = (name,birthday,mobileNumber) => {

        console.log(name+" "+birthday+" "+mobileNumber)
        this.setState({'name':name})
        this.setState({'birthday':birthday})
        this.setState({'mobileNumber':mobileNumber})


   }
    openWebView = (item,index) =>
    {
      let pageLink=item.redirectUrl;
      let pageName=item.itemName;
      console.log('sdfasd......'+pageName+'.........................................')
      if(item.itemName != "Email")
      {
        if(pageLink != "" && pageLink != null){
            
           if(pageName != "Location"){
             Actions.WebViewScreen({'pageName':pageName,'pageLink':pageLink});
           }else{
             Actions.LocationSearch();
           }
        }
        else
        {

          var refreshStateDataClick = this.refreshStateData.bind(this);
          Actions.UpdateProfile({'item':item,'itemIndex':index,'refreshStateDataClick':refreshStateDataClick}); 
        }
      }  
      
    }

    renderItem(data) {
      let { item, index } = data;

      let str="";
      let itemValue="";

      if(item.redirectUrl == "" )
      {
        if(item.itemName == "Name")
        {
          itemValue=this.state.name;
        }
        else if(item.itemName == "Mobile Number")
        {
          itemValue=this.state.mobileNumber;
        }
        else if(item.itemName == "Birthday")
        {
          itemValue=this.state.birthday;
        }
        else if(item.itemName == "Email")
        {
          itemValue=this.state.email;
        }
      }
      else
      {
        itemValue=item.itemValue;
      }
      

      if(item.redirectUrl != "" || item.itemName != "Email")
      {
        str=">";
      }  
      
        return (
            <View>
                <View style={styles.flatview}>
                  <TouchableOpacity activeOpacity={1} onPress = {() => this.openWebView(item,index)}>
                    <View style={styles.innerView}>
                      <View style={{width:'40%'}}>
                        <Text style={styles.itemLabel}>{item.itemName}</Text>
                      </View>
                      <View style={{width:'60%'}}>
                        <Text style={styles.itemValue}>{itemValue}{" "}
                        {(item.itemName != "Email" &&
                        <Icon name="angle-right" size={20} color="#CED0CE" />
                      )}
                        </Text>
                        
                      </View>
                    </View>  
                  </TouchableOpacity> 
                </View> 
                  
                  
                  
                {((Number(this.state.list.items.length)-1) == index && 
                  <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                  }}
                />
                )}

                {((Number(this.state.list.items.length)-1) == index && 

                  <View style={styles.flatviewButton}>

                    <TouchableOpacity style={{backgroundColor:this.state.list.signoutColor,width:130,
                        borderRadius: 5,
                        margin: 10,
                        padding:5,
                        height:40}} onPress = {() => this.onLogoutClick()}>
                        
                        <Text style={{fontSize:20,
                        fontFamily: 'sansserifBold',
                        fontWeight:'bold',
                        color:'#ffffff',
                        textAlign:'center',
                        height:40}}>{this.state.list.signouttext}</Text>

                    </TouchableOpacity>
                  </View>
                )}
            </View>
        ) 
    }
    renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#CED0CE",
            
          }}
        />
      );
    }; 
    
    onLogoutClick = async () => {
    
       Alert.alert(
        'Verity One',
        'Are you sure you want to Sign Out?',
        [
          {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => {

              // firebase.auth.signOut()
              this.setState({loading:true});
              AsyncStorage.clear();
              this.setState({loading:false});
              setTimeout(function(){ 
                
                  Actions.login(); 

                  
              },1000);


          }},
        ],
        { cancelable: true })
      

    }
  render(){

    return(
      
      <View style={styles.mainContainer}>
      
            <View style={{ flexDirection:'row',alignSelf:'flex-start',paddingTop:25,paddingLeft:10 }}>

                    
                      <TouchableOpacity onPress={this.goBack}><Image 
                          source={{uri:'https://t.certified.bz/components/com_applicationsetting/assets/images/backimage/1516711035_backimage.png'}} 
                          style={styles.ImageIconStyle} 
                          /></TouchableOpacity>
                      <View style={{ width:width-90,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{ flexDirection:'row',alignSelf:'center',fontSize:20,fontFamily: 'sansserifBold',fontWeight:'bold',color:'#4ac0f7'}}>{this.state.list.screenName}</Text>
                      </View>
            </View> 
            
            <View style={[styles.row,styles.flatcontainer]}>
               <FlatList
                data={this.state.list.items}
                extraData={this.state}
                showsVerticalScrollIndicator={false}
                renderItem={this.renderItem.bind(this)}
                scrollEnabled={false}
                keyExtractor={item => item.itemId}
                onEndThreshold={0}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="always"
                refreshing={false}
                ItemSeparatorComponent={this.renderSeparator}
              />  
            </View>
            
            
            
            
            
      </View> 
    
      )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    width:width,
    // paddingHorizontal:10
  },
  flatcontainer:{
    
    flex:10,
    // borderColor: '#CED0CE',
    // borderBottomWidth: 1,

  },
  flatview: {
    
    // paddingTop: 30,
    borderRadius: 2,
    flexGrow:3,
    backgroundColor:'#ffffff',
    margin: 5,
    padding: 10,
    borderRadius: 2,
    borderColor: '#9f9f9f',
    borderBottomWidth: 0,

    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    
    

  },
  flatviewButton: {
    
    // paddingTop: 30,
    borderRadius: 2,
    flexGrow:3,
    backgroundColor:'#ffffff',
    margin: 5,
    padding: 10,
    paddingRight:10,
    borderRadius: 2,
    borderColor: '#9f9f9f',
    borderBottomWidth: 0,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
    

  },
  itemLabel: {
    color:'#000',
    fontSize:16,
    fontFamily: 'sansserif',
    textAlign: 'left'
  },

  itemValue: {
    color:'#4ac0f7',
    fontSize:16,
    fontFamily: 'sansserif',
    textAlign: 'right',
    alignSelf:'flex-end'
  },
  
  itemAlign:
  {
    alignItems:'flex-end'
  },
  innerView:
  {
    width:'100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    
    
  },
  
  
  container : {
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#ffffff',
      },
  ImageIconStyle: {
    //  padding: 10,
    //  margin: 5,
     marginTop: 5,
     paddingTop: 10,
     height: 40,
     width: 40,
     borderRadius:5,
     resizeMode : 'stretch',
   
  },
  mainContainer : {
    backgroundColor:'#ffffff',
    height:height,
    alignItems:'center',
    justifyContent :'center',
     // paddingTop: Constants.statusBarHeight,
  },
  labelText : {
    marginVertical: 15,
    fontSize:20,
    fontFamily: 'sansserifBold',
    fontWeight:'bold',
    color:'#4ac0f7'
  },
});

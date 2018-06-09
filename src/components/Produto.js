import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import firebase from 'firebase';

const maca = require('../imgs/maca.png');
const mais = require('../imgs/btn_mais.jpg');
const menos = require('../imgs/btn_menos.jpg');

const {altura, largura} = Dimensions.get('window');

export default class Produto extends Component<Props> {

  constructor(props){
    super(props);
    this.state = { quantidade : this.props.val.quantidade ,keyProd:this.props.val.keyProd}
  }

  mais(){
    this.setState({
      quantidade: this.state.quantidade+1
    })
    var proQntUp = firebase.database().ref("produtos")
    proQntUp.child(this.props.val.keyProd).child("quantidade").set(this.state.quantidade);
    return(<EstoquePSI navigator = {navigator}/>);
  }

  menos(){
    if ((this.state.quantidade-1)<0){
      this.setState({
      quantidade: 0
    })
    }
    else{
      this.setState({
        quantidade: this.state.quantidade-1
      })
    }
    var proQntUp = firebase.database().ref("produtos")
    proQntUp.child(this.props.val.keyProd).child("quantidade").set(this.state.quantidade);
  }

  render() {
    return (
      <View style = {styles.objCompleto} key={this.props.keyval}>
        <View>
          <Image
            source = {maca}
          />
        </View>
        <View style = {styles.objProduto}>
          <Text>{this.props.val.nome}</Text>
          <Text>{this.props.val.data}</Text>
        </View>
        <View style = {styles.objQntView}>
          <View>
            <Text style = {styles.styleQuantidade}>{this.props.val.quantidade}</Text>
          </View>
          <View style = {styles.styleBtn}>
            <TouchableOpacity onPress={() => this.mais()}>
            <Image
              source={mais}
            />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.styleBtnInt} onPress={()=>this.menos()}>
              <Image
                source={menos}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  objProduto:{
    paddingTop: 13,
    alignItems: 'center'
  },
  objQntView:{
    paddingTop: 13,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 13
  },
  objCompleto:{
    width: largura,
    marginVertical:20,
    marginHorizontal:10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  styleQuantidade:{
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 8
  },
  styleBtn:{
    flexDirection: 'row',
    paddingRight: 20,
  },
  styleBtnInt:{
    paddingLeft: 10
  }
});
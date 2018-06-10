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

export default class ProdutoHistorico extends Component<Props> {

  constructor(props){
    super(props);
    this.state = { keyProd:this.props.val.keyProd}
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
          <Text>Última alteração: </Text>
          <Text>{this.props.val.dataAlteracao}</Text>
        </View>
        <View style = {styles.objQntView}>
          <View>
            <Text style = {styles.styleQuantidade}>Inserido: {this.props.val.quantidadeInserido}</Text>
          </View>
          <View>
            <Text style = {styles.styleQuantidade}>Removido: {this.props.val.quantidadeRemovido}</Text>
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
    flexDirection: 'column',
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
  }
});
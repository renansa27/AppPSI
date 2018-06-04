import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';

const {altura, largura} = Dimensions.get('window');

import BarraNavegacaoPSI from './BarraNavegacaoPSI';
import Produto from './Produto';

//importando imagens do projeto
const maca = require('../imgs/maca.png');

export default class ListaComprasPSI extends Component<Props> {
  render() {
    return (
      <View>
        <StatusBar
          //hidden (Esconde a status bar do app)
          backgroundColor = '#CCC'
        />
        <BarraNavegacaoPSI voltar navigator={this.props.navigator} />

      </View>
     );
  }
}

const style = StyleSheet.create ({
	
});
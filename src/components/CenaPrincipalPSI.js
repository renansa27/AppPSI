import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  ScrollView
} from 'react-native';

const {altura, largura} = Dimensions.get('window');

import BarraNavegacaoPSI from './BarraNavegacaoPSI';

//importando imagens do projeto
const logo = require('../imgs/inventario.jpg');
const BalancoPSI = require('../imgs/balanco.png');
const EstoquePSI = require('../imgs/estoque.png');
const HistoricoPSI = require('../imgs/historico.png');
const ListaComprasPSI = require('../imgs/compra.png');

export default class CenaPrincipalPSI extends Component<Props> {
  render() {
    return (
      <View>
        <StatusBar
          //hidden (Esconde a status bar do app)
          backgroundColor = '#CCC'
        />
        <BarraNavegacaoPSI/>
        <ScrollView contentContainerStyle = {styles.menuBox}>
          <View style = {styles.imagem}>
            <Image
              source = {logo}
            />
            <Text>Controle de Estoque Residencial</Text>
          </View>
          <View style = {styles.imagens}>
            <View style = {styles.imgIn}>
              <TouchableHighlight 
                onPress={() => {
                  this.props.navigator.push({id:'b'});
                }}
              >
                <Image
                  source = {BalancoPSI}
                />
              </TouchableHighlight>
              <Text style={styles.textoLegenda}>Balanço</Text>
            </View>
            <View style = {styles.imgIn}>
              <TouchableHighlight 
                onPress={() => {
                  this.props.navigator.push({id:'c'});
                }}
              >
                <Image
                  source = {EstoquePSI}
                />
              </TouchableHighlight>
              <Text style={styles.textoLegenda}>Estoque</Text>
            </View>
          </View>
          <View style = {styles.imagens}>
            <View style = {styles.imgIn}>
              <TouchableHighlight 
                onPress={() => {
                  this.props.navigator.push({id:'d'});
                }}
              >
                <Image
                  source = {HistoricoPSI}
                />
              </TouchableHighlight>
              <Text style={styles.textoLegenda}>Historico</Text>
            </View>
            <View style = {styles.imgIn}>
              <TouchableHighlight 
                onPress={() => {
                  this.props.navigator.push({id:'e'});
                }}
              >
                <Image
                  source = {ListaComprasPSI}
                />
              </TouchableHighlight>
              <Text style={styles.textoLegenda}>Compras</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuBox:{
    paddingVertical:45,
    //width: largura,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagem:{
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagens:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  imgIn:{
    padding: 20
  },
  textoLegenda:{
    fontSize:15,
    marginLeft:30
  }
});

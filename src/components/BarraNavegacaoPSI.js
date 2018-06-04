import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

const btnVoltar = require('../imgs/btn_voltar.png');

export default class BarraNavegacaoPSI extends Component<Props> {
  render() {

  	if(this.props.voltar){
  		return (
      		<View style = {styles.barraTitulo}>
      			<TouchableHighlight 
      				onPress = {() => {
      					this.props.navigator.pop();
      				}}
      			>
      				<Image source = {btnVoltar} />
      			</TouchableHighlight>
      			<Text style = {styles.titulo}>Estoque residencial</Text>
      		</View>
    	);
  	}

    return (
      <View style = {styles.barraTitulo}>
      	<Text style = {styles.titulo}>Estoque residencial</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  barraTitulo:{
  	flexDirection: 'row',
  	backgroundColor: '#CCC',
  	padding: 10,
  	height: 60
  },
  titulo:{
  	flex: 1,
  	fontSize: 18,
  	textAlign: 'center',
  	color: 'black'
  }
});
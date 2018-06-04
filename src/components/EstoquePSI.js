import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

const {altura, largura} = Dimensions.get('window');

import BarraNavegacaoPSI from './BarraNavegacaoPSI';
import Produto from './Produto';

//importando imagens do projeto
const maca = require('../imgs/maca.png');
var quantidadeUsuario = 100;
export default class EstoquePSI extends Component<Props> {

	state = {
    	produtoArray : [{'imagem':{maca},'data':'testeData','nome': 'testProduto1','quantidade':100}],
    	produtoImagem: '',
    	produtoNome: '',
    	produtoData: '',
    	produtoQuantidade: ''
  	}

  	render() {

  		let produtos = this.state.produtoArray.map((val,key)=>{
  			return <Produto key={key} keyval= {key} val={val} />
  		});

    	return (
      	<View>
        	<StatusBar
          	//hidden (Esconde a status bar do app)
          	backgroundColor = '#CCC'
        	/>
        	<BarraNavegacaoPSI voltar navigator={this.props.navigator} />
        	<ScrollView contentContainerStyle = {style.contentContainer}>
        		{produtos}
        	</ScrollView>
      	</View>
     	);
  	}
}

const style = StyleSheet.create ({
	contentContainer: {
		paddingVertical: 20
	}
});
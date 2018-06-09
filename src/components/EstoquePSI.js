import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Button
} from 'react-native';
import firebase from 'firebase';
import BarraNavegacaoPSI from './BarraNavegacaoPSI';
import Produto from './Produto';
import FormProduto from './FormProduto';

//importando imagens do projeto
const {altura, largura} = Dimensions.get('window');
const maca = require('../imgs/maca.png');

export default class EstoquePSI extends Component<Props> {
  
  listarDados(){
    var produto = firebase.database().ref("produtos");
    produto.on('value', (snapshot)=>{
        var produtosData = snapshot.val();
        var keys = Object.keys(produtosData);
        for(var i=0;i<keys.length;i++){
          var ke = keys[i];
          var nome = produtosData[ke].nome;
          var quantidade = produtosData[ke].quantidade;
          var data = produtosData[ke].dataInserido;
          var dataVenci = produtosData[ke].dataVencimento;
          produto = {nome,quantidade,data,dataVenci};
          this.state.produtoArray.push({
            'keyProd':ke,
            'imagem':{maca},
            'nome':nome,
            'data':dataVenci,
            'quantidade':parseInt(quantidade)
          });
          this.setState({produtoArray: this.state.produtoArray});
        }
    });
  }

	state = {
    	produtoArray : [],
      keyProd:'',
    	imagem: '',
    	nome: '',
    	data: '',
    	quantidade: ''
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
          <Button
            onPress={() => this.props.navigator.push({id:'f'})}
            title = 'Adicionar novo produto'
          />
          <Button
            onPress={this.listarDados.bind(this)}
            title = 'Listar produtos'
          />
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
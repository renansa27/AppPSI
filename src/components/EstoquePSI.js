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
  constructor(props) {
    super(props);
    this.state = {
      produtoArray : [],
      keyProd:'',
      imagem: '',
      nome: '',
      date: '',
      quantidade: '',
    };
  }

  mais(key){
    this.setState({produtoArray: this.state.produtoArray});
    produto={
      'keyProd':this.state.produtoArray[key].keyProd,
      'imagem':{maca},
      'nome':this.state.produtoArray[key].nome,
      'date':this.state.produtoArray[key].date,
      'quantidade':this.state.produtoArray[key].quantidade+1
    };
    this.state.produtoArray.splice(key,1,produto);
    var proQntUp = firebase.database().ref("produtos");
    proQntUp.child(this.state.produtoArray[key].keyProd).child("quantidade").set(this.state.produtoArray[key].quantidade);
  }

  menos(key){
    if (this.state.produtoArray[key].quantidade>0){
      this.setState({produtoArray: this.state.produtoArray});
      produto={
        'keyProd':this.state.produtoArray[key].keyProd,
        'imagem':{maca},
        'nome':this.state.produtoArray[key].nome,
        'date':this.state.produtoArray[key].date,
        'quantidade':this.state.produtoArray[key].quantidade-1
      };
      this.state.produtoArray.splice(key,1,produto);
      var proQntUp = firebase.database().ref("produtos");
      proQntUp.child(this.state.produtoArray[key].keyProd).child("quantidade").set(this.state.produtoArray[key].quantidade);
    }
    else{
      alert("Produto não tem mais no estoque!");
    }
  }

  	render() {
      if(this.state.produtoArray[0] == null)
        {
          var produto = firebase.database().ref("produtos");
          produto.once('value', (snapshot)=>{
              var produtosData = snapshot.val();
              var keys = Object.keys(produtosData);
              for(var i=0;i<keys.length;i++){
                var ke = keys[i];
                var nome = produtosData[ke].nome;
                var quantidade = produtosData[ke].quantidade;
                var date = produtosData[ke].dataInserido;
                var dateVenci = produtosData[ke].dataVencimento;
                produto = {nome,quantidade,date,dateVenci};
                this.state.produtoArray.push({
                  'keyProd':ke,
                  'imagem':{maca},
                  'nome':nome,
                  'date':dateVenci,
                  'quantidade':parseInt(quantidade)
                });
                this.setState({produtoArray: this.state.produtoArray});
              }
          });
        }
      let produtos = [];
        produtos = this.state.produtoArray.map((val,key)=>{
          return (<Produto key={key} keyval= {key} val={val} moreQuantidade={ ()=>this.mais(key)} lessQuantidade={ ()=>this.menos(key)}/>);
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
          
        	<ScrollView  contentContainerStyle = {style.contentContainer}>
        		{produtos}
        	</ScrollView>
      	</View>
     	);
  	}
  }
const style = StyleSheet.create ({
	contentContainer: {
		paddingVertical: 20,
    marginBottom:40
	}
});
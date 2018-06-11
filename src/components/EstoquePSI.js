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
      dataAlteracao: '',
      quantidade: '',
      quantidadeInserido:'',
      quantidadeRemovido:'', 
    };
  }

  mais(key){
    var d = new Date();
    var mes = d.getMonth()+1;
    var data = d.getDate()+"/"+ mes + "/" +d.getFullYear();
    this.setState({produtoArray: this.state.produtoArray});
    if(this.state.produtoArray[key].quantidade==0){
      produto={
        'keyProd':this.state.produtoArray[key].keyProd,
        'imagem':{maca},
        'nome':this.state.produtoArray[key].nome,
        'date':this.state.produtoArray[key].date,
        'quantidade':1,
        'quantidadeRemovido':this.state.produtoArray[key].quantidadeRemovido,
        'dataAlteracao': data,
        'quantidadeInserido':this.state.produtoArray[key].quantidadeInserido+1
      };
      try{
        this.state.produtoArray.splice(key,1,produto);
        var produto = firebase.database().ref("produtos");
        produto.child(this.state.produtoArray[key].keyProd).child("quantidade").set(this.state.produtoArray[key].quantidade);
        produto.child(this.state.produtoArray[key].keyProd).child("quantidadeRemovido").set(this.state.produtoArray[key].quantidadeRemovido);
        produto.child(this.state.produtoArray[key].keyProd).child("quantidadeInserido").set(this.state.produtoArray[key].quantidadeInserido);
        produto.child(this.state.produtoArray[key].keyProd).child("dataAlteracao").set(data);
      }catch(erro){

      }
    } else if(this.state.produtoArray[key].quantidade>0){
      produto={
        'keyProd':this.state.produtoArray[key].keyProd,
        'imagem':{maca},
        'nome':this.state.produtoArray[key].nome,
        'date':this.state.produtoArray[key].date,
        'quantidade':this.state.produtoArray[key].quantidade+1,
        'quantidadeRemovido':this.state.produtoArray[key].quantidadeRemovido,
        'dataAlteracao': data,
        'quantidadeInserido':this.state.produtoArray[key].quantidadeInserido+1
      };
      try{
        this.state.produtoArray.splice(key,1,produto);
        var produto = firebase.database().ref("produtos");
        produto.child(this.state.produtoArray[key].keyProd).child("quantidade").set(this.state.produtoArray[key].quantidade);
        produto.child(this.state.produtoArray[key].keyProd).child("quantidadeRemovido").set(this.state.produtoArray[key].quantidadeRemovido);
        produto.child(this.state.produtoArray[key].keyProd).child("quantidadeInserido").set(this.state.produtoArray[key].quantidadeInserido);
        produto.child(this.state.produtoArray[key].keyProd).child("dataAlteracao").set(data);
      }catch(erro){

      }
    }
  }

  menos(key){
    var d = new Date();
    var mes = d.getMonth()+1;
    var data = d.getDate()+"/"+ mes + "/" +d.getFullYear();
    this.setState({produtoArray: this.state.produtoArray});
    if (this.state.produtoArray[key].quantidade>1){
      produto={
        'keyProd':this.state.produtoArray[key].keyProd,
        'imagem':{maca},
        'nome':this.state.produtoArray[key].nome,
        'date':this.state.produtoArray[key].date,
        'dataAlteracao': data,
        'quantidade':this.state.produtoArray[key].quantidade-1,
        'quantidadeInserido':this.state.produtoArray[key].quantidadeInserido,
        'quantidadeRemovido':this.state.produtoArray[key].quantidadeRemovido+1
      };
      try{
        this.state.produtoArray.splice(key,1,produto);
        var produto = firebase.database().ref("produtos");
        produto.child(this.state.produtoArray[key].keyProd).child("quantidade").set(this.state.produtoArray[key].quantidade);
        produto.child(this.state.produtoArray[key].keyProd).child("quantidadeRemovido").set(this.state.produtoArray[key].quantidadeRemovido);
        produto.child(this.state.produtoArray[key].keyProd).child("quantidadeInserido").set(this.state.produtoArray[key].quantidadeInserido);
        produto.child(this.state.produtoArray[key].keyProd).child("dataAlteracao").set(data);
      }
      catch(erro){

      }
    }else if(this.state.produtoArray[key].quantidade==1){
      produto={
        'keyProd':this.state.produtoArray[key].keyProd,
        'imagem':{maca},
        'nome':this.state.produtoArray[key].nome,
        'date':this.state.produtoArray[key].date,
        'dataAlteracao': data,
        'quantidade':0,
        'quantidadeInserido':this.state.produtoArray[key].quantidadeInserido,
        'quantidadeRemovido':this.state.produtoArray[key].quantidadeRemovido+1
      };
      try{
        this.state.produtoArray.splice(key,1,produto);
        var produto = firebase.database().ref("produtos");
        produto.child(this.state.produtoArray[key].keyProd).child("quantidade").set(this.state.produtoArray[key].quantidade);
        produto.child(this.state.produtoArray[key].keyProd).child("quantidadeRemovido").set(this.state.produtoArray[key].quantidadeRemovido);
        produto.child(this.state.produtoArray[key].keyProd).child("quantidadeInserido").set(this.state.produtoArray[key].quantidadeInserido);
        produto.child(this.state.produtoArray[key].keyProd).child("dataAlteracao").set(data);
      }
      catch(erro){
        alert("Segundo if: "+erro);
      }
    }
    else{
      alert("Produto não tem mais no estoque!");
    }
  }

  	render() {
      if(this.state.produtoArray[0] == null){
          var produto = firebase.database().ref("produtos");
          produto.once('value', (snapshot)=>{
            var produtosData = snapshot.val();
            if(produtosData!=null){
              var keys = Object.keys(produtosData);
              for(var i=0;i<keys.length;i++){
                var ke = keys[i];
                var nome = produtosData[ke].nome;
                var quantidade = produtosData[ke].quantidade;
                var quantidadeInserido = produtosData[ke].quantidadeInserido;
                var quantidadeRemovido = produtosData[ke].quantidadeRemovido;
                var dataAlteracao = produtosData[ke].dataAlteracao;
                var date = produtosData[ke].dataInserido;
                var dateVenci = produtosData[ke].dataVencimento;
                produto = {nome,quantidade,date,dateVenci};
                this.state.produtoArray.push({
                  'keyProd':ke,
                  'imagem':{maca},
                  'nome':nome,
                  'date':dateVenci,
                  'dataAlteracao':'',
                  'quantidade':parseInt(quantidade),
                  'quantidadeInserido':parseInt(quantidadeInserido),
                  'quantidadeRemovido':parseInt(quantidadeRemovido),
                });
                this.setState({produtoArray: this.state.produtoArray});
              }
            }
        });
      }
      let produtos = [];
        produtos = this.state.produtoArray.map((val,key)=>{
          return (<Produto key={key} keyval= {key} val={val} moreQuantidade={ ()=>this.mais(key)} lessQuantidade={ ()=>this.menos(key)}/>);
        });
    	return (
      	<View style={{flex:1, backgroundColor: '#FFF'}}>
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
    paddingBottom: (altura*0,5)
	}
});
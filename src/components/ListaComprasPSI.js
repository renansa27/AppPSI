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
import Produto from './ProdutoCompras';
//import FormProduto from './FormProduto';

//importando imagens do projeto
const {altura, largura} = Dimensions.get('window');
const maca = require('../imgs/maca.png');

export default class ListaComprasPSI extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      produtoArray : [],
      keyProd:'',
      imagem: '',
      nome: '',
      date: '',
      dataAlteracao: '',
      diaAlteracao: '',
      mesAlteracao: '',
      anoAlteracao: '',
      quantidade: '',
      quantidadeInserido:'',
      quantidadeRemovido:'', 
    };
  }

    render() {
        if(this.state.produtoArray[0] == null)
        {
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

                  var controlDate = dateVenci.split("/");
                  var diaValidade = controlDate[0];
                  var mesValidade = controlDate[1];
                  var anoValidade = controlDate[2];

                  var hoje = new Date()
                  var dia = hoje.getDate();
                  var mes = hoje.getMonth()+1;
                  var ano = hoje.getFullYear();

                  if(quantidade <= 5){
                    produto = {nome,quantidade,date,dateVenci};
                    this.state.produtoArray.push({
                      'keyProd':ke,
                      'imagem':{maca},
                      'nome':nome,
                      'date':dateVenci,
                      'dataAlteracao':dataAlteracao,
                      'quantidade':parseInt(quantidade),
                      'quantidadeInserido':parseInt(quantidadeInserido),
                      'quantidadeRemovido':parseInt(quantidadeRemovido),
                    });
                    this.setState({produtoArray: this.state.produtoArray});
                  }
                }
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
    paddingBottom: (altura*0,85)
    //flex:1
  }
});
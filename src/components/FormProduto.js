import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import firebase from 'firebase';
import BarraNavegacaoPSI from './BarraNavegacaoPSI';
import Produto from './Produto';

const maca = require('../imgs/maca.png');
const mais = require('../imgs/btn_mais.jpg');
const menos = require('../imgs/btn_menos.jpg');

export default class FormProduto extends Component<Props> {
  constructor(props){
      super(props);
      this.state = {  textNome: '', 
                      textValidade: '', 
                      textQuantidade:''
                    };
    }
  render() {
    return (
      <View>
        <StatusBar
          //hidden (Esconde a status bar do app)
          backgroundColor = '#CCC'
        />
        <BarraNavegacaoPSI voltar navigator={this.props.navigator} />
        <View>
          <View>
            <Text>Nome do produto</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(textNome) => this.setState({textNome})}
              value={this.state.textNome}
            />
          </View>
          <View>
            <Text>Data de Vencimento</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(textValidade) => this.setState({textValidade})}
              value={this.state.textValidade}
            />
          </View>
          <View>
            <Text>Quantidade inserida</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(textQuantidade) => this.setState({textQuantidade})}
              value={this.state.textQuantidade}
            />
          </View>
          <Button
            onPress={() => this.salvar()}
            title = 'Salvar'
          />
        </View>
      </View>
     );
  }

  salvar(){
    var d = new Date();
    var mes = d.getMonth()+1;
    var data = d.getDate()+"/"+ mes + "/" +d.getFullYear();
    try{
      var produtos = firebase.database().ref("produtos");
      //Adiciona um objeto dentro da raiz produtos
      produtos.push().set(
      {
        nome:this.state.textNome,
        quantidade:this.state.textQuantidade,
        dataInserido:data,
        dataVencimento:this.state.textValidade
      });
    }catch(error){
      alert(error);
    }
    this.props.navigator.push({id:'e'})
  }
}

const style = StyleSheet.create ({
	contentContainer: {
		paddingVertical: 20
	}
});
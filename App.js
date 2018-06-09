import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import firebase from 'firebase';
import CenaPrincipalPSI from './src/components/CenaPrincipalPSI';
import BalancoPSI from './src/components/BalancoPSI';
import EstoquePSI from './src/components/EstoquePSI';
import HistoricoPSI from './src/components/HistoricoPSI';
import ListaComprasPSI from './src/components/ListaComprasPSI';
import FormProduto from './src/components/FormProduto';

export default class AppPSI extends Component<Props> {

  //Conexão com firebase WEB
  componentWillMount(){
    var config = {
    apiKey: "AIzaSyBQ6i1N604rJj8UL1mQe79IBDNvUF97QsY",
    authDomain: "apppsi-86e5d.firebaseapp.com",
    databaseURL: "https://apppsi-86e5d.firebaseio.com",
    projectId: "apppsi-86e5d",
    storageBucket: "apppsi-86e5d.appspot.com",
    messagingSenderId: "83686605123"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Navigator
        //Definindo a cena inicial
        initialRoute = {{ id : 'a'}}
        renderScene = {(route, navigator) => {
          /*Definir a cena com base na rota*/
          if(route.id === 'a'){
            return(<CenaPrincipalPSI navigator = {navigator}/>);
          }
          else if (route.id === 'b'){
            return(<BalancoPSI navigator = {navigator}/>);
          }
          else if (route.id === 'c'){
            return(<EstoquePSI navigator = {navigator}/>);
          }
          else if (route.id === 'd'){
            return(<HistoricoPSI navigator = {navigator}/>);
          }
          else if (route.id === 'e'){
            return(<ListaComprasPSI navigator = {navigator}/>);
          }
          else if (route.id === 'f'){
            return(<FormProduto navigator = {navigator}/>);
          }
        }
      }
      />
    );
  }
}

AppRegistry.registerComponent('AppPSI', () => AppPSI);
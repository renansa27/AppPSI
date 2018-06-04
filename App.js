import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

import CenaPrincipalPSI from './src/components/CenaPrincipalPSI';
import BalancoPSI from './src/components/BalancoPSI';
import EstoquePSI from './src/components/EstoquePSI';
import HistoricoPSI from './src/components/HistoricoPSI';
import ListaComprasPSI from './src/components/ListaComprasPSI';


export default class AppPSI extends Component<Props> {
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
        }}
      />
    );
  }
}

AppRegistry.registerComponent('AppPSI', () => AppPSI);
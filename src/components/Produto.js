import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

const maca = require('../imgs/maca.png');
const mais = require('../imgs/btn_mais.jpg');
const menos = require('../imgs/btn_menos.jpg');

const {altura, largura} = Dimensions.get('window');

class QuantidadeLabel extends Component<Props> {

  render(){
    return(
      <View>
        <Text>{this.props.quantidadeLabel}</Text>
      </View>
    );
  }
}

export default class Produto extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {  quantidadeTexto: this.props.val.quantidade};
  }

  mais(){
    var flag = 0;
    if(flag == 0){
      var quantidade = this.props.val.quantidade + 1;
      flag = flag + 1;
    }
    else {
      quantidade = quantidade + 1;
    }
    this.setState({quantidadeTexto : quantidade}
                  );
  }

  menos(){
    var quantidade = retornaValor();
    this.setState({quantidadeTexto : quantidade - 1}
                  );
  }

  render() {
    return (
      <View style = {styles.objCompleto} key={this.props.keyval}>
        <View>
          <Image
              source = {maca}
            />
        </View>
        <View style = {styles.objProduto}>
          <Text>{this.props.val.nome}</Text>
          <Text>{this.props.val.data}</Text>
        </View>
        <View style = {styles.objQntView}>
          <QuantidadeLabel style = {styles.styleQuantidade} quantidadeLabel = {this.state.quantidadeTexto}></QuantidadeLabel>
          <View style = {styles.styleBtn}>
            <TouchableOpacity onPress={() => this.mais()}>
            <Image
              source={mais}
            />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.styleBtnInt} onPress={()=>this.menos()}>
              <Image
                source={menos}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  objProduto:{
    paddingTop: 13,
    alignItems: 'center'
  },
  objQntView:{
    paddingTop: 13,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 13
  },
  objCompleto:{
    width: largura,
    marginVertical:20,
    marginHorizontal:10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  styleQuantidade:{
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 8
  },
  styleBtn:{
    flexDirection: 'row',
    paddingRight: 20,
  },
  styleBtnInt:{
    paddingLeft: 10
  }
});
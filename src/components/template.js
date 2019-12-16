import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Table, Button, ButtonGroup, ButtonToolbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: '',
      img_height:'',
      img_width:'',
      button_height:'',
      button_width:'',
      num: props.match.params.num,
      num2: props.match.params.num2,
      channel:'',

      responseList: '',
      append_List: '',
    };
  }
  

  apiCall = (callbackFunc) => {
      axios.get('/account_info.json')
      .then( response => {
          this.setState({ responseList: response });
          if(this.state.num == 'CDM_and_Vocabulary'){
            this.setState({ append_List: this.CDMListAppend() });
          }else if(this.state.num == 'Phenotyping_by_ATLAS'){
            this.setState({ append_List: this.PHEListAppend() });
          }else if(this.state.num == 'PLE'){
            this.setState({ append_List: this.PLEListAppend() });
          }else if(this.state.num == 'PLP'){
            this.setState({ append_List: this.PLPListAppend() });
          }else if(this.state.num == 'EXTRA1'){
            this.setState({ append_List: this.EXTRA1ListAppend() });
          }else if(this.state.num == 'EXTRA2'){
            this.setState({ append_List: this.EXTRA2ListAppend() });
          }
          callbackFunc()
      })
      .catch( error => {alert(error);return false;} );
  }

  componentDidMount() {
    $(".phe_link").hide()
    $(".plp_link").hide()
    
    var tthis = this
    this.apiCall(function() {
      var userAgent = window.navigator.userAgent;
      tthis.state.img_width = document.body.offsetWidth
  
      var filter = "win16|win32|win64|mac|macintel"; if ( navigator.platform ) {
        if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
          tthis.state.channel = 'mobile'
          $( ".button1" ).css( "font-size", "100%" );
        } else {
          tthis.state.img_width = tthis.state.img_width - 40
          tthis.state.channel = 'pc'
        }
      }
      var img_width = parseInt(tthis.state.img_width)
      var img_height = img_width * 1000000000000000
      tthis.state.img_height =  img_height / 3242268041237113
      
      // $( ".button1" ).css( "padding", "2% 6%" );
      $( "#ohdsi_img" ).css( "height", tthis.state.img_height );
      $( "#ohdsi_img" ).css( "width", tthis.state.img_width );
      
      tthis.state.button_width = tthis.state.img_width/4 - 4
      tthis.state.button_height = tthis.state.button_width/2
        $( ".button1" ).css( "width", tthis.state.button_width );
        $( ".button1" ).css( "height", tthis.state.button_height );
      
      if(tthis.state.num =='PLP'){
        $(".plp_link").show()
        $( "p1" ).css( "color", "rgb(119, 151, 240)" );  
      }else if(tthis.state.num =='CDM_and_Vocabulary'){
        $( "p1" ).css( "color", "rgb(37, 83, 152)" );  
      }else if(tthis.state.num =='Phenotyping_by_ATLAS'){
        $(".phe_link").show()
        $( "p1" ).css( "color", "rgb(173, 76, 66)" );  
      }else if(tthis.state.num =='PLE'){
        $( "p1" ).css( "color", "rgb(87, 202, 87)" );  
      }else if(tthis.state.num =='CDM_and_Vocabulary'){
        $( "p1" ).css( "color", "rgb(37, 83, 152)" );  
      }else if(tthis.state.num =='EXTRA1'){
        $( "p1" ).css( "color", "rgb(211, 214, 30)" );  
      }else if(tthis.state.num =='EXTRA2'){
        $( "p1" ).css( "color", "rgb(34, 47, 34)" );  
      }
      
    })
  }
      
  CDMListAppend = () => {
      let result = []
      var CDMList = this.state.responseList.data
      for(let i=0; i<CDMList.CDM.length; i++){
          var data = CDMList.CDM[i]
          result.push(
            <Link to={'/template3/'+data.이름+'/ /'+this.state.num+'/'+this.state.num2}><button class="button1">{data.이름}</button></Link>
          )
      }
      return result
  }

  PHEListAppend = () => {
    let result = []
    var CDMList = this.state.responseList.data
    for(let i=0; i<CDMList.PHE.length; i++){
        var data = CDMList.PHE[i]
        result.push(
          <Link to={'/template3/'+data.이름+'/ /'+this.state.num+'/'+this.state.num2}><button class="button1">{data.이름}</button></Link>
        )
    }
    return result
  }

  PLPListAppend = () => {
    let result = []
    var CDMList = this.state.responseList.data
    for(let i=0; i<CDMList.PLP.length; i++){
        var data = CDMList.PLP[i]
        result.push(
          <Link to={'/template3/'+data.이름+'/ /'+this.state.num+'/'+this.state.num2}><button class="button1">{data.이름}</button></Link>
        )
    }
    return result
  }

  PLEListAppend = () => {
    let result = []
    var CDMList = this.state.responseList.data
    for(let i=0; i<CDMList.PLE.length; i++){
        var data = CDMList.PLE[i]
        result.push(
          <Link to={'/template3/'+data.이름+'/ /'+this.state.num+'/'+this.state.num2}><button class="button1">{data.이름}</button></Link>
        )
    }
    return result
  }

  EXTRA1ListAppend = () => {
    let result = []
    var CDMList = this.state.responseList.data
    for(let i=0; i<CDMList.EXTRA1.length; i++){
        var data = CDMList.EXTRA1[i]
        result.push(
          <Link to={'/template3/'+data.이름+'/ /'+this.state.num+'/'+this.state.num2}><button class="button1">{data.이름}</button></Link>
        )
    }
    return result
  }

  EXTRA2ListAppend = () => {
      let result = []
      var CDMList = this.state.responseList.data
      for(let i=0; i<CDMList.EXTRA2.length; i++){
          var data = CDMList.EXTRA2[i]
          result.push(
            <Link to={'/template3/'+data.이름+'/ /'+this.state.num+'/'+this.state.num2}><button class="button1">{data.이름}</button></Link>
          )
      }
      return result
  }
      
      
  render() {
    return (
          
      <body class="modern">
      <img id='ohdsi_img' src={require("../img/ohdsi_korea.png")} alt="" />

      <section class="MOD_HERO">
        <div data-layout="_r">
        </div>
      </section>
      
      <section class="MOD_ACCORDION1">
        <div data-layout="_r">
          <div data-layout="al16">
            <div class="AP_accordion" role="tablist">
              <div class="MOD_ACCORDION1_Intro">
                <h2 data-theme="_bb2">INFORMATION</h2>
                <p1 style={{"font-size":"23px",color:'#57ca57', "font-family":"Arial, Helvetica, sans-serif"}}>튜토리얼 {this.state.num}</p1><br></br>
                <p1 style={{"font-size":"20px",color:'#57ca57', "font-family":"Arial, Helvetica, sans-serif"}}>{this.state.num2}</p1><br className="phe_link plp_link"></br>
                <a className="phe_link" style={{"font-size":"20px",color:'#57ca57', "font-family":"Arial, Helvetica, sans-serif"}} href="http://bitly.kr/skKlYsz" target="_blank">Presentation: http://bitly.kr/skKlYsz</a>
                <a className="plp_link" style={{"font-size":"20px",color:'#57ca57', "font-family":"Arial, Helvetica, sans-serif"}} href="http://bitly.kr/bfsRJjW" target="_blank">prediction problem 실습 : http://bitly.kr/bfsRJjW</a>
                <br className="phe_link plp_link"></br>
                <p>참가자 이름을 선택해주세요.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {this.state.append_List}

      {/* <Link to={'/template2/01/'+this.state.num+'/'+this.state.num2}><button class="button1">01</button></Link>
      <Link to={'/template2/02/'+this.state.num+'/'+this.state.num2}><button class="button1 button2">02</button></Link>
      <Link to={'/template2/03/'+this.state.num+'/'+this.state.num2}><button class="button1 button3">03</button></Link>
      <Link to={'/template2/04/'+this.state.num+'/'+this.state.num2}><button class="button1 button4">04</button></Link>

      <Link to={'/template2/05/'+this.state.num+'/'+this.state.num2}><button class="button1">05</button></Link>
      <Link to={'/template2/06/'+this.state.num+'/'+this.state.num2}><button class="button1 button2">06</button></Link>
      <Link to={'/template2/07/'+this.state.num+'/'+this.state.num2}><button class="button1 button3">07</button></Link>
      <Link to={'/template2/08/'+this.state.num+'/'+this.state.num2}><button class="button1 button4">08</button></Link>

      <Link to={'/template2/09/'+this.state.num+'/'+this.state.num2}><button class="button1">09</button></Link>
      <Link to={'/template2/10/'+this.state.num+'/'+this.state.num2}><button class="button1 button2">10</button></Link>
      <Link to={'/template2/11/'+this.state.num+'/'+this.state.num2}><button class="button1 button3">11</button></Link>
      <Link to={'/template2/12/'+this.state.num+'/'+this.state.num2}><button class="button1 button4">12</button></Link>

      <Link to={'/template2/13/'+this.state.num+'/'+this.state.num2}><button class="button1">13</button></Link>
      <Link to={'/template2/14/'+this.state.num+'/'+this.state.num2}><button class="button1 button2">14</button></Link>
      <Link to={'/template2/15/'+this.state.num+'/'+this.state.num2}><button class="button1 button3">15</button></Link> */}
      {/* <Link to={'/template2/16/'+this.state.num+'/'+this.state.num2}><button class="button1 button4">16</button></Link>

      <Link to={'/template2/17/'+this.state.num+'/'+this.state.num2}><button class="button1">17</button></Link>
      <Link to={'/template2/18/'+this.state.num+'/'+this.state.num2}><button class="button1 button2">18</button></Link>
      <Link to={'/template2/19/'+this.state.num+'/'+this.state.num2}><button class="button1 button3">19</button></Link>
      <Link to={'/template2/20/'+this.state.num+'/'+this.state.num2}><button class="button1 button4">20</button></Link> */}
      {
          (this.state.channel == 'mobile') ?
          <Link to='/'><button class="button button6">튜토리얼 선택으로 돌아가기</button></Link>
          :
          <Link to='/template0/pc/pcpop'><button class="button button6">튜토리얼 선택으로 돌아가기</button></Link>
      }
      <script src="assets/js/index.js"></script>
      </body>
    );
  }
}

export default App;
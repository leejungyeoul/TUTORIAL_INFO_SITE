import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Table, Button, ButtonGroup, ButtonToolbar } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: '',
      num: props.match.params.num,
      tutorial: props.match.params.tutorial,
      tutorial2: props.match.params.tutorial2,
      
      img_height:'',
      img_width:'',
      channel:'',
    };
  }

componentDidMount() {
  var userAgent = window.navigator.userAgent;
  this.state.img_width = document.body.offsetWidth

  var filter = "win16|win32|win64|mac|macintel"; if ( navigator.platform ) {
    if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
      this.state.channel = 'mobile'
    } else {
      this.state.img_width = this.state.img_width - 40
      this.state.channel = 'pc'
    }
 }

  var img_width = parseInt(this.state.img_width)
  var img_height = img_width * 1000000000000000
  this.state.img_height =  img_height / 3242268041237113
    
  // $( ".button1" ).css( "padding", "2% 6%" );
  $( "#ohdsi_img" ).css( "height", this.state.img_height );
  $( "#ohdsi_img" ).css( "width", this.state.img_width );
  if(this.state.tutorial =='PLP'){
    $( "p1" ).css( "color", "#7797f0" );  
  }else if(this.state.tutorial =='VOCA'){
    $( "p1" ).css( "color", "#AD4C42" );  
  }
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
                <p1 style={{"font-size":"23px",color:'#57ca57', "font-family":"Arial, Helvetica, sans-serif"}}>튜토리얼 {this.state.tutorial}</p1><br></br>
                <p1 style={{"font-size":"20px",color:'#57ca57', "font-family":"Arial, Helvetica, sans-serif"}}>{this.state.tutorial2}</p1>
                <p>{this.state.num}팀의 계정 중 사용할 계정번호를 선택해주세요.</p>
                <p style={{"font-size":"13px",color:'red', "font-family":"Arial, Helvetica, sans-serif"}}># 계정 1개당 1개의 세션만 접속가능합니다.</p>
                <p style={{"font-size":"13px",color:'red', "font-family":"Arial, Helvetica, sans-serif"}}># 접속이 되지 않는다면, 다른 계정번호를 사용해주세요.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Link to={'/template3/'+this.state.num+'/01/'+this.state.tutorial+'/'+this.state.tutorial2}><button class="button">1</button></Link>
      <Link to={'/template3/'+this.state.num+'/02/'+this.state.tutorial+'/'+this.state.tutorial2}><button class="button button2">2</button></Link>
      <Link to={'/template3/'+this.state.num+'/03/'+this.state.tutorial+'/'+this.state.tutorial2}><button class="button button3">3</button></Link>
      <Link to={'/template3/'+this.state.num+'/04/'+this.state.tutorial+'/'+this.state.tutorial2}><button class="button button4">4</button></Link>
      <Link to={'/template/'+this.state.tutorial+'/'+this.state.tutorial2}><button class="button button6">팀 선택으로 돌아가기</button></Link>
      &nbsp;
      {
          (this.state.channel == 'mobile') ?
          <Link to='/'><button class="button button6">처음으로 돌아가기</button></Link>
          :
          <Link to='/template0/pc/pcpop'><button class="button button66">처음으로 돌아가기</button></Link>
      }
      <script src="assets/js/index.js"></script>
      </body>

    );
  }
}

export default App;
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
      img_height:'',
      img_width:'',
      pop: props.match.params.pop,
      size: props.match.params.size,
    };
  }

  componentDidMount() {
    
  var userAgent = window.navigator.userAgent;
  this.state.img_width = document.body.offsetWidth
  //뒤로가기로 페이지 집입한경우
  if(this.state.size == 'pcpop'){
    this.state.img_width = this.state.img_width - 10
    // opener.open('about:blank','_self').close();
  }else{
    $( ".button7" ).css( "font-size", "170%");
  }
  var filter = "win16|win32|win64|mac|macintel";
  if ( navigator.platform ) {
     if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
      $( ".button7" ).css( "font-size", "170%");
      } else {
        //팝업으로 열린 경우는 다시 팝업을 생성하지 않는다.
        if(this.state.pop != 'pc'){
          var myWindow = window.open("http://127.0.0.1:3000/template0/pc/pcpop", "", "width=800px,height=900px");
          myWindow.focus();
          window.location.replace('about:blank')
        }
      }
  }
  var img_width = parseInt(this.state.img_width)
  var img_height = img_width * 1000000000000000
  this.state.img_height =  img_height / 3242268041237113
    
  $( "#ohdsi_img" ).css( "height", this.state.img_height );
  $( "#ohdsi_img" ).css( "width", this.state.img_width );
  $( ".button7" ).css( "width", this.state.img_width );
  $( ".button7" ).css( "height", this.state.img_width/4 );
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
              <p>진행하실 튜토리얼을 선택해주세요.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Link to={'/template/CDM_and_Vocabulary/(Vocabulary)'}><button class="button button7 button7_3">CDM_and_Vocabulary</button></Link>
      <Link to={'/template/Phenotyping_by_ATLAS/(Phenotyping)'}><button class="button button7 button7_2">Phenotyping_by_ATLAS</button></Link>
      <Link to={'/template/PLE/(Population Level Estimation)'}><button class="button button7">PLE(Population Level Estimation)</button></Link>
      <Link to={'/template/PLP/(Patient Level Prediction)'}><button class="button button7 button7_1">PLP(Patient Level Prediction)</button></Link>
      <Link to={'/template/EXTRA1/(Extra Account1)'}><button class="button button7 button7_4">EXTRA1(Extra Account1)</button></Link>
      <Link to={'/template/EXTRA2/(Extra Account2)'}><button class="button button7 button7_5">EXTRA2(Extra Account2)</button></Link>
      <script src="assets/js/index.js"></script>
      </body>

    );
  }
}

export default App;
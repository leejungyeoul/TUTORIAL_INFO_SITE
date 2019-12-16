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
      num: props.match.params.num,
      num2: props.match.params.num2,
      tutorial: props.match.params.tutorial,
      tutorial2: props.match.params.tutorial2,
      
      wifinum : props.match.params.tutorial=='PLP' ? '2':'1',
      pwappend : props.match.params.tutorial=='VOCA' ? '!@':'',
      accountnum : (Number(props.match.params.num)-1)*4+Number(props.match.params.num2),
      accountnum2 : (Number(props.match.params.num)-1)*4+Number(props.match.params.num2)+60,
      img_height:'',
      img_width:'',
      channel:'',
      responseList: '',
      append_List: '',
    };
  }


apiCall = (callbackFunc) => {
  axios.get('/account_info.json')
  .then( response => {
    try {
      this.setState({ responseList: response });
      if( this.state.tutorial == 'CDM_and_Vocabulary'){
        this.setState({ append_List: this.CDMListAppend() });
      }else if(this.state.tutorial == 'Phenotyping_by_ATLAS'){
        this.setState({ append_List: this.PHEListAppend() });
      }else if(this.state.tutorial == 'PLE'){
        this.setState({ append_List: this.PLEListAppend() });
      }else if(this.state.tutorial == 'PLP'){
        this.setState({ append_List: this.PLPListAppend() });
      }else if(this.state.tutorial == 'EXTRA1'){
        this.setState({ append_List: this.EXTRA1ListAppend() });
      }else if(this.state.tutorial == 'EXTRA2'){
        this.setState({ append_List: this.EXTRA2ListAppend() });
      }
      callbackFunc()
    } catch (error) {
      alert(error)
    }
  })
  .catch( error => {alert(error);return false;} );
}

componentDidMount() {

  var tthis = this
  this.apiCall(function() {

      var userAgent = window.navigator.userAgent;
      tthis.state.img_width = document.body.offsetWidth

      var filter = "win16|win32|win64|mac|macintel"; if ( navigator.platform ) {
        if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
          tthis.state.channel = 'mobile'
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

      if(tthis.state.tutorial =='PLP'){
        $( "p1" ).css( "color", "rgb(119, 151, 240)" );  
      }else if(tthis.state.tutorial =='CDM_and_Vocabulary'){
        $( "p1" ).css( "color", "rgb(37, 83, 152)" );  
      }else if(tthis.state.tutorial =='Phenotyping_by_ATLAS'){
        $( "p1" ).css( "color", "rgb(173, 76, 66)" );  
      }else if(tthis.state.tutorial =='PLE'){
        $( "p1" ).css( "color", "rgb(87, 202, 87)" );  
      }else if(tthis.state.tutorial =='CDM_and_Vocabulary'){
        $( "p1" ).css( "color", "rgb(37, 83, 152)" );  
      }else if(tthis.state.tutorial =='EXTRA1'){
        $( "p1" ).css( "color", "rgb(211, 214, 30)" );  
      }else if(tthis.state.tutorial =='EXTRA2'){
        $( "p1" ).css( "color", "rgb(34, 47, 34)" );  
      }

  })
}

CDMListAppend = () => {
  let result = []
  var CDMList = this.state.responseList.data
  // alert('1'+CDMList)

  for(let i=0; i<CDMList.CDM.length; i++){
      var data = CDMList.CDM[i]

      if(this.state.num == data.이름){
        result.push(
          <tbody>
          <tr  class="success">
            <th scope="row">이름</th>
            <td>{data.이름}</td>
          </tr>
          <tr>
            <th scope="row">공유기 ID</th>
            <td>{data.공유기ID}</td>
          </tr>
          <tr>
            <th scope="row">공유기 PW</th>
            <td>{data.공유기PW}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS URL</th>
            <td>{data.ATLAS_URL}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS_ID</th>
            <td>{data.ATLAS_ID}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS_PWD</th>
            <td>{data.ATLAS_PWD}</td>
          </tr>
          <tr>
            <th scope="row">RDP_IP</th>
            <td>{data.RDP_IP}</td>
          </tr>
          <tr>
            <th scope="row">RDP_ID</th>
            <td>{data.RDP_ID}</td>
          </tr>
          <tr>
            <th scope="row">RDP_PW</th>
            <td>{data.RDP_PW}</td>
          </tr>
          <tr  class="success">
            <th scope="row">MSSQL_IP</th>
            <td>{data.MSSQL_IP}</td>
          </tr>
          <tr  class="success">
            <th scope="row">MSSQL_ID</th>
            <td>{data.MSSQL_ID}</td>
          </tr>
          <tr  class="success">
            <th scope="row">MSSQL_PW</th>
            <td>{data.MSSQL_PW}</td>
          </tr>
        </tbody>
        )
      }
  }
  return result
}

PHEListAppend = () => {
  let result = []
  var CDMList = this.state.responseList.data
  // alert('1'+CDMList)

  for(let i=0; i<CDMList.PHE.length; i++){
      var data = CDMList.PHE[i]
      // alert(data.이름)

      if(this.state.num == data.이름){
        result.push(
          <tbody>
          <tr  class="success">
            <th scope="row">이름</th>
            <td>{data.이름}</td>
          </tr>
          <tr>
            <th scope="row">공유기 ID</th>
            <td>{data.공유기ID}</td>
          </tr>
          <tr>
            <th scope="row">공유기 PW</th>
            <td>{data.공유기PW}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS URL</th>
            <td>{data.ATLAS_URL}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS_ID</th>
            <td>{data.ATLAS_ID}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS_PWD</th>
            <td>{data.ATLAS_PWD}</td>
          </tr>
        </tbody>
        )
      }
  }
  return result
}

PLPListAppend = () => {
  let result = []
  var CDMList = this.state.responseList.data
  // alert('1'+CDMList)

  for(let i=0; i<CDMList.PLP.length; i++){
      var data = CDMList.PLP[i]
      // alert(data.이름)

      if(this.state.num == data.이름){
        result.push(
          <tbody>
          <tr  class="success">
            <th scope="row">이름</th>
            <td>{data.이름}</td>
          </tr>
          <tr>
            <th scope="row">공유기 ID</th>
            <td>{data.공유기ID}</td>
          </tr>
          <tr>
            <th scope="row">공유기 PW</th>
            <td>{data.공유기PW}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS URL</th>
            <td>{data.ATLAS_URL}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS_ID</th>
            <td>{data.ATLAS_ID}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS_PWD</th>
            <td>{data.ATLAS_PWD}</td>
          </tr>
          <tr>
            <th scope="row">R_URL</th>
            <td>{data.R_URL}</td>
          </tr>
          <tr>
            <th scope="row">R_Server_ID</th>
            <td>{data.R_Server_ID}</td>
          </tr>
          <tr>
            <th scope="row">R_server_PW</th>
            <td>{data.R_server_PW}</td>
          </tr>
        </tbody>
        )
      }
  }
  return result
}

PLEListAppend = () => {
  let result = []
  var CDMList = this.state.responseList.data
  // alert('1'+CDMList)

  for(let i=0; i<CDMList.PLE.length; i++){
      var data = CDMList.PLE[i]
      // alert(data.이름)

      if(this.state.num == data.이름){
        result.push(
          <tbody>
          <tr  class="success">
            <th scope="row">이름</th>
            <td>{data.이름}</td>
          </tr>
          <tr>
            <th scope="row">공유기 ID</th>
            <td>{data.공유기ID}</td>
          </tr>
          <tr>
            <th scope="row">공유기 PW</th>
            <td>{data.공유기PW}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS URL</th>
            <td>{data.ATLAS_URL}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS_ID</th>
            <td>{data.ATLAS_ID}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS_PWD</th>
            <td>{data.ATLAS_PWD}</td>
          </tr>
          <tr>
            <th scope="row">R_URL</th>
            <td>{data.R_URL}</td>
          </tr>
          <tr>
            <th scope="row">R_Server_ID</th>
            <td>{data.R_Server_ID}</td>
          </tr>
          <tr>
            <th scope="row">R_server_PW</th>
            <td>{data.R_server_PW}</td>
          </tr>
        </tbody>
        )
      }
  }
  return result
}

EXTRA1ListAppend = () => {
  let result = []
  var CDMList = this.state.responseList.data
  // alert('1'+CDMList)

  for(let i=0; i<CDMList.EXTRA1.length; i++){
      var data = CDMList.EXTRA1[i]
      // alert(data.이름)

      if(this.state.num == data.이름){
        result.push(
          <tbody>
          <tr  class="success">
            <th scope="row">이름</th>
            <td>{data.이름}</td>
          </tr>
          <tr>
            <th scope="row">공유기 ID</th>
            <td>{data.공유기ID}</td>
          </tr>
          <tr>
            <th scope="row">공유기 PW</th>
            <td>{data.공유기PW}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS URL</th>
            <td>{data.ATLAS_URL}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS_ID</th>
            <td>{data.ATLAS_ID}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS_PWD</th>
            <td>{data.ATLAS_PWD}</td>
          </tr>
          <tr>
            <th scope="row">R_URL</th>
            <td>{data.R_URL}</td>
          </tr>
          <tr>
            <th scope="row">R_Server_ID</th>
            <td>{data.R_Server_ID}</td>
          </tr>
          <tr>
            <th scope="row">R_server_PW</th>
            <td>{data.R_server_PW}</td>
          </tr>
        </tbody>
        )
      }
  }
  return result
}

EXTRA2ListAppend = () => {
  let result = []
  var CDMList = this.state.responseList.data
  // alert('1'+CDMList)

  for(let i=0; i<CDMList.EXTRA2.length; i++){
      var data = CDMList.EXTRA2[i]
      // alert(data.이름)

      if(this.state.num == data.이름){
        result.push(
          <tbody>
          <tr  class="success">
            <th scope="row">이름</th>
            <td>{data.이름}</td>
          </tr>
          <tr>
            <th scope="row">공유기 ID</th>
            <td>{data.공유기ID}</td>
          </tr>
          <tr>
            <th scope="row">공유기 PW</th>
            <td>{data.공유기PW}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS URL</th>
            <td>{data.ATLAS_URL}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS_ID</th>
            <td>{data.ATLAS_ID}</td>
          </tr>
          <tr  class="success">
            <th scope="row">ATLAS_PWD</th>
            <td>{data.ATLAS_PWD}</td>
          </tr>
          <tr>
            <th scope="row">R_URL</th>
            <td>{data.R_URL}</td>
          </tr>
          <tr>
            <th scope="row">R_Server_ID</th>
            <td>{data.R_Server_ID}</td>
          </tr>
          <tr>
            <th scope="row">R_server_PW</th>
            <td>{data.R_server_PW}</td>
          </tr>
        </tbody>
        )
      }
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
                <p1 style={{"font-size":"23px",color:'#57ca57', "font-family":"Arial, Helvetica, sans-serif"}}>튜토리얼 {this.state.tutorial}</p1><br></br>
                <p1 style={{"font-size":"20px",color:'#57ca57', "font-family":"Arial, Helvetica, sans-serif"}}>{this.state.tutorial2}</p1>
                {/* <p>{this.state.num}님의 {this.state.num2}번 계정 정보입니다.</p> */}
                <p>{this.state.num}님의 계정 정보입니다.</p>
              </div>
              <Table striped>
                {/* <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                  </tr>
                </thead> */}
                {this.state.append_List}
                {/* <tbody>
                  <tr  class="success">
                    <th scope="row">이름</th>
                    <td>ohdsikorea2019_{this.state.wifinum}</td>
                  </tr>
                  <tr>
                    <th scope="row">공유기 ID</th>
                    <td>ohdsikorea2019!@</td>
                  </tr>
                  <tr>
                    <th scope="row">공유기 PW</th>
                    <td>ohdsikorea2019!@</td>
                  </tr>
                  <tr  class="success">
                    <th scope="row">Atlas</th>
                    <td>http://ajouohdsi.ap-northeast-2.elasticbeanstalk.com</td>
                  </tr>
                  <tr  class="success">
                    <th scope="row">R server</th>
                    <td>http://rstudio.ajouohdsi.ap-northeast-2.elasticbeanstalk.com</td>
                  </tr>
                  <tr>
                    <th scope="row">ID</th>
                    <td>ohdsikorea{this.state.tutorial=='PLP'? this.state.accountnum2 : this.state.accountnum}</td>
                  </tr>
                  <tr  class="success">
                    <th scope="row">Password</th>
                    <td>password{this.state.tutorial=='PLP'? this.state.accountnum2 : this.state.accountnum}{this.state.pwappend}</td>
                  </tr>
                </tbody> */}
              </Table>
            </div>
          </div>
        </div>
      </section>
      {/* <Link to={'/template2/'+this.state.num+'/'+this.state.tutorial+'/'+this.state.tutorial2}><button class="button button6">계정 선택으로 돌아가기</button></Link> */}
      <Link to={'/template/'+this.state.tutorial+'/'+this.state.tutorial2}><button class="button button6">참가자 선택으로 돌아가기</button></Link>
      &nbsp;
      {
          (this.state.channel == 'mobile') ?
          <Link to='/'><button class="button button66">처음으로 돌아가기</button></Link>
          :
          <Link to='/template0/pc/pcpop'><button class="button button66">처음으로 돌아가기</button></Link>
      }
      </body>

    );
  }
}

export default App;
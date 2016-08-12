import React, {Component,PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../components/common/Header'
import MediaCon from '../components/mailList/MediaCon'
import Footer from '../components/common/Footer'
import * as TodoActions from '../actions'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import Alert from 'react-s-alert'
import 'whatwg-fetch'
import {params} from '../lib/param'
class Config extends Component {
      constructor(props) {
          super(props)
      }

      componentDidMount() {
          const { dispatch, getConfig } = this.props
          getConfig.mid = /(([^?&=]+)(?:=([^?&=]*))*)/g.exec(window.location.search)[3]
          getConfig.path = '/media/mailInfo'
          dispatch(TodoActions.fetchConfig(getConfig))
      }

      componentWillReceiveProps(nextProps) {
          if (nextProps.selectedMedia !== this.props.selectedMedia) {
              const { dispatch, selectedMedia } = nextProps
              dispatch(TodoActions.fetchMediaIfNeeded(selectedMedia))
          }
          if(nextProps.alerts.info!==null){
              const { dispatch} = nextProps
              let alertInfo = '添加失败:' + nextProps.alerts.info
              Alert.error(alertInfo, {
                  effect: '',
                  position: 'top',
                  timeout: 3000,
                  onClose: function(e){
                      Alert.closeAll();
                  }
              });
              dispatch(TodoActions.deleteAlert())
          }
      }
      handleSave(){
          let dataSet = {}
          const {getConfig,mails,medias,time} = this.props
          dataSet['media_id'] = parseInt(getConfig.mid)
          dataSet['email_start'] = time.startDate
          let emailList = []
          let mediaList = []
          medias.forEach(function(media){
              mediaList.push(media.Fid)
          })
          mails.forEach(function(mail){
              emailList.push(mail.text)
              dataSet['email_list'] +=mail.text+ ','
          })
          dataSet['sub_media_ids']  = mediaList.join(',')
          dataSet['email_list']  = emailList.join(',')
          fetch('/media/saveConfig', {
              method: 'POST',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: params(dataSet)
          }).then(function(response) {
              return response.json()
          }).then(function(json) {
              if(json.response.code===0){
                  let salert = Alert.info('保存成功', {
                      effect: '',
                      position: 'top',
                      timeout: 30000,
                      offset: 100,
                      onClose: function(e){
                           Alert.close(salert);
                      }
                  });
                  window.location.href="/media/mailList"
              }else{
                  Alert.error(json.response.msg, {
                      effect: '',
                      position: 'top',
                      timeout: 30000,
                      onClose: function(e){
                          Alert.closeAll();
                      }
                  });
              }
          }).catch(function(ex) {
              Alert.error(ex, {
                  effect: '',
                  position: 'top',
                  timeout: 30000,
                  onClose: function(e){
                      Alert.closeAll();
                  }
               });
          })
      }
      render() {
          const {actions,mails,medias,time,getConfig,menus} = this.props
          return (
              <div>
                    <MediaCon menus={menus} getConfig={getConfig} handleSave={this.handleSave.bind(this)} actions={actions} mails={mails} medias={medias} time={time}></MediaCon>
                    <Footer></Footer>
                    <Alert stack={{limit: 3}} />
              </div>
           )
      }
}

Config.propTypes = {
    mails: PropTypes.array.isRequired,
    medias:PropTypes.array.isRequired,
    selectedMedia: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
}


function mapStateToProps(state) {
    const {getConfig,selectedMedia,mails,medias,time,alerts,menus} = state
    return {
        getConfig: getConfig,
        selectedMedia: selectedMedia,
        mails: mails,
        time: time,
        menus,
        alerts: alerts,
        medias: medias
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        actions: bindActionCreators(TodoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Config)

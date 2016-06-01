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
              dispatch(TodoActions.fetchPostsIfNeeded(selectedMedia))
          }
      }
      handleSave(){
          let dataSet = {}
          const {getConfig,mails,medias,time} = this.props
          dataSet['media_id'] = parseInt(getConfig.mid)
          dataSet['email_start'] = time.startDate
          dataSet['email_end'] = time.endDate
          dataSet['email_list'] = ''
          dataSet['sub_media_ids'] = ''
          medias.forEach(function(media){
              dataSet['sub_media_ids'] +=media.Fid + ','
          })
          mails.forEach(function(mail){
              dataSet['email_list'] +=mail.text+ ','
          })

          fetch('/media/saveConfig', {
              method: 'POST',
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
                      position: 'top-right',
                      timeout: 3000,
                      offset: 100,
                      onClose: function(e){
                           Alert.close(salert);
                      }
                  });
              }else{
                  Alert.info(json.response.msg, {
                      effect: '',
                      position: 'top-right',
                      timeout: 3000,
                      onClose: function(e){
                          Alert.closeAll();
                      }
                  });
              }
          }).catch(function(ex) {
              Alert.error(ex, {
                  effect: '',
                  position: 'top-right',
                  timeout: 3000,
                  onClose: function(e){
                      Alert.closeAll();
                  }
               });
          })
      }
      render() {
          console.log('render')
          console.log(this.props)
          const {actions,mails,medias,time,getConfig} = this.props
          return (
              <div>
                    <MediaCon getConfig={getConfig} handleSave={this.handleSave.bind(this)} actions={actions} mails={mails} medias={medias} time={time}></MediaCon>
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
    const {getConfig,selectedMedia,mails,medias,time} = state
    return {
        getConfig: getConfig,
        selectedMedia: selectedMedia,
        mails: mails,
        time: time,
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

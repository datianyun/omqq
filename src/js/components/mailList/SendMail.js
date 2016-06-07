import React, {PropTypes, Component} from 'react'
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker'
import moment from 'moment'
class SendMail extends Component {
    constructor(props, context) {
        super(props, context)
        this.handleApply = this.handleApply.bind(this);
        this.state = {
            startDate: moment()
        };

    }
    handleApply(event, picker) {
        this.setState({
            startDate: picker.startDate
        });
        this.props.addTime({
            startDate: picker.startDate.format('YYYY-MM-DD')
        })
    }
    handleCancel(){
        window.location.href = '/media/mailList'
    }
    renderDate(){
        let start;
        let end;
        if(this.props.time.startDate!=''&&this.props.time.startDate!==null){
            start = this.props.time.startDate
        } else {
            start = this.state.startDate.format('YYYY-MM-DD');
        }
        if(this.props.time.type==='const') {
            start += '(有效期90天)'
        }
        let label = start;

        let locale = {
            format: 'YYYY-MM-DD',
            separator: ' - ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek(),
        }
        if(this.props.time.type==='const'){
            return (
                <div className="input-group">
                  <input type="text" className="form-control" defaultValue={label} disabled/>
                    <span className="input-group-btn">
                        <button className="default date-range-toggle btn btn-default" type="button">
                            <i className="fa fa-calendar"></i>
                        </button>
                    </span>
                </div>
            )
        } else {
            return (
                <DatetimeRangePicker
                    singleDatePicker
                    showDropdowns
                    locale={locale}
                    startDate={this.state.startDate}
                    onApply={this.handleApply}
                  >
                    <div className="input-group">
                      <input type="text" className="form-control" value={label} onChange={this.handleApply}/>
                        <span className="input-group-btn">
                            <button className="default date-range-toggle btn btn-default" type="button">
                                <i className="fa fa-calendar"></i>
                            </button>
                        </span>
                    </div>
                 </DatetimeRangePicker>
            )
        }
    }
    render() {

        return (
            <div className="wizard-step">
                <h3>第三步，邮件发送起始时间</h3>
                <div className="form-group dateRange">
                    {this.renderDate()}
                </div>
                <h3>发送时间 每周一上午11：00(如遇特殊情况可能稍有延迟)</h3>
                <div className="form-group">
                    <div className="col-lg-10 col-lg-offset-2">
                        <button onClick={this.props.handleSave} className="btn btn-primary">提交</button>
                        <button onClick={this.handleCancel} className="btn btn-default">取消</button>
                    </div>
                </div>
            </div>
        )
    }
}

SendMail.propTypes = {
    time: PropTypes.object.isRequired,
    handleSave: PropTypes.func.isRequired,
    addTime: PropTypes.func.isRequired
}

export default SendMail

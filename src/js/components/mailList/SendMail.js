import React, {PropTypes, Component} from 'react'
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker'
import moment from 'moment'
class SendMail extends Component {
    constructor(props, context) {
        super(props, context)
        this.handleApply = this.handleApply.bind(this);
        this.state = {
            startDate: moment(),
            endDate: moment().add(3, 'months'),
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            },
        };

    }
    handleApply(event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate
        });
        this.props.addTime({
            startDate: picker.startDate.format('YYYY-MM-DD HH:mm:ss'),
            endDate: picker.endDate.format('YYYY-MM-DD HH:mm:ss')
        })
    }
    handleSubmit(){

    }
    render() {
        let start;
        let end;
        if(this.props.time.startDate!=''){
            start = this.props.time.startDate
            end = this.props.time.endDate
        } else {
            start = this.state.startDate.format('YYYY-MM-DD HH:mm:ss');
            end = this.state.endDate.format('YYYY-MM-DD HH:mm:ss');
        }

        let label = start + ' - ' + end;
        if (start === end) {
            label = start;
        }

        let locale = {
            format: 'YYYY-MM-DD HH:mm:ss',
            separator: ' - ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek(),
        }
        return (
            <div className="wizard-step">
                <h3>第三步，邮件发送有效时段和发送时间</h3>
                <div className="form-group dateRange">
                    <DatetimeRangePicker
                        timePicker
                        timePicker24Hour
                        showDropdowns
                        timePickerSeconds
                        locale={locale}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
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

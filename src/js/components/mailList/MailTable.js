import React, {PropTypes, Component} from 'react'
class MailTable extends Component {
    constructor(props, context) {
        super(props, context)
    }
    renderButton(item){
        if(item.mid!==undefined){
            return(
                <a>删除</a>
            )
        } else{
            return(
                <td>{item['subreddit']}</td>
            )
        }
    }
    render() {
        return (
            <table className="table-b">
                <thead>
                    <tr>
                        <th>媒体ID</th>
                        <th>媒体名称</th>
                        <th>验证微信</th>
                        <th>来源</th>
                        <th>注册邮箱</th>
                        <th>运营分类</th>
                        <th>MMS分类</th>
                        <th>运营状态</th>
                        <th>邮件状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody className="mediaList">
                    {this.props.lists.map((item,i)=>
                        <tr key={i}>
                            <td>{item['id']}</td>
                            <td>{item['author']}</td>
                            <td>{item['score']}</td>
                            <td>{item['ups']}</td>
                            <td>{item['created']}</td>
                            <td>{item['domain']}</td>
                            <td>{item['id']}</td>
                            <td>{item['name']}</td>
                            <td>{item['subreddit_id']}</td>
                            {this.renderButton(item)}
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
}

MailTable.propTypes = {
    lists: PropTypes.array,
    total: PropTypes.string
}

export default MailTable

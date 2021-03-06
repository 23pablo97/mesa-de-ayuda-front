import React, {Component} from 'react';
import ChatApi from '../../../api/chatRepository';
import moment from 'moment';
import {Spin, notification, Typography, Comment, Tooltip, List, Avatar } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

class MessageMain extends Component {
  constructor(props){
    super(props);
    this.state = {
      chats: null
    }
  }

  componentDidMount(){
    ChatApi.getChats()
      .then(response => {
        response.forEach(chat => {
          ChatApi.getLastMessage(chat.chat_id).then(chat_response => {
            chat.last_message = chat_response[0];
          })
        });
        this.setState({chats: response});
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente los chats'});
    });
  }

  render(){
    if(this.state.chats == null){
      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Spin indicator={antIcon} />
        </div>
      );
    }
    return (
      <div key="content" className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Title key="title" >Mensajes</Title>
        <Paragraph key="paragraph">
          En esta sección podras ver y responder todos los mensajes nuevos.
        </Paragraph>
        
        <List
          bordered
          dataSource={this.state.chats}
          renderItem={(item) => {
            return (
              <List.Item>
                <a href={`/admin/mensajes/${item.chat_id}`}>
                  <span>
                    <Comment
                      author={<p>{item.first_name} {item.last_name}</p>}
                      avatar={<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{item.first_name[0]}</Avatar>}
                      content={<p>{item && item.last_message && item.last_message.fromTelegram ? 
                        `${item.first_name}: ${item.last_message}` : 
                        `Tú: ${item.last_message}`
                      }</p>}
                      datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                          <span>{moment().fromNow()}</span>
                        </Tooltip>
                      }
                    />
                  </span>
                </a>
              </List.Item>
            );
          }}
        />
      </div>
    );
  }
}

export default MessageMain;
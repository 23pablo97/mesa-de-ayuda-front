import React, {Component} from 'react';
import ProcessApi from '../../../api/processRepository';
import ProcessPublicDetail from './ProcessPublicDetail';
import InstanceListComponent from '../InstanceListPublicComponent/InstancesList';
import { Breadcrumb, Spin, Divider, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import FAQPublicProcess from '../FAQPublic/FAQPublicByProcess';

class ProcessPublicPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      process: null,
      params: null
    };
  }

  componentDidMount(){
    this.setState({params: this.props.match.params});
    ProcessApi.getProcessPublishedById(this.props.match.params.id_process)
      .then(response => {
        this.setState({process: response})
      }).catch(e => {
        notification['error']({
          message: 'Error!',
          description:
          'No hemos cargar correctamente el proceso'});
    });
  }

  render(){
    if(this.state.process == null){
      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Spin indicator={antIcon} />
        </div>
      );
    }
    return (
      <div className="site-layout-background" style={{ padding: 24, overflow: 'hidden'}}>
        <Breadcrumb>
          <Breadcrumb.Item>{this.state.process.name}</Breadcrumb.Item>
        </Breadcrumb>
        <ProcessPublicDetail {...this.state.process}/>
        <Divider/>
        <InstanceListComponent {...this.state.process}/>
        <Divider/>
        <FAQPublicProcess {...this.state.process}/>
      </div>
    );
  }
}

export default ProcessPublicPage;
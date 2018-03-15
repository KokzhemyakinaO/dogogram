import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ScaleLoader } from 'react-spinners';

import { Layout, Menu, Input, Row, Col, Card} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const Search = Input.Search;
const { Meta } = Card;

ReactDOM.render(<App/>, document.getElementById('app'));
registerServiceWorker();


class Breeds extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            breeds: [],
            images: [],
            randimage: "",
            searchText: "",
            currentBreed: "",
            loading: false
        };

        this.filterList = this.filterList.bind(this);
        this.selectBreed = this.selectBreed.bind(this);
    }

    componentDidMount() {
        fetch("https://dog.ceo/api/breeds/list")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        breeds: result.message
                    });
                },
                (error) => {
                    console.error(error.message);
                }
            )
    }

    selectBreed(e) {

        this.setState({
            currentBreed : e.key,
            images: [],
            randimage: "",
            loading: true
        });

        fetch(`https://dog.ceo/api/breed/${e.key}/images`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        loading: false,
                        images: result.status == "success"  ? result.message : []
                    });
                },
                (error) => {
                    console.error(error.message);
                }
            );

        this.randomClick(e.key)
    }




    randomClick(currentBreed) {
        this.setState({
            randimage: ""
        });

        fetch(`https://dog.ceo/api/breed/${currentBreed}/images/random`)
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState({
                        randimage: result.message
                    });
                },
                (error) => {
                    console.error(error.message);
                }
            );
    }



    filterList(e){
        this.setState( {
            searchText: e.target.value
        });
    }


    render() {
        const {searchText, breeds, images, loading, randimage, currentBreed} = this.state;

        var items = breeds.filter(function(item){
            return item.toLowerCase().search(searchText.toLowerCase())!== -1;
        }).map(function(a, i) {
            return (
                <Menu.Item key={a} >
                    <div><i className="anticon anticon-star"></i>{a}</div>
                </Menu.Item>
            );
        }, this);


        var imagesView = images.map(function(a, i) {
            return (
                <Col span={6} key={i} >
                    <img className="allImg" src={a} alt={a}/>
                </Col>
            );
        }, this);


        const renderImage = () => {
            if(currentBreed) {
                return (<div>
                    <Card
                        hoverable
                        style={{width: 240}}
                        cover={<img alt="example" src={randimage}/>}
                    >
                        <Meta
                            title={currentBreed}
                        />
                    </Card>
                    <i className="anticon anticon-reload" onClick={(e) => this.randomClick(currentBreed)}></i>
                </div>);
            } else {
                return (<h2 style={{ textAlign: 'center', margin: '20px auto' }}>Please, select breed..</h2>);
            }
        }

        return (
            <Layout>
                <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                    <div className="logo"></div>
                    <Search
                        placeholder="enter breed" onChange={this.filterList} style={{ width: 200 }}
                    />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} onClick={this.selectBreed}>
                        {items}
                        </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <h1>Dogogram</h1>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <Row style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                {renderImage()}
                                <div className="scale">
                                    <ScaleLoader
                                        color={'#003152'}
                                        loading={loading}
                                    />
                                </div>
                            </Col>
                            {imagesView}
                        </Row>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

ReactDOM.render(
    <Breeds />,
    document.getElementById('app')
);
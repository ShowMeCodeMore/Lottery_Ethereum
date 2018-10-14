import React, {Component} from 'react'
import {Message, Container, Card, Icon, Image, Statistic, Button, Label} from 'semantic-ui-react'
import web3 from './web3'
import lottery from './lottery'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            manager: '',
            count: 0,
            balance: 0,
            loading1: false,
            disable1: false,
            loading2: false,
            disable2: false,
            loading3: false,
            disable3: false,
            superPower: 'none'
        }
    }

    async componentDidMount() {
        const address = await lottery.methods.getManager().call();
        const count = await lottery.methods.getPlayersCount().call();
        const balance = await lottery.methods.getBalance().call();
        this.setState({
            manager: address,
            count: count,
            balance: web3.utils.fromWei(balance, 'ether')
        });
        let loginAddr = await web3.eth.getAccounts();
        if (loginAddr[0] === address) {
            this.setState({
                superPower: 'inline'
            });
        } else {
            this.setState({
                superPower: 'none'
            });
        }
    }

    toChoose = async () => {
        this.setState({
            loading1: true,
            disable1: true
        })
        const accounts = await web3.eth.getAccounts();
        await lottery.methods.toChoose().send({
            from: accounts[0],
            gas: '300000',
            value: '1000000000000000000'
        });
        this.setState({
            loading1: false,
            disable1: false
        })
        window.location.reload(true)
    }

    pickWinner = async () => {
        this.setState({
            loading2: true,
            disable2: true
        });
        //获取账户
        const accounts = await web3.eth.getAccounts();
        //拿着彩票智能合约调用enter方法
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });
        this.setState({
            loading2: false,
            disable2: false
        });
        window.location.reload(true);
    }

    refund = async () => {
        this.setState({
            loading3: true,
            disable3: true
        });
        //获取账户
        const accounts = await web3.eth.getAccounts();
        await lottery.methods.refund().send({
            from: accounts[0]
        });
        this.setState({
            loading3: false,
            disable3: false
        });
        window.location.reload(true);
    }

    render() {
        return (
            <Container>

                <br/>

                <Message info>
                    <Message.Header>肖博的区块链彩票项目</Message.Header>
                    <p>快来买鸭</p>
                </Message>

                <br/>

                <Card.Group>
                    <Card>
                        <Image src='/images/logo.jpg'/>
                        <Card.Content>
                            <Card.Header>六合彩</Card.Header>
                            <Card.Meta>
                                <span className='date'>
                                    <p>管理员地址:</p>
                                    <Label size='mini'>
                                       {this.state.manager}
                                    </Label>
                                    </span>
                            </Card.Meta>
                            <Card.Description>每周三晚上准时开奖</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user'/>
                                {this.state.count} 人正在参与
                            </a>
                        </Card.Content>
                        <Card.Content extra>
                            <Statistic>
                                <Statistic.Label>Ether</Statistic.Label>
                                <Statistic.Value>{this.state.balance}</Statistic.Value>
                            </Statistic>
                        </Card.Content>
                        <Button animated='fade' onClick={this.toChoose} loading={this.state.loading1}
                                disabled={this.state.disable1}>
                            <Button.Content visible>快来下注！！</Button.Content>
                            <Button.Content hidden>投注才能财富自由！！</Button.Content>
                        </Button>
                        <Button color='red' style={{display: this.state.superPower}} onClick={this.pickWinner}
                                loading={this.state.loading2}
                                disabled={this.state.disable2}>
                            开奖
                        </Button>
                        <Button color='blue' style={{display: this.state.superPower}} onClick={this.refund}
                                loading={this.state.loading3}
                                disabled={this.state.disable3}>
                            退款
                        </Button>
                    </Card>
                </Card.Group>

            </Container>
        );
    }
}

export default App;

import React, { useState, useEffect } from 'react';
import { Message, Container, Card, Icon, Image, Statistic, Button, Label } from 'semantic-ui-react';
import web3 from './web3';
import lottery from './lottery';

function App() {
  const [manager, setManager] = useState('');
  const [count, setCount] = useState(0);
  const [balance, setBalance] = useState('0');
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [superPower, setSuperPower] = useState('none');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const managerAddress = await lottery.methods.getManager().call();
      const playersCount = await lottery.methods.getPlayersCount().call();
      const contractBalance = await lottery.methods.getBalance().call();
      const accounts = await web3.eth.getAccounts();

      setManager(managerAddress);
      setCount(playersCount);
      setBalance(web3.utils.fromWei(contractBalance, 'ether'));

      if (accounts[0] === managerAddress) {
        setSuperPower('inline');
      } else {
        setSuperPower('none');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const toChoose = async () => {
    setLoading1(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await lottery.methods.enter().send({
        from: accounts[0],
        gas: '300000',
        value: web3.utils.toWei('1', 'ether')
      });
      window.location.reload();
    } catch (error) {
      console.error('Error in toChoose:', error);
      setLoading1(false);
    }
  };

  const pickWinner = async () => {
    setLoading2(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await lottery.methods.pickWinner().send({
        from: accounts[0]
      });
      window.location.reload();
    } catch (error) {
      console.error('Error in pickWinner:', error);
      setLoading2(false);
    }
  };

  const refund = async () => {
    setLoading3(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await lottery.methods.refund().send({
        from: accounts[0]
      });
      window.location.reload();
    } catch (error) {
      console.error('Error in refund:', error);
      setLoading3(false);
    }
  };

  return (
    <Container>
      <br />

      <Message info>
        <Message.Header>肖博的区块链彩票项目</Message.Header>
        <p>快来买鸭</p>
      </Message>

      <br />

      <Card.Group>
        <Card>
          <Image src='/images/logo.jpg' />
          <Card.Content>
            <Card.Header>六合采</Card.Header>
            <Card.Meta>
              <span className='date'>
                <p>管理员地址:</p>
                <Label size='mini'>
                  {manager}
                </Label>
              </span>
            </Card.Meta>
            <Card.Description>每周三晚上准时开奖</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div>
              <Icon name='user' />
              {count} 人正在参与
            </div>
          </Card.Content>
          <Card.Content extra>
            <Statistic>
              <Statistic.Label>Ether</Statistic.Label>
              <Statistic.Value>{balance}</Statistic.Value>
            </Statistic>
          </Card.Content>
          <Button animated='fade' onClick={toChoose} loading={loading1}>
            <Button.Content visible>快来下注！！</Button.Content>
            <Button.Content hidden>投注才能财富自由！！</Button.Content>
          </Button>
          <Button color='red' style={{ display: superPower }} onClick={pickWinner} loading={loading2}>
            开奖
          </Button>
          <Button color='blue' style={{ display: superPower }} onClick={refund} loading={loading3}>
            退款
          </Button>
        </Card>
      </Card.Group>
    </Container>
  );
}

export default App;

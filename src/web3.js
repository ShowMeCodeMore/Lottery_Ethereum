import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.request({ method: 'eth_requestAccounts' }).catch((error) => {
    console.error('User denied account access:', error);
  });
} else if (typeof window !== 'undefined' && window.web3 && window.web3.currentProvider) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

export default web3;

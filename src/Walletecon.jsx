import React, { useState, useEffect } from 'react';

function Walletecon() {
  const [accounts, setAccounts] = useState([]);
  const [connected, setConnected] = useState(false);
  const [network, setNetwork] = useState('');

  useEffect(() => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      // Initialize MetaMask connection
      connectMetaMask();
    } else {
      console.error('MetaMask not installed');
    }

    // Cleanup function
    return () => {
      window.ethereum.removeAllListeners();
    };
   }, []);

  const connectMetaMask = () => {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        setAccounts(accounts);
        setConnected(true);
        getNetwork();
      })
      .catch((err) => {
        console.error(err);
      });

    // Listen for account changes
    window.ethereum.on('accountsChanged', (newAccounts) => {
      setAccounts(newAccounts);
      if (newAccounts.length === 0) {
        setConnected(false);
      }
    });

    // Listen for chain changes
    window.ethereum.on('chainChanged', () => {
      getNetwork();
    });
  };

  const disconnectMetaMask = () => {
          if (window.ethereum) {
            window.ethereum
              .request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] })
              .then(() => {
                setAccounts([]);
                setConnected(false);
                setNetwork('');
              })
              .catch((err) => {
                console.error(err);
              });
          }
        };

  const getNetwork = () => {
    window.ethereum
      .request({ method: 'net_version' })
      .then((netId) => {
        setNetwork(netId);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleConnect = () => {
    if (!connected) {
      connectMetaMask();
    }
  };

  const handleDisconnect = () => {
    if (connected) {
      disconnectMetaMask();
    }
  };

  return (
    <div>
      {connected ? (
        <div>
          <p>Connected to MetaMask</p>
          <p>Accounts: {accounts.join(', ')}</p>
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          <p>Connect to MetaMask to continue</p>
          <button onClick={handleConnect}>Connect MetaMask</button>
        </div>
      )}

      {network && (
        <div>
          <p>Current Network: {network}</p>
          {network === '3' || network === '4' ? (
            <p>
              You can get free test Ether from{' '}
              <a
                href={network === '3' ? 'https://faucet.ropsten.be/' : 'https://faucet.rinkeby.io/'}
                target="_blank"
                rel="noopener noreferrer"
              >
                {network === '3' ? 'Ropsten Faucet' : 'Rinkeby Faucet'}
              </a>
            </p>
          ) : (
            <p>Connect to Ropsten or Rinkeby to get test Ether.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Walletecon;

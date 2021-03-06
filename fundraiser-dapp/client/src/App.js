import React, { useState, useEffect } from "react";
import fundraiserFactoryContract from "./contracts/FundraiserFactory.json";
import getWeb3 from "./getWeb3";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import NewFundraiser from './NewFundraiser';
import Home from './Home';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


import "./App.css";
import Receipts from "./Receipts";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));
const App = () => {
  const [state, setState] = useState({web3: null, accounts: null, contract: null});
  const classes = useStyles();

  useEffect(() => {
    const init = async() => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = fundraiserFactoryContract.networks[networkId];
        const instance = new web3.eth.Contract(
          fundraiserFactoryContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        setState({web3, accounts, contract: instance});
      } catch(error) {
        alert(
          `App.js: Failed to load web3, accounts, or contract.
          Check console for details.`
        )
        console.error(error);
      }
    };
    init();
  }, []);

  const runExample = async() => {
    const { accounts, contract } = state;
  }

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="default">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </Typography>
              <NavLink className="nav-link" to="/new/">New</NavLink>
          </Toolbar>
        </AppBar>
        <Route path="/" exact component={Home}/>
        <Route path="/new/" exact component={NewFundraiser}/>
        <Route path="/receipts/" exact component={Receipts}/>
      </div>
    </Router>
  );

}

export default App;
// class App extends Component {
//   state = { storageValue: 0, web3: null, accounts: null, contract: null };

//   componentDidMount = async () => {
//     try {
//       // Get network provider and web3 instance.
//       const web3 = await getWeb3();

//       // Use web3 to get the user's accounts.
//       const accounts = await web3.eth.getAccounts();

//       // Get the contract instance.
//       const networkId = await web3.eth.net.getId();
//       const deployedNetwork = fundraiserFactoryContract.networks[networkId];
//       const instance = new web3.eth.Contract(
//         fundraiserFactoryContract.abi,
//         deployedNetwork && deployedNetwork.address,
//       );

//       // Set web3, accounts, and contract to the state, and then proceed with an
//       // example of interacting with the contract's methods.
//       this.setState({ web3, accounts, contract: instance }, this.runExample);
//     } catch (error) {
//       // Catch any errors for any of the above operations.
//       alert(
//         `Failed to load web3, accounts, or contract. Check console for details.`,
//       );
//       console.error(error);
//     }
//   };

//   runExample = async () => {
//     const { accounts, contract } = this.state;

//     // Stores a given value, 5 by default.
//     await contract.methods.set(5).send({ from: accounts[0] });

//     // Get the value from the contract to prove it worked.
//     const response = await contract.methods.get().call();

//     // Update state with the result.
//     this.setState({ storageValue: response });
//   };

//   render() {
//     if (!this.state.web3) {
//       return <div>Loading Web3, accounts, and contract...</div>;
//     }
//     return (
//       <div className="App">
//         <h1>Good to Go!</h1>
//         <p>Your Truffle Box is installed and ready.</p>
//         <h2>Smart Contract Example</h2>
//         <p>
//           If your contracts compiled and migrated successfully, below will show
//           a stored value of 5 (by default).
//         </p>
//         <p>
//           Try changing the value stored on <strong>line 40</strong> of App.js.
//         </p>
//         <div>The stored value is: {this.state.storageValue}</div>
//       </div>
//     );
//   }
// }

// export default App;

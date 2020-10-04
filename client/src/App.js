import React,{Component} from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

const styles = thema => ({
  root : {
    width : '100%',
    marginTop : thema.spacing(3),
    overflowX : 'auto'
  },
  table : {
    minWidth : 1080
  },
  progress : {
    margin : thema.spacing(2)
  }
});

class App extends Component{
  // this는 App

  constructor(props) {
    super(props);
    this.state = {
      customers : '',
      completed : 0 
    }
  }
  // state refresh
  stateRefresh = () => {
    // state init
    this.setState({
      customers : '',
      completed : 0
    });
    //DB에 저장되어있는 state를 다시 가져온다.
    this.callApi()
    .then(res => this.setState({customers : res}))
    .catch(err => console.log(err));
  }

  // api서버에서 데이터를 받아올때 실행 (모든 컴포넌트가 마운트가 다 됬을때 실행) 
  // componentDidMount 시점에 비동기 함수를 호출해서 해당 url 주소에 데이터를 요청하고 받아온(res) 데이터를 state의 customer 변수에 넣어준다.
  componentDidMount() {
    this.timer = setInterval( this.progress, 20); // progressbar가 0.2초마다 1번씩 수행됨.
    // node api 서버에서 Data를 비동기로 가져온다.
    this.callApi()
        .then(res => this.setState({customers : res}))
        .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/customers'); // 해당 경로의 Data를 비동기로 가져온다. http:localhost:5000/api/customers (BASE => setupProxy.json : proxy)
    const body = await response.json();             // 가져온 Data를 json형태로 body에 넣어준다.
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed : completed >= 100 ? 0 : completed + 1 });
  }

  render(){
    const {classes} = this.props;
    return(
      <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { this.state.customers ? this.state.customers.map(c => {
                 return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name}  birthday={c.birthday} gender={c.gender} job={c.job} /> ) })  
               : <TableRow>
                   <TableCell colSpan="6" align="center">
                     <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                 </TableCell>
                 </TableRow>
             }
          </TableBody>
        </Table>  
      </Paper> 
      <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div> 
    )
  }
}



export default withStyles(styles)(App);

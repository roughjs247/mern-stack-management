import React,{Component} from 'react';
import Customer from './components/Customer';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';

const styles = thema => ({
  root : {
    width : '100%',
    marginTop : thema.spacing(3),
    overflowX : 'auto'
  },
  table : {
    minWidth : 1080
  }
})

const customers = [
    {
    'id'   : 1,
    'image': 'https://placeimg.com/64/64/any',
    'name' : '이용빈',
    'birthday' : '900918',
    'gender' : 'male',
    'job'    : 'developer',
    },
    {
      'id'   : 2,
      'image': 'https://placeimg.com/64/64/1',
      'name' : '홍길동',
      'birthday' : '131244',
      'gender' : 'female',
      'job'    : 'student',
      },
      {
        'id'   : 3,
        'image': 'https://placeimg.com/64/64/2',
        'name' : '김길수',
        'birthday' : '515122',
        'gender' : 'male',
        'job'    : 'photograper',
        },          
];


class App extends Component{
  render(){
    const {classes} = this.props;
    return(
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
            { customers.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name}  birthday={c.birthday} gender={c.gender} job={c.job} /> ) })  }
          </TableBody>
        </Table>  
      </Paper>  
    )
  }
}



export default withStyles(styles)(App);

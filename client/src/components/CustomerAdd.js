import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    hidden : {
        display : 'none'
    }     
});

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file : null,
            username : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : '',
            open : false // dialog State
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer().then((response) => {
                console.log(response.data);
                this.props.stateRefresh(); // 고객 목록을 추가한 이후, -> 서버로 부터 상태에 대한 응답을 다시 받은후 고객 목록을 뿌려준다.
            })
        this.setState({
            file : null,
            usernamne : '',
            birthday : '',
            gender : '',
            job : '',
            fileName :'',
            open : false
        })   
    };

    handleFileChange = (e) => {
        this.setState({
            file : e.target.files[0],
            fileName : e.target.value
        })
    };

    handleValueChange = (e) => {
        let nextState ={};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = async () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.username);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = { headers : { 'content-type' : 'multipart/form-data' } };
        return await post(url, formData, config); // 서버로 Post 방식으로 Data를 보낸다.
    }

    // modal Flag
    handleClickOpen= () => {
        this.setState({
            open : true
        })
    }

    handleClose = () => {
        this.setState({
            file : null,
            usernamne : '',
            birthday : '',
            gender : '',
            job : '',
            fileName :'',
            open : false
        })   
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}> 고객 추가하기 </Button>
                <Dialog open={this.state.open} onClose={this.state.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="rasied-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="rasied-button-file" >
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label ="이름" type="text" name="username" value={this.state.username} onChange={this.handleValueChange}/><br/>
                        <TextField label ="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label ="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label ="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>                        
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

export default withStyles(styles)(CustomerAdd); // withStyles이 적용되어 모듈을 내보낼때 감싸줘야함.
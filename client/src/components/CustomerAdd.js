import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file : null,
            username : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : ''
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
            fileName :''
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

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름 : <input type="text" name="username" value={this.state.username} onChange={this.handleValueChange}/><br/>
                생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가</button>
            </form>
        )
    }

}

export default CustomerAdd;
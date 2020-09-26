import React from 'react';
import './App.css';
import Customer from './components/Customer';

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


function App() {
  return (
    <div>
      {
        customers.map(c => {
          return(
              <Customer  key={c.id}  id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
             )
          }
        )
      }
    </div>        
  );
}

export default App;

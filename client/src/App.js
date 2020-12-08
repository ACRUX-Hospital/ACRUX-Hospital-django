import React from 'react'
import './App.css';

import Header from './Components/SharedComponents/Header/Header.jsx';
import DoctorPage from './Components/Pages/DoctorProfilePage/DoctorPage'
import { connect } from "react-redux"
import  Departments from './Components/Pages/DepartmentPage/DepartmentPage'
import { setCurrentUser, setUserRole } from './Redux/User/userActions'
import UsersProfile from "./Components/Pages/UserProfilePage/ProfilePage"
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './Components/Pages/HomePage/HomePage'
import {viewDepartments} from './Redux/Department/departmentAction'

class App extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   departments:[]
    // }
  }


  componentDidMount = () => {
    this.loadUser()
    fetch('http://127.0.0.1:8000/department/')
        .then(response => response.json())
        .then(data =>{
          //this.setState({departments : data})
          this.props.viewDepartments(data)
         console.log("dep",data)
        })
  }

  loadUser = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("Authorization")
      },
    };
    return fetch('http://localhost:8000/auth/users/me', requestOptions)
      .then(response => response.json())
      .then(user => {
        // console.log("ME", user)
        this.props.setCurrentUser(user)
        return user
      })
      .then((user) => this.userRole({ pk: user.id }))

  }

  userRole = (user) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    fetch('http://localhost:8000/user/details', requestOptions)
      .then(response => response.json())
      .then(user => {
        if (user.patient) {
          this.props.setUserRole(user.patient.role)
        } else if (user.doctor) {
          this.props.setUserRole(user.doctor.role)
        }
      })
  }


  render() {
    const { departments } = this.props
    console.log(departments)
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' render={(props) => <HomePage departments={departments} {...props}/> } />

          <Route exact path='/profile' component={UsersProfile} />
          <Route exact path='/doctors' component={DoctorPage} />
          <Route exact path='/departments' render={(props) => <Departments departments={departments} {...props}/> } />
          {/* <Route exact path='/bloodbank' component={} />
          
          <Route exact path='/doctors' component={} />
          <Route exact path='/booking' component={} /> */}
          {/* <Route exact path='/departments' component={departments} /> */}
        </Switch>
        
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setUserRole: role => dispatch(setUserRole(role)),
<<<<<<< HEAD
    viewDepartments : department =>dispatch(viewDepartments(department))
=======
>>>>>>> 633d7924ea34293a3c26b2809b7d7c098cc11e11
  }
}
const mapStateToProps = (state) => {
  return {
    departments :state.department.Departments
  }
}


<<<<<<< HEAD
export default connect(mapStateToProps, mapDispatchToProps)(App);

=======
export default connect(null, mapDispatchToProps)(App);
>>>>>>> 633d7924ea34293a3c26b2809b7d7c098cc11e11

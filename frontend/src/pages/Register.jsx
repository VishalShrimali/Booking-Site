import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

const Register = () => {
   const [credentials, setCredentials] = useState({
      username: "",
      email: "",
      password: ""
   })

   const {dispatch} = useContext(AuthContext)
   const navigate = useNavigate()

      const handleChange = e => {
         setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
      }

   const handleClick = async (e) => {
      e.preventDefault()

      // Simple validation to ensure fields are not empty
      if (!credentials.username || !credentials.email || !credentials.password) {
         return alert("Please fill in all the fields!");
      }

      try {
         const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials), // Ensure data is properly stringified
         })

         const result = await res.json()
         
         if (!res.ok) {
            // If the response is not successful, show the message from the backend
            alert(result.message || "Something went wrong, please try again.");
         } else {
            // If the registration is successful, update state and navigate to login page
            dispatch({ type: 'REGISTER_SUCCESS' })
            navigate('/login')
         }
      } catch (err) {
         // Catching any other errors (network issues, etc.)
         console.log(err);
      }
   }

   return (
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={registerImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Register</h2>

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input
                                 type="text"
                                 placeholder='Username'
                                 id='username'
                                 onChange={handleChange}
                                 required
                              />
                           </FormGroup>
                           <FormGroup>
                              <input
                                 type="email"
                                 placeholder='Email'
                                 id='email'
                                 onChange={handleChange}
                                 required
                              />
                           </FormGroup>
                           <FormGroup>
                              <input
                                 type="password"
                                 placeholder='Password'
                                 id='password'
                                 onChange={handleChange}
                                 required
                              />
                           </FormGroup>
                           <Button className='btn secondary__btn auth__btn' type='submit'>Create Account</Button>
                        </Form>
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default Register

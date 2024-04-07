// CoursesPage.js

import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import 'react-chatbot-kit/build/main.css';
import { Chatbot } from 'react-chatbot-kit';
import MessageParser from './chatbot/MessageParser'
import ActionProvider from './chatbot/ActionProvider';
import config from './chatbot/config';
import Botmodified from './chatbot/Botmodified.png';
import { useState } from 'react';
import './Courses.css'
const CoursesPage = () => {
    const [chatbtn, setButton] = useState(false);

	const btnHandler = () =>{
		setButton(!chatbtn);
		console.log(chatbtn)
	}
  return (
    <>
    
    <div style={{ padding: '20px 80px', marginTop: '20px' }}> {/* Add top margin and padding to the container */}
      <Typography variant="h4" component="h1" align="center">Courses</Typography> {/* Add page heading */}
    <div style={{ padding: '0 150px' }}>
      <Grid container spacing={20}>
        {/* First row */}
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <img
              src="https://aofa.cs.princeton.edu/cover.png"
              alt="Cover"
              style={{ width: '100%', height: 'auto', maxHeight: '200px' }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Analysis of Algorithms
              </Typography>
              <Typography variant="body2" color="textSecondary">
                This course covers various algorithms and their analysis techniques.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Information Retrieval
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Second row */}
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Foundations of Data Management
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Database Systems
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
    </div>
    <div className='chat'><button className='chatBtn' onClick={btnHandler}><img src={Botmodified} border="0" height="60" width="60" /></button></div>
							{/* <img src={Botmodified} border="0" height="60" width="60" /> */}
							{chatbtn && <div className='chatbot'>
							<header>
								<h1><p><p><Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider}/></p></p></h1>
							</header>
						</div>}

    </>
  );
};

export default CoursesPage;

import React from 'react';
import { css } from '@emotion/core';

import PageTitle from '../components/styled/PageTitle';
import PagePadding from '../components/styled/PagePadding';

const info = css`
  padding-left: 1rem;
`;

const privacytos = () => {
  return (
    <>
      <PageTitle>Privacy Policy</PageTitle>
      <PagePadding>
        <h4>About Alpenglow Learning</h4>
        <p>Alpenglow Learning. (“Alpenglow Learning”, "Alpenglow", “us”, or “we”) feels strongly about protecting your privacy. We understand how important privacy is to you, and we are committed to creating a safe and secure environment for learners of all ages. This Privacy Policy applies to alpenglowlearning.com online services (collectively, our “Service”), which are all owned and operated by Ryan Doyle. This Privacy Policy describes how Alpenglow Learning collects and uses the information you provide on our Service, and describes the choices available to you regarding our use of your personal information and how you can access and update this information.</p>
        <h4>Privacy Principles</h4>
        <ol>
          <li><p>We’re deeply committed to creating a safe and secure online environment for you.</p></li>
          <li><p>We do not sell your personal information to third parties.</p></li>
          <li><p>We do not display advertising. Our goal is to provide a space for learning, not sell you products.</p></li>
        </ol>
        <h4>Table of Contents:</h4>
        <ol>
          <li><a href="#What information do we collect?">What information do we collect?</a></li>
          <li><a href="#How we use the information we collect">How we use the information we collect</a></li>
          <li><a href="#How we share or transfer data">How we share or transfer data</a></li>
          <li><a href="#Your choice and options relating to data collection and use">Your choice and options relating to data collection and use</a></li>
          <li><a href="#How to access, update, or delete your personal information">How to access, update, or delete your personal information</a></li>
          <li><a href="#Our approach to Data Security">Our approach to Data Security</a></li>
          <li><a href="#School Users and Student Records">School Users and Student Records</a></li>
          <li><a href="#How do we protect Childrens privacy?">How do we protect Children's privacy?</a></li>
          <li><a href="#Links to other sites">Links to other sites</a></li>
          <li><a href="#Contacting Alpenglow Learning">Contacting Alpenglow Learning</a></li>
        </ol>
        <h5 id='What information do we collect?'>What information do we collect?</h5>
        <div css={info}>
          <p>When creating an account with Google, we collect and store the following information:</p>
          <ul>
            <li>First Name</li>
            <li>Last Name</li>
            <li>Email</li>
            <li>Google Account ID</li>
            <li>Google Account Profile Image</li>
          </ul>
          <p>We collect information, including personal information, in a variety of ways which may vary according to your use of the Service and your account settings. The categories of personal information we collect may include:</p>
        </div>
        <h5 id='How we use the information we collect'>How we use the information we collect</h5>
        <h5 id='How we share or transfer data'>How we share or transfer data</h5>
        <h5 id='Your choice and options relating to data collection and use'>Your choice and options relating to data collection and use</h5>
        <h5 id='How to access, update, or delete your personal information'>How to access, update, or delete your personal information</h5>
        <h5 id='Our approach to Data Security'>Our approach to Data Security</h5>
        <h5 id='School Users and Student Records'>School Users and Student Records</h5>
        <h5 id='How do we protect Childrens privacy'>How do we protect Children's privacy?</h5>
        <h5 id='Links to other sites'>Links to other sites</h5>
        <h5 id='Contacting Alpenglow Learning'>Contacting Alpenglow Learning</h5>
      </PagePadding>
    </>
  );
};

export default privacytos;
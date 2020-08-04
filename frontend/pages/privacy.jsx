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
        <div css={info}>
          <ul>
            <li><strong>To provide and enhcnce the Service:</strong> We use the information you provide or that we collect to operate, maintain, enhance, and provide all of the features of our Service.</li>
            <li><strong>To communicate with you: </strong>We use your information to communicate with you about your account and respond to inquiries. </li>
            <li><strong>To understand and develop our Service:</strong>We use all of the information that you provide or that we collect from users to understand and analyze the usage trends, learning behaviors, and preferences of our users, to improve the way the Service works and looks, and to create new features and functionality. We may also use information to maintain, develop, support and improve our Service and other educational products and services.</li>
          </ul>
        </div>
        <h5 id='How we share or transfer data'>How we share or transfer data</h5>
        <div css={info}>
          <p>Alpenglow takes great care to protect the information you provide us. We do not rent or sell Personal Information that we collect from users with third parties.</p>
          <p>As an instructor using the service, information may be shared with collaborating instructors or students enrolled in your classes, as well as parents of students who are enrolled in your classes.</p>
          <p>As a student, your information is shared with instructors when you enroll into their class, as well as with the parents as provided by the class instructors.</p>
          <p>We may use data which has been de-identified and/or aggregated for product development, research, analytics and other purposes, including for the purpose of analyzing, improving, or marketing the Alpenglow Learning Services.</p>
        </div>
        <h5 id='Your choice and options relating to data collection and use'>Your choice and options relating to data collection and use</h5>
        <div css={info}>
          <p>Alpenglow Learning may, from time to time, send you email regarding our products and services, or products and services we think you may enjoy. Only Alpenglow Learning (or our vendors or service providers operating on our behalf) will send you these emails. You can choose not to receive these emails by clicking the unsubscribe link in any e-mail or via your Settings page at https://www.khanacademy.org/settings/email. Please note that you are not permitted to unsubscribe or opt-out of non-promotional messages regarding your account, such as account verification, changes or updates to features of the Service, or technical or security notices.</p>
          <p>If you are under the age of 18 residing in California, you are entitled to request removal of content or information you have posted publicly on our Service. To delete your entire account and remove all of your information displayed publicly on the Service, log into your account and select “delete your account” through Settings. To request deletion or de-identification of a specific question, answer or other post displayed publicly on the Service, please email us at privacy@khanacademy.org for assistance. You must be able to identify the particular post you wish to be deleted or de-identified so that we can locate it on the Service. Please note that removal of your content or information does not ensure complete or comprehensive removal, as there may be de-identified or recoverable elements of your content or information on our servers in some form. Additionally, we will not remove content or information that we may be required to retain under applicable federal and state laws.</p>
        </div>
        <h5 id='How to access, update, or delete your personal information'>How to access, update, or delete your personal information</h5>
        <div css={info}>
          <p>Personal Profile information is collected from Google accounts used to create an account. Accounts may have access revoked for futher authentication from Google's Profile Settings directly.  Accounts created with Google are at this time unable to update their email address.</p>
          <p>We may not be able to delete data in all instances, such as information retained in technical support logs and other business records. We will not be required to delete any information which has been de-identified or disassociated with personal identifiers such that it can no longer be used to reasonably identify a particular individual.</p>
          <p>Unless we receive a deletion request, we will retain your information for as long as your account is active or as is reasonably useful for operational purposes. For example, we may retain certain data as necessary to prevent fraud or future abuse, for recordkeeping or other legitimate business purposes, or if required by law. We may also retain information which has been de-identified or aggregated such that it can no longer reasonably identify a particular individual. All retained personal information will remain subject to the terms of this Privacy Policy.</p>   
        </div>
        <h5 id='Our approach to Data Security'>Our approach to Data Security</h5>
        <div css={info}>
          <p>To protect your privacy and security, we take reasonable steps to verify your identity before granting you account access or making corrections to your information. For example, we may ask you to provide certain Personal Information to confirm your identity, and we may require that you create and use a password to access certain parts of our Service. You should create and maintain a strong password to help ensure the security of your account.</p>
        </div>
        <h5 id='How do we protect Childrens privacy'>How do we protect Children's privacy?</h5>
        <div css={info}>
          <p>Alpenglow Learning does not permit children under the age of 13 (a “Child” or “Children”) to create an account without the consent and at the direction of a Parent or School. Please contact us at <a href='mailto:alpenglowlearning@gmail.com'>alpenglowlearning@gmail.com</a> if you believe we have inadvertently collected information from a child under 13 without parental consent so that we may delete the information as soon as possible.
          <p>Children under 13 may create an account with the parent's consent. Please see the Children's Privacy Policy to learn more about how Alpenglow Learning collects, uses and shares information associated with Child accounts.</p>
          <p>When Alpenglow Learning is used by a School in an educational setting, we may rely on the School to provide the requisite consent for Alpenglow Learning to collect information from a School User under the age of 13, in lieu of parental consent.</p></p>
        </div>
        <h5 id='Links to other sites'>Links to other sites</h5>
        <div css={info}>
          <p>The Service may link to and may be linked by websites operated by other entities or individuals. This Privacy Policy does not apply to, and we cannot always control the activities of, such other third-party websites. You should consult the respective privacy policies of those third-party websites.</p>
        </div>
        <h5 id='Contacting Alpenglow Learning'>Contacting Alpenglow Learning</h5>
        <div css={info}>
          <p>Please contact Alpenglow Learning with any questions or comments. By email: <a href='mailto:alpenglowlearning@gmail.com'>alpenglowlearning@gmail.com</a></p>
        </div>
        <p>Last Updated August 4, 2020</p>
      </PagePadding>
    </>
  );
};

export default privacytos;
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import PagePadding from '../styled/blocks/PagePadding';
import PageTitle from '../styled/PageTitle';

const TeacherWelcome = ({ user }) => {

  return (
    <>
      <PageTitle>Welcome!</PageTitle>
      <PagePadding>
        <h3>Getting Started</h3>
        <div css={css`padding-left: 1rem;`}>
          <p>
            <strong>Welcome, {user?.firstName}!</strong>
          </p>
          <p>Welcome to Alpenglow Learning. Below you will find an explanation of all the major aspects of the Alpenglow Learning Platform and how you can get started!</p>
        </div>
        <h4>Courses & Classes</h4>
        <p>To get started creating curriculum, begin by making a new Course.  A course is where all content and curriculum is housed.  A course consists of playlists that students are able to complete at their own pace and complete by taking a quiz. A course can have any number of "classes" enrolled. A "class" is simply a grouping of students. </p>
        <p>A typical use case for a primary teacher might be to have a single class of students enrolled in each course.  In contrast, a secondary teacher that teaches multiple groups of students the same curriculum could have any number of classes enrolled in a course.</p>
        <p>Courses can also have multiple instructors that share the curriculum.  An example of when to share a course would be multiple teachers in the same grade level that want to all use the same course, but they don't want to have to recreate all the curriculum themselves.  The original owner of the course can invite other collaborators, and each instructor can independently create their own classes of students to enroll in the same course.</p>
        <p><em>When naming courses and classes, keep in mind that students will see the names for the class you create. For example, you might create a course that's called "English 7" for 7th grade English.  You could then create classes named, "ELA Period 2", "ELA Period 3, and "ELA Period 4". If a student enrolls in the ELA Period 2 class, that is the name that will show for them.</em></p>
        <h4>Playlists</h4>
        <p>A playlist contains a set of learning targets or standards that an instructor wants to assess. Each playlist has it's own quiz that can be used to assess the proficiency of the content in that playlist.</p>
        <p>There are three types of playlists</p>
        <ul>
          <li><strong>Essential</strong> - Playlists for the current course and grade level that are essential for understanding.  These are sometimes described as having endurance (value beyond single test date), leverage (value in multiple disciplines) and readiness of the next grade level.</li>
          <li><strong>Core</strong> - These represent remaining grade level standards and concepts that you might not classify as being essential.</li>
          <li><strong>Challenge</strong> - The challenge playlists would be next grade-level, or near the next grade level in terms of performance.</li>
        </ul>
        <h4>Objectives</h4>
        <p>Each playlist is broken down into multiple (or a single) objectives.  Each objective in a playlist is meant to separate further the main concept of the playlist into smaller chunks that might help a student organize thoughts and concepts as they study. While it's not required to have multiple objectives, you should think of how each playlist might be organized into smaller components to aide the students.</p>
        <p>When making objectives, it is required to give each on a description.  This is meant to make clear the "why" behind each section.</p>
        <h4>Resources</h4>
        <p>A resource is a link to an actionable item for a student to complete.  Currently there are 5 types of resources you can classify a resource as: </p>
        <ul>
          <li>Article</li>
          <li>Image</li>
          <li>Practice</li>
          <li>Video</li>
          <li>Audio</li>
        </ul>
        <p>When creating resources, the type of resource will determine the icon that accompanies it.  That, in addition to the description, can help students identify quickly what the purpose of each resource is.</p>
        <h4>Student Enrollment</h4>
        <p>To enroll students, you first need to have a course created.  Once you create a course you can create a class (or multiple classes) for that course. Each class will have a unique ID generated that you can provide to your class.  When the student enters that enroll ID, they will automatically be added to the class.</p>
        <h4>Progress</h4>
        <p>Under the Progress area you can find course-wide and class-wide data on quiz progress for all your students. Under the All Students area you can see every student with a progress bar that represents their progress for all playlists in the entire course. </p>
        <p>You can also see the progress for each individual class you instruct. For each class, you can view a table that shows the highest scores for each playlist.</p>
        <p>Additionally, you may select a student to drill-down into their specific progress and see a breakdown of all of their scores.</p>
      </PagePadding>
    </>
  );
};

TeacherWelcome.propTypes = {
  user: PropTypes.object,
}

export default TeacherWelcome;
import { Status } from "@prisma/client"

const { Prisma } = require('@prisma/client')

const issues: { title: string, description: string, status: Status }[] = [
  {
    title: 'Fix Login Bug',
    description: 'Users are unable to log in. Investigate and resolve the issue.',
    status: 'OPEN'
  },
  {
    title: 'Improve UI Responsivenes',
    description: 'Enhance the user interface to improve responsiveness on different devices.',
    status: 'IN_PROGRESS'
  },
  {
    title: 'Add User Profile Page',
    description: 'Create a new page to display user profiles with relevant information.',
    status: 'CLOSED'
  },
  {
    title: 'Optimize Database Queries',
    description: 'Identify and optimize slow-performing database queries for better performance.',
    status: 'OPEN'
  },
  {
    title: 'Implement Two-Factor Authentication',
    description: 'Enhance security by adding two-factor authentication for user accounts.',
    status: 'IN_PROGRESS'
  },
  {
    title: 'Update Documentation',
    description: 'Review and update the project documentation to reflect recent changes.',
    status: 'CLOSED'
  },
  {
    title: 'Fix Image Upload Issue',
    description: 'Users are experiencing issues when uploading images. Investigate and fix the problem.',
    status: 'OPEN'
  },
  {
    title: 'Implement Dark Mode',
    description: 'Add a dark mode option to improve user experience in low-light environments.',
    status: 'IN_PROGRESS'
  },
  {
    title: 'Resolve Browser Compatibility',
    description: 'Address compatibility issues with certain browsers for a seamless user experience.',
    status: 'IN_PROGRESS'
  },
  {
    title: 'Update Third-Party Libraries',
    description: 'Ensure all third-party libraries are up to date to benefit from the latest features and security patches.',
    status: 'OPEN'
  },
  {
    title: 'Fix Email Notification Bug',
    description: 'Users are not receiving email notifications. Investigate and fix the issue.',
    status: 'CLOSED'
  },
  {
    title: 'Improve Search Functionality',
    description: 'Enhance the search feature to provide more accurate and relevant results.',
    status: 'OPEN'
  },
  {
    title: 'Add Multi-Language Support',
    description: 'Implement multi-language support to cater to users from different regions.',
    status: 'OPEN'
  },
  {
    title: 'Fix Broken Links',
    description: 'Identify and fix any broken links within the application.',
    status: 'IN_PROGRESS'
  },
  {
    title: 'Implement User Feedback System',
    description: 'Create a system to gather and analyze user feedback for continuous improvement.',
    status: 'OPEN'
  },
  {
    title: 'Optimize Server Configuration',
    description: 'Review and optimize the server configuration for better performance and resource utilization.',
    status: 'OPEN'
  },
  {
    title: 'Improve Error Handling',
    description: 'Enhance error handling to provide clearer messages and improve the debugging process.',
    status: 'CLOSED'
  },
  {
    title: 'Add Social Media Integration',
    description: 'Integrate social media sharing features to increase user engagement.',
    status: 'IN_PROGRESS'
  },
]

module.exports = {
  issues
}
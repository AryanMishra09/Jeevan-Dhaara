import React from 'react'
import Layout from '../../components/shared/Layout/Layout'
import { useSelector } from 'react-redux';

const AdminHome = () => {

    const {user} = useSelector((state => state.auth));

  return (
    <Layout>
        <div className='container mt-5 '>
            <div className='d-flex flex-column mt-4'>
            <   h1>Welcome Admin <i className='text-success'>{user?.name}</i></h1>
            </div>
           <h3 className='my-3'>Manage Blood Bank App</h3>
           <hr className='mt-4' />
           <div className='container paraContainer'>
            <p className='para' >
            Welcome to the heart❤️ of our blood bank operations – the Blood Bank Admin Dashboard. Here, as the administrator, you 
            
            hold the reins of our MERN stack blood bank website, overseeing critical facets that drive our mission of saving lives. 
            
            The overview section provides at-a-glance insights into the health of our database, showcasing key statistics that include 
            
            the total number of registered donors, the current count of available blood units, and the timestamp of the last database 
            
            update. This snapshot equips you with the necessary information to make informed decisions and maintain the efficiency of 
            
            our blood bank. <br /> <br />

            Delve into donor management seamlessly within the dedicated section, offering you the tools to add new donors with 
            
            comprehensive details or navigate through the existing donor list for edits. This feature ensures that our donor 
            
            database remains up-to-date and accurate, fostering a robust foundation for our blood bank operations.

            The blood inventory section is your dynamic control center for managing the lifeblood of our operations – the blood units. 
            
            Here, you can effortlessly update quantities, ensuring real-time tracking of available blood units categorized by blood type. 
            
            This meticulous control over the blood inventory empowers you to respond proactively to demands, ensuring a well-maintained 
            
            and readily accessible stock.<br /> <br />

            In the reports section, you have the ability to generate valuable insights into blood donation trends, donor preferences, 
            
            and overall engagement. This analytical tool provides a strategic advantage, allowing you to anticipate needs, identify 
            
            patterns, and continually optimize our blood bank operations.<br /> <br />

            To enhance the security of our blood bank data, take advantage of the option to change your password within the account 
            
            settings. This additional layer of security ensures that your access to this vital information remains safeguarded.

            In essence, this admin dashboard serves as your centralized command center, offering the tools and insights necessary to 
            
            navigate the intricacies of blood bank management efficiently. Your role as the administrator is pivotal in sustaining the 
            
            life-saving mission of our blood bank, and this dashboard is designed to empower you in every aspect of that responsibility.
            </p>
           </div>
           
        </div>
    </Layout>
  )
}

export default AdminHome

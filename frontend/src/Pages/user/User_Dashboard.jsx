import React from 'react'
import { useSelector } from 'react-redux';

const User_Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  console.log(user.phone)
  return (
    <>
      
      <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-4">
          {/* Profile Card */}
          <div className="card mb-4">
            <div className="card-body text-center">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.email}</p>
              <p className="card-text">{user.phone}</p>

              <a href="#" className="btn btn-primary">Edit Profile</a>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          {/* Recent Activities */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title">Orders</h5>
            </div>
            <div className="card-body">
              <ul className="list-group">
                Check Your Orders
              </ul>
            </div>
          </div>

          {/* Settings */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Settings</h5>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="#">Change Password</a>
                </li>
                <li className="list-group-item">
                  <a href="#">Manage Notifications</a>
                </li>
                <li className="list-group-item">
                  <a href="#">Privacy Settings</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default User_Dashboard
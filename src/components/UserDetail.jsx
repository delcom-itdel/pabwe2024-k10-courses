import { useRef } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../utils/tools";
import { FaUpload } from "react-icons/fa6";
function UserDetail({ authLogin, onUserChangePhoto }) {
  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUserChangePhoto({ photoFile: file });
    }
  };
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div id={authLogin.id} className="card"
      style={{backgroundColor:'#577877', margin:'100px'}}
    >
      {" "}
      <div className="card-body">
        {" "}
        <div className="row align-items-center">
          {" "}
          <div className="col-12">
            {" "}
            <div className="d-flex">
              {" "}
              <div>
                {" "}
                <img
                  className="rounded-circle"
                  width={90}
                  height={90}
                  src={authLogin.photo}
                />{" "}
              </div>{" "}
              <div className="ms-3">
                {" "}
                <h2 
                style={{color : 'white' }}
                > {authLogin.name} </h2>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleUploadClick}
                  style={{ borderColor: 'black', borderWidth: '3px',color: '#F0F5F7', backgroundColor: '#577877', padding: '10px'}}
                >
                  {" "}
                  <FaUpload /> Ubah Photo Profile{" "}
                </button>{" "}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="d-none"
                  accept="image/*"
                  onChange={handleFileChange}
                />{" "}
              </div>{" "}
            </div>{" "}
            <hr />{" "}
            <table className="table table-bordered">
              {" "}
              <tbody
               style={{color:'white'}}
              >
                {" "}
                <tr>
                  {" "}
                  <th>Nama</th> <td>{authLogin.name}</td>{" "}
                </tr>{" "}
                <tr>
                  {" "}
                  <th>Email</th> <td>{authLogin.email}</td>{" "}
                </tr>{" "}
                <tr>
                  {" "}
                  <th>Bergabung sejak</th>{" "}
                  <td>{formatDate(authLogin.created_at)}</td>{" "}
                </tr>{" "}
              </tbody>{" "}
            </table>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
const authLoginShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};
UserDetail.propTypes = {
  authLogin: PropTypes.shape(authLoginShape).isRequired,
  onUserChangePhoto: PropTypes.func.isRequired,
}; 

// eslint-disable-next-line react-refresh/only-export-components
export { authLoginShape };
export default UserDetail;


import Profilemodal from '../components/profilemodal';
import './app.css';

export default function Home() {


  return (
    <>
      {/* <div className="containers clearfix">
        <div className="people-list" id="people-list">

          <div className="row pt-2" style={{ paddingLeft: "20px" }}>
            <div className="col-8">
              <img className="profile-image" src="https://randomuser.me/api/portraits/men/39.jpg" alt="" />
            </div>
            <div className="col-4" style={{ alignSelf: "center" }}>
              <span className="settings-tray--right" style={{ display: "flex", justifyContent: "space-evenly" }}>
                <i className="bi bi-person-fill-add addp" style={{ fontSize: "25px" }} ></i>
                <i className="bi bi-three-dots"></i>
              </span>
            </div>
          </div>

          <div className="search">
            <input type="text" placeholder="search" />
            <i className="fa fa-search"></i>
          </div>

          <h1>contacts</h1>
        

          <ul className="list">
            <li className="clearfix">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
              <div className="about">
                <div className="name">Vincent Porter</div>
                <div className="status">
                  <i className="bi bi-circle-fill online"></i> online
                </div>
              </div>
            </li>

            <li className="clearfix">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg" alt="avatar" />
              <div className="about">
                <div className="name">Aiden Chavez</div>
                <div className="status">
                  <i className="bi bi-circle-fill online"></i> left 7 mins ago
                </div>
              </div>
            </li>

            <li className="clearfix">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg" alt="avatar" />
              <div className="about">
                <div className="name">Mike Thomas</div>
                <div className="status">
                  <i className="bi bi-circle-fill online"></i> online
                </div>
              </div>
            </li>

            <li className="clearfix">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg" alt="avatar" />
              <div className="about">
                <div className="name">Erica Hughes</div>
                <div className="status">
                  <i className="bi bi-circle-fill online"></i> online
                </div>
              </div>
            </li>

            <li className="clearfix">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg" alt="avatar" />
              <div className="about">
                <div className="name">Ginger Johnston</div>
                <div className="status">
                  <i className="bi bi-circle-fill online"></i> online
                </div>
              </div>
            </li>

            <li className="clearfix">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_06.jpg" alt="avatar" />
              <div className="about">
                <div className="name">Tracy Carpenter</div>
                <div className="status">
                  <i className="bi bi-circle-fill offline"></i> left 30 mins ago
                </div>
              </div>
            </li>

            <li className="clearfix">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_07.jpg" alt="avatar" />
              <div className="about">
                <div className="name">Christian Kelly</div>
                <div className="status">
                  <i className="bi bi-circle-fill offline"></i> left 10 hours ago
                </div>
              </div>
            </li>

            <li className="clearfix">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg" alt="avatar" />
              <div className="about">
                <div className="name">Monica Ward</div>
                <div className="status">
                  <i className="bi bi-circle-fill offline"></i> online
                </div>
              </div>
            </li>

            <li className="clearfix">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg" alt="avatar" />
              <div className="about">
                <div className="name">Dean Henry</div>
                <div className="status">
                  <i className="bi bi-circle-fill offline"></i> offline since Oct 28
                </div>
              </div>
            </li>

            <li className="clearfix">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg" alt="avatar" />
              <div className="about">
                <div className="name">Peyton Mckinney</div>
                <div className="status">
                  <i className="bi bi-circle-fill offline"></i> online
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="chat">
          <div className="row">
            <div className="col-10">
              <div className="chat-header clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />

                <div className="chat-about">
                  <div className="chat-with">Chat with Vincent Porter</div>
                  <div className="chat-num-messages">already 1 902 messages</div>
                </div>
              </div>
            </div>
            <div className="col-2" style={{ alignSelf: "center", display: "flex", justifyContent: "space-evenly" }}>
           
              <i className="bi bi-three-dots" style={{ fontSize: "20px" }}></i>
            </div>
          </div>
          

          <div className="chat-history">
            <ul>
              <li className="clearfix">
                <div className="message-data align-right">
                  <span className="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
                  <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>

                </div>
                <div className="message other-message float-right">
                  Hi Vincent, how are you? How is the project coming along?
                </div>
              </li>

              <li>
                <div className="message-data">
                  <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                  <span className="message-data-time">10:12 AM, Today</span>
                </div>
                <div className="message my-message">
                  Are we meeting today? Project has been already finished and I have results to show you.
                </div>
              </li>

              <li className="clearfix">
                <div className="message-data align-right">
                  <span className="message-data-time" >10:14 AM, Today</span> &nbsp; &nbsp;
                  <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>

                </div>
                <div className="message other-message float-right">
                  Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                </div>
              </li>

              <li>
                <div className="message-data">
                  <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                  <span className="message-data-time">10:20 AM, Today</span>
                </div>
                <div className="message my-message">
                  Actually everything was fine. I'm very excited to show this to our team.
                </div>
              </li>

              <li>
                <div className="message-data">
                  <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                  <span className="message-data-time">10:31 AM, Today</span>
                </div>
                <i className="fa fa-circle online"></i>
                <i className="fa fa-circle online" style={{ color: "#AED2A6" }}></i>
                <i className="fa fa-circle online" style={{ color: "#DAE9DA" }}></i>
              </li>

              <li>
                <div className="message-data">
                  <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                  <span className="message-data-time">10:31 AM, Today</span>
                </div>
                <i className="fa fa-circle online"></i>
                <i className="fa fa-circle online" style={{ color: "#AED2A6" }}></i>
                <i className="fa fa-circle online" style={{ color: "#DAE9DA" }}></i>
              </li>

              <li>
                <div className="message-data">
                  <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                  <span className="message-data-time">10:31 AM, Today</span>
                </div>
                <i className="fa fa-circle online"></i>
                <i className="fa fa-circle online" style={{ color: "#AED2A6" }}></i>
                <i className="fa fa-circle online" style={{ color: "#DAE9DA" }}></i>
              </li>

            </ul>

          </div>
          

          <div className="row">
            <div className="col-12">
              <div className="chat-box-tray">
                <i className="bi bi-emoji-smile-fill"></i>
                <input type="text" style={{ width: "80%", borderRadius: "30px", border: 'none' }} placeholder="Type your message here..." />
                <i className="bi bi-mic-fill"></i>
                <i className="bi bi-send-fill"></i>
              </div>
            </div>
          </div>
        </div>

      </div> */}

      <Profilemodal/>

    </>
  );
}

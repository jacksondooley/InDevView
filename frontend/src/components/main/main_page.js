import React from 'react';
import '../../stylesheets/main_page.scss'

class MainPage extends React.Component {

  render() {
    return (
      <div className='splash-page'>
        <h1>In<span className='orange-text'>Dev</span>View</h1>
        <footer className="splash-footer">
          Copyright &copy; 2022 InDevView
        </footer>
      </div>
    );
  }
}

export default MainPage;
import React from 'react';
import '../../stylesheets/main_page.css'

class MainPage extends React.Component {

  render() {
    return (
      <div className='splash-page'>
        <h1>InDevView</h1>
        <footer>
          Copyright &copy; 2021 InDevView
        </footer>
      </div>
    );
  }
}

export default MainPage;
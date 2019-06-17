import React from 'react';
import './Pagination.css';


class Pagination extends React.Component {
  dotsRender = () => {
    const { currentPage, totalPages, paginationSwitchPages } = this.props;

    let dotsList = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        dotsList.push(
          <span key={i} className="page-link active" href="#" onClick={paginationSwitchPages} data-page={i}></span>
        );
      }
      else {
        dotsList.push(
          <span key={i} className="page-link" href="#" onClick={paginationSwitchPages} data-page={i}></span>
        );
      }
    };

    return (
      <nav className="app-pagination"> 
        <span className="page-link-left" href="#" onClick={paginationSwitchPages} data-left="left">&lt;</span>
        {dotsList}
        <span className="page-link-right" href="#" onClick={paginationSwitchPages} data-right="right">&gt;</span>
      </nav>
    );
  }

  render() {
    const { isHomePage } = this.props;
    return isHomePage === "logout" || isHomePage === "login" ? this.dotsRender() : null;
  }
}

export default Pagination;
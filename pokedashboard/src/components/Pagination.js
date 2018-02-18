import React from "react";
import { Col } from "react-bootstrap/lib/";
import ReactPaginate from "react-paginate";
import { number, func } from "prop-types";

class Pagination extends React.Component {
  render() {
    const { totalPages, handlePaginationSelect } = this.props;
    if (totalPages > 1) {
      return (
        <Col sm={12} md={10}>
          <div id="react-paginate">
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDispalyed={10}
              marginPagesDisplayed={10}
              onPageChange={handlePaginationSelect}
            />
          </div>
        </Col>
      );
    }
    return null;
  }
}

Pagination.propTypes = {
  //passed down
  totalPages: number,
  handlePaginationSelect: func
};

export default Pagination;

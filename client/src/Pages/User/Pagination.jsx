import React, { useContext } from 'react';
import PaginationCtxt from '../../Context/PaginationCtxt';

const Pagination = () => {
    const { data, setHospitals } = useContext(PaginationCtxt);
    const [currentPage, setCurrentPage] = React.useState(1);
    const recordsPerPage = 9;
    const totalRecords = data.length;

    // Tính tổng số trang
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    // Tạo mảng số trang
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Hàm phân trang
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            const indexOfLastRecord = pageNumber * recordsPerPage;
            const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
            setHospitals(data.slice(indexOfFirstRecord, indexOfLastRecord));
        }
    };

    return (
        <ul className="styled-pagination text-center clearfix">
            {/* Nút Previous */}
            <li className="arrow prev">
                <a
                    onClick={() => paginate(currentPage - 1)}
                    className={currentPage === 1 ? 'disabled' : ''}
                >
                    <span className="icon-right-arrow left"></span>
                </a>
            </li>

            {/* Render các số trang */}
            {pageNumbers.map(number => (
                <li key={number} className={currentPage === number ? 'active' : ''}>
                    <a onClick={() => paginate(number)}>
                        {number}
                    </a>
                </li>
            ))}

            {/* Nút Next */}
            <li className="arrow next">
                <a
                    onClick={() => paginate(currentPage + 1)}
                    className={currentPage === totalPages ? 'disabled' : ''}
                >
                    <span className="icon-right-arrow"></span>
                </a>
            </li>
        </ul>
    );
};

export default Pagination;

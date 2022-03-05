import { TablePagination } from '@mui/material';
import React from 'react';

const Pagination = React.memo(({ data, page, limit, setPage, setLimit }) => {
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.count}
            rowsPerPage={limit}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
});

export default Pagination;
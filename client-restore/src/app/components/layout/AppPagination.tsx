import { Box, Typography, Pagination } from '@mui/material'
import { MetaData } from '../../models/pagination'

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

export default function AppPagination({metaData, onPageChange}: Props) {
    const { currentPage, totalPages, pageSize, totalCount } = metaData;
    
    return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>
            {/* Displaying {(currentPage-1) * pageSize+1} - {currentPage*pageSize > totalCount 
            ? totalCount 
            : currentPage*pageSize} of {totalCount} items */}
             Displaying {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalCount)} 
             of {totalCount} items
        </Typography>
        <Pagination 
            color="standard"
            size="large"
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
        />
    </Box>
  )
}
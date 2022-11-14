import { Button, CircularProgress, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Box } from '@mui/system'
import { createPosition, deletePosition, editPosition, getPositions } from 'api/positions'
import CustomModal from 'CustomComponents/CustomModal'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useStores } from 'store'
import CreatePosition from './components/CreatePosition'
import DeletePosition from './components/DeletePosition'

const Positions = observer((): JSX.Element => {
    const { positions } = useStores()

    const { t } = useTranslation()

    const { search } = positions

    const handleClose = () => {
        positions.setisOpenCreatePositionModal(false)
    }

    const handleCloseEdit = () =>
        positions.seteditPositionModal({
            isOpen: false,
            id: null,
        })

    const handleCloseDelete = () =>
        positions.setdeletePositionModal({
            isOpen: false,
            id: null,
        })

    useEffect(() => {
        getPositions(search, 1)
    }, [search])

    const onSubmitCreate = (data: { name: string }) => {
        createPosition(data.name)
    }

    const onSubmitEdit = (data: { name: string }) => {
        positions.editPositionModal.id && editPosition(data.name, positions.editPositionModal.id)
    }

    const onSubmitDelete = () => {
        positions.deletePositionModal.id && deletePosition(positions.deletePositionModal.id)
    }

    return (
        <>
            <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap' }}>
                {!positions.isFetchingPositions ? (
                    <TableContainer component={Paper}>
                        <Table className="minWidth650" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" className="w100">
                                        {t('common.positionname')}
                                    </TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {positions.positions.map((position) => (
                                    <TableRow key={position.id}>
                                        <TableCell align="left" scope="row">
                                            {position.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                type="button"
                                                variant="contained"
                                                size="small"
                                                onClick={() => {
                                                    positions.seteditPositionModal({
                                                        isOpen: true,
                                                        id: position.id,
                                                    })
                                                }}
                                            >
                                                {t('common.edit')}
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                type="button"
                                                variant="contained"
                                                size="small"
                                                color="error"
                                                onClick={() => {
                                                    positions.setdeletePositionModal({
                                                        isOpen: true,
                                                        id: position.id,
                                                    })
                                                }}
                                            >
                                                {t('common.delete')}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Box sx={{ p: 1 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
            <CustomModal open={positions.isOpenCreatePositionModal} onClose={handleClose}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {t('positions.create')}
                </Typography>
                <CreatePosition
                    setOpen={() => positions.setisOpenCreatePositionModal(false)}
                    onSubmit={onSubmitCreate}
                    isFetching={positions.isFetchingCreatePosition}
                    mode="create"
                />
            </CustomModal>

            <CustomModal open={positions.editPositionModal.isOpen} onClose={handleCloseEdit}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {t('positions.edit')}
                </Typography>
                <CreatePosition
                    setOpen={handleCloseEdit}
                    onSubmit={onSubmitEdit}
                    isFetching={positions.isFetchingCreatePosition}
                    mode="save"
                />
            </CustomModal>
            <CustomModal open={positions.deletePositionModal.isOpen} onClose={handleCloseDelete}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {t('positions.delete.confirm')}
                </Typography>
                <DeletePosition
                    setOpen={handleCloseDelete}
                    onSubmit={onSubmitDelete}
                    isFetching={positions.isFetchingCreatePosition}
                />
            </CustomModal>
        </>
    )
})

export default Positions

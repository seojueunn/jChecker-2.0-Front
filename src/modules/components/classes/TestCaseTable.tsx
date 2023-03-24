import {
    TableContainer,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Paper,
    TableHead,
    makeStyles,
    withStyles,
    Theme,
    createStyles, TablePagination
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { ClassroomOracle, RouteParamsProps } from ".";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: 500,
        [theme.breakpoints.up('md')]: {
            maxWidth: 1200,
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: 2000,
        },
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    container: {
        maxHeight: 440,
        [theme.breakpoints.up('md')]: {
            maxHeight: 580,
        }
    },
    hidden: {
        border: 0,
        clip: 'rect(0, 0, 0, 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    head: {
        color: theme.palette.common.white,
    }
}));


const StyledTableRow = withStyles((theme: Theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            //backgroundColor: '#00234B',
            backgroundColor: '#663399',
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 16,
        }
}))(TableCell);

function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow>
                <StyledTableCell key="in" align="center">
                    Input
                </StyledTableCell>
                <StyledTableCell key="out" align="center">
                    Output
                </StyledTableCell>
                <StyledTableCell key="check" align="center">
                    Checksum
                </StyledTableCell>
            </TableRow>
        </TableHead>
    )
}


export default function TestCaseTable(props: RouteComponentProps<RouteParamsProps>) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const initial = {
        itoken: "",
        className: "",
        instructor: "",
        createDate: "",
        dueDate: "",
        point: 0,
        oracle: {
            state: false,
            deductPoint: undefined,
            input: [],
            output: [],
            checksum: [],
        }
    }

    const [classroom, setClassroom] = useState(initial);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    }

    /*
    useEffect(() => {
        const getTestCaseData = async () : Promise<ClassroomOracle[]> => {
            //return await axios.get<GradingResultProps[]>('http://isel.lifove.net/api/token/', {
            return await axios.get<ClassroomOracle[]>('/api/token/', {
                params: {
                    itoken: props.itoken
                },
            }).then((response) => {
                return response.data;
            });
        }

        getTestCaseData()
            .then((response) => {
                for (var i = 0; i < response.length; i ++) {
                    setDataGroup(old => [ ...old, response[i]]);
                }
            })
    }, [props.itoken]);
    */

    useEffect(() => {
        if (classroom === initial) {
            const getTestCaseData = async () : Promise<ClassroomOracle[]> => {
                //return await axios.get<ClassroomOracle[]>('http://isel.lifove.net/api/totken/')
                return await axios.get<ClassroomOracle[]>('/api/token/')
                    .then((response) =>{
                        return response.data
                    });
            };

            getTestCaseData()
                .then(response => {
                    // @ts-ignore
                    setClassroom(response.find(element => element.itoken === props.match.params.token) || initial);
                    if (response.find(element => element.itoken === props.match.params.token && element.oracle?.state !== false) === undefined) {
                        props.history.push('/jchecker2.0');
                        alert("조회 가능한 테스트 케이스가 없습니다.😅");
                    }
                })
        }
    }, [classroom]);

    if (classroom.oracle.state !== false) {
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, classroom.oracle.input.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <TableContainer component={Paper} className={classes.container}>
                    <Table stickyHeader>
                        <EnhancedTableHead/>
                        <TableBody>
                            {classroom.oracle.input
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <StyledTableRow key={index + 'v'}>
                                            <TableCell key={index + 'in'} align="left">
                                                {row}
                                            </TableCell>
                                            <TableCell key={index + 'out'} align="left">
                                                {classroom.oracle.output[index]}
                                            </TableCell>
                                            <TableCell key={index + 'check'} align="center">
                                                {classroom.oracle.checksum[index]}
                                            </TableCell>
                                        </StyledTableRow>
                                    );
                                })
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={classroom.oracle.input.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        );
    }

    return (
        <Paper className={classes.root}>

        </Paper>
    );
}
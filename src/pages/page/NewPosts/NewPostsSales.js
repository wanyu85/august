import { Box } from "@mui/system";
import { usePost } from "../PostProvider";

import { DataGrid, beBY } from "@mui/x-data-grid";
import {
    Button,
    Grid,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Paper,
    Alert,
    Snackbar,
} from "@mui/material";
import { useEffect, useRef, useState, useCallback } from "react";

import { TitleBorder, TitleText } from "./NewPostsStyle";

import styled from "@emotion/styled";

export default function NewPostsSales() {
    // 獲取上下值
    const { sizeInput, colorInput, clothes, setClothes, open, setOpen } =
        usePost();

    const handleClose = () => {
        setOpen(false);
    };

    // ! .forEach -> 迭代陣列中的每個元素並對其執行指定的操作，但不創建新的陣列或返回新的值
    // .map -> 創建一個新的陣列，其中包含每個元素根據指定的轉換函數處理後的結果。
    const clothesState = {};

    const colorAndSizeComponents = colorInput.map((color) => {
        clothesState[color.color] = {}; // 在 clothesState 新增「顏色」的屬性，並創建容器儲存後續訊息

        const sizeComponents = sizeInput.map((size) => {
            const [newPostsSalesValue, setNewPostsSalesValue] = useState("");
            clothesState[color.color][size.size] = {
                newPostsSalesValue,
                setNewPostsSalesValue,
            };

            return (
                <TableCell align='center' key={size.size}>
                    <TextField
                        value={newPostsSalesValue}
                        onChange={(e) => setNewPostsSalesValue(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    件
                                </InputAdornment>
                            ),
                        }}
                    />
                </TableCell>
            );
        });

        return (
            <TableRow key={color.color}>
                <TableCell component='th' align='center'>
                    {color.color}
                </TableCell>
                {sizeComponents}
            </TableRow>
        );
    });

    // ! useCallback -> 用於緩存函數，以減少不必要的函數重新創建，通常在處理函數作為 props 傳遞時使用。
    // useEffect -> 用於處理組件的副作用，例如資料讀取和 DOM 操作，並在組件渲染後執行。
    const callBack = useCallback(() => {
        const clothesStateJson = JSON.stringify(clothesState);
        setClothes(clothesStateJson);
        setOpen(true);
    }, [clothesState, setClothes]);

    useEffect(() => {
        if (clothes) {
            try {
                const clothesJson = JSON.parse(clothes);
                // console.log("clothesJson", clothesJson);
            } catch (error) {
                // console.log("error:未輸入內容");
            }
        }
    }, [clothes]);

    return (
        <>
            <Grid
                item
                container
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
                spacing={1}
                mt={5}
            >
                <Grid item>
                    <TitleBorder />
                </Grid>
                <Grid item>
                    <TitleText>銷貨件數</TitleText>
                </Grid>
            </Grid>
            <Grid
                container
                item
                direction='row'
                justifyContent='center'
                alignItems='center'
                mt={5}
            >
                <Grid container item sx={{ mt: 2, ml: 5, mr: 5, mb: 10 }}>
                    <TableContainer
                        component={Paper}
                        variant='outlined'
                        elevation={0}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>顏色</TableCell>
                                    {sizeInput.map((size, i) => (
                                        <TableCell key={i} align='center'>
                                            {size.size}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>{colorAndSizeComponents}</TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Grid
                item
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
                mb={5}
            >
                <Button
                    disableElevation
                    variant='contained'
                    sx={{ width: 150 }}
                    onClick={callBack}
                >
                    儲存
                </Button>
                {open && (
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                    >
                        <Alert severity='success' onClose={handleClose}>
                            儲存成功
                        </Alert>
                    </Snackbar>
                )}
            </Grid>

            {/* <div>{colorAndSizeComponents}</div> */}
        </>
    );
}
